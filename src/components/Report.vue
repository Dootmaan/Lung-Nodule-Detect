<template>
  <div id="report-bg">
    <div id="report">
      <div class="head">
        <span class="title">诊断报告</span>
        <div class="copyright">
          <p>No.{{this.api.fileId}}</p>
          <p style="line-height:0px">
            <span style="font-size:8px">powered by &nbsp;</span>
            <i>Lung AI</i>
          </p>
        </div>
      </div>
      <div class="info">
        <table>
          <tr>
            <td>患者姓名：</td>
            <td>
              <label>
                <input type="text" placeholder="编辑姓名" v-model="patientInfo.patientName">
              </label>
            </td>
            <td>患者ID：</td>
            <td>{{patientInfo.patientId}}</td>
          </tr>
          <tr>
            <td>患者性别：</td>
            <td>
              <el-popover placement="bottom-start" width="100" trigger="hover">
                <div>
                  <el-radio v-model="patientInfo.patientGender" :label="0">男</el-radio>
                  <el-radio v-model="patientInfo.patientGender" :label="1">女</el-radio>
                </div>
                <label slot="reference">
                  <input
                    type="text"
                    placeholder="编辑性别"
                    :value="patientInfo.patientGender?'女':'男'"
                    readonly="readonly"
                    class="gender"
                  >
                </label>
              </el-popover>
            </td>
            <td>数据日期：</td>
            <td>{{patientInfo.fileUploadDate}}</td>
          </tr>
          <tr>
            <td>出生日期：</td>
            <td>
              <el-date-picker
                v-model="patientInfo.patientBirthDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </td>
            <td>报告日期：</td>
            <td>{{patientInfo.reportUpdateDate}}</td>
          </tr>
        </table>
      </div>
      <div class="image">
        <table>
          <tr>
            <td>
              <el-image style="width: 220px; height: 220px;" :src="patientInfo.image1" fit="cover">
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span class="dot">...</span>
                </div>
              </el-image>
            </td>
            <td>
              <el-image style="width: 220px; height: 220px;" :src="patientInfo.image2" fit="cover">
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span class="dot">...</span>
                </div>
              </el-image>
            </td>
          </tr>
        </table>
      </div>
      <div class="result">
        <div class="title">诊断结果：</div>
        <p class="content">{{patientInfo.reportResult}}</p>
      </div>
      <div class="suggest">
        <div class="title">诊断意见：</div>
        <label>
          <!-- <textarea class="content" placeholder="编辑意见"></textarea> -->
          <el-input
            type="textarea"
            :rows="10"
            placeholder="编辑诊断意见"
            v-model="patientInfo.reportSuggest"
            style="border:0px"
            resize="none"
          ></el-input>
        </label>
      </div>
      <div class="foot">
        <button @click="addSuggest">保存</button>
        <button @click="downloadReport">下载</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      patientInfo: {
        reportSuggest: "",
        patientGender: 0,
        patientBirthDate: "",
        patientName: "",
        patientId: "",
        fileUploadDate: "",
        reportUpdateDate: "",
        reportResult: "",
        image1: "",
        image2: "",
      }
    };
  },
  components: {},
  mounted() {},
  methods: {
    getReport() {
      this.$axios
        .post(
          this.api.reportAPI,
          this.qs.stringify({
            fileId: this.api.fileId
          })
        )
        .then(response => {
          this.patientInfo = response.data.data;
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    addSuggest() {
      this.$axios
        .post(
          this.api.patientAPI,
          this.qs.stringify({
            fileId: this.api.fileId,
            patientName: this.patientInfo.patientName,
            patientGender: this.patientInfo.patientGender,
            patientBirthDate: this.patientInfo.patientBirthDate
          })
        )
        .then(response => {
          if (response.data.status == 200) {
            this.$axios
              .post(
                this.api.suggestAPI,
                this.qs.stringify({
                  fileId: this.api.fileId,
                  reportSuggest: this.patientInfo.reportSuggest
                })
              )
              .then(response2 => {
                if (response2.data.status == 200) {
                  this.$notify({
                    title: "提示",
                    message: "操作成功",
                    type: "success",
                    position: "bottom-left"
                    // duration: 0,
                    // offset: 10
                  });
                } else {
                  this.$notify.error({
                    title: "提示",
                    message: "诊断意见添加失败",
                    position: "bottom-left"
                    // duration: 0,
                    // offset: 10
                  });
                }
                // window.console.log(response.data);
              });
          } else {
            this.$notify.error({
              title: "提示",
              message: "信息提交失败",
              position: "bottom-left"
              // duration: 0,
              // offset: 10
            });
          }
        })
        .catch(error => {
          this.$notify({
            title: "提示",
            message: "服务器错误",
            position: "bottom-left",
            type: "warning"
            // duration: 0,
            // offset: 10
          });
          window.console.log(error);
        });

      // if (this.serverError) {
      //   this.$message({
      //     message: "服务器发生错误",
      //     type: "warning"
      //   });
      // }

      // if (this.updateInfoSuccess && this.updateSuggestSuccess) {
      //   this.$notify({
      //     title: "提示",
      //     message: "操作成功",
      //     type: "success",
      //     position: "bottom-left"
      //     // duration: 0,
      //     // offset: 10
      //   });
      // } else if (!this.updateInfoSuccess && this.updateSuggestSuccess ) {
      //   this.$notify({
      //     title: "提示",
      //     message: "诊断意见添加成功，但病人信息更新失败",
      //     type: "warning",
      //     position: "bottom-left"
      //     // duration: 0,
      //     // offset: 10
      //   });
      // } else if (this.updateInfoSuccess  && !this.updateSuggestSuccess) {
      //   this.$notify({
      //     title: "提示",
      //     message: "病人信息更新成功，但诊断意见添加失败",
      //     type: "warning",
      //     position: "bottom-left"
      //     // duration: 0,
      //     // offset: 10
      //   });
      // } else {
      //   this.$notify.error({
      //     title: "提示",
      //     message: "操作失败",
      //     position: "bottom-left"
      //     // duration: 0,
      //     // offset: 10
      //   });
      // }
    },
    downloadReport() {
      this.$axios
        .post(
          this.api.downloadAPI,
          this.qs.stringify({
            fileId: this.api.fileId
          }),
          {
            responseType: "blob"
          }
        )
        .then(response => {
          window.console.log(response.headers);
          const contentDisposition = response.headers["content-disposition"];
          const filename = decodeURI(
            contentDisposition.split("fileName=")[1] ||
              contentDisposition.split("filename=")[1]
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    doPrognosis() {
      //TODO：将该函数接入到“预后分析”按钮上
      this.$axios
        .post(
          this.api.prognosisAPI,
          this.qs.stringify({
            fileId: this.api.fileId
          })
        )
        .then(response => {
          this.getReport();
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    }
  },
  created() {
    this.doPrognosis();
  }
};
</script>

<style>
#report-bg {
  text-align: center;
  /* background-color: #333; */
  overflow: auto;
}

#report {
  margin: 50px auto;
  width: 800px;
  height: auto;
  background-color: white;
  text-align: start;
  box-shadow: 5px 5px 10px -4px #000000, 5px -5px 10px -4px #000000;
}

/*报告头*/
.head {
  color: white;
  width: 100%;
  background-color: #21464e;
  padding: 15px 30px;
  box-sizing: border-box;
  border-bottom: 2px solid white;
}

.head .title {
  font-size: 36px;
}

#report .el-textarea__inner {
  border: 0px;
  padding: 10px 30px;
  height: 200px;
  font: inherit;
}

.head .copyright {
  /*line-height: 20px;*/
  float: right;
  display: inline-block;
}

.head .copyright p {
  font-size: 14px;
}

/*报告基本信息*/
.info {
  color: white;
  width: 100%;
  background-color: #21464e;
}

.info table {
  width: 100%;
  padding: 8px 0;
  font-size: 15px;
}

/*.info table td:nth-child(2n+1){*/
.info table td {
  box-sizing: border-box;
  padding-left: 30px;
  line-height: 1.6;
}

.info table input {
  background-color: #21464e;
  color: white;
  font: inherit;
  outline: none;
  border: none;
}

.info table input.gender {
  width: 15px;
  cursor: pointer;
}

#report .el-input__inner {
  padding: inherit;
  height: inherit;
  cursor: pointer;
  font-size: 15px;
}

#report .el-input__inner::-webkit-input-placeholder {
  color: #757575;
  font-size: 15px;
}

#report .el-input__prefix {
  display: none;
}

#report .el-input__suffix {
  display: none;
}

#report .el-date-editor {
  background: transparent;
}

/*医学图*/
.image {
  width: 100%;
  background-color: black;
}

.image table {
  width: 100%;
}

.image table td {
  height: 200px;
  text-align: center;
}

.image table tr td:nth-child(1) {
  border-right: 1pt solid white;
}

.image table tr:first-child td {
  border-bottom: 1pt solid white;
}

/*诊断结果*/
.result {
  background-color: inherit;
  width: 100%;
}

.result .title {
  padding: 5px 30px;
  background-color: #21464e;
  color: white;
}

.result .content {
  padding: 10px 30px;
  height: 200px;
}

/*诊断意见*/
.suggest {
  width: 100%;
  background-color: inherit;
  border-bottom: 1px dashed #21464e;
}

.suggest .title {
  padding: 5px 30px;
  background-color: #21464e;
  color: white;
}

.suggest .content {
  font: inherit;
  width: 100%;
  padding: 10px 30px;
  min-height: 200px;
  box-sizing: border-box;
  resize: none;
  border: none;
  outline: none;
  overflow: hidden;
}

/*报告底部*/
.foot {
  background-color: inherit;
  padding: 10px 30px;
  text-align: end;
}

.foot button {
  cursor: pointer;
  border: 1px solid #21464e;
  color: white;
  font-size: 15px;
  background-color: #21464e;
  border-radius: 5px;
  margin-left: 20px;
  padding: 8px 30px;
  outline: none;
}

.foot button:hover {
  border: 1px solid #47727b;
  border-radius: 5px;
  background-color: #47727b;
}
</style>