import { Sequelize } from 'sequelize';
import TermsTextModel from './TermsText.js';
import ProductModel from './Product.js';

export function createModels(sequelize) {
  const models = {
    TermsText: TermsTextModel(sequelize),
    Product: ProductModel(sequelize)
  };

  return models;
}

export default createModels;