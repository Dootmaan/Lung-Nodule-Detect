<template>
  <div>
    <div>
      <h1>工作区设置</h1>
    </div>

    <div style="text-align:left; margin-left: 30%;margin-right: 30%;">
      <div>
        <div>工作区名称:</div>
        <div style="margin-top:10px">
          <span>
            <el-input placeholder="肺结节AI检测系统" v-model="input" style="width:70%" clearable></el-input>
          </span>
          <span style="margin-left:20px">
            <el-button type="primary" @click="setTitle">确定</el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      input: "",
    };
  },
  components: {},
  mounted() {},
  methods: {
    setTitle() {
      if(this.input==""){
        this.$message.error("工作区名称为空");
      }else{
        document.getElementsByTagName("title")[0].innerText = this.input;
      }
    },
  }
};
</script>

<style lang='stylus' scoped>
</style>