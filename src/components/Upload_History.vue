<template>
  <div>
    <el-dialog title="患者信息" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form :model="form" label-position="right">
        <el-form-item label="患者姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="患者生日" :label-width="formLabelWidth">
          <!-- <span class="demonstration">使用 value-format</span>
          <div class="demonstration">值：{{ value2 }}</div>-->
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width:70%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="患者性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别" style="width:70%">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <router-link to="Display_2D">
          <el-button @click="dialogFormVisible = false;">取 消</el-button>
        </router-link>
        <router-link to="Display_2D" style="margin-left:5%">
          <el-button type="primary" @click="addPatientInfo">确 定</el-button>
        </router-link>
      </div>
    </el-dialog>

    <div id="upload" style="height:100%;margin-top:20px" v-loading="loading">
      <el-upload
        class="upload"
        :data="{userId: this.api.userId}"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="handleError"
        accept=".nii"
        drag
        clickable="false"
        :action="this.api.uploadAPI"
      >
        <History></History>
        <!--            <span class="upload-tips">拖入文件以打开</span>-->
      </el-upload>
    </div>
  </div>
</template>

<script>
import History from "./History";

export default {
  name: "Upload",
  components: { History },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        gender: "",
        birthday: ""
      },
      formLabelWidth: "100px",
      loading:false
    };
  },
  methods: {
    beforeUpload(file) {
      this.$notify.info({
        title: "提示",
        message: "开始上传文件",
        position: "bottom-left"
        // duration: 0,
        // offset: 10
      });
      this.loading=true;
      window.console.log(file.name);
    },
    // eslint-disable-next-line no-unused-vars
    uploadSuccess(response, file, fileList) {
      this.$notify({
        title: "成功",
        message: "文件上传成功",
        position: "bottom-left",
        type: "success"
        // duration: 0,
        // offset: 10
      });
      this.loading=false;
      this.dialogFormVisible=true;
      this.api.fileId=response.data.fileId;
      window.console.log("=========" + file.name + "==" + response);
    },
    uploadTips() {
      this.$notify.info({
        title: "提示",
        message: "拖入文件以打开",
        position: "bottom-left"
        // duration: 0,
        // offset: 10
      });
    },
    handleError() {
      this.$notify.error({
        title: "失败",
        message: "文件上传失败",
        position: "bottom-left"

        // duration: 0,
        // offset: 10
      });
      this.loading=false;
    },
    addPatientInfo() {
      if (this.form.name != "") {
        document.getElementsByTagName("title")[0].innerText = this.form.name;
      }
      this.$axios
        .post(
          this.api.patientAPI,
          this.qs.stringify({
            fileId: this.api.fileId,
            patientName: this.form.name,
            patientGender: this.form.gender,
            patientBirthDate: this.form.birthday
          })
        )
        .then(response => {
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    }
  },
  created() {
    this.uploadTips();
  },
  mounted() {
    // 禁用input（drag仍然有效）
    this.input = document.querySelector(".el-upload__input");
    this.input.disabled = true;
  }
};
</script>

<style>
#upload {
  width: 100%;
  height: 100%;
}

#upload .upload,
#upload .el-upload,
#upload .el-upload-dragger {
  width: 100% !important;
  height: 100% !important;
  text-align: start;
  cursor: default;
}

#upload .el-upload-dragger {
  border-radius: 0;
  /*border: 1px dashed #d9d9d9;*/
}

#upload .el-upload-list {
  display: none;
}
.upload-tips {
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 16px;
  color: white;
}
</style>