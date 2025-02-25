module.exports = (sequelize, Sequelize) => {
    const Odds = sequelize.define('Odds', {
        book: {
            type: Sequelize.STRING,
        },
        team1: {
            type: Sequelize.STRING,
        },
        team2: {
            type: Sequelize.STRING, 
        },
        team1StartingOdds: {
            type: Sequelize.INTEGER
        },
        team2StartingOdds: {
            type: Sequelize.INTEGER
        },
        team1LiveOdds: {
            type: Sequelize.INTEGER
        },
        team2LiveOdds: {
            type: Sequelize.INTEGER
        },
        identifier: {
            type: Sequelize.STRING
        }
    });
    return Odds;
};