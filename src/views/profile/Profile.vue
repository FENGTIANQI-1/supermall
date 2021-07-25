<template>
  <div>
    <nav-bar class="home-nav">
      <template v-slot:center> 我的文档 </template>
    </nav-bar>
    <profile-login @userLogin="userLogin" class="profile-nav"></profile-login>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import ProfileLogin from "./childComps/ProfileLogin.vue";
export default {
  components: {
    NavBar,
    ProfileLogin,
  },
  methods: {
    userLogin() {
      console.log("1");
      this.$router.push("/login");
    },
  },
};
</script>

<style scope>
.home-nav {
  position: fixed;
  width: 100%;
  background-color: var(--color-tint);
}
.profile-nav {
  padding-top: 50px;
}
</style>