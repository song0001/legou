<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-search v-model="search" placeholder="搜索" />
    <div v-for="item in list" @click="goHome(item)" :key="item.uid">
      {{ item.title }}
    </div>
    <p class="pos">显示当前位置:{{this.cityInfo.title}}</p>
    <div id="allmap"></div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      list: [],
      map: "",
    };
  },
  computed: {
    ...mapState(["cityInfo"]),
  },
  methods: {
    ...mapMutations(["addCity"]),
    onClickLeft() {
      Toast("返回");
      this.$router.push("/home");
    },
    goHome(val) {
      this.addCity(val);
    //   console.log(val);
    this.$router.push('/home')
    },
  },
  watch: {
    search() {
    //   console.log(this.search);
      var options = {
        onSearchComplete: (results) => {
          // 判断状态是否正确
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            // console.log(results.Hr);
            this.list = results.Hr;
          }
        },
      };
      var local = new BMap.LocalSearch(this.map, options);
      local.search(this.search);
    },
  },
  mounted() {
       var map = new BMap.Map("allmap");
      if(this.cityInfo.city){
            // 初始百度地图的中心点
            // console.log(this.cityInfo.city);
            map.centerAndZoom(new BMap.Point(this.cityInfo.point.lng,this.cityInfo.point.lat), 11);
            var mk = new BMap.Marker(this.cityInfo.point);
                map.addOverlay(mk);
                map.panTo(this.cityInfo.point);
      }else{
    // 百度地图API功能
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
        //   console.log(r);
          // alert('您的位置：'+r.point.lng+','+r.point.lat);
        } else {
          alert("failed" + this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );
      }
    this.map = map;
  },
};
</script>
<style lang="scss" scoped>
.pos {
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  padding: 10px;
}
#allmap {
  width: 100%;
  height: 200px;
}
</style>