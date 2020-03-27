<template>
  <div>
    <div style="margin-left: 20px；margin-bottom:20px;text-align:left">
      <el-button @click="deleteFiles()" type="danger" icon="el-icon-delete">删除所选</el-button>
      <el-button @click="getAllFile()" type="primary" icon="el-icon-refresh-left">刷新信息</el-button>
      <el-button @click="toggleSelection()" icon="el-icon-close">取消选择</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="上传日期" width="240">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="文件名" width="120"></el-table-column>
      <el-table-column prop="id" label="文件ID" width="160"></el-table-column>
      <el-table-column prop="size" label="文件大小" width="120"></el-table-column>
      <el-table-column prop="userId" label="上传用户" width="120"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="patientId" label="病人ID" width="120" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  components: {},
  mounted() {},
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      window.console.log(this.multipleSelection)
    },
    getAllFile() {
      this.$axios
        .post(this.api.allFileAPI)
        .then(response => {
          if (response.data.status === 200) {
            console.log(response.data);
            this.tableData=response.data.data;
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
    },
    deleteFiles(){
      var selected_files=[]
      for(var i=0;i<this.multipleSelection.length;i++){
        var file=this.multipleSelection[i]
        selected_files.push(file["id"])
      }
      console.log(selected_files)
      this.$axios
        .post(
          this.api.filedelAPI,
          this.qs.stringify({
            fileId: this.qs.stringify(selected_files)
          })
        )
        .then(response => {
          if (response.data.status === 200) {
            console.log(response.data);
            this.$message.success("删除操作成功");
            //现在登录将会导致fileId消失，菜单被禁用。可以在这里让它跳转到Upload，但更好的方法是让fileId不会掉
            this.getAllFile();
          } else {
            this.$message.error("删除操作失败");
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
    },
  },
  created() {
    this.getAllFile();
  }
};
</script>

<style scoped>
</style>