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
      <van-address-edit
      ref="a"
        :area-list="area"
        show-delete
        show-set-default
        show-search-result
        :address-info="AddressInfo"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import {
  deleteAction,
  detailAction,
  saveAction,
  getListAction,
} from "@/api/address";
import area from "@/assets/area.js";
export default {
  data() {
    return {
      area,
      searchResult: [],
      AddressInfo: {},
      areaCode:''
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.$route.query.edit) {
        detailAction({ id: this.$route.query.id }).then((res) => {
          console.log(res);
          var obj={
              name:res.data.name,
              tel:res.data.mobile,
              areaCode:this.areaCode,
              addressDetail:res.data.address_detail,
              isDefault:res.data.is_default==1?true:false
          }
          this.AddressInfo=obj;
          console.log(this.AddressInfo);
 
        });
      }
    },
    onClickLeft() {
      this.$router.back(1);
    },

    getResult(res) {
      console.log(res);
    },
    // 点击保存
    onSave(val) {
      console.log(val);
      var address = val.province + " " + val.city + " " + val.county;
      console.log(address);
      saveAction({
        address: address,
        addressId: "",
        checked: val.isDefault,
        detailadress: val.addressDetail,
        openId: localStorage.getItem("openId"),
        telNumber: val.tel,
        userName: val.name,
      }).then((res) => {
        console.log(res);
        this.areaCode=val.areaCode
      });
      console.log(val);
      console.log(val.areaCode);
      this.$router.push({path:"/address",areaCode:val.areaCode});
    },
    // 删除
    onDelete() {
      deleteAction({id:this.$route.query.id}).then(res=>{
        //   console.log(res);
          this.$router.push("/address");
      });
    },
    // 修改详细地址时触发
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.content {
  margin-top: 50px;
}
// .van-area{
//     z-index: 999;
// }
</style>