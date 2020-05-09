<template>
  <div>
    <el-dialog title="查看原图" :visible.sync="checkOriginVisible">
      <img :src="origin_url" alt="加载失败">
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkOriginVisible = false;">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改患者信息" :visible.sync="editInfoVisible">
      <el-form label-position="right">
        <el-form-item label="患者姓名" :label-width="formLabelWidth">
          <el-input v-model="new_patient_info.name" autocomplete="off" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="患者生日" :label-width="formLabelWidth">
          <!-- <span class="demonstration">使用 value-format</span>
          <div class="demonstration">值：{{ value2 }}</div>-->
          <el-date-picker
            v-model="new_patient_info.birthDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width:70%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="患者性别" :label-width="formLabelWidth">
          <el-select v-model="new_patient_info.gender" placeholder="请选择性别" style="width:70%">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
                  <div style="margin-bottom:20px;font-size:10px">*请注意，空白将会覆盖原信息</div>
          <el-button @click="editInfoVisible = false;">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    <div class="image_preview">
      <el-row>
        <el-col :span="18" style="text-align:center">
          <el-image
            style="width: 512px; height: 512px;"
            :src="image_url"
            :preview-src-list="image_url_list"
          ></el-image>
        </el-col>
        <el-col :span="6">
          <h3>患者信息</h3>
          <el-divider></el-divider>
          <div class="info"><span class="info_left"><b>患者姓名</b>：</span><span class="info_right">{{patient_info.name}}</span></div>
          <div class="info"><span class="info_left"><b>患者性别</b>：</span><span class="info_right">{{patient_info.gender}}</span></div>
          <div class="info"><span class="info_left"><b>患者生日</b>：</span><span class="info_right">{{patient_info.birthDate}}</span></div>

          <!-- <h3 style="margin-top:50px">结节信息</h3>
          <el-divider></el-divider>
          <div class="info"><span class="info_left"><b>结节坐标</b>：</span><span class="info_right">{{patient_name}}</span></div>
          <div class="info"><span class="info_left"><b>结节直径</b>：</span><span class="info_right">{{patient_name}}</span></div> -->

          <h3 style="margin-top:50px">其他工具</h3>
          <el-divider></el-divider>
          <el-button round @click="checkOrigin">查看原图</el-button><el-button round @click="editInfo">修改信息</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      image_url: "",
      image_url_list: [],
      patient_info:{
        name:"",
        gender:"",
        birthDate:"",
      },
      new_patient_info:{
        name:"",
        gender:"",
        birthDate:"",
      },
      origin_url:"",
      checkOriginVisible:false,
      editInfoVisible:false,
      formLabelWidth: "120px",
    };
  },
  components: {},
  mounted() {},
  created() {
    this.getResult();
    this.getPatientInfo();
  },
  methods: {
    getResult() {
      // console.log("fileID",this.api.fileId)
      this.$axios
        .post(
          this.api.resultAPI,
          this.qs.stringify({
            fileId: this.api.fileId
          })
        )
        .then(response => {
          var url = response.data.data[0].preview;
          this.image_url = url;
          this.image_url_list = [url];
          // this.srcList.append()
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    getPatientInfo() {
      this.$axios
        .post(
          this.api.patientInfoAPI,
          this.qs.stringify({
            fileId: this.api.fileId
          })
        )
        .then(response => {
          this.patient_info.name=response.data.data.name;
          if(response.data.data.gender==0){
            this.patient_info.gender="男"
          }else{
            this.patient_info.gender="女"
          }
          this.patient_info.birthDate=response.data.data.birthDate.split(" ")[0];
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    checkOrigin(){
      this.checkOriginVisible=true;
      this.$axios
        .post(
          this.api.checkOriginAPI,
          this.qs.stringify({
            fileId: this.api.fileId
          })
        )
        .then(response => {
          var url = response.data.data[0].preview;
          this.origin_url = url;
          // this.srcList.append()
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    editInfo(){
      this.editInfoVisible=true;
      this.new_patient_info.gender=this.patient_info.gender;
    },
    confirmEdit(){
      var intGender=0;
      if(this.new_patient_info.gender=="男"){
        intGender=0;
      }else{
        intGender=1;
      }
      this.editInfoVisible = false;
      if (this.new_patient_info.name != "") {
        document.getElementsByTagName("title")[0].innerText = this.new_patient_info.name;
      }
      this.$axios
        .post(
          this.api.patientAPI,
          this.qs.stringify({
            fileId: this.api.fileId,
            patientName: this.new_patient_info.name,
            patientGender: intGender,
            patientBirthDate: this.new_patient_info.birthDate
          })
        )
        .then(response => {
          this.getPatientInfo();
          window.console.log(response.data);
          this.$message({
                message: "修改成功",
                type: "success"
              });
        })
        .catch(error => {
          window.console.log(error);
        });
    },
  }
};
</script>

<style scoped>
.image_preview {
  text-align: left;
  padding: 5px;
  margin-top: 20px;
}

.info{
  margin-top:5px;
}
.info-left{
  float: left;
  margin-left: 10%;
}
.info-right{
  float:right;
  margin-right: 10%;
}
</style>