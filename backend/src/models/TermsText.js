import { DataTypes } from 'sequelize';

export default function(sequelize) {
  const TermsText = sequelize.define('TermsText', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lang: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        isIn: [['en', 'sv']]
      }
    },
    section: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'terms_texts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['lang', 'section']
      }
    ]
  });

  return TermsText;
}