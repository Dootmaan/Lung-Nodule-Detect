<template>
  <div>
    <div style="font-size:35px; margin-top:5%;">
      <b>欢迎使用Panel帮助</b>
    </div>
    <!-- <img src="../assets/lung3.jpg" style="margin-top:30px;width:250px;"> -->
    <div style="font-size:16px;margin-top:30px">
      <div
        class="tip"
      >1. 点击点击点击点击点击点击点击点击</div>
      <div
        class="tip"
      >2. 点击点击点击点击点击点击点击点击点击</div>
      <div
        class="tip"
      >3. 点击点击点击点击点击点击点击点击点击点击点击</div>
    </div>
    <div style="margin-top:50px;margin-bottom:150px">
      <el-button round type="primary" size="huge" onclick="javascript:history.back(-1)">好的，我知道了</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
  }
};
</script>

<style scoped>
body {
  text-align: center;
}
.tip {
  text-align: left;
  margin-left: 30%;
  width: 40%;
  margin-top: 20px;
}
</style>