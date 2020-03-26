<template>
  <div v-if="this.api.userId=='root'">
    <el-header>
      <!-- <div style="float: right;font-size: 30px;margin-left: 1%;margin-top:15px;cursor: pointer;" @click="gotoWelcome">
      <b>网站管理</b>
      </div>-->
      <div>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="Overall">信息概览</el-menu-item>
          <el-menu-item index="UserManage">用户管理</el-menu-item>
          <el-menu-item index="FileManage">文件管理</el-menu-item>
          <el-menu-item style="float:right">
            <el-button type="primary" round size="small" @click="gotoWelcome">返回首页</el-button>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>
  </div>

  <div v-else>
    <div>
      <img src="../assets/lock.png" style="width:3%;height:auto;margin-top:20%">
    </div>
    <div style="margin-top:2%">抱歉，您无权访问该页面</div>
    <div style="margin-top:2.5%;cursor:pointer;display:inline-block;" @click="gotoWelcome">
      <span style="font-size:20px">返回首页</span>
      <img src="../assets/right.jpg" width="2.5%" style="margin-left:10px">
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
    };
  },
  components: {},
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      window.console.log(key, keyPath);
    },
    gotoWelcome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>