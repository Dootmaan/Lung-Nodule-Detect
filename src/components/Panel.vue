<template>
  <div>
    <el-dialog title="登录" :visible.sync="loginDialogFormVisible">
      <el-form :model="login_form" label-position="right">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="login_form.username" autocomplete="off" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入密码"
            v-model="login_form.password"
            show-password
            style="width:70%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginDialogFormVisible = false;">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="注册" :visible.sync="signupDialogFormVisible">
      <el-form :model="signup_form" label-position="right">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="signup_form.username" autocomplete="off" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入密码"
            v-model="signup_form.password"
            show-password
            style="width:70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复输入密码" :label-width="formLabelWidth">
          <el-input
            placeholder="请重复输入密码"
            v-model="signup_form.password_2"
            show-password
            style="width:70%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="signupDialogFormVisible = false;">取 消</el-button>
        <el-button type="primary" @click="signup">确 定</el-button>
      </div>
    </el-dialog>

    <el-container height="100%">
      <el-header>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <div style="float: left;font-size: 40px;margin-left: 1%;margin-top:15px;cursor: pointer;" @click="gotoWelcome">
                <img src="../assets/lung2.jpg" width="60px" style="float:left;">
                <b>肺结节AI检测系统</b>
              </div>

              <div style="float:right;margin-top:26px">
                <el-popover placement="top" width="160" v-model="popup_visible">
                  <p v-if="this.api.userId!=''">用户{{this.api.userId}}，确定退出吗？</p>
                  <div style="text-align: right; margin: 0" v-if="this.api.userId!=''">
                    <el-button size="mini" type="text" @click="logout">确定</el-button>
                    <el-button type="primary" size="mini" @click="popup_visible = false">取消</el-button>
                  </div>
                  <p v-if="this.api.userId==''">欢迎使用。您想登录还是注册？</p>
                  <div style="text-align: right; margin: 0" v-if="this.api.userId==''">
                    <el-button
                      size="mini"
                      type="text"
                      @click="popup_visible = false;signupDialogFormVisible=true"
                    >注册</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="popup_visible = false;loginDialogFormVisible=true"
                    >登录</el-button>
                  </div>
                  <el-avatar
                    shape="square"
                    size="large"
                    :src="squareUrl"
                    style="margin-left:20px"
                    slot="reference"
                    @click="popup_visible=true"
                  ></el-avatar>
                </el-popover>
              </div>

              <div style="float:right;margin-top: 26px">
                <a href="http://localhost:8080/#/Panel/Upload" target="_blank">
                  <el-button type="primary" icon="el-icon-plus">新建</el-button>
                </a>
                <el-button
                  type="primary"
                  icon="el-icon-info"
                  @click="gotoHelp"
                  style="margin-left:20px"
                >帮助</el-button>
                <!-- <el-button type="primary" icon="el-icon-s-tools">设置</el-button> -->
              </div>
              <div style="margin-top: 26px;float: right">
                <el-input
                  placeholder="请输入内容"
                  v-model="input"
                  class="input-with-select"
                  style="width:80%"
                >
                  <el-select v-model="select" slot="prepend" placeholder="丁香园" style="width:110px">
                    <el-option label="丁香园" value="丁香园"></el-option>
                    <el-option label="百度搜索" value="百度搜索"></el-option>
                    <el-option label="360良医" value="360良医"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>

              <!-- <br/><div style="align-content: center"><hr/></div> -->
            </div>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="24" style="text-align:left"> -->
          <!-- <div style="display:inline-block"> -->
          <el-container>
            <el-aside width="200px">
              <!-- <span> -->
              <el-radio-group v-model="isCollapse" style="margin-top:10px;margin-left:0px">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
              </el-radio-group>
              <!-- </span> -->
            </el-aside>
            <el-main style="margin-top:5px" class="divider-main">
              <!-- <span style="float:right;width:100%;margin-top:0px"> -->
              <el-divider></el-divider>
              <!-- </span> -->
            </el-main>
          </el-container>
          <!-- </div> -->
          <!-- </el-col> -->
        </el-row>
      </el-header>
      <el-container height="100%">
        <el-aside width="isCollapse?100px:200px" style="margin-top:80px">
          <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;margin-left:40px">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>-->
          <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            router
          >
            <el-menu-item index="/Panel/Upload">
              <i class="el-icon-upload2"></i>
              <span slot="title">上传图像</span>
            </el-menu-item>
            <el-menu-item index="/Panel/Result" :disabled="this.api.fileId==''">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">结节定位</span>
            </el-menu-item>
            <el-menu-item index="/Panel/Report" :disabled="this.api.fileId==''">
              <i class="el-icon-document"></i>
              <span slot="title">诊断报告</span>
            </el-menu-item>
            <el-menu-item index="/Panel/Format">
              <i class="el-icon-refresh"></i>
              <span slot="title">格式转换</span>
            </el-menu-item>
            <el-menu-item index="/Panel/History" key="5">
              <i class="el-icon-time"></i>
              <span slot="title">查看历史</span>
            </el-menu-item>
            <el-menu-item index="/Panel/Settings">
              <i class="el-icon-setting"></i>
              <span slot="title">页面设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="height:100%;margin-top: 30px">
          <!-- <keep-alive> -->
            <router-view></router-view>
          <!-- </keep-alive> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      loginDialogFormVisible: false,
      login_form: {
        username: "",
        password: ""
      },
      signupDialogFormVisible: false,
      signup_form: {
        username: "",
        password: "",
        password_2: ""
      },
      formLabelWidth: "120px",
      user_id: "null",
      input: "",
      select: "",
      isCollapse: false,
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      // searchEngine: "",
      popup_visible: false
    };
  },
  components: {},
  mounted() {},
  methods: {
    gotoWelcome(){
      this.$router.push('/');
    },
    login() {
      if (
        this.login_form.username.length > 20 ||
        this.login_form.password.length > 20 ||
        this.login_form.username.length < 6 ||
        this.login_form.password.length < 6
      ) {
        this.$message.error("请检查输入");
      } else {
        this.$axios
          .post(
            this.api.loginAPI,
            this.qs.stringify({
              userPhone: this.login_form.username,
              userPassword: this.login_form.password
            })
          )
          .then(response => {
            if (response.data.status === 200) {
              this.$cookies.set("userId", response.data.data.userId);
              this.api.userId = response.data.data.userId;
              this.loginDialogFormVisible = false;
              window.location.reload();
              this.$router.push("/");
              this.$message({
                message: "登录成功",
                type: "success"
              });
              //现在登录将会导致fileId消失，菜单被禁用。可以在这里让它跳转到Upload，但更好的方法是让fileId不会掉
            } else {
              this.$message.error("登陆失败");
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
    logout() {
      this.popup_visible = false;
      this.$cookies.remove("userId");
      this.api.userId = "";
      window.location.reload();
      this.$router.push("/");
      this.$message({
        message: "已成功退出",
        type: "success"
      });
    },
    signup() {
      if (
        this.signup_form.username.length > 20 ||
        this.signup_form.password.length > 20 ||
        this.signup_form.username.length < 6 ||
        this.signup_form.password.length < 6
      ) {
        this.$message.error("用户名和密码长度均应在6~20之间");
      } else {
        if (this.signup_form.password == this.signup_form.password_2) {
          this.$axios
            .post(
              this.api.registerAPI,
              this.qs.stringify({
                userPhone: this.signup_form.username,
                userPassword: this.signup_form.password
              })
            )
            .then(response => {
              if (response.data.status == 200) {
                this.$message({
                  message: "注册成功，请登录",
                  type: "success"
                });
                // alert("注册成功，请登录");
                this.signupDialogFormVisible = false;
              } else {
                if (response.data.status == 500) {
                  this.$message.error("用户名已存在");
                  // alert("用户名已存在");
                } else {
                  this.$message.error("注册失败");
                  // alert("注册失败");
                }
              }
              // window.console.log(response.data);
            })
            .catch(error => {
              this.$message({
                message: "服务器错误",
                type: "warning"
              });
              // alert("服务器错误")
              window.console.log(error);
            });
        } else {
          this.$message.error("两次密码输入不一致");
          // alert("两次密码输入不一致");
        }
      }
    },
    gotoHelp() {
      this.$router.push("/Panel/PanelHelp");
    },
    search() {
      var url;
      if (this.input == "") {
        // alert("请输入搜索内容");
        this.$message.error("请输入搜索内容");
      } else {
        // alert(""+this.searchEngine)
        if (this.select == "百度搜索") {
          url = "https://www.baidu.com/s?wd=" + this.input;
        } else if (this.select == "360良医") {
          url = "http://ly.so.com/s?q=" + this.input;
        } else {
          url = "http://search.dxy.cn/?words=" + this.input;
        }
        window.open(url, "_blank").location;
      }
    },
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
/* html,
body,
#app {
  height: 100%;
} */
.divider-main {
  padding: 0px;
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
</style>