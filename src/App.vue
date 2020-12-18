<template>
  <div id="app">
    <div id="nav">
      <router-view :key="$route.query.id"/>
      <!-- 组件复用跳转同一页面 加上 -->
      <!-- :key="$route.query.id"  -->
      <van-tabbar route v-if="this.$route.meta.isShow">
        <van-tabbar-item replace icon="wap-home-o" to="/home" 
          >首页</van-tabbar-item
        >
        <van-tabbar-item replace icon="description" to="/topic">专题</van-tabbar-item>
        <van-tabbar-item replace  icon="apps-o" to="/category">分类</van-tabbar-item>
        <van-tabbar-item replace icon="shopping-cart-o" to="/cart"
          >购物车</van-tabbar-item
        >
        <van-tabbar-item replace icon="friends-o" to="/my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isTabShow:true
    };
  },
  created(){
        var openId ='18337351522';
    localStorage.setItem("openId", openId);
  },
  // 监听路由,控制tabbar显示隐藏
  // watch:{
  //   $route() {
  //     if (!this.$route.meta.isShow) {
  //       // console.log(this.$route.meta);
  //       this.isTabShow = false;
  //     } else {
  //       this.isTabShow = true;
  //     }
  //   },
  // }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding-bottom: 60px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
