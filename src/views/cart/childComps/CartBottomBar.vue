<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="checked-all"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span class="tooc">全选</span>
    </div>
    <div class="totalPrice">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "../../../components/content/checkButton/checkButton.vue";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // if (this.cartList.length === 0) {
      //   return false;
      // }
      return !this.cartList.filter((item) => !item.checked).length;
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (this.checkLength == 0) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  font-size: 13px;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
}
.check-content {
  padding-top: 10px;
  float: left;
  margin-left: 10px;
  align-items: center;
}
.tooc {
  font-size: 10px;
  display: inline-block;
  text-align: center;
  line-height: 10px;
  padding-left: 10px;
  padding-top: 5px;
}
.checked-all {
  float: left;
  align-items: center;
  line-height: 10px;
  text-align: center;
}
.totalPrice {
  font-size: 10px;
  float: left;
  padding: 11px 50px;
  text-align: center;
}
.calculate {
  width: 100px;
  float: right;
  padding: 10px 0;
  text-align: center;
  background-color: #fb7299;
  color: #ffffff;
}
</style>