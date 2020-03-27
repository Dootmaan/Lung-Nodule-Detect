<template>
  <div>
    <div style="margin-left: 20px；margin-bottom:20px;text-align:left">
      <el-button @click="deleteUsers()" type="danger" icon="el-icon-delete">删除所选</el-button>
      <el-button @click="getAllUser()" type="primary" icon="el-icon-refresh-left">刷新信息</el-button>
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
      <el-table-column prop="id" label="用户ID" width="160"></el-table-column>
      <el-table-column prop="type" label="用户类型" width="120"></el-table-column>
      <el-table-column prop="phone" label="用户账号名"></el-table-column>
      <el-table-column prop="name" label="用户昵称（可以为空）" width="240" show-overflow-tooltip></el-table-column>
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
    },
    getAllUser() {
      this.$axios
        .post(this.api.allUserAPI)
        .then(response => {
          if (response.data.status === 200) {
            console.log(response.data);
            this.tableData = response.data.data;
            //现在登录将会导致userId消失，菜单被禁用。可以在这里让它跳转到Upload，但更好的方法是让userId不会掉
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
    deleteUsers(){
      var selected_users=[]
      for(var i=0;i<this.multipleSelection.length;i++){
        var user=this.multipleSelection[i]
        selected_users.push(user["id"])
      }
      console.log(selected_users)
      this.$axios
        .post(
          this.api.userdelAPI,
          this.qs.stringify({
            userId: this.qs.stringify(selected_users)
          })
        )
        .then(response => {
          if (response.data.status === 200) {
            console.log(response.data);
            this.$message.success("删除操作成功");
            //现在登录将会导致userId消失，菜单被禁用。可以在这里让它跳转到Upload，但更好的方法是让userId不会掉
            this.getAllUser();
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
    }
  },
  created() {
    this.getAllUser();
  }
};
</script>

<style scoped>
</style>