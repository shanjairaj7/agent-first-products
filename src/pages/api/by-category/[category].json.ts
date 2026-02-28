import type { APIRoute, GetStaticPaths } from 'astro';
import { TOOLS } from '../../../data/registry';
import { CategoryEnum } from '../../../data/schema';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = () =>
  CategoryEnum.options.map(category => ({ params: { category } }));

export const GET: APIRoute = ({ params }) => {
  const tools = TOOLS.filter(t => t.category === params.category);
  return new Response(JSON.stringify(tools, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
