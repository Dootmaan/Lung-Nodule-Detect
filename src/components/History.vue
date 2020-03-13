<template>
  <div id="history" style="text-align:left">
    <div v-if="this.historyFiles.length==0">
      <div style="text-align:center;margin-top:10%;margin-bottom:10%;color:white">还没有历史</div>
    </div>
    <div
      v-else
      class="img-block"
      v-for="file in historyFiles"
      :key="file.id"
      @click="loadFile(file.id)"
      style="height:100%;"
    >
      <img style="width: 220px; height: 220px;" :src="file.preview" @click="loadFile(file.id)">
      <!-- <div slot="placeholder" class="image-slot">
          加载中
          <span class="dot">...</span>
        </div>
      </el-image>-->
      <span class="name">{{file.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      historyFiles: []
    };
  },
  methods: {
    getHistory() {
      this.$axios
        .post(
          this.api.historyAPI,
          this.qs.stringify({
            userId: this.api.userId
          })
        )
        .then(response => {
          this.historyFiles = response.data.data;
          if (this.historyFiles.length == 0) {
            this.$message({
              message: "还没有历史",
              type: "warning"
            });
          }
          window.console.log(response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    loadFile(id) {
      // window.console.log(id);
      this.api.fileId = id;
      this.$router.push("/Panel/Result");
    }
  },
  created() {
    this.getHistory();
  }
};
</script>

<style scoped>
#history {
  background-color: black;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: auto;
  box-sizing: border-box;
}

.img-block {
  margin: 20px;
  cursor: pointer;
  display: inline-block;
  padding: 5px;
  width: 220px;
  /* border: 1px solid white; */
}

.img-block .name {
  display: block;
  color: white;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
}
</style>