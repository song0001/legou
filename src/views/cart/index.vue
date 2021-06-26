<template>
  <div>
    <div class="content">
      <div class="header">
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
      <!-- 商品卡片列表 -->
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
      >
        <van-swipe-cell v-for="(item,index) in data" :key="item.id">
          <van-checkbox
            :name="item.goods_id"
            checked-color="#ee0a24"
            @click="checkedOne(item)"
          ></van-checkbox>
          <div class="info">
            <img :src="item.list_pic_url" alt="" />
            <div class="left">
              <p>{{ item.goods_name }}</p>
              <p class="price">¥{{ item.retail_price }}</p>
            </div>
            <div class="right">x{{ item.number }}</div>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="delGoods(item,index)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
      <!-- 下单 -->
      <div class="order">
        <van-checkbox
          checked-color="#ee0a24"
          v-model="isChecked"
          @click="checkAll"
        >
          全选</van-checkbox
        >
        <span class="pri">¥{{ totalPrice }}</span>
        <van-button type="danger" @click="goOrder">下单</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteAction, cartList, addCart } from "@/api/cart";
import { detailAction, submitAction } from "@/api/order";
import Vue from "vue";
import { Toast } from "vant";
import { Dialog } from "vant";

Vue.use(Toast);
export default {
  data() {
    return {
      // 全选反选
      isChecked: false,
      result: [],
      data: "",
      total: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      cartList({ openId: localStorage.getItem("openId") }).then((res) => {
        // console.log(res);
        this.data = res.data;
      });
    },

    // 全选反选
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(this.isChecked);
    },
    // 单选
    checkedOne(item) {
      if (this.result.length == this.data.length) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
      console.log(this.result);
    },
    goOrder() {
      if (this.result.length == 0) {
        Toast("请选择商品");
      } else {
        // 提交订单
        submitAction({
          allPrise: this.total,
          goodsId: `${this.result}`,
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          console.log(res);
        });
        this.$router.push("/order");
      }
    },
    // 删除购物车商品
    delGoods(item,index) {
      Dialog.confirm({
        title: "删除",
        message: "确定要删除吗",
      })
        .then(() => {
          deleteAction({ id: item.id }).then((res) => {
          //  Toast("删除成功");
          this.result.splice(index,1)
        if(this.result.length==0){
        this.isChecked=false
        }
          this.init();  
          });
        })
        .catch(() => {
          // on cancel
        });
         console.log(this.result);
    },
  },
  computed: {
    totalPrice() {
      var num = 0;
      this.result.forEach((item) => {
         var items=this.data.find(el=>item==el.goods_id)  
         if(items){
           num += items.number * items.retail_price;     
         }  
      });
      this.total = num;
      return num;
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
}
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.van-swipe-cell {
  position: relative;
  background-color: #fff;
  margin-bottom: 3px;
  // height: 146px;
  overflow: hidden;
  padding: 40px auto;
}
.info {
  font-size: 13px;
  height: 100px;
  .left,
  .right {
    height: 100%;
    display: inline-block;
    text-align: left;
    p{
      height: 50px;
      margin: 0;
      line-height: 50px;
      text-align: center;
    }
  }
  width: 100%;
  img {
    position: absolute;
    top: 50%;
    left: 50px;
    height: 63px;
    width: 63px;
    transform: translateY(-50%);
  }
}
.van-checkbox {
  float: left;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
}
.right {
  position: absolute;
  right: 50px;
  top: 50%;
}
.order {
  background-color: #fff;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 50px;
  .van-button {
    float: right;
  }
  .pri {
    display: inline-block;
    height: 43px;
    line-height: 43px;
    color: red;
  }
}
.content {
  margin-bottom: 50px;
}
</style>