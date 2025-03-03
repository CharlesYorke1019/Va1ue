module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        email: {
            type: Sequelize.STRING,
            unique: true

        },
        password: {
            type: Sequelize.STRING
        },

        booksActive: {
            type: Sequelize.JSON
        },

        channelsActive: {
            type: Sequelize.JSON
        }

    });
    return User;
};