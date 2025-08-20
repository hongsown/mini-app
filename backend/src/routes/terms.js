export default async function termsRoutes(fastify, options) {
  const { TermsText } = fastify.models;

  // GET /api/terms?lang=en|sv
  fastify.get('/terms', async (request, reply) => {
    try {
      const { lang = 'en' } = request.query;
      
      if (!['en', 'sv'].includes(lang)) {
        return reply.code(400).send({ 
          error: 'Invalid language. Must be "en" or "sv"' 
        });
      }

      const termsData = await TermsText.findAll({
        where: { lang },
        order: [['section', 'ASC']]
      });

      if (termsData.length === 0) {
        return reply.code(404).send({ 
          error: 'No terms found for the specified language' 
        });
      }

      // Group terms by section for easier frontend consumption
      const groupedTerms = termsData.reduce((acc, term) => {
        acc[term.section] = term.content;
        return acc;
      }, {});

      reply.send({
        success: true,
        data: {
          language: lang,
          terms: groupedTerms
        }
      });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: 'Internal server error' 
      });
    }
  });

  // GET /api/terms/sections - Get all available sections
  fastify.get('/terms/sections', async (request, reply) => {
    try {
      const sections = await TermsText.findAll({
        attributes: ['section'],
        group: ['section'],
        order: [['section', 'ASC']]
      });

      reply.send({
        success: true,
        data: sections.map(s => s.section)
      });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: 'Internal server error' 
      });
    }
  });
}