<template>
  <div>
    <van-nav-bar
      fixed
      title="乐购"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="banner">
      <img
        src="http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png"
        alt=""
      />
    </div>
    <!-- 分类 -->
    <div class="sortnav">
      <div :class="prices=='zh'?'active':''" @click="getZh">综合</div>
      <div class="price-t" @click="getPrice">
        <div :class="prices=='jg'?'active price-l':'price-l'">
    价格
        </div>
        
        <div class="icon-box">
          <van-icon class="icon-top" name="arrow-up" />
          <van-icon class="icon-bottom" name="arrow-down" />
        </div>
      </div>
      <div :class="prices=='sort'?'active':''" @click="getSort">分类</div>
    </div>
    <!-- 分类列表 -->
    <ul class="sortlist">
      <li v-for="item in data" :key="item.id">
        <img :src="item.list_pic_url" alt="" />
        <p>{{ item.name }}</p>
        <p class="price">¥{{ item.retail_price }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { home, goods, brand, brandList } from "@/api/home";
export default {
  data() {
    return {
      data: "",
      prices:'',
      order:'',
      num:0
    };
  },
  created() {
    this.init();
  },

  methods: {
    onClickLeft() {
      this.$router.back(1);
    },
    onLoad() {
      this.init();
    },
    init() {
      goods({
        isHot: this.$route.query.isHot,
        isNew: this.$route.query.isNew,
        order:this.order
      }).then((res) => {
        console.log(res);
        this.data = res.data;
      });
    },
    getZh(){
      this.prices='zh'
      this.order=''
        this.init()
    }, 
    getPrice(){
      this.prices='jg'  
     this.num++
      if(this.num%2==0){
        this.order='desc'  
      }else{
        this.order='asc'
  
      }
      this.init()
    
    },
    getSort(){
      this.order=''
      this.prices='sort'
        this.init()
    }
  },
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  margin-top: 50px;

  img {
    width: 100%;
    height: 140px;
  }
}
.active {
  color: #b4282d;
}
.sortnav {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #fff;
  justify-content: space-between;

  div {
    width: 33%;
    height: 100%;
    text-align: center;
    line-height: 40px;
  }
}
.sortlist {
  margin-top: 3px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  li {
    background-color: #fff;
    width: 49.5%;
    margin-bottom: 2px;
    .price {
      color: #b4282d;
    }
  }
  img {
    width: 150px;
    height: 150px;
  }
}
.price-t{
  position: relative;
  line-height: 40px;
   .price-l{
  position: absolute;
  top: 0;
  left: 28px;
  }
}
.price-t div {
  display: inline-block;
  height: 100%;
 
}
.icon-box{
 padding-top:8px;
 box-sizing: border-box;
 position: absolute;
 top: 0;
 right: 33px;
}
.icon-top,
.icon-bottom {
  display: block;
}
.icon-bottom {
  margin-bottom: 1px;
}
</style>