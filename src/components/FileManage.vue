<template>
  <div>
    <el-dialog title="预览图像" :visible.sync="checkVisible">
      <img :src="preview_url" alt="加载失败" style="width:100%">
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkVisible = false;">确 定</el-button>
      </div>
    </el-dialog>

    <div style="margin-left: 20px；margin-bottom:20px;text-align:left">
      <el-button @click="deleteFiles()" type="danger" icon="el-icon-delete">删除所选</el-button>
      <el-button @click="getAllFile()" type="primary" icon="el-icon-refresh-left">刷新信息</el-button>
      <el-button @click="toggleSelection()" icon="el-icon-close">取消选择</el-button>
      <el-input
          v-model="search"
          placeholder="搜索文件名"
          style="float:right;width:240px" />
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="openDetails"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="data" label="上传日期" width="240" sortable>
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="文件名" width="120" sortable></el-table-column>
      <el-table-column prop="id" label="文件ID" width="160" sortable></el-table-column>
      <el-table-column prop="size" label="文件大小" width="120" sortable></el-table-column>
      <el-table-column prop="userId" label="上传用户" width="120" sortable></el-table-column>
      <el-table-column prop="type" label="类型" sortable></el-table-column>
      <el-table-column prop="patientId" label="病人ID" width="150" show-overflow-tooltip sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      search: '',
      checkVisible:false,
      preview_url:'',
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
    openDetails(row){
      var id=row.id
      this.checkVisible=true;
      this.$axios
        .post(
          this.api.checkOriginAPI,
          this.qs.stringify({
            fileId: id
          })
        )
        .then(response => {
          var url = response.data.data[0].preview;
          this.preview_url = url;
          // this.srcList.append()
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
      console.log(row)
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
      if(this.multipleSelection.length<1){
        this.$message({
            message: "请至少选择一项",
            type: "error"
          });
        return;
      }
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