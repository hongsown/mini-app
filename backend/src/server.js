import Fastify from 'fastify';
import cors from '@fastify/cors';
import staticFiles from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import { createModels } from './models/index.js';
import termsRoutes from './routes/terms.js';
import productsRoutes from './routes/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
});

// CORS configuration
await fastify.register(cors, {
  origin: true,
  credentials: true
});

// Static files for assets
await fastify.register(staticFiles, {
  root: path.join(__dirname, '../public'),
  prefix: '/public/'
});

// Initialize database connection and models
try {
  await sequelize.authenticate();
  fastify.log.info('Database connection established successfully');
  
  // Create models and attach to fastify instance
  const models = createModels(sequelize);
  fastify.decorate('models', models);
  fastify.decorate('sequelize', sequelize);
  
} catch (error) {
  fastify.log.error('Unable to connect to database:', error);
  process.exit(1);
}

// Health check route
fastify.get('/', async (request, reply) => {
  return {
    status: 'ok',
    message: '123 Fakturera Mini-App Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  };
});

// Health check for database
fastify.get('/health', async (request, reply) => {
  try {
    await sequelize.authenticate();
    return {
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    reply.code(503).send({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Register API routes
await fastify.register(termsRoutes, { prefix: '/api' });
await fastify.register(productsRoutes, { prefix: '/api' });

// Handle 404 for API routes
fastify.setNotFoundHandler((request, reply) => {
  if (request.url.startsWith('/api/')) {
    reply.code(404).send({
      error: 'API endpoint not found',
      message: `Route ${request.method} ${request.url} not found`
    });
  } else {
    reply.code(404).send({
      error: 'Page not found'
    });
  }
});

// Global error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  
  reply.code(error.statusCode || 500).send({
    error: error.message || 'Internal Server Error',
    statusCode: error.statusCode || 500
  });
});

// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 3001;
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    fastify.log.info(`🚀 Server running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Handle graceful shutdown
const gracefulShutdown = async () => {
  fastify.log.info('Received shutdown signal, closing server gracefully...');
  
  try {
    await sequelize.close();
    fastify.log.info('Database connection closed');
    
    await fastify.close();
    fastify.log.info('Server closed successfully');
    
    process.exit(0);
  } catch (error) {
    fastify.log.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

start();