<template>
  <div class="home">
   <van-button type="primary">主要按钮</van-button>
   <div class="box"></div>
   哈哈哈
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss" scoped>
  .box{
    width: 375px;
    height: 200px;
    background-color: red;
  }
</style>