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
      <form action="/">
        <van-search
          v-model.trim="value"
          show-action
          placeholder="商品搜索"
          @input="onSearch"
          @cancel="onCancel"
        />
      </form>

      <!-- 默认页面 -->
      <div class="default" v-if="isShow == ''">
        <!-- 历史记录  -->
        <ul class="history" v-if="historyData.length !== 0">
          <div class="hisTitle">
            历史记录 <van-icon name="delete" @click="clearhistoryAction" />
          </div>
          <li v-for="(item, index) in historyData" :key="index" @click="search(item)">
            <span>{{ item.keyword }}</span>
          </li>
        </ul>
        <!-- 热门搜索 -->
        <ul class="hotSearch">
          <div class="hotTitle">热门搜索</div>
          <li
            v-for="(item, index) in hotKeywordList"
            :key="index"
            @click="addhis(item)"
          >
            <span :class="item.is_hot == 1 ? 'hot' : ''">{{
              item.keyword
            }}</span>
          </li>
        </ul>
      </div>
      <!-- 搜索列表页面 -->
      <div class="list" v-if="isShow == 'list'">
        <ul>
          <li
            class="keywords"
            v-for="item in keywords"
            :key="item.id"
            @click="addhistory(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>

      <!-- 商品 -->
      <div class="goods" v-if="isShow == 'goods'">
        <!-- 分类 -->
        <div class="sortnav">
          <div :class="prices == 'zh' ? 'active' : ''" @click="getZh">综合</div>
          <div class="price-t" @click="getPrice">
            <div :class="prices == 'jg' ? 'active price-l' : 'price-l'">
              价格
            </div>

            <div class="icon-box">
              <van-icon class="icon-top" name="arrow-up" />
              <van-icon class="icon-bottom" name="arrow-down" />
            </div>
          </div>
          <div :class="prices == 'sort' ? 'active' : ''" @click="getSort">
            分类
          </div>
        </div>
        <!-- 分类列表 -->
        <ul class="sortlist">
          <li v-for="item in data" :key="item.id" @click="goGoods(item)">
            <img :src="item.list_pic_url" alt="" />
            <p>{{ item.name }}</p>
            <p class="price">¥{{ item.retail_price }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  clearhistoryAction,
  addhistoryaction,
  helperaction,
  indexaction,
} from "@/api/search";
export default {
  data() {
    return {
      value: "",
      isShow: "", // "" list goods
      //   搜索历史
      historyData: [],
      //   热门搜索
      hotKeywordList: [],
      // 默认关键字
      defaultKeyWords: "",
      //   关键字
      keywords: [],
      order: "asc",

      data: "",
      prices: "",
      order: "",
      num: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      indexaction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res);
        this.defaultKeyWords = res.hotKeywordList;
        this.historyData = res.historyData;
        this.hotKeywordList = res.hotKeywordList;
      });
    },
    onClickLeft() {
      this.$router.back(1);
    },
    // 输入框数据改变
    onSearch(val) {
      if (this.value.length > 0) {
        console.log("输入了");
        this.isShow = "list";
      } else {
        this.isShow = "";
      }
      helperaction({ keyword: this.value }).then((res) => {
        // console.log(res);
        this.keywords = res.keywords;
      });
    },
    addhistory(item) {
      // 添加历史
      addhistoryaction({
        keyword: item.name,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res);
        this.init();
      });

      // 渲染页面
      helperaction({ keyword: item.name, order: this.order }).then((res) => {
        console.log(res);
        this.isShow = "goods";
        this.data = res.keywords;
      });
    },
    //    点击搜索历史添加
    addhis(item) {
      addhistoryaction({
        keyword: item.keyword,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res);
        this.init();
        //  console.log(item);
      });

      // 若果有关键字 搜素 并渲染页面

      helperaction({ keyword: item.keyword, order: this.order }).then((res) => {
        console.log(res);
        this.data = res.keywords;
        if (res.keywords.length > 0) {
          this.isShow = "goods";
        }else{
         return
        }
      });
    },
    // 晴空搜索历史
    clearhistoryAction() {
      clearhistoryAction({ openId: localStorage.getItem("openId") }).then(
        (res) => {
          // console.log(res);
          this.init();
        }
      );
         
    },
      //  点击历史记录搜索商品
    search(item){
 helperaction({ keyword: item.keyword, order: this.order }).then((res) => {
        console.log(res);
        this.data = res.keywords;
        if (res.keywords.length > 0) {
          this.isShow = "goods";
        }else{
         return
        }
      });
    },
    // 搜索是触发
    onCancel() {
      this.$router.back(1);
    },

    getZh() {
      this.prices = "zh";
      this.order = "";
      this.init();
    },
    getPrice() {
      this.prices = "jg";
      this.num++;
      if (this.num % 2 == 0) {
        this.order = "desc";
      } else {
        this.order = "asc";
      }
      this.init();
    },
    getSort() {
      this.order = "";
      this.prices = "sort";
      this.init();
    },
    // 点击跳转到商品
    goGoods(item){
      // console.log(item.id);
 this.$router.push({ path: "/goods", query: { id: item.id } });
    }
  },
};
</script>

<style lang='scss' scoped>
.content {
  margin-top: 50px;
}

.list {
  .keywords {
    text-align: left;
    font-size: 15px;
    margin: 10px 30px;
  }
}
// 历史记录样式
.history {
  background-color: #fff;
}
.hotSearch,
.history {
  margin-top: 5px;
  padding: 20px;
  overflow: hidden;
  background-color: #fff;
  .hotTitle,
  .hisTitle {
    font-size: 14px;
    display: block;
    text-align: left;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  li {
    float: left;
    font-size: 14px;
    padding: 3px;
    border: 1px solid #000;
    margin: 0 15px 10px 0;
    .hot {
      color: red;
    }
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
.price-t {
  position: relative;
  line-height: 40px;
  .price-l {
    position: absolute;
    top: 0;
    left: 28px;
  }
}
.price-t div {
  display: inline-block;
  height: 100%;
}
.icon-box {
  padding-top: 8px;
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