<template>
  <div class="content">
    <van-nav-bar
      fixed
      title="乐购"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item.id"
        ><img :src="item.img_url" alt=""
      /></van-swipe-item>
    </van-swipe>
    <div class="swiper-b">
      <span>
        <img
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png"
          alt=""
        />三十天无忧退货</span
      >
      <span>
        <img
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png"
          alt=""
        />48小时快速退款</span
      >
      <span>
        <img
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png"
          alt=""
        />满88元免邮费</span
      >
    </div>
    <div class="infoList">
      <p>{{ info.name }}</p>
      <p>{{ info.goods_brief }}</p>
      <p>¥{{ info.retail_price }}</p>
    </div>
    <!-- 弹出层 -->
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '40%' }"
    >
      <div class="popupCard">
        <div class="card-top">
          <img :src="info.primary_pic_url" alt="" />
          <div class="desCard">
            <p class="price">价格¥{{ info.retail_price }}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <!-- 计数器 -->
        <div class="card-bottom">
          数量
          <van-stepper v-model="value" />
        </div>
      </div>
    </van-popup>
    <!-- 商品参数 -->
    <ul class="attribute" v-if="attribute.length !== 0">
      <p>商品参数</p>
      <li
        class="attribute_list"
        v-for="(item, index) in attribute"
        :key="index"
      >
        <span>{{ item.name }}:</span>
        <span>{{ item.value }}</span>
      </li>
    </ul>
    <!-- 商品介绍图 -->
    <div class="imgList" v-html="info.goods_desc"></div>
    <!-- 常见问题 -->
    <ul class="issue">
      <van-divider>常见问题</van-divider>
      <li v-for="item in issue" :key="item.issue">
        <p class="question">{{ item.question }}</p>
        <p class="answer">{{ item.answer }}</p>
      </li>
    </ul>
    <!-- 大家都在看 -->
    <div>
      <van-divider>大家都在看</van-divider>
      <ul class="see">
        <li v-for="item in productList" :key="item.id" @click="goGoods(item)">
          <img :src="item.list_pic_url" alt="" />
          <p>{{ item.name }}</p>
          <p>¥{{ item.retail_price }}</p>
        </li>
      </ul>
    </div>
    <!-- 购物车导航 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="star"
        v-model="isRed"
        :text="isRed ? '已收藏' : '收藏'"
        :color="isRed ? '#ff5000' : '#000'"
        @click="addCollect"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="getNumber"
        @click="goCart"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="openCard"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { detailaction } from "@/api/goods";
import { addcollect } from "@/api/collect";
import { addCart, cartList } from "@/api/cart";
export default {
  data() {
    return {
      banner: [],
      show: false,
      // 计数器的值
      value: null,
      info: "",
      attribute: [],
      issue: [],
      productList: [],
      isRed: false,
      data: [],
     
    };
  },
  created() {
    this.init();
    // this.getList()
  },
  methods: {
    onClickLeft() {
      this.$router.back(1);
    },
    init() {
      var openId = localStorage.getItem("openId");
      // console.log(openId);

      detailaction({ id: this.$route.query.id, openId: openId }).then((res) => {
        // console.log(res);
        this.banner = res.gallery;
        this.info = res.info;
        this.attribute = res.attribute;
        this.issue = res.issue;
        this.productList = res.productList;
      });

         // 计算数量 先获取购物车列表
        cartList({ openId: localStorage.getItem("openId") }).then((res) => {
          // console.log(res);
          this.data = res.data;
        });
    },
    showPopup() {
      this.show = !this.show;
    },
    // 大家都在看 点击里面的商品 跳转到当前页面 只改面商品id
    goGoods(item){
// console.log(item.id);
  detailaction({ id:item.id,openId:localStorage.getItem("openId")}).then((res) => {
        // console.log(res);
        this.banner = res.gallery;
        this.info = res.info;
        this.attribute = res.attribute;
        this.issue = res.issue;
        this.productList = res.productList;
      });
this.$router.push({path:'/goods',query: { id: item.id }})
    },
    // 点击添加收藏
    addCollect() {
      this.isRed = !this.isRed;
      // console.log(this.$route.query.id);
      addcollect({
        goodsId: this.$route.query.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
      });
    },
    // 点击加入购物车
    addCart() {
      // 打开弹出层
      if (!this.show) {
        this.show = true;
      } else {
        // 添加购物车
        addCart({
          goodsId: this.$route.query.id,
          number: this.value,
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          // console.log(res);
          cartList({ openId: localStorage.getItem("openId") }).then((res) => {
          console.log(res);
          this.data = res.data;
        });
        });

     
      }
    },
    // 点击立即购买
    openCard() {
      this.show = true;
    },
    // 点击购物车
    goCart() {
      this.$router.push("/cart");
     
    },
  },

  computed: {
    // 购物车小标数量
    getNumber() {
      var sum = 0;
      this.data.forEach((item) => {
        sum += item.number;
      });
      // this.num=sum
      return sum
    },
  },
};
</script>

<style lang="scss">
.imgList {
  width: 100%;
  p {
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
      float: left;
    }
  }
}
</style>
<style lang='scss' scoped>
.van-swipe {
  margin-top: 50px;
  width: 100%;
  img {
    width: 100%;
  }
}
.swiper-b {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f4f4f4;
}
.infoList {
  background-color: #fff;
  p:nth-child(1) {
    font-size: 16px;
  }
  p:nth-child(2) {
    color: #999;
  }
  p:nth-child(3) {
    color: #b4282d;
    font-size: 14px;
  }
}
.popupCard {
  padding: 10px;

  img {
    float: left;
    width: 88px;
    height: 88px;
  }
  .card-top {
    overflow: hidden;
    .desCard {
      float: left;
      margin-left: 20px;
      .price {
        color: red;
      }
    }
  }
  .card-bottom {
    margin-top: 20px;
    text-align: left;
  }
}
.attribute {
  background-color: #fff;
  .attribute_list {
    background-color: #f7f7f7ff;
    padding: 10px 20px;
    width: 80%;
    margin: 5px auto;
  }
}
.issue {
  background-color: #fff;
  li {
    padding: 0 20px;
  }
  .question {
    font-size: 14px;

    .answer {
      color: #787878;
    }
  }
}
.see {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    img {
      width: 151px;
      height: 151px;
    }
    background-color: #fff;
    width: 49.5%;
    margin-bottom: 2px;
  }
}
.van-goods-action {
  z-index: 9999;
}
.active {
  background-color: red;
}
</style>