<template>
  <div>
    <van-nav-bar
      fixed
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 导航栏 -->
    <van-tabs @click="onClick" v-model="active" animated>
      <van-tab v-for="item in categoryNav" :title="item.name" :key="item.id">
        <!-- 内容 -->
        <div class="content">
          <div class="title">
            <p>{{ currentNav.name }}</p>
            <p class="des">{{ currentNav.front_desc }}</p>
          </div>
          <ul>
            <li v-for="item in data" :key="item.id" @click="goGoods(item)">
              <img :src="item.list_pic_url" alt="" />
              <p>{{ item.name }}</p>
              <p class="price">¥{{ item.retail_price }}</p>
            </li>
          </ul>
          <p v-if="data.length == 0">数据库暂无数据...</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
import {
  indexaction,
  categoryNav,
  goodsList,
  currentaction,
} from "@/api/category";
export default {
  data() {
    return {
      active: "",
      categoryNav: [],
      currentNav: "",
      data: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 获取导航数据
      categoryNav({ id: this.$route.query.id }).then((res) => {
        // console.log(res);
        this.categoryNav = res.navData;
        this.currentNav = res.currentNav;
        console.log(this.categoryNav);
        this.active = this.categoryNav.findIndex(
          (item) => item.id == this.$route.query.id
        );
        console.log(this.active);
      });
      //   获取内容
      goodsList({ categoryId: this.$route.query.id }).then((res) => {
        console.log(res);
        this.data = res.data;
      });
    },
    onClick(index) {
      // console.log(index);
      // 导航栏分类对应的分类id
      var id = String(this.categoryNav[index].id);
      // console.log(id);
      goodsList({ categoryId: id }).then((res) => {
        // console.log(res);
        this.data = res.data;
        this.currentNav = res.currentNav;
        // console.log(this.categoryNav);
      });
    },
    onClickLeft() {
      Toast("返回");
      // this.$router.push("/category");
      this.$router.back(1);
    },
    
       // 点击商品跳转
    goGoods(item) {
      this.$router.push({ path: "/goods", query: { id: item.id } });
    }
  },
};
</script>
<style lang="scss">
#nav {
  padding-bottom: 0 !important;
}
.van-tabs--line .van-tabs__wrap {
  margin-top: 47px;
}
</style>
<style lang="scss" scoped>
.content {
  .title {
    p {
      padding: 5px;
    }
    .des{
    color: #999;
    }
    margin-bottom: 10px;
    background-color: #fff;
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 49%;
      padding: 1px;
      background-color: #fff;
      margin-bottom: 2px;

      img {
        width: 150px;
        height: 150px;
      }
      .price {
        color: #b4282d;
        font-size: 14px;
      }
    }
  }
}
</style>