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
          <p :class="{ undefault: address.is_default == 0 }">
            {{ address.name }}
          </p>
          <div v-if="address.is_default" class="moren">默认</div>
        </div>
        <div class="phone">
          <p>{{ address.mobile }}</p>
          <p>{{ address.address }}</p>
        </div>
        <div class="right"><img src="@/assets/images/arrow.png" alt="" /></div>
        <div></div>
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
      <van-row>
        <van-col span="6" class="pay">实付</van-col>
        <van-col span="10" class="price">¥{{ allPrise }}</van-col>
        <van-col span="8"
          ><van-button type="danger" class="btn">支付</van-button></van-col
        >
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
      address: "",
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
        this.address = res.address;
        console.log(address);
      });
    },
    onClickLeft() {
      this.$router.back(1);
    },
    goAddress() {
      this.$router.push("/address");
    },
  },
};
</script>

<style lang='scss' scoped>
.content {
  margin-top: 50px;
  .img {
    width: 100%;
    height: 10px;
    background: url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png")
      0 0 repeat-x #fff;
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
  font-size: 13px;
  margin-top: 5px;
}
.info,
.card {
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 5px;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
}

.van-row {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  border-radius: 4px;
  background-color: rgb(255, 255, 255, 0.9);
}
.address {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .left {
    width: 25%;
    display: flex;
    height: 65.34px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      margin: 5px;
    }
  }
  .phone {
    width: 55%;
  }

  .right {
    font-size: 18px;
    line-height: 66px;
    width: 20%;
    img {
      width: 8px;
      height: 15px;
    }
  }
}
.moren {
  border: 1px solid red;
  color: red;
  width: 55px;
}
.pay {
  text-align: center;
  font-size: 14px;
}

.price {
  text-indent: 30px;
  color: red;
  font-size: 14px;
}
.btn {
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
.undefault {
  height: 100%;
  line-height: 65.34px;
}
</style>