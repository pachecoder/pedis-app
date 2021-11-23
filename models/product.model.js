module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    
    categoryName: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    ean: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    price: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    url: {
      type: Sequelize.STRING(2048),
      allowNull: true,
    },

    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  } , {
        timestamps: true,

        createdAt: true,
    
        updatedAt: true,
    
        deletedAt: true,
    
        paranoid: true,
  });
  
  //Product.removeAttribute('id');

  return Product;
};
