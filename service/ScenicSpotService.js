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
        pageSize = pageSize < 10 ? 10 : pageSize;
        return new Promise(function (resovle, reject) {
            let sql = 'select * from top_site m where 1=1';
            if (bean && bean.siteName) {
                sql += ' and m.site_name like \'%' + bean.siteName + '%\'';
            }
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
    // 统计
    count(bean) {
        return new Promise(function (resovle, reject) {
            let sql = 'select count(1) count from top_site m where 1=1';
            if (bean && bean.siteName) {
                sql += ' and m.name like \'%' + bean.siteName + '%\'';
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

}

module.exports = new ScenicSpotService();