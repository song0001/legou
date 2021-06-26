<template>
  <div>
    <van-nav-bar
      fixed
      title="乐购"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
        :immediate-check = "false"
    >
     <ul class="con">
        <li class="list" v-for="item in list" :key="item.id">
          <img :src="item.app_list_pic_url" alt="" />
          <div class="des">
          <span>{{ item.name }}</span>
         <span>|</span>
         <span>{{item.floor_price}}元起</span>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { home, goods, brand, brandList } from "@/api/home";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      start: 1,
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
      brandList({ page: this.start }).then((res) => {
        console.log(res);
        this.list.push(...res.data);
        this.start++
        if (this.start > res.total) {
          this.finished = true;
        }
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.con{
    margin-top: 50px;
}
.vant-list{
    width: 100%;
}
.list{
    position: relative;
    width: 100%;
    img{
        width: 100%;
    }
    .des{
        color: #fff;
        top: 50%;
        left: 50%;
        font-size: 20px;
        transform: translate(-50%,-50%);
        position: absolute;
    }
}

</style>