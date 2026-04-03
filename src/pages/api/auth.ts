import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const clientId = (env as any).GITHUB_CLIENT_ID;

  try {
    const url = new URL(request.url);
    const redirectUrl = new URL('https://github.com/login/oauth/authorize');
    redirectUrl.searchParams.set('client_id', clientId);
    redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
    redirectUrl.searchParams.set('scope', 'repo user');
    redirectUrl.searchParams.set('state', crypto.getRandomValues(new Uint8Array(12)).join(''));
    return Response.redirect(redirectUrl.href, 302);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
