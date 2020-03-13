<template>
  <div>
    <div class="image_preview">
      <el-row>
        <el-col :span="18">
          <el-image
            style="width: 512px; height: 512px;"
            :src="image_url"
            :preview-src-list="image_url_list"
          ></el-image>
        </el-col>
        <el-col :span="6">
          <h3>患者信息</h3>
          <el-divider></el-divider>
          <div class="info">患者姓名：{{patient_name}}</div>
          <div class="info">患者性别：{{patient_gender}}</div>
          <div class="info">患者生日：{{patient_birthDate}}</div>
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
      patient_name:"",
      patient_gender:"",
      patient_birthDate:"",
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
          this.patient_name=response.data.data.name;
          if(response.data.data.gender==0){
            this.patient_gender="男"
          }else{
            this.patient_gender="女"
          }
          this.patient_birthDate=response.data.data.birthDate.split(" ")[0];
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.image_preview {
  text-align: center;
  padding: 5px;
  margin-top: 20px;
}

.info{
  text-align:center
}
</style>