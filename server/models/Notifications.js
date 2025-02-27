module.exports = (sequelize, Sequelize) => {
    const Notifications = sequelize.define('Notifications', {

        sent: {
            type: Sequelize.BOOLEAN
        },

        info: {
            type: Sequelize.JSON
        },

        identifier: {
            type: Sequelize.STRING
        },

        committedStamp: {
            type: Sequelize.DATE
        },

        link: {
            type: Sequelize.STRING
        },

        type: {
            type: Sequelize.STRING
        }

    })

    return Notifications;
}