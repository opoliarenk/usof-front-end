const Sequelize = require('sequelize');

module.exports = sequelize.define("PostCategory", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});