export interface EmailAttachment {
  filename: string;
  /** Base64-encoded file bytes */
  content: string;
}

export interface SendEmailOptions {
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}

export async function sendEmail(apiKey: string, options: SendEmailOptions): Promise<void> {
  const payload: Record<string, unknown> = {
    from: options.from,
    to: Array.isArray(options.to) ? options.to : [options.to],
    reply_to: options.replyTo,
    subject: options.subject,
    html: options.html,
  };
  if (options.attachments?.length) {
    payload.attachments = options.attachments;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error');
    throw new Error(errorText);
  }
}
