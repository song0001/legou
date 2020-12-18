<template>
  <div>
       <van-nav-bar
      fixed
      title="分类详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 好睡眠图 -->
  <div class="banner">
<img src="http://yanxuan.nosdn.127.net/75c55a13fde5eb2bc2dd6813b4c565cc.jpg" alt="">
<img src="http://yanxuan.nosdn.127.net/e27e1de2b271a28a21c10213b9df7e95.jpg" alt="">
<img src="http://yanxuan.nosdn.127.net/9d413d1d28f753cb19096b533d53418d.jpg" alt="">
<img src="http://yanxuan.nosdn.127.net/64b0f2f350969e9818a3b6c43c217325.jpg" alt="">
<img src="http://yanxuan.nosdn.127.net/a668e6ae7f1fa45565c1eac221787570.jpg" alt="">
<img src="http://yanxuan.nosdn.127.net/0d4004e19728f2707f08f4be79bbc774.jpg" alt="">
<img src="http://yanxuan.nosdn.127.net/79ee021bbe97de7ecda691de6787241f.jpg" alt="">
<p>专题推荐</p>
  </div>
<ul class="topicList">
    <li class="topicItem" v-for="item in recommendList" :key="item.id">
        <img :src="item.scene_pic_url" alt="">
        <p>{{item.title}}</p>
    </li>
</ul>



  </div>
</template>

<script>
import {detailaction} from "@/api/topic";
export default {
  data() {
    return {
        recommendList:[]
    };
  },
  created(){
this.init()
  },
  methods:{
       onClickLeft() {
      this.$router.back(1);
    },
      init(){
          detailaction({id:this.$route.query.id}).then(res=>{
    console.log(res);
    this.recommendList=res.recommendList
          })
      }
  }
};
</script>

<style lang="scss" scoped>
    .banner{
        margin-top:50px;
        img{
            display: block;
        width: 100%;
        }
        p{
            padding: 10px;
        color: #999;
        font-size: 16px;
        }
        
    }
    .topicList{
        width: 100%;
padding: 10px;
 box-sizing: border-box;
        .topicItem{
            background-color: #fff;
            width: 100%;
           padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
            img{
                width: 100%;
                height: 140px;
            }
        }
    }
</style>