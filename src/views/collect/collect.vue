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

  <h2>我的收藏</h2>
<ul class="collect">
    <li v-for="item in collectGoodsList" :key="item.id" @click="goGoods(item)">
        <img :src="item.list_pic_url" alt="">
        <p >{{item.name}}</p>
         <p class="price">¥{{item.retail_price}}</p>
    </li>
</ul>
    </div>
  </div>
</template>

<script>
import {listAction,addcollect} from '@/api/collect'
export default {
  data() {
    return {
        collectGoodsList:[]
    };
  },
  created(){
      this.init()
  },
  methods: {
    onClickLeft() {
      this.$router.back(1);
    },
    init(){
        listAction({openId: localStorage.getItem("openId")}).then(res=>{
            console.log(res);
            this.collectGoodsList=res.collectGoodsList
        })
    },
    goGoods(item){
          this.$router.push({ path: "/goods", query: { id: item.id } });
    }
  },
};
</script>

<style lang='scss' scoped>
.content{
    margin-top: 50px;
  
   
    h2{
          background-color: #fff;
           padding: 4px;
           margin: 0 auto 3px;
    }
}
.collect{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    li{
width: 49.5%;
margin-bottom: 2px;
background-color: #fff;
img{
    width: 150px;
    height: 150px;
}
.price{
    color: red;
}
    }
}
</style>