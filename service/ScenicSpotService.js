/**
 * Created by yong.cao on 18/8/14.
 */
'use strict';
let orm = require('../model/orm');
let BaseService = require('./BaseService');
let topSizte = require('../model/TopSite');

class ScenicSpotService extends BaseService {

    constructor() {
        super();
    }

    //持久化资源module
    save(bean) {
        return super.save(topSizte, bean);
    }

    //更新资源module
    update(bean) {
        return super.update(topSizte, bean);
    }

    //删除资源module
    delete(id) {
        return super.destroy(topSizte, id);
    }

    //查询分页
    findPage(bean, pageNo, pageSize) {
        pageNo = pageNo < 1 ? 1 : pageNo;
        pageSize = pageSize < 4 ? 4 : pageSize;
        return new Promise(function (resovle, reject) {
            let siteName;
            let where = {};
            where.is_deleted = 'N';
            if (bean && bean.categoryType) {
                where.category_type = bean.categoryType;
            }
            if (bean && bean.siteName) {
                siteName = bean.siteName.replace(/(^\s*)|(\s*$)/g, "");
                where.site_name = {
                    like: '%' + siteName + '%',
                }
            }
            topSizte.findAll({
                where: where,
                offset: ((pageNo - 1) * pageSize),
                limit: pageSize,
                order: 'sort'
            }).then(result => {
                resovle(result);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }

    // 统计
    count(bean) {
        return new Promise(function (resovle, reject) {
            let sql = 'select count(1) count from top_site m where is_deleted=\'N\'';
            if (bean && bean.siteName) {
                sql += ' and m.site_name like \'%' + bean.siteName + '%\'';
            }
            if (bean && bean.categoryType) {
                sql += ' and m.category_type =' + bean.categoryType;
            }
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
                resovle(result[0].count);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }

    //查询推荐地点集合
    findTopSiteList(bean, pageNo, pageSize) {
        pageNo = pageNo < 1 ? 1 : pageNo;
        pageSize = pageSize < 10 ? 10 : pageSize;
        return new Promise(function (resovle, reject) {
            let sql = 'select site_name from top_site m where is_deleted=\'N\'';
            if (bean && bean.categoryType) {
                sql += ' and m.category_type =' + bean.categoryType;
            }
            sql += ' order by m.sort';
            sql += ' limit ' + ((pageNo - 1) * pageSize) + ',';
            sql += pageSize;
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
                resovle(result);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }

}

module.exports = new ScenicSpotService();