<template>
  <div>
    <div style="font-size:35px; margin-top:5%;">
      <b>欢迎使用Panel帮助</b>
    </div>
    <!-- <img src="../assets/lung3.jpg" style="margin-top:30px;width:250px;"> -->
    <div style="font-size:16px;margin-top:30px">
      <div
        class="tip"
      >1. 在诊断报告中，患者信息和诊断意见均是可以修改的，直接单击即可</div>
      <div
        class="tip"
      >2. 查看历史文件界面同样支持拖拽上传</div>
      <div
        class="tip"
      >3. 只有选定了当前查看的文件后，结节定位和诊断报告功能才会开启</div>
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