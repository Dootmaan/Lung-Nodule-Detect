<template>
  <div>
    <div style="margin-top:20px">格式转化功能可以帮您将DICOM格式图像转换为可被各种设备直接查看的JPG图像</div>
    <div style="margin-top:30px" class="demo-image__error">
      <el-image
        style="width: 256px; height: 256px;"
        :src="image_url"
      >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline" style="margin-top:40%;color:red">请上传</i>
      </div>
      </el-image>
    </div>
    <div style="margin-top:30px">
      <el-upload
        class="upload"
        :action="this.api.formatAPI"
        :on-success="handleSuccess"
        :limit="1"
        accept=".dcm"
      >
        <el-button style="width:200px" round type="success" icon="el-icon-upload2">上传 DCM 文件</el-button>
        <div slot="tip" class="el-upload__tip">上传完毕将自动下载转换后的JPG文件，如被浏览器直接打开，请右键另存为</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      image_url:"",
    };
  },
  components: {},
  mounted() {},
  methods: {
    handleSuccess(response) {
      console.log(response);
      this.image_url=response.data.url;
      // let alink = document.createElement("a");
      // alink.href = this.image_url;
      // alink.download = "convert.jpg";
      // alink.click();
      window.open(this.image_url)
    }
  }
};
</script>

<style scoped>
</style>