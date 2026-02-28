import type { APIRoute } from 'astro';
import { TOOLS } from '../../data/registry';

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(TOOLS, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
