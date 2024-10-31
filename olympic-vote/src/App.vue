<template>
  <div>
    <router-link to="/LoginView">登录界面</router-link>
    <router-link to="/RegisterView">注册界面</router-link>
    <router-link to="/BasicMessage">基本信息</router-link>
    <router-link to="/VoteView">投票界面</router-link>
    <router-link to="/Dashboard">管理后台</router-link>
    <router-link to="/TestView">测试界面</router-link>

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

<style></style>
