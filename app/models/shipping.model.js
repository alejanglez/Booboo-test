module.exports = (sequelize, Sequelize) => {
  const Shipping = sequelize.define("shipping", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Shipping;
};
