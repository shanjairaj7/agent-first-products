import type { APIRoute } from 'astro';
import { getRegistryMeta } from '../../data/registry';

export const prerender = true;

export const GET: APIRoute = () => {
  const meta = getRegistryMeta();
  const payload = {
    ...meta,
    lastUpdated: new Date().toISOString(),
    apiEndpoints: {
      all:         '/api/tools.json',
      meta:        '/api/meta.json',
      byCategory:  '/api/by-category/{category}.json',
      byInterface: '/api/by-interface/{interface}.json',
      openapi:     '/api/openapi.json',
    },
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
