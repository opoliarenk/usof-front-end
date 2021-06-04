const Sequelize = require("sequelize");

module.exports = sequelize.define("Post", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        author: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        publishDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM,
            values: ['active', 'inactive'],
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
});