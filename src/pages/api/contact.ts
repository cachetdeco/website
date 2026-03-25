import type { APIRoute } from 'astro';
import { sendEmail } from '@/lib/email';
import general from '@/content/settings/general.json';

export const prerender = false;

interface ContactBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

function isValidBody(body: unknown): body is ContactBody {
  if (typeof body !== 'object' || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === 'string' && b.firstName.trim().length > 0 &&
    typeof b.lastName === 'string' && b.lastName.trim().length > 0 &&
    typeof b.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.phone === 'string' && b.phone.trim().length > 0 &&
    typeof b.message === 'string' && b.message.trim().length > 0
  );
}

function buildContactNotificationHtml(data: ContactBody): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">
    <div style="background:#314732;padding:32px;border-radius:8px 8px 0 0;text-align:center">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600">Nouveau message de contact</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:14px">Cachet Peintres Décorateurs</p>
    </div>
    <div style="background:#ffffff;border-radius:0 0 8px 8px;overflow:hidden">
      <div style="padding:24px;background:#f0f4ef;border-bottom:2px solid #d6e2d4">
        <p style="margin:0;font-size:15px;color:#314732;font-weight:600">
          Vous avez reçu un nouveau message de <strong>${data.firstName} ${data.lastName}</strong>.
        </p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee;width:40%">Nom</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee;font-weight:600">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Courriel</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee"><a href="mailto:${data.email}" style="color:#314732;font-weight:600">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Téléphone</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee"><a href="tel:${data.phone.replace(/\D/g, '')}" style="color:#314732;font-weight:600">${data.phone}</a></td>
          </tr>
        </tbody>
      </table>
      <div style="padding:20px">
        <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.05em">Message</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap">${data.message}</div>
      </div>
      <div style="padding:16px 20px 24px">
        <a href="mailto:${data.email}?subject=Re: Message — Cachet Peintres Décorateurs" style="display:inline-block;padding:10px 24px;background:#314732;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:700">Répondre à ${data.firstName}</a>
      </div>
    </div>
    <p style="margin:24px 0 0;text-align:center;font-size:11px;color:#999">
      Cachet Peintres Décorateurs · 9500-5609 Québec Inc · RBQ 5839 8736 01
    </p>
  </div>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!isValidBody(body)) {
    return new Response(JSON.stringify({ success: false, error: 'Missing or invalid fields.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toAddress = general.emailToContact?.trim();
  const fromAddress = general.emailFromContact?.trim();
  if (!apiKey || !toAddress || !fromAddress) {
    return new Response(JSON.stringify({ success: false, error: 'Server configuration missing.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await sendEmail(apiKey, {
      from: fromAddress,
      to: toAddress,
      replyTo: body.email,
      subject: `Nouveau message — ${body.firstName} ${body.lastName}`,
      html: buildContactNotificationHtml(body),
    });
  } catch (e) {
    console.error(e);
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
