module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define('document', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
                allowNull: false
        },
        fund: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        inventory: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        storage_unit: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        total_lists_num: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        additional_info: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        creator_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        creating_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        is_removed: {
            type: Sequelize.TINYINT,
            allowNull: false,
        },
        visible_mode: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    return Document;
}