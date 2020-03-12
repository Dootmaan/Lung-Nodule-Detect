<template>
  <div style="min-width: 1100px;text-align:center">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: "app",
  components: {
    // Upload,
    // Display_2D,
    // Learning_result,
    // Init,
    // Help,
    // Settings
    // OneClickPanel
  },
  data() {
    return {
      // welcome: true,
      // oneclick: false,
      // ordinary: false,
    };
  },
  methods: {
    // getSearchEngine(msg){
    //   this.searchEngine=msg
    // },
  }
};
</script>

<style>
/* body {
  overflow: auto;
} */
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #circle_oneclick {
  background: #67c23a;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transition: transform 0.5s;
}

#circle_ordinary {
  background: #409eff;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transition: transform 0.5s;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 195px;
  min-height: 400px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

#circle_ordinary:hover {
  transform: scale(1.5);
}

#circle_oneclick:hover {
  transform: scale(1.5);
} */
.el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 550px !important;
  height: 300px !important;
  text-align: center;
  position: relative;
  overflow: hidden;
}
</style>