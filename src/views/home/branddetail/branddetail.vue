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
      <div class="card">
        <img :src="data.pic_url" alt="" />
        <div class="title">
          <p>{{ data.name }}</p>
          <div class="line"></div>
        </div>
        <p class="des">{{ data.simple_desc }}</p>
      </div>
      <ul class="list">
          <li class="item" v-for="item in goodsList" :key="item.id">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p class="price">¥{{item.retail_price}}</p>
          </li>
      </ul>
      <div class="noneList" v-if="goodsList.length==0">数据库暂无数据...</div>
    </div>
  </div>
</template>

<script>
import { home, goods, brand, brandList } from "@/api/home";
export default {
  data() {
    return {
      // 品牌制造商下面的四个内容
      data: "",
      goodsList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    onClickLeft() {
      this.$router.back(1);
    },
    init() {
      brand({ id: this.$route.query.id }).then((res) => {
        console.log(res);
        this.data = res.data;
        this.goodsList = res.goodsList;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 50px;
  // height: auto;
}
.card {
  background-color: #fff;
  position: relative;
  width: 100%;
  img {
    width: 100%;
    height: 145px;
  }
  .des {
    font-size: 14px;
    padding:0 20px 20px;
  }
  .title {
    position: absolute;
    left: 50%;
    top: 20%;
    // height: 50px;
    transform: translateX(-50%);
    p {
      color: #fff;
      font-size: 18px;
      margin: 5px auto;
    }
    .line {
      width: 100%;
      height: 2px;
      background-color: #fff;
    }
  }
}
.list{
    width: 100%;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
}
.noneList{
    font-size: 16px;
}
.list .item{
    background-color: #fff;
    width:49.5%;
    margin-bottom: 2px;
    img{
        width: 150px;
        height: 150px;
    }
    .price{
        color:#b4282d ;
    }
}

</style>