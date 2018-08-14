'use strict';

let orm = require('./orm');

module.exports = orm.accountdb.define('top_site', {
    id: {
        field: 'id',
        type: orm.Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
        unique: true,
        get: function () {
            return this.getDataValue('id');
        },
        set: function (val) {
            this.setDataValue('id', val);
        }
    },
    url: {
        field: 'url',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('url');
        },
        set: function (val) {
            this.setDataValue('url', val);
        }
    },
    siteName: {
        field: 'site_name',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('siteName');
        },
        set: function (val) {
            this.setDataValue('siteName', val);
        }
    },
    siteId: {
        field: 'site_id',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('siteId');
        },
        set: function (val) {
            this.setDataValue('siteId', val);
        }
    },
    star: {
        field: 'star',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('star');
        },
        set: function (val) {
            this.setDataValue('star', val);
        }
    },
    regionName: {
        field: 'region_name',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('regionName');
        },
        set: function (val) {
            this.setDataValue('regionName', val);
        }
    },
    categoryName: {
        field: 'category_name',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('categoryName');
        },
        set: function (val) {
            this.setDataValue('categoryName', val);
        }
    },
    address: {
        field: 'address',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('address');
        },
        set: function (val) {
            this.setDataValue('address', val);
        }
    },
    imgUrl: {
        field: 'img_url',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('imgUrl');
        },
        set: function (val) {
            this.setDataValue('imgUrl', val);
        }
    },
    sort: {
        field: 'sort',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('sort');
        },
        set: function (val) {
            this.setDataValue('sort', val);
        }
    },
    createTime: {
        field: 'create_time',
        type: orm.Sequelize.DATE,
        allowNull: false,
        get: function () {
            return this.getDataValue('createTime');
        },
        set: function (val) {
            this.setDataValue('createTime', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});