<template>
  <div class="category-left">
    <div
      class="left-item"
      :categoryList="categoryList"
      v-for="(item, index) in categoryList"
      :key="index"
      @click="itemClick(item, index)"
      :class="{ active: clickIndex == index }"
    >
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clickIndex: 0,
    };
  },
  props: {
    categoryList: {
      type: Array,
      default: [],
    },
  },
  created() {
    this.itemClick(0);
  },
  methods: {
    itemClick(item, index) {
      this.clickIndex = index;
      if (item.maitKey == undefined) {
        this.$emit("GetSelectTtem", 3627);
      } else {
        this.$emit("GetSelectTtem", item.maitKey);
      }
    },
  },
};
</script>
<style scoped>
.category-left {
  display: flex;
  width: 20%;
  background-color: #f6f6f6;
  flex-direction: column;
}
.left-item {
  height: 50px;
  line-height: 50px;
}
.left-item p {
  width: 100%;
  text-align: center;
  color: rgb(100, 100, 100);
  display: inline-block;
}
.left-item.active {
  background-color: white;
}
.left-item.active p {
  color: red;
  font-weight: 600;
}
</style>