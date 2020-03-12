<template>
  <div>
    <div style="font-size:35px; margin-top:5%;">
      <b>欢迎使用帮助</b>
    </div>
    <img src="../assets/lung3.jpg" style="margin-top:30px;width:250px;">
    <div style="font-size:16px;margin-top:30px">
      <div
        class="tip"
      >1. 目前只接受512*512的标准肺部CT切片，格式需为JPG目前只接受512*512的标准肺部CT切片，格式需为JPG目前只接受512*512的标准肺部CT切片，格式需为JPG</div>
      <div
        class="tip"
      >2. 目前只接受512*512的标准肺部CT切片，格式需为JPG目前只接受512*512的标准肺部CT切片，格式需为JPG目前只接受512*512的标准肺部CT切片，格式需为JPG</div>
      <div
        class="tip"
      >3. 目前只接受512*512的标准肺部CT切片，格式需为JPG目前只接受512*512的标准肺部CT切片，格式需为JPG目前只接受512*512的标准肺部CT切片，格式需为JPG</div>
    </div>
    <div style="margin-top:50px;margin-bottom:150px">
      <el-button round type="primary" size="huge" @click="toWelcome">好的，我知道了</el-button>
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
    toWelcome() {
      this.$router.push("/");
    }
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