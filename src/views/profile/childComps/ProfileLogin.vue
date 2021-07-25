<template>
  <div>
    <div class="login-im" @click="userLogin">
      <img src="~assets/img/profile/login.jpeg" alt="" />
      <span>登录/注册</span>
    </div>
    <div class="title">请点击登录查看详细信息</div>
  </div>
</template>

<script>
export default {
  methods: {
    userLogin() {
      this.$emit("userLogin");
    },
  },
};
</script>

<style scope>
.login-im {
  padding: 10px;
  border-bottom: 1px solid black;
}
.login-im img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.login-im span {
  font-size: 30px;
  font-weight: 700;
  display: inline-block;
  vertical-align: middle;
  margin-left: 60px;
}
.title {
  font-weight: 700;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  color: red;
  margin-top: 40px;
}
</style>