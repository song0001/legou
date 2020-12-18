<template>
  <div>
    <div class="header">
<img src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" alt="">
<p>我的</p>
    </div>
      <van-grid :column-num="3">
        <van-grid-item  text="我的订单" />
        <van-grid-item  text="优惠券" />
        <van-grid-item  text="我的足迹" />
        <van-grid-item  text="我的收藏"  @click="goCollect" />
         <van-grid-item  text="地址管理" @click="goAddress"/>
          <van-grid-item  text="联系客服" />
           <van-grid-item  text="帮助中心" />
            <van-grid-item  text="意见反馈" @click="goFeedback" />

      </van-grid>
  </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goCollect(){
            this.$router.push('/collect')
        },
        goAddress(){
             this.$router.push('/address')
        },
        goFeedback(){
             this.$router.push('/feedback')
        }
    }
};
</script>

<style lang="scss" scoped>
.header{
    box-sizing: border-box;
    padding:0 15px ;
    display: flex;
    width: 100%;
    height: 140px;
    background-color: #333;
align-items: center;
p{
    margin-left: 10px;
    color: #fff;
    font-size: 14px;
}
    img{
        width: 74px;
        height: 74px;
border-radius: 50%;
    }
}
.van-grid-item{
    height: 70px;
}
</style>