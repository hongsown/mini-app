import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import sequelize from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    console.log('🔄 Starting database migrations...');
    
    // Read and execute the initial SQL migration file
    const migrationSQL = await readFile(
      path.join(__dirname, '001-create-tables.sql'), 
      'utf8'
    );
    
    await sequelize.query(migrationSQL);
    console.log('✅ Initial migration completed!');
    
    // Read and execute the in_stock column migration
    const instockMigrationSQL = await readFile(
      path.join(__dirname, '002-add-in-stock-column.sql'), 
      'utf8'
    );
    
    await sequelize.query(instockMigrationSQL);
    console.log('✅ Added in_stock column migration completed!');
    
    console.log('✅ All database migrations completed successfully!');
    console.log('📊 Tables created: terms_texts, products');
    console.log('🌱 Sample data inserted');
    console.log('📦 in_stock column added to products table');
    
    await sequelize.close();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
    
    await sequelize.close();
    process.exit(1);
  }
}

runMigrations();