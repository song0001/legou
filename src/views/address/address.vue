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
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select='change'
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
// import area from "@/assets/area.js"
export default {
  data() {
    return {
      // area,
      chosenAddressId: "1",
      list: [
       
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getListAction({ openId: localStorage.getItem("openId") }).then((res) => {
        console.log(res);
        var arr = [];
        res.data.forEach((el) => {
          var obj = {
            id: el.id,
            name: el.name,
            tel: el.mobile,
            address: el.address + " " + el.address_detail,
            isDefault: el.is_default == 1 ? true : false,
          };

          arr.push(obj);
        });
        this.list = arr;
        // console.log(this.list);
       this.chosenAddressId=arr[0].id
      });
    },
    onClickLeft() {
      this.$router.back(1);
    },
    onAdd() {
      this.$router.push("/addaddress");
    },
    onEdit(item) {
      this.$router.push({path:"/addaddress",query:{id:item.id,edit:true}});
    },
    // 点击任意地址
    change(item,index){
// console.log(item,index);
this.$router.push({path:'/order',query:{id:item.id}})
    }
  
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