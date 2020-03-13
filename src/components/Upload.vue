<template>
  <div class="patient_info">
    <el-dialog title="患者信息" :visible.sync="dialogFormVisible" :show-close="show_close">
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
        <router-link to="Result">
          <el-button @click="dialogFormVisible = false;">取 消</el-button>
        </router-link>
        <router-link to="Result" style="margin-left:5%">
          <el-button type="primary" @click="addPatientInfo">确 定</el-button>
        </router-link>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-container>
            <el-main
              v-loading="loading"
              element-loading-text="正在进行图像预处理，请耐心等待"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0.8)"
            >
              <div style="margin-top:7%">
                <el-upload
                  class="upload-demo"
                  drag
                  :data="{userId: this.api.userId}"
                  :action="this.api.uploadAPI"
                  accept=".jpg"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :on-progress="onProgress"
                  :limit="1"
                >
                  <i class="el-icon-upload" style="margin-top:20%"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                  </div>
                  <div class="el-upload__tip" slot="tip">只能上传JPG文件，且不超过5M</div>
                </el-upload>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <h4>版本信息</h4>
          <img src="../assets/lung2.jpg" style="width:120px;height:auto;">
          <div>
            <b>肺结节AI检测系统</b>
          </div>
          <div>
            <br>
          </div>
          <div>Version 0.1</div>
        </div>
        <div>2020.03</div>
        <!-- <div style="margin-top:20px"><hr/></div> -->
        <div>
          <el-divider></el-divider>
        </div>
        <div style="margin-top:20px;font-size:15px">
          <b>作者</b>
        </div>
        <div style="font-size:14px;margin-top: 5px">王弘毅</div>
        <div style="font-size:14px;margin-top:5px">
          <span><img src="../assets/weibo.jpg" width="25px"></span>
          <span><img src="../assets/wechat.jpg" width="25px" style="margin-left:10px;"></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Upload",
  // props: {
  //   msg: String
  // },
  data() {
    return {
      // link2display_2D: "/" + this.$route.params.tab + "/Display_2D",
      dialogFormVisible: false,
      form: {
        name: "",
        gender: "",
        birthday: ""
      },
      formLabelWidth: "100px",
      show_close: false,
      loading: false
    };
  },
  methods: {
    onProgress(event){
      // window.console.log(event);
      if(event.percent==100){
        this.loading=true;
      }
    },
    handleSuccess(response) {
      this.loading = false;
      this.dialogFormVisible = true;
      this.api.fileId = response.data.fileId;
    },
    handleError() {
      this.loading = false;
      this.$message.error("上传失败，请重试");
    },
    addPatientInfo() {
      this.dialogFormVisible = false;
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>