/**
 * Static OpenAPI 3.0 spec, hand-written to describe the API exactly as
 * it already behaves — this file documents; it does not define, wrap,
 * or alter any route, controller, or response shape. Every path, param,
 * status code, and payload shape below was checked against the actual
 * implementation (routes/v1/*, controllers/*, services/*) rather than
 * generated from it, so update this file by hand alongside any future
 * endpoint change — it will never silently drift by re-running a tool.
 *
 * Deliberately not using swagger-jsdoc route-comment scanning: that
 * would mean adding JSDoc blocks into routes/controllers/validators,
 * which Phase 5 explicitly avoids touching. This file is fully
 * self-contained instead.
 */

const successEnvelope = (dataSchema) => ({
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    data: dataSchema,
  },
})

const paginatedEnvelope = (itemSchema) => ({
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    data: { type: 'array', items: itemSchema },
    meta: { $ref: '#/components/schemas/PaginationMeta' },
  },
})

const errorEnvelope = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    message: { type: 'string' },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
}

const pageParam = { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } }
const limitParam = { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 } }
const dietParam = {
  name: 'diet',
  in: 'query',
  schema: { type: 'string', enum: ['Herbivore', 'Carnivore', 'Omnivore'] },
}
const continentParam = {
  name: 'continent',
  in: 'query',
  schema: {
    type: 'string',
    enum: ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Australia'],
  },
}
const typeParam = { name: 'type', in: 'query', schema: { type: 'string' } }

const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Jurassic Time API',
    version: '1.0.0',
    description:
      'REST API backing the Jurassic Museum frontend. All /api/v1 endpoints below are read-only ' +
      'GET endpoints; response envelopes are consistent across the whole API: ' +
      '{ success: true, data, meta? } on success, { success: false, message, errors? } on failure.',
  },
  servers: [{ url: '/', description: 'Current host' }],
  tags: [
    { name: 'Meta', description: 'Health/root endpoints — not versioned, not wrapped in the API envelope' },
    { name: 'Eras', description: 'The three chronological eras (Triassic, Jurassic, Cretaceous)' },
    { name: 'Dinosaurs', description: 'Individual dinosaur exhibits' },
    { name: 'Search', description: 'Global museum search' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Meta'],
        summary: 'API root — informational only',
        responses: {
          200: {
            description: 'API is running',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Jurassic Time API' },
                    version: { type: 'string', example: '1.0.0' },
                    status: { type: 'string', example: 'running' },
                    docs: { type: 'string', example: '/api/docs' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        tags: ['Meta'],
        summary: 'Health check — reads existing Mongoose connection state, does not query the database',
        responses: {
          200: {
            description: 'Service is up (database may still show connecting/disconnected)',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    environment: { type: 'string', example: 'production' },
                    uptime: { type: 'number', example: 123.45, description: 'Process uptime in seconds' },
                    timestamp: { type: 'string', format: 'date-time' },
                    database: {
                      type: 'string',
                      enum: ['connected', 'connecting', 'disconnecting', 'disconnected', 'unknown'],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/eras': {
      get: {
        tags: ['Eras'],
        summary: 'List all eras, sorted chronologically',
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: successEnvelope({ type: 'array', items: { $ref: '#/components/schemas/Era' } }) } },
          },
        },
      },
    },
    '/api/v1/eras/{slug}': {
      get: {
        tags: ['Eras'],
        summary: 'Get a single era by slug',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string', example: 'jurassic' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: successEnvelope({ $ref: '#/components/schemas/Era' }) } } },
          400: { description: 'Malformed slug', content: { 'application/json': { schema: errorEnvelope } } },
          404: { description: 'No era with that slug', content: { 'application/json': { schema: errorEnvelope } } },
        },
      },
    },
    '/api/v1/eras/{slug}/dinosaurs': {
      get: {
        tags: ['Eras', 'Dinosaurs'],
        summary: "List one era's dinosaurs, with the same filters as /api/v1/dinosaurs",
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string', example: 'jurassic' } },
          pageParam,
          limitParam,
          dietParam,
          continentParam,
          typeParam,
        ],
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: paginatedEnvelope({ $ref: '#/components/schemas/Dinosaur' }) } },
          },
          400: { description: 'Invalid query parameter', content: { 'application/json': { schema: errorEnvelope } } },
          404: { description: 'No era with that slug', content: { 'application/json': { schema: errorEnvelope } } },
        },
      },
    },
    '/api/v1/dinosaurs': {
      get: {
        tags: ['Dinosaurs'],
        summary: 'List dinosaurs with optional filtering and pagination',
        parameters: [
          { name: 'era', in: 'query', schema: { type: 'string', enum: ['triassic', 'jurassic', 'cretaceous'] } },
          dietParam,
          continentParam,
          typeParam,
          pageParam,
          limitParam,
        ],
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: paginatedEnvelope({ $ref: '#/components/schemas/Dinosaur' }) } },
          },
          400: { description: 'Invalid query parameter', content: { 'application/json': { schema: errorEnvelope } } },
        },
      },
    },
    '/api/v1/dinosaurs/{slug}': {
      get: {
        tags: ['Dinosaurs'],
        summary: 'Get a single dinosaur by slug',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string', example: 'stegosaurus' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: successEnvelope({ $ref: '#/components/schemas/Dinosaur' }) } } },
          400: { description: 'Malformed slug', content: { 'application/json': { schema: errorEnvelope } } },
          404: { description: 'No dinosaur with that slug', content: { 'application/json': { schema: errorEnvelope } } },
        },
      },
    },
    '/api/v1/search': {
      get: {
        tags: ['Search'],
        summary: 'Global museum search — case-insensitive substring match on name/scientificName/era',
        parameters: [
          { name: 'q', in: 'query', required: true, schema: { type: 'string' } },
          { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 50, default: 20 } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/SearchResult' } },
                    meta: {
                      type: 'object',
                      properties: { query: { type: 'string' }, count: { type: 'integer' } },
                    },
                  },
                },
              },
            },
          },
          400: { description: '"q" missing or empty', content: { 'application/json': { schema: errorEnvelope } } },
        },
      },
    },
  },
  components: {
    schemas: {
      PaginationMeta: {
        type: 'object',
        properties: {
          page: { type: 'integer' },
          limit: { type: 'integer' },
          total: { type: 'integer' },
          totalPages: { type: 'integer' },
        },
      },
      EraTheme: {
        type: 'object',
        properties: {
          primary: { type: 'string' },
          primaryDim: { type: 'string' },
          secondary: { type: 'string' },
          accent: { type: 'string' },
          glow: { type: 'string' },
          backgroundOverlay: { type: 'string' },
          progressFrom: { type: 'string' },
          progressTo: { type: 'string' },
          chipBackground: { type: 'string' },
          chipBorder: { type: 'string' },
          chipText: { type: 'string' },
        },
      },
      Era: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'jurassic' },
          name: { type: 'string', example: 'Jurassic' },
          title: { type: 'string', example: 'Jurassic Era' },
          eyebrow: { type: 'string' },
          range: { type: 'string', example: '201–145 MYA' },
          period: { type: 'string', example: '201–145 Million Years Ago' },
          tagline: { type: 'string' },
          description: { type: 'string' },
          heroImage: { type: 'string' },
          depthStart: { type: 'number' },
          depthEnd: { type: 'number' },
          order: { type: 'integer' },
          theme: { $ref: '#/components/schemas/EraTheme' },
          viewCount: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Fact: {
        type: 'object',
        properties: { label: { type: 'string' }, value: { type: 'string' } },
      },
      Dinosaur: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'brachiosaurus' },
          name: { type: 'string' },
          scientificName: { type: 'string' },
          pronunciation: { type: 'string' },
          pronunciationAudio: { type: 'string' },
          eraId: { type: 'string', description: 'ObjectId of the parent era' },
          eraSlug: { type: 'string', example: 'jurassic' },
          era: { type: 'string', example: 'Jurassic' },
          period: { type: 'string' },
          diet: { type: 'string', enum: ['Herbivore', 'Carnivore', 'Omnivore'] },
          type: { type: 'string', example: 'Sauropod' },
          habitat: { type: 'string' },
          region: { type: 'string' },
          continent: {
            type: 'string',
            enum: ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Australia'],
          },
          overview: { type: 'string' },
          lifeEnvironment: { type: 'string' },
          museumHighlight: { type: 'string' },
          discovery: {
            type: 'string',
            description: 'Discovery & Fossil History prose. Added Phase 6B; not yet populated for any dinosaur.',
          },
          sceneImage: { type: 'string' },
          focalPoint: { type: 'string', example: '50% 50%' },
          heightMeters: { type: 'number' },
          gallery: { type: 'array', items: { type: 'string' } },
          facts: { type: 'array', items: { $ref: '#/components/schemas/Fact' } },
          viewCount: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      SearchResult: {
        type: 'object',
        description: 'Matches the shape search/collections/dinosaurCollection.js already produces on the frontend',
        properties: {
          id: { type: 'string', example: 'dinosaurs:brachiosaurus' },
          type: { type: 'string', example: 'dinosaurs' },
          typeLabel: { type: 'string', example: 'Dinosaur' },
          title: { type: 'string' },
          subtitle: { type: 'string' },
          image: { type: 'string' },
          description: { type: 'string' },
          era: { type: 'string' },
          eraSlug: { type: 'string' },
          diet: { type: 'string' },
          dinosaurType: { type: 'string' },
          region: { type: 'string' },
          dinosaurId: { type: 'string', example: 'brachiosaurus' },
        },
      },
    },
  },
}

module.exports = openapiSpec