<template>
  <div class="detail">
    <child-comps
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></child-comps>
    <scroll class="content" ref="scroll" @scroll="butScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar
      @addCart="addToCart"
      class="detail-bottom"
    ></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import ChildComps from "./childComps/childComps.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import Scroll from "components/common/scroll/Scroll.vue";
import { debouce } from "../../common/utils";
import BackTop from "../../components/content/backTop/BackTop.vue";

export default {
  name: "Detail",
  components: {
    ChildComps,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: true,
    };
  },
  created() {
    // 保存传入的id
    this.iid = this.$route.params.iid;
    // 根据id请求数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      console.log(res);
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 利用防抖函数来减少数据多次请求
      this.getThemeTopY = debouce(() => {
        this.$nextTick(() => {
          this.themeTopY = [];
          this.themeTopY.push(0);
          this.themeTopY.push(this.$refs.param.$el.offsetTop - 44);
          this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
          this.themeTopY.push(this.$refs.recommends.$el.offsetTop - 44);
          this.themeTopY.push(Number.MAX_VALUE);
          // console.log(this.themeTopY);
        });
      });

      //  这样写图片还没加载出来，所以位置会不对
      // this.$nextTick(() => {
      //   this.themeTopY = [];
      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
      // });
    });
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300);
    },
    butScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopY.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 显示是否回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // this.$store.dispatch("addCart", product);
      // this.$store.commit("addCart", product);

      this.$store.dispatch("addCart", product).then((res) => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.show(res, 2000);
        // console.log(this.$toast);
      });
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  background-color: #fff;
  height: calc(100% - 44px - 49px);
}
.detail-bottom {
  position: absolute;
}
</style>