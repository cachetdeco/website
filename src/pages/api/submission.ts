import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import type { EmailAttachment } from '@/lib/email';
import { sendEmail } from '@/lib/email';
import general from '@/content/settings/general.json';

export const prerender = false;

const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

const ACCEPTED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

interface SubmissionPayload {
  fullName: string;
  email: string;
  phone: string;
  workAddress?: string;
  serviceType: string;
  message: string;
}

const SERVICE_TYPE_LABELS: Record<string, string> = {
  interior: 'Peinture intérieure',
  exterior: 'Peinture extérieure',
  commercial: 'Peinture commerciale',
  decoration: 'Décoration intérieure',
  other: 'Autre',
};

function isValidPayload(body: unknown): body is SubmissionPayload {
  if (typeof body !== 'object' || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === 'string' && b.fullName.trim().length > 0 &&
    typeof b.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.phone === 'string' && b.phone.trim().length > 0 &&
    typeof b.serviceType === 'string' && b.serviceType.length > 0 &&
    typeof b.message === 'string' && b.message.trim().length > 0
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sanitizeFilename(name: string): string {
  const base = name.replace(/[/\\]/g, '_').trim() || 'file';
  return base.length > 200 ? base.slice(0, 200) : base;
}

function isFileLike(v: unknown): v is File {
  return (
    typeof v === 'object' &&
    v !== null &&
    'arrayBuffer' in v &&
    typeof (v as File).name === 'string' &&
    typeof (v as File).size === 'number' &&
    typeof (v as File).type === 'string'
  );
}

function isAcceptedFile(file: File): boolean {
  if (ACCEPTED_MIME.has(file.type)) return true;
  if (file.type) return false;
  return /\.(jpe?g|png|gif|webp|svg|pdf|doc|docx)$/i.test(file.name);
}

function buildNotificationHtml(data: SubmissionPayload, attachmentNames: string[]): string {
  const serviceLabel = SERVICE_TYPE_LABELS[data.serviceType] ?? data.serviceType;
  const workAddressRow = data.workAddress
    ? `<tr><td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee;width:40%">Adresse des travaux</td><td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee">${escapeHtml(data.workAddress)}</td></tr>`
    : '';
  const attachmentsSection =
    attachmentNames.length > 0
      ? `<div style="padding:16px 20px;background:#fafafa;border-top:1px solid #eee">
        <p style="margin:0;font-size:13px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.05em">Fichiers joints</p>
        <ul style="margin:8px 0 0;padding-left:20px;font-size:14px;color:#374151">${attachmentNames.map((n) => `<li>${escapeHtml(n)}</li>`).join('')}</ul>
      </div>`
      : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">
    <div style="background:#314732;padding:32px;border-radius:8px 8px 0 0;text-align:center">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600">Nouvelle demande de soumission</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:14px">Cachet Peintres Décorateurs</p>
    </div>
    <div style="background:#ffffff;border-radius:0 0 8px 8px;overflow:hidden">
      <div style="padding:24px;background:#f0f4ef;border-bottom:2px solid #d6e2d4">
        <p style="margin:0;font-size:15px;color:#314732;font-weight:600">
          Vous avez reçu une nouvelle demande de soumission de la part de <strong>${escapeHtml(data.fullName)}</strong>.
        </p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee;width:40%">Nom</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee;font-weight:600">${escapeHtml(data.fullName)}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Courriel</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee"><a href="mailto:${data.email}" style="color:#314732;font-weight:600">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Téléphone</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee"><a href="tel:${data.phone.replace(/\D/g, '')}" style="color:#314732;font-weight:600">${escapeHtml(data.phone)}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Type de service</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee">${serviceLabel}</td>
          </tr>
          ${workAddressRow}
        </tbody>
      </table>
      <div style="padding:20px">
        <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.05em">Message</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</div>
      </div>
      ${attachmentsSection}
      <div style="padding:16px 20px 24px">
        <a href="mailto:${data.email}?subject=Re: Soumission — Cachet Peintres Décorateurs" style="display:inline-block;padding:10px 24px;background:#314732;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:700">Répondre à ${escapeHtml(data.fullName)}</a>
      </div>
    </div>
    <p style="margin:24px 0 0;text-align:center;font-size:11px;color:#999">
      Cachet Peintres Décorateurs · RBQ 5839 8736 01
    </p>
  </div>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('multipart/form-data')) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid Content-Type.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const payload: SubmissionPayload = {
    fullName: String(formData.get('fullName') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    workAddress: String(formData.get('workAddress') ?? '').trim() || undefined,
    serviceType: String(formData.get('serviceType') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  };

  if (!isValidPayload(payload)) {
    return new Response(JSON.stringify({ success: false, error: 'Missing or invalid fields.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawFiles = formData.getAll('files');
  const files: File[] = [];
  for (const item of rawFiles) {
    if (!isFileLike(item) || item.size === 0) continue;
    if (!isAcceptedFile(item)) {
      return new Response(JSON.stringify({ success: false, error: 'Unsupported file type.' }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    files.push(item);
  }

  let totalBytes = 0;
  const attachments: EmailAttachment[] = [];
  const attachmentNames: string[] = [];
  for (const file of files) {
    totalBytes += file.size;
    if (totalBytes > MAX_TOTAL_BYTES) {
      return new Response(JSON.stringify({ success: false, error: 'Total upload size exceeds 20 MB.' }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const safeName = sanitizeFilename(file.name);
    attachmentNames.push(safeName);
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    const binary = bytes.reduce((acc, b) => acc + String.fromCharCode(b), '');
    attachments.push({
      filename: safeName,
      content: btoa(binary),
    });
  }

  const apiKey = (env as unknown as Record<string, string>).RESEND_API_KEY;
  const fromAddress = general.fromAddressSubmission?.trim();
  const toAddress = general.toAddressSubmission?.trim();

  if (!apiKey || !fromAddress || !toAddress) {
    return new Response(JSON.stringify({ success: false, error: 'Server configuration missing.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await sendEmail(apiKey, {
      from: fromAddress,
      to: toAddress,
      replyTo: payload.email,
      subject: `Soumission — ${SERVICE_TYPE_LABELS[payload.serviceType] ?? payload.serviceType} — ${payload.fullName}`,
      html: buildNotificationHtml(payload, attachmentNames),
      attachments: attachments.length ? attachments : undefined,
    });
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
