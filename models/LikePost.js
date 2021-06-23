const Sequelize = require('sequelize');

module.exports = sequelize.define('LikePost', {
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
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    publishDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM,
        values: ['like', 'dislike'],
        allowNull: false,
    },
});
