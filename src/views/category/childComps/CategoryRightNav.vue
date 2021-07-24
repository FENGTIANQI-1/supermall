<template>
  <div class="right-nav">
    <div class="category-item" v-for="(item, index) in infoList" :key="index">
      <a :href="item.link">
        <img class="category-item-img" :src="item.image" alt="" />
        <div class="category-item-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.InfoList);
  },
  props: {
    infoList: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.right-nav {
  flex-wrap: wrap;
  width: 78%;
  padding-left: 40px;
  display: flex;
  /* flex-direction: column; */
}
.category-item {
  width: 30%;
}
.category-item a {
  display: block;
}
.category-item-img {
  width: 100%;
}
.category-item-text {
  text-align: center;
}
</style>