<template>
  <div class="category-nav">
    <nav-bar class="home-nav"> <div slot="center">商品分类</div></nav-bar>

    <div class="category-felx">
      <category-left-nav
        @GetSelectTtem="getCategoryInfoItem"
        :categoryList="categoryList"
      ></category-left-nav>
      <category-right-nav :infoList="infoList"></category-right-nav>
    </div>
  </div>
</template>

<script>
import { getCategory, getCategoryInfo } from "network/category.js";
import NavBar from "components/common/navbar/NavBar.vue";
import CategoryLeftNav from "views/category/childComps/CategoryLeftNav.vue";
import CategoryRightNav from "views/category/childComps/CategoryRightNav.vue";
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "Category",
  data() {
    return {
      categoryList: [],
      infoList: [],
    };
  },
  components: {
    NavBar,
    CategoryLeftNav,
    CategoryRightNav,
    Scroll,
  },
  created() {
    this.getCategoryList();

    this.getCategoryInfoItem();
  },
  methods: {
    getCategoryList() {
      getCategory().then((res) => {
        // console.log(res);
        this.categoryList = res.data.category.list;
      });
    },
    getCategoryInfoItem(maitKey) {
      getCategoryInfo(maitKey).then((res) => {
        this.infoList = res.data.list;
      });
    },
  },
};
</script>

<style scope>
.home-nav {
  width: 100%;
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
}
.category-felx {
  display: flex;
  padding-top: 45px;
}
</style>