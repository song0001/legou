<template>
  <div>
    <van-nav-bar
      fixed
      title="乐购"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
    <div class="img"></div>
    <div class="address" @click="goAddress">
      <div class="left">
       <p>{{address.name}}</p> 
        <div v-if="address.is_default" class="moren" >
          默认
        </div>  
      </div>
      <div class="phone">
        <p>{{address.mobile}}</p>
        <p>{{address.address}}</p>
      </div>
      <div class="right">></div>
      <div>

      </div>
    </div>
      <div class="info">
        <p>商品合计:¥{{ allPrise }}</p>
        <p>运费 免运费</p>
        <p>优惠券 暂无</p>
      </div>
      <div class="card" v-for="item in goodsList" :key="item.id">
        <img :src="item.list_pic_url" alt="" />
        <p>{{ item.goods_name }}</p>
        <p>价格: ¥{{ item.retail_price }}</p>
        <p>数量x{{ item.number }}</p>
      </div>
      <van-row >
        <van-col span="4">实付</van-col>
        <van-col span="14">¥{{allPrise}}</van-col>
        <van-col span="6"><van-button type="danger">支付</van-button></van-col>
      </van-row>

    </div>
  </div>
</template>

<script>
import { detailAction, submitAction } from "@/api/order";
export default {
  data() {
    return {
      goodsList: [],
      allPrise: "",
    address:''
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      detailAction({
        openId: localStorage.getItem("openId"),
        addressId: this.$route.query.id,
      }).then((res) => {
        console.log(res);
        this.goodsList = res.goodsList;
        this.allPrise = res.allPrise;
        this.address=res.address
      });
    },
    onClickLeft() {
      this.$router.back(1);
    },
    goAddress(){
      this.$router.push('/address')
    }
  
  },
};
</script>

<style lang='scss' scoped>
.content {
  margin-top: 50px;
  .img{
    width: 100%;
    height: 10px;
      background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png') 0 0 repeat-x #fff;
  }
}
.card {
  width: 100%;
  img {
    width: 63px;
    height: 63px;
  }
}
.info {
  background-color: #fff;
}
.card {
  background-color: #fff;
}

.van-button{
  width: 100%;
}
.van-row {
 position: fixed;
 bottom: 0;
 width: 100%;
 line-height: 43px;
 text-align: left;
}
.address{
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
    .left{
      width: 20%;
    }
    .phone{
      width: 50%;
    }
  .right{
    font-size: 18px;
   line-height: 66px;
   width: 30%;
  }
}
.moren{
  border: 1px solid red ;
  color: red;
  width: 55px; ;
}
</style>