const express = require('express');
let moment = require('moment');
const router = express.Router();
const CONSTANT = require('../../common/Constant');
const scenicSpotService = require('../../service/ScenicSpotService');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/search', function (req, res, next) {
    //查询景区数据
    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 15;
    let siteName = req.query.siteName;
    let bean = {
        siteName: siteName,
    };
    let page = {
        pageNo: pageNo,
        pageSize: pageSize,
        siteName: siteName,
        prePage: (pageNo - 1) <= 0 ? 1 : pageNo - 1,
    };
    scenicSpotService.count(bean).then(count => {
        page.totalCount = count;
        page.totalPage = (count / pageSize) === 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
        page.nextPage = (pageNo + 1) > page.totalPage ? page.totalPage : pageNo + 1;
        return scenicSpotService.findPage(bean, pageNo, pageSize)
    }).then(result => {
        res.locals.data = result;
        res.locals.page = page;
        res.render('front/index');
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });
});
router.get('/findMore', function (req, res, next) {
    //查询商圈数据
    let pageNo = req.query.pageNo || 2;
    let pageSize = req.query.pageSize || 4;
    let categoryType = req.query.categoryType;
    let bean = {
        categoryType: categoryType
    };
    let page = {
        pageNo: pageNo,
        pageSize: pageSize,
        prePage: (pageNo - 1) <= 0 ? 1 : pageNo - 1,
        categoryType: categoryType
    };
    scenicSpotService.count(bean).then(count => {
        page.totalCount = count;
        page.totalPage = (count / pageSize) === 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
        page.nextPage = (pageNo + 1) > page.totalPage ? page.totalPage : pageNo + 1;
        page.hasNext = pageNo < page.totalPage;
        return scenicSpotService.findPage(bean, pageNo, pageSize)
    }).then(result => {
        result.forEach((item, index) => {
            if (item.star.indexOf("商户")) {
                item.star = item.star.replace("商户", "");
            }
            item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss');
        });
        page.rows = result;
        return res.jsonp(page)
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });
});
module.exports = router;
