export default async function productsRoutes(fastify, options) {
  const { Product } = fastify.models;

  // GET /api/products
  fastify.get('/products', async (request, reply) => {
    try {
      const { category, active = 'true' } = request.query;
      
      const whereClause = {};
      if (category) {
        whereClause.category = category;
      }
      if (active === 'true') {
        whereClause.is_active = true;
      }

      const products = await Product.findAll({
        where: whereClause,
        order: [['name', 'ASC']]
      });

      reply.send({
        success: true,
        data: products.map(product => ({
          id: product.id,
          name: product.name,
          in_price: product.in_price ? parseFloat(product.in_price) : null,
          price: parseFloat(product.price),
          category: product.category,
          description: product.description,
          in_stock: product.in_stock || 0,
          is_active: product.is_active,
          created_at: product.created_at,
          updated_at: product.updated_at
        }))
      });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: 'Internal server error' 
      });
    }
  });

  // GET /api/products/:id
  fastify.get('/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      
      const product = await Product.findByPk(id);
      
      if (!product) {
        return reply.code(404).send({ 
          error: 'Product not found' 
        });
      }

      reply.send({
        success: true,
        data: {
          id: product.id,
          name: product.name,
          in_price: product.in_price ? parseFloat(product.in_price) : null,
          price: parseFloat(product.price),
          category: product.category,
          description: product.description,
          in_stock: product.in_stock || 0,
          is_active: product.is_active,
          created_at: product.created_at,
          updated_at: product.updated_at
        }
      });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: 'Internal server error' 
      });
    }
  });

  // POST /api/products/:id (Update product)
  fastify.post('/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const product = await Product.findByPk(id);
      
      if (!product) {
        return reply.code(404).send({ 
          error: 'Product not found' 
        });
      }

      // Validate and sanitize update data
      const allowedFields = ['name', 'in_price', 'price', 'category', 'description', 'in_stock', 'is_active'];
      const filteredData = {};
      
      for (const field of allowedFields) {
        if (updateData.hasOwnProperty(field)) {
          if (field === 'in_price' || field === 'price') {
            // Ensure numeric fields are properly formatted
            filteredData[field] = updateData[field] !== null && updateData[field] !== '' 
              ? parseFloat(updateData[field]) 
              : (field === 'price' ? product.price : null);
          } else if (field === 'in_stock') {
            // Ensure in_stock is integer
            filteredData[field] = updateData[field] !== null && updateData[field] !== '' 
              ? parseInt(updateData[field]) 
              : 0;
          } else {
            filteredData[field] = updateData[field];
          }
        }
      }

      await product.update(filteredData);

      reply.send({
        success: true,
        message: 'Product updated successfully',
        data: {
          id: product.id,
          name: product.name,
          in_price: product.in_price ? parseFloat(product.in_price) : null,
          price: parseFloat(product.price),
          category: product.category,
          description: product.description,
          in_stock: product.in_stock || 0,
          is_active: product.is_active,
          updated_at: product.updated_at
        }
      });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: 'Internal server error' 
      });
    }
  });

  // GET /api/products/categories - Get all unique categories
  fastify.get('/products/categories', async (request, reply) => {
    try {
      const categories = await Product.findAll({
        attributes: ['category'],
        where: { 
          category: { [fastify.sequelize.Sequelize.Op.ne]: null }
        },
        group: ['category'],
        order: [['category', 'ASC']]
      });

      reply.send({
        success: true,
        data: categories.map(c => c.category).filter(Boolean)
      });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: 'Internal server error' 
      });
    }
  });
}