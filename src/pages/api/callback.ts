import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

function renderBody(status: string, content: unknown): string {
  return `<script>
    const receiveMessage = (message) => {
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify(content)}',
        message.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  </script>`;
}

export const GET: APIRoute = async ({ request }) => {
  const clientId = (env as any).GITHUB_CLIENT_ID;
  const clientSecret = (env as any).GITHUB_CLIENT_SECRET;

  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'cachetdeco-github-oauth',
        'accept': 'application/json',
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const result = (await response.json()) as any;

    if (result.error) {
      return new Response(renderBody('error', result), {
        status: 401,
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    return new Response(renderBody('success', { token: result.access_token, provider: 'github' }), {
      status: 200,
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  }
};
