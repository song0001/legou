<template>
  <div class="topic">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul>
        <li class="list" v-for="item in list" :key="item.id" @click="goTopicDetail(item)">
          <img :src="item.scene_pic_url" alt="" />
          <h3>{{ item.title }}</h3>
          <p class="subtitle">{{ item.subtitle }}</p>
          <p class="price">{{ item.price_info }}元起</p>
        </li>
      </ul>
    </van-list>
  </div>
</template>
 
<script>
import { listaction } from "@/api/topic";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      start: 1,
    };
  },
  methods: {
    onLoad() {
      listaction({
        page: this.start,
      }).then((res) => {
        // console.log(res);
        this.list.push(...res.data);
        this.start++;
        if (this.start > res.total) {
          this.finished = true;
        }
        this.loading = false;
      });
    },
        goTopicDetail(item){
  this.$router.push({path:'/topicdetail',query:{id:item.id}})
// console.log(item);
}
  },
};
</script>
<style lang="scss">
.topic {
  .list {
    background: #fff;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 207px;
    }
    h3 {
      font-size: 16px;
    }
    .subtitle {
      color: 999;
    }
    .price {
      color: #b4282d;
      padding-bottom: 20px;
      font-size: 13px;
    }
  }
}
</style>