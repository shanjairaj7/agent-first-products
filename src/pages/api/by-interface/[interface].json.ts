import type { APIRoute, GetStaticPaths } from 'astro';
import { TOOLS } from '../../../data/registry';

export const prerender = true;

const INTERFACES = ['api', 'sdk', 'cli', 'mcp', 'webhook', 'graphql'] as const;
type Iface = typeof INTERFACES[number];

export const getStaticPaths: GetStaticPaths = () =>
  INTERFACES.map(iface => ({ params: { interface: iface } }));

export const GET: APIRoute = ({ params }) => {
  const iface = params.interface as Iface;
  const tools = TOOLS.filter(t => t.interfaces[iface] === true);
  return new Response(JSON.stringify(tools, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
