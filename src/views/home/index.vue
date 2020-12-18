<template>
  <div class="home">
    <div class="header">
      <span class="address" @click="cityMap">{{ city }}</span>
      <van-search class="search" v-model.trim="value" placeholder="搜索商品" @focus="goSearch"/>
    </div>
    <div id="allmap"></div>
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类 -->
    <ul class="channel">
      <li v-for="item in channel" :key="item.id" @click="category(item)">
        <img :src="item.icon_url" alt="" />
        <p>{{ item.name }}</p>
      </li>
    </ul>
    <!-- 品牌直供 -->
    <div class="bar">
      <p class="p1" @click="getBrandlist">品牌制造商直供</p>
      <ul class="brandList">
        <li
          v-for="item in brandList"
          :key="item.id"
          @click="goBranddetail(item)"
        >
          <img :src="item.new_pic_url" alt="" />
          <p class="t1">{{ item.name }}</p>
          <p class="t2">{{ item.floor_price }}元起</p>
        </li>
      </ul>
    </div>
    <!-- 新品首发 -->
    <div class="bgnew" @click="goNewgoods">
      <p>新品首发</p>
      <p class="p1">查看全部</p>
    </div>
    <div class="newGood">
      <ul class="newGoods">
        <li v-for="item in newGoods" :key="item.id" @click="goGoods(item)">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="des">{{ item.goods_brief }}</p>
          <p class="price">¥{{ item.retail_price }}</p>
        </li>
      </ul>
    </div>

    <!-- 人气推荐 -->
    <div class="bgnew bgtopic" @click="goHotgoods">
      <p>人气推荐,好物精选</p>
      <p class="p1">查看全部</p>
    </div>
    <div class="newGood">
      <ul class="newGoods">
        <li v-for="item in hotGoods" :key="item.id"  @click="goGoods(item)">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="des">{{ item.goods_brief }}</p>
          <p class="price">¥{{ item.retail_price }}</p>
        </li>
      </ul>
    </div>

    <!-- 专题精选 -->
    <div class="topList">
      <div class="title">
        <span>专题精选</span>
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul class="wraper">
          <li
            v-for="item in topicList"
            :key="item.id"
            @click="goTopicDetail(item)"
          >
            <img :src="item.item_pic_url" alt="" />
            <div class="bot">
              <div class="left">
                <p class="name">{{ item.title }}</p>
                <p class="des">{{ item.subtitle }}</p>
              </div>
              <div class="price">{{ item.price_info }}元起</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- newCategoryList分类 -->
    <div class="newCategoryList">
      <ul class="list1">
        <li class="item1" v-for="item in newCategoryList" :key="item.id">
          <p class="title">{{ item.name }}好物</p>
          <ul class="list2">
            <li class="item2" v-for="i in item.goodsList" :key="i.id"  @click="goGoods(i)">
              <img :src="i.list_pic_url" alt="" />
              <p class="name">{{ i.name }}</p>
              <p class="price">¥{{ i.retail_price }}</p>
            </li>
            <li class="item2-more item2" @click="category(item)">
              <p>{{ item.name }}好物</p>
              <img src="../../assets/images/icon_go_more.png" alt="" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// 请求地址
import { home, goods, brand, brandList } from "@/api/home";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      city: "",
      value: "",
      //   banner图
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
    };
  },
  computed: {
    ...mapState(["cityInfo"]),
  },
  methods: {
    cityMap() {
      this.$router.push("/home/city");
    },
    // 请求首页数据
    init() {
      home().then((res) => {
        // console.log(res);
        (this.banner = res.banner),
          (this.channel = res.channel),
          (this.brandList = res.brandList);
        this.newGoods = res.newGoods;
        this.hotGoods = res.hotGoods;
        this.topicList = res.topicList;
        this.newCategoryList = res.newCategoryList;
      });
    },
    // 居家
    category(item) {
      console.log(item.id);
      this.$router.push({ path: "/categorylist", query: { id: item.id } });
    },
    // 点击品牌直供
    getBrandlist() {
      this.$router.push("/brandlist");
    },
    goBranddetail(item) {
      this.$router.push({ path: "/branddetail", query: { id: item.id } });
    },
    // 点击新品首发 查看全部图
    goNewgoods() {
      this.$router.push({ path: "/newgoods", query: { isNew: 1 } });
    },
    goHotgoods() {
      this.$router.push({ path: "/newgoods", query: { isHot: 1 } });
    },
    // 点击跳转到topic 详情页面
    goTopicDetail(item) {
      this.$router.push({ path: "/topicdetail", query: { id: item.id } });
      // console.log(item);
    },
    // 点击商品跳转
    goGoods(item) {
      this.$router.push({ path: "/goods", query: { id: item.id } });
    },
    // 点击跳转到搜索页面
    goSearch(){
      this.$router.push('/search')
    }
  },
  created() {
    this.init();
  },
  mounted() {
    if (this.cityInfo.city) {
      var map = new BMap.Map("allmap");
      map.centerAndZoom(
        new BMap.Point(this.cityInfo.point.lng, this.cityInfo.point.lat),
        11
      );
      var mk = new BMap.Marker(this.cityInfo.point);
      map.addOverlay(mk);
      map.panTo(this.cityInfo.point);
      this.city = this.cityInfo.title;
      // console.log(this.city);
    } else {
      var _this = this;
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 12);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            // console.log(r);
            _this.city = r.address.city;
            // console.log(_this.city);
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );
    }
  },
};
</script>
<style lang="scss" scoped>
#allmap {
  width: 0;
  height: 0;
}
.address {
  display: inline-block;
  width: 25%;
  // height: 40px;
  // line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // @include over;
}
.header {
  position: fixed;
  width: 100%;
  z-index: 96;
  background-color: #fff;
  .search {
    display: inline-block;
    width: 70%;
  }
}
.my-swipe {
  margin-top: 53px;
}
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}

// 分类
.channel {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  li {
    width: 25%;
    height: 72px;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
.bar {
  background: #fff;
  .p1 {
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .brandList {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      position: relative;
      width: 50%;
      height: 116px;
      padding: 3px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
      .t1 {
        position: absolute;
        left: 10px;
        top: 10px;
      }
      .t2 {
        position: absolute;
        left: 10px;
        top: 40px;
      }
    }
  }
}
.bgnew {
  overflow: hidden;
  width: 100%;
  height: 122px;
  margin: 2px auto;
  background: url(../../assets/images/bgnew.png) no-repeat center;
  p {
    font-size: 16px;
    color: #8c9bae;
    margin-top: 30px;
  }
  .p1 {
    font-size: 11px;
    width: 90px;
    height: 24px;
    line-height: 24px;
    margin: 0 auto;
    background-color: #d8e4f0;
  }
}
.newGood {
  width: 100%;
  overflow: auto;
  .newGoods {
    display: flex;
    width: fit-content;
    height: 240px;
    li {
      width: 152px;
      height: 100%;
      border-right: 1px solid #eee;
      background-color: #fff;
      .name {
        margin-top: 10px;
        font-size: 15px;
        font-weight: 700;
      }
      .des {
        color: #8a8a8a;
      }
      .price {
        color: #9c3232;
        text-indent: -5em;
      }
      img {
        width: 140px;
        height: 140px;
      }
    }
  }
}
.bgtopic {
  margin-top: 10px;
  background: url(../../assets/images/bgtopic.png);
  p {
    color: #b1a279;
  }
  .p1 {
    background-color: #f4e9cb;
  }
}
.topList {
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  .title {
    height: 40px;
    line-height: 40px;
    .icon {
      vertical-align: -4px;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(../../assets/images/right.png) no-repeat center;
      background-size: cover;
    }
  }

  .list {
    width: 100%;
    overflow: auto;
    .wraper {
      display: flex;
      width: fit-content;
      li {
        padding: 10px;
        width: 287px;
        img {
          width: 100%;
          height: 162px;
          border-radius: 4px;
        }
        .bot {
          display: flex;
          justify-content: space-between;
        }
        .left {
          width: 80%;
          .name {
            font-weight: 700;
            font-size: 15px;
          }
        }
        .price {
          width: 20%;
          margin-top: 10px;
          color: #9d3230;
        }
      }
    }
  }
}

.newCategoryList {
  .list1 {
    padding: 3px;
  }
  width: 100%;
  .list2 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .list2 .item2 {
      width: 50%;
    }
  }
  .item2 {
    width: 49.3%;

    // box-sizing: border-box;
    margin-bottom: 4px;

    background-color: #fff;
  }
  .item2 img {
    width: 150px;
    height: 150px;
  }

  .item2 .name {
    padding: 2px;
  }
  .item2 .price {
    color: #9c3232;
    text-align: left;
    text-indent: 2em;
  }
  .item2-more p {
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .item2-more img {
    width: 36px;
    height: 36px;
  }
}
</style>