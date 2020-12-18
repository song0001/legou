<template>
  <div class="content">
    <van-search
      input-align="center"
      v-model="value"
      placeholder="商品搜索,共239款好物"
      @focus="goSearch"
    />
    <div class="box">
       
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          :title="item.name"
          v-for="item in categoryList"
          :key="item.id"
          replace
        />    
      </van-sidebar>  
      <!-- 分类商品 -->
      <div class="categoryList" v-for="item in goodsList" :key="item.id">
        <img :src="item.banner_url" alt="" />
        <van-divider>{{ item.name }}分类</van-divider>
        <ul class="goodsList">
          <li
            class="goodItem"
            @click="getGoods(item)"
            v-for="item in subList"
            :key="item.id"
          >
            <img :src="item.wap_banner_url" alt="" />
            <p>{{ item.name }}</p>
          </li>
          <li style="width: 72px"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {
  indexaction,
  categoryNav,
  goodsList,
  currentaction,
} from "@/api/category";
export default {
  data() {
    return {
      value: "",
      activeKey: "",
      //   分类导航数据获取
      categoryList: [],
      goodsList: [],
      subList: [],
      tabbarId: "1005000",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      indexaction().then((res) => {
        // console.log(res);
        this.categoryList = res.categoryList;
      });
      //   var tId=sessionStorage.getItem('tabbarId');
      //   var key=sessionStorage.getItem('activeKey')
      // if(tId){
      //   this.tabbarId=tId;
      //   console.log('1111111',this.tabbarId);
      // };
      // if(key){
      //   this.activeKey=key
      // }
      // 默认
      currentaction({
        id: this.tabbarId,
      }).then((res) => {
        // console.log(res);
        this.goodsList = res.data;
        this.subList = res.data.currentOne.subList;
      });
    },
    onChange(index) {
      // console.log(this.activeKey);
      var id = this.categoryList[index].id;
      // console.log(id);
      //  通过分类的id来查询分类列表数据
      // sessionStorage.setItem("tabbarId", id);
      //   sessionStorage.setItem("activeKey", this.activeKey);
      console.log(id);
      currentaction({
        id: id,
      }).then((res) => {
        // console.log(res);
        this.goodsList = res.data;
        // console.log(this.goodsList);
        this.subList = res.data.currentOne.subList;
        console.log(this.subList);
      });
    },

    // 通过分类的id来查询分类列表数据
    getGoods(item) {
      // console.log(item.id);
      // console.log(item.name);
      this.$router.push({ path: "/categorylist", query: { id: item.id } });
      // console.log(item.id);
      console.log(item);
    },
      // 点击跳转到搜索页面
    goSearch(){
      this.$router.push('/search')
    }
  },
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.content {
  background: #fff;
}
.box {
  display: flex;
  justify-content: space-between;
  .categoryList {
    flex: 1;
    img {
      width: 263px;
      height: 111px;
    }
    .goodsList {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}

.goodsList .goodItem {
  width: fit-content;
  img {
    width: 72px;
    height: 72px;
  }
}
</style>