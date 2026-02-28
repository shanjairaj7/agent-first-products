import type { APIRoute } from 'astro';

export const prerender = true;

const SPEC = {
  openapi: '3.1.0',
  info: {
    title: 'Agent First Products Registry API',
    version: '1.0.0',
    description: 'Static JSON API for the Agent First Products Registry. All endpoints are pre-rendered static files — curl them directly, no auth required.',
    contact: {
      url: 'https://github.com/shanjairaj7/agent-first-products',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'https://shanjairaj7.github.io/agent-first-products',
      description: 'Production (GitHub Pages)',
    },
  ],
  paths: {
    '/api/tools.json': {
      get: {
        operationId: 'listTools',
        summary: 'List all tools',
        description: 'Returns all tools in the registry, sorted by agent-first score descending.',
        tags: ['Registry'],
        responses: {
          '200': {
            description: 'Array of tool entries',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Tool' } } } },
          },
        },
        'x-curl-example': "curl https://shanjairaj7.github.io/agent-first-products/api/tools.json | jq '.[0]'",
      },
    },
    '/api/meta.json': {
      get: {
        operationId: 'getMeta',
        summary: 'Registry metadata & stats',
        description: 'Returns aggregate stats: total tools, counts by category and interface, average score.',
        tags: ['Registry'],
        responses: {
          '200': {
            description: 'Registry metadata',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Meta' } } },
          },
        },
      },
    },
    '/api/by-category/{category}.json': {
      get: {
        operationId: 'getByCategory',
        summary: 'Filter by category',
        description: 'Returns tools filtered to a single category.',
        tags: ['Filters'],
        parameters: [
          {
            name: 'category',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              enum: ['search', 'automation', 'data', 'infrastructure', 'observability', 'compute', 'payments', 'auth', 'orchestration', 'browser', 'mcp-server'],
            },
            example: 'search',
          },
        ],
        responses: {
          '200': {
            description: 'Array of tools in the given category',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Tool' } } } },
          },
        },
        'x-curl-example': "curl https://shanjairaj7.github.io/agent-first-products/api/by-category/search.json",
      },
    },
    '/api/by-interface/{interface}.json': {
      get: {
        operationId: 'getByInterface',
        summary: 'Filter by interface type',
        description: 'Returns tools that support the given programmatic interface.',
        tags: ['Filters'],
        parameters: [
          {
            name: 'interface',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              enum: ['api', 'sdk', 'cli', 'mcp', 'webhook', 'graphql'],
            },
            example: 'mcp',
          },
        ],
        responses: {
          '200': {
            description: 'Array of tools with the given interface',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Tool' } } } },
          },
        },
        'x-curl-example': "curl https://shanjairaj7.github.io/agent-first-products/api/by-interface/mcp.json | jq '.[].name'",
      },
    },
  },
  components: {
    schemas: {
      Tool: {
        type: 'object',
        required: ['name', 'slug', 'description', 'website', 'category', 'agentFirstScore', 'interfaces', 'signup', 'allFeaturesViaAPI', 'sdkLanguages', 'pricing', 'tags', 'addedAt', 'verified'],
        properties: {
          name:             { type: 'string', example: 'Browserbase' },
          slug:             { type: 'string', example: 'browserbase', description: 'URL-safe identifier' },
          description:      { type: 'string', example: 'Headless browser infrastructure built for AI agents.' },
          website:          { type: 'string', format: 'uri', example: 'https://browserbase.com' },
          logoUrl:          { type: 'string', format: 'uri', nullable: true },
          category: {
            type: 'string',
            enum: ['search', 'automation', 'data', 'infrastructure', 'observability', 'compute', 'payments', 'auth', 'orchestration', 'browser', 'mcp-server'],
          },
          agentFirstScore:  { type: 'integer', minimum: 1, maximum: 10, description: 'How agent-native the tool is. 10 = built exclusively for agents.' },
          interfaces: {
            type: 'object',
            description: 'Which programmatic interfaces are available',
            properties: {
              api:     { type: 'boolean' },
              sdk:     { type: 'boolean' },
              cli:     { type: 'boolean' },
              mcp:     { type: 'boolean', description: 'Has a Model Context Protocol server' },
              webhook: { type: 'boolean' },
              graphql: { type: 'boolean' },
            },
          },
          signup: {
            type: 'object',
            description: 'How agents can sign up and authenticate',
            properties: {
              method: {
                type: 'string',
                enum: ['api', 'website-bot-friendly', 'human-only'],
                description: 'api = fully programmatic. website-bot-friendly = no CAPTCHA. human-only = needs human.',
              },
              hasAgentAuth: { type: 'boolean', description: 'Provides machine-to-machine authentication' },
              allowsBots:   { type: 'boolean', description: 'Explicitly allows bot access' },
            },
          },
          allFeaturesViaAPI: { type: 'boolean', description: 'Can agents use 100% of features without touching a dashboard?' },
          sdkLanguages:      { type: 'array', items: { type: 'string' }, example: ['python', 'typescript'] },
          mcpServerUrl:      { type: 'string', format: 'uri', nullable: true, description: 'Link to the MCP server repository' },
          pricing: {
            type: 'object',
            properties: {
              hasFree: { type: 'boolean' },
              model:   { type: 'string', enum: ['usage-based', 'subscription', 'free', 'enterprise'] },
            },
          },
          tags:     { type: 'array', items: { type: 'string' } },
          addedAt:  { type: 'string', format: 'date-time' },
          verified: { type: 'boolean', description: 'Independently verified by a maintainer' },
        },
      },
      Meta: {
        type: 'object',
        properties: {
          total:            { type: 'integer' },
          verified:         { type: 'integer' },
          avgScore:         { type: 'number' },
          lastUpdated:      { type: 'string', format: 'date-time' },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id:    { type: 'string' },
                label: { type: 'string' },
                count: { type: 'integer' },
              },
            },
          },
          interfaceCounts: {
            type: 'object',
            properties: {
              api:     { type: 'integer' },
              sdk:     { type: 'integer' },
              cli:     { type: 'integer' },
              mcp:     { type: 'integer' },
              webhook: { type: 'integer' },
              graphql: { type: 'integer' },
            },
          },
          apiEndpoints: {
            type: 'object',
            properties: {
              all:          { type: 'string' },
              meta:         { type: 'string' },
              byCategory:   { type: 'string' },
              byInterface:  { type: 'string' },
              openapi:      { type: 'string' },
            },
          },
        },
      },
    },
  },
  tags: [
    { name: 'Registry', description: 'Core registry endpoints' },
    { name: 'Filters',  description: 'Pre-filtered collections' },
  ],
};

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(SPEC, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
