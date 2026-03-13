interface SoumissionBody {
  nom: string;
  courriel: string;
  telephone: string;
  type_service: string;
  adresse?: string;
  message: string;
}

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

const serviceLabels: Record<string, string> = {
  interieur: 'Peinture intérieure',
  exterieur: 'Peinture extérieure',
  commercial: 'Peinture commerciale',
  decoration: 'Décoration intérieure',
  autre: 'Autre',
};

function buildEmailHtml(data: SoumissionBody): string {
  const serviceLabel = serviceLabels[data.type_service] ?? data.type_service;
  const adresseLine = data.adresse
    ? `<tr><td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Adresse des travaux</td><td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee">${data.adresse}</td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">
    <div style="background:#314732;padding:32px;border-radius:8px 8px 0 0;text-align:center">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600">Nouvelle demande de soumission</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:14px">Cachet Peintres Décorateurs</p>
    </div>
    <div style="background:#ffffff;border-radius:0 0 8px 8px;overflow:hidden">
      <div style="padding:24px;background:#f0f4ef;border-bottom:2px solid #d6e2d4">
        <p style="margin:0;font-size:15px;color:#314732;font-weight:600">
          Vous avez reçu une nouvelle demande de soumission de la part de <strong>${data.nom}</strong>.
        </p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee;width:40%">Nom</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee;font-weight:600">${data.nom}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Courriel</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee"><a href="mailto:${data.courriel}" style="color:#314732;font-weight:600">${data.courriel}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Téléphone</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee"><a href="tel:${data.telephone.replace(/\D/g, '')}" style="color:#314732;font-weight:600">${data.telephone}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #eee">Type de service</td>
            <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #eee">${serviceLabel}</td>
          </tr>
          ${adresseLine}
        </tbody>
      </table>
      <div style="padding:20px">
        <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.05em">Message</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap">${data.message}</div>
      </div>
      <div style="padding:16px 20px 24px">
        <a href="mailto:${data.courriel}?subject=Re: Soumission — Cachet Peintres Décorateurs" style="display:inline-block;padding:10px 24px;background:#314732;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:700">Répondre à ${data.nom}</a>
      </div>
    </div>
    <p style="margin:24px 0 0;text-align:center;font-size:11px;color:#999">
      Cachet Peintres Décorateurs · 9500-5609 Québec Inc · RBQ 5839 8736 01
    </p>
  </div>
</body>
</html>`;
}

function validateBody(body: unknown): body is SoumissionBody {
  if (typeof body !== 'object' || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.nom === 'string' && b.nom.trim().length > 0 &&
    typeof b.courriel === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.courriel) &&
    typeof b.telephone === 'string' && b.telephone.trim().length > 0 &&
    typeof b.type_service === 'string' && b.type_service.length > 0 &&
    typeof b.message === 'string' && b.message.trim().length > 0
  );
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://cachetdeco.com',
    'Content-Type': 'application/json',
  };

  // Rate limiting via CF headers (basic check)
  const ip = context.request.headers.get('CF-Connecting-IP') ?? 'unknown';

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Corps de requête invalide.' }),
      { status: 400, headers: corsHeaders }
    );
  }

  if (!validateBody(body)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Données manquantes ou invalides.' }),
      { status: 422, headers: corsHeaders }
    );
  }

  const apiKey = context.env.RESEND_API_KEY;
  const contactEmail = context.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    console.error('Missing env vars: RESEND_API_KEY or CONTACT_EMAIL');
    return new Response(
      JSON.stringify({ success: false, error: 'Configuration serveur manquante.' }),
      { status: 500, headers: corsHeaders }
    );
  }

  const emailPayload = {
    from: 'Cachet Peintres Décorateurs <soumission@cachetdeco.com>',
    to: [contactEmail],
    reply_to: body.courriel,
    subject: `Soumission — ${serviceLabels[body.type_service] ?? body.type_service} — ${body.nom}`,
    html: buildEmailHtml(body),
  };

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!resendRes.ok) {
    const resendError = await resendRes.text().catch(() => 'Unknown error');
    console.error('Resend error:', resendError, 'IP:', ip);
    return new Response(
      JSON.stringify({ success: false, error: 'Erreur lors de l\'envoi du courriel.' }),
      { status: 502, headers: corsHeaders }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: corsHeaders }
  );
};

// Handle preflight OPTIONS
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://cachetdeco.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
