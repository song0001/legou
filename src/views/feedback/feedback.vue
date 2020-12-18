<template>
  <div>
    <van-nav-bar
      fixed
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
    <p>意见与反馈</p>
    <van-field
  v-model="message"
  rows="2"
  autosize
  label="留言"
  type="textarea"
  maxlength="150"
  placeholder="请输入留言"
  show-word-limit
/>
<van-field
  v-model="phone"
  rows="1"
  autosize
  label="联系方式"
  type="textarea"
  placeholder="邮箱/手机号/微信号"
/>
<van-button type="danger" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { submitAction } from "@/api/feedback";
import Vue from 'vue';
import { Field } from 'vant';

Vue.use(Field);
export default {
  data() {
    return {
        message:'',
        phone:''
    };
  },
 
  methods: {
    submit() {
      submitAction({content:this.message,
      name:'宋',
        openId: localStorage.getItem("openId"),
        phone:this.phone
      }).then((res) => {
          console.log(res);
      });
    },
    onClickLeft() {
      this.$router.back(1);
    },
  },
};
</script>

 <style lang='scss' scoped>
.content {
  margin-top: 50px;
  p{
      font-size: 14px;
      text-align: left;
      padding: 20px 20px;
      margin: 2px auto;
      background-color: #fff;
  }
  .van-button{
      width: 100%;
  }
}
</style>