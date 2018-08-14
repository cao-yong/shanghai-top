var express = require('express');
var router = express.Router();
const CONSTANT = require('../../common/Constant');
const scenicSpotService = require('../../service/ScenicSpotService');

/* GET home page. */
router.get('/', function (req, res, next) {
    //查询景区数据
    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 15;
    let siteName = req.query.siteName;
    let bean = {
        siteName: siteName,
        categoryType: 1
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
router.get('/information', function (req, res, next) {
    res.render('front/information', {title: 'Express'});
});
router.get('/ticket', function (req, res, next) {
    res.render('front/ticket', {title: 'Express'});
});
router.get('/scenery', function (req, res, next) {
    res.render('front/information', {title: 'Express'});
});
router.get('/about', function (req, res, next) {
    res.render('front/about', {title: 'Express'});
});

module.exports = router;
