<template>
  <div class="cart1">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <scroll class="content">
      <div><cart-list></cart-list></div>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Scroll,
    CartList,
    NavBar,
    CartBottomBar,
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
      //   list: "cartList",
    }),
  },
};
</script>

<style scoped>
.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
.nav-bar {
  background-color: #fb7299;
  color: #ffffff;
}
.cart1 {
  height: 100vh;
}
</style>