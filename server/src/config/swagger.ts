import swaggerJsdoc from 'swagger-jsdoc'
const serverUrl = process.env.SWAGGER_SERVER_URL

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wealth Map API Documentation',
      version: '1.0.0',
      description: 'API documentation for Wealth Map application',
    },
    servers: [
      {
        url: serverUrl,
        description: 'API server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
