let express = require('express');
let moment = require('moment');
let router = express.Router();
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
router.get('/topSites', function (req, res, next) {
    //查询
    let pageNo = req.query.pageNo || 1;
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
    let categoryTypes = ["景点", "商圈", "小吃街", "酒店", "夜店"];
    let images = ["businessCircle.jpg", "snackStreet.jpg", "hotel.jpg", "nightClub.jpg"];
    let siteDesc = [
        "<span class='xs-hidden'>每一座城市都有一个最繁华、最吸引人的商圈，那里人流聚集，热闹非凡，集美食、玩耍、购物、娱乐于一体。</span>上海是最繁华的都市之一，这里是上海最有人气的商圈排名。",
        "<span class='xs-hidden'>上海在很多的眼中一直以来都是国际化、小资、时尚的代表，这里融汇了</span>世界各地的名牌、美食、小吃，当然也就造就了上海丰富的小吃街，这里是上海最有人气的小吃街排名。",
        "<span class='xs-hidden'>作为大都市，上海有着各种级别档次的酒店和旅馆。</span>上海酒店和旅馆分布广泛，几乎涵盖了所有商圈、景点，甚至住宅区。这里是上海最有人气的酒店排名。",
        "<span class='xs-hidden'>上海被誉为娱乐之都，来到这里的人，有这样的疑惑，晚上去哪里玩？特别是来了朋友，</span>想找个有特色的休闲场所，还费劲，上海有大大小小的酒吧，这里是上海最有人气的夜店排名。",
    ];
    page.siteType = categoryTypes[categoryType - 1];
    page.siteDesc = siteDesc[categoryType - 2];
    page.headline_img = images[categoryType - 2];
    scenicSpotService.count(bean).then(count => {
        page.totalCount = count;
        page.totalPage = (count / pageSize) === 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
        page.nextPage = (pageNo + 1) > page.totalPage ? page.totalPage : pageNo + 1;
        return scenicSpotService.findPage(bean, pageNo, pageSize);
    }).then(result => {
        result.forEach((item, index) => {
            if (item.star.indexOf("商户")) {
                item.star = item.star.replace("商户", "");
            }
            item.update_time = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
        });
        page.rows = result;
        return scenicSpotService.findPage(bean, 1, 8)
    }).then(result => {
        page.tops = result;
        return scenicSpotService.findTopSiteList(bean, 1, 21)
    }).then(result => {
        result.forEach((item, index) => {
            if (item.site_name.length > 10) {
                item.site_name = item.site_name.substring(0, 10);
            }
        });
        res.locals.topSite = result;
        res.locals.page = page;
        res.render("front/topSites");
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });
});

module.exports = router;
