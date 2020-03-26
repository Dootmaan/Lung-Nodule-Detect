<template>
  <div style="font-size:15px;margin-top:20px">
    <el-col :span="12">
      <div>当前所选用模型为：{{network}}</div>
      <div style="margin-top:20px">
        <img src="../assets/fasterRCNN.jpg" width="75%" alt="暂无对应网络示意图">
      </div>

      <div style="margin-top:20px">模型选用SECTION：{{section}}</div>
      <div style="margin-top:10px">模型选用EPOCH：{{epoch}}</div>
    </el-col>

    <el-col :span="1" style="">
      <el-divider direction="vertical" class="vertial-divider"></el-divider>
    </el-col>

    <el-col :span="11">
      <div style="text-align:left;margin-left:10%">
        <div>
          <el-button type="primary" round @click="getInfo" icon="el-icon-refresh-left">刷新信息</el-button>
        </div>
        <div style="margin-top:10%">
          <span>总用户数：</span>
          <span>{{total_user}}</span>
        </div>
        <div style="margin-top:20px">
          <span>总文件数：</span>
          <span>{{total_file}}</span>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      network: "Faster-RCNN (VGG16)",
      section: 1,
      epoch: 11,
      total_user: 0,
      total_file: 0
    };
  },
  components: {},
  mounted() {},
  methods: {
    getInfo() {
      this.$axios
        .post(this.api.overallAPI)
        .then(response => {
          if (response.data.status === 200) {
            console.log(response.data);
            this.total_user = response.data.data.user_num;
            this.total_file = response.data.data.file_num;
            //现在登录将会导致fileId消失，菜单被禁用。可以在这里让它跳转到Upload，但更好的方法是让fileId不会掉
          } else {
            this.$message.error("获取信息失败");
          }
          // window.console.log(response.data);
        })
        .catch(error => {
          this.$message({
            message: "服务器错误",
            type: "warning"
          });
          window.console.log(error);
        });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style scoped>
.vertial-divider{
  height: 300px
}
</style>