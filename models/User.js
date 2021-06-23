const Sequelize = require("sequelize");

module.exports = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
        allowNull: false,
    },
    confirmed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    confirmStr: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
    },
})