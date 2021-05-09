import { request } from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}


export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.oldPrice = itemInfo.oldPrice;
        this.newprice = itemInfo.price;
        this.realPrice = itemInfo.lowNowPrice;
        this.columns = columns;
        this.services = services;
        this.discount = itemInfo.discountDesc;

    }
}


export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.score = shopInfo.score;
        this.fans = shopInfo.cFans;
        this.goodsCount = shopInfo.cGoods;
        this.sells = shopInfo.cSells;
        this.name = shopInfo.name;
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

export function getRecommend() {
    return request({
        url: '/recommend'
    })
}