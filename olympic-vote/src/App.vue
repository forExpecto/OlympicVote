<template>
  <div>
    <router-link to="/LoginView">登录界面</router-link>
    <router-link to="/RegisterView">注册界面</router-link>
    <router-link to="/BasicMessage">基本信息</router-link>
    <router-link to="/VoteView">用户信息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
