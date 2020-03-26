<template>
  <div>
    <el-dialog title="登录" :visible.sync="loginDialogFormVisible">
      <el-form :model="login_form" label-position="right">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="login_form.username" autocomplete="off" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input placeholder="请输入密码" v-model="login_form.password" show-password style="width:70%"></el-input>
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
          <el-input placeholder="请输入密码" v-model="signup_form.password" show-password style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="重复输入密码" :label-width="formLabelWidth">
          <el-input placeholder="请重复输入密码" v-model="signup_form.password_2" show-password style="width:70%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="signupDialogFormVisible = false;">取 消</el-button>
        <el-button type="primary" @click="signup">确 定</el-button>
      </div>
    </el-dialog>

    <el-container height="100%">
      <el-header>
        <div style="float:right;margin-top:26px">
          <el-popover placement="top" width="160" v-model="popup_visible">
            <p v-if="this.api.userId!=''">用户{{this.api.userId}}，确定退出吗？</p>
            <div style="text-align: right; margin: 0" v-if="this.api.userId!=''">
              <el-button size="mini" type="text" @click="logout">确定</el-button>
              <el-button type="primary" size="mini" @click="popup_visible = false">取消</el-button>
            </div>
            <p v-if="this.api.userId==''">欢迎使用。您想登录还是注册？</p>
            <div style="text-align: right; margin: 0" v-if="this.api.userId==''">
              <el-button size="mini" type="text" @click="popup_visible = false;signupDialogFormVisible=true">注册
              </el-button>
              <el-button type="primary" size="mini" @click="popup_visible = false;loginDialogFormVisible=true">登录
              </el-button>
            </div>
            <el-avatar shape="square" size="large" :src="squareUrl" style="margin-left:20px" slot="reference"
              @click="popup_visible=true"></el-avatar>
          </el-popover>
        </div>
        <img src="../assets/lung2.jpg" width="50px" style="float:left;margin-top:20px">
        <h1 style="font-size:30px;margin-left: 0%;float:left;cursor: pointer;">肺结节AI检测系统</h1>

        <span style="font-size:20px;margin-left: 1%;float:left;margin-top:30px;margin-left: 2%;cursor: pointer;"
          @click="signupDialogFormVisible=true">
          <el-divider direction="vertical" style="float:left; height:100px"></el-divider>立即注册
        </span>
        <span style="font-size:20px;margin-left: 1%;float:left;margin-top:30px;margin-left: 2%;cursor: pointer;"
          @click="loginDialogFormVisible=true" v-if="this.api.userId==''">
          <el-divider direction="vertical" style="float:left; height:100px"></el-divider>立即登录
        </span>
        <span style="font-size:20px;margin-left: 1%;float:left;margin-top:30px;margin-left: 2%;cursor: pointer;"
          @click="gotoIntro" v-if="!intro">
          <el-divider direction="vertical" style="float:left; height:100px"></el-divider>关于我们
        </span>
        <span style="font-size:20px;margin-left: 1%;float:left;margin-top:30px;margin-left: 2%;cursor: pointer;"
          @click="gotoIntro" v-if="intro">
          <el-divider direction="vertical" style="float:left; height:100px"></el-divider>返回主页
        </span>
        <span style="font-size:20px;margin-left: 1%;float:left;margin-top:30px;margin-left: 2%;cursor: pointer;" @click="gotoManage" v-if="this.api.userId=='root'">
          <el-divider direction="vertical" style="float:left; height:100px"></el-divider>平台管理
        </span>
      </el-header>
      <!-- <div> -->
      <transition name="outroduction">
        <el-main class="bg-image" v-if="!intro">
          <div style="font-size:55px;color:white;margin-top:10%;"><b>欢迎使用肺结节AI检测系统</b></div>
          <div style="font-size:30px;color:white;margin-top:1%;margin-bottom:10%;">即刻上传患者肺部图像，快速定位肺结节</div>
          <div style="text-align:center;margin-bottom: 15%">
            <span id="rect_oneclick" style="display:inline-block;cursor: pointer;" @click="toPanel">
              <div style="color:white;">
                <h2>立即使用</h2>
              </div>
            </span>
            <span id="rect_ordinary" style="display:inline-block;margin-left: 1%;cursor: pointer;" @click="toHelp">
              <div style="color:white;">
                <h2>了解更多</h2>
              </div>
            </span>
          </div>
          <!-- <div class="bg-image">
        what</div>-->
        </el-main>
      </transition>
      <transition name="introduction">
        <el-main v-if="intro">
          <div>
            <div style="margin-top:8%;font-size:35px;">什么是E-Lung？</div>
            <div style="margin-top:5%">
              <el-row>
                <el-col style="width:30%;margin-left:15%">
                  <img src="../assets/logo.png">
                </el-col>
                <el-col style="width:30%;margin-left:10%">
                  <div style="font-size:25px;text-align: left;margin-top:15px">
                    <b>这正是你所需要的工具</b>
                  </div>
                  <div style="font-size:20px;margin-top: 10px;text-align: left">
                    这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你</div>
                </el-col>
              </el-row>
            </div>

            <div style="margin-top:15%">
              <el-row>
                <el-col style="width:30%;margin-left:15%">
                  <div style="font-size:25px;text-align: left;margin-top:15px">
                    <b>这正是你所需要的工具</b>
                  </div>
                  <div style="font-size:20px;margin-top: 10px;text-align: left">
                    这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你</div>
                </el-col>
                <el-col style="width:30%;margin-left:10%">
                  <img src="../assets/logo.png">
                </el-col>
              </el-row>
            </div>

            <div style="margin-top:15%">
              <el-row>
                <el-col style="width:30%;margin-left:15%">
                  <img src="../assets/logo.png">
                </el-col>
                <el-col style="width:30%;margin-left:10%">
                  <div style="font-size:25px;text-align: left;margin-top:15px">
                    <b>这正是你所需要的工具</b>
                  </div>
                  <div style="font-size:20px;margin-top: 10px;text-align: left">
                    这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你</div>
                </el-col>
              </el-row>
            </div>

            <div style="margin-top:15%;margin-bottom: 15%">
              <el-row>
                <el-col style="width:30%;margin-left:15%">
                  <div style="font-size:25px;text-align: left;margin-top:15px">
                    <b>这正是你所需要的工具</b>
                  </div>
                  <div style="font-size:20px;margin-top: 10px;text-align: left">
                    这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你所需的工具这正是你</div>
                </el-col>
                <el-col style="width:30%;margin-left:10%">
                  <img src="../assets/logo.png">
                </el-col>
              </el-row>
            </div>

            <router-link to="/Panel/Upload" style="color:black;text-decoration: none;">
              <div style="font-size:35px;margin-bottom: 10%">
                立即尝试
                <img src="../assets/right.jpg" width="25px" height="auto" style="margin-left:10px">
              </div>
            </router-link>
          </div>
        </el-main>
      </transition>
      <el-footer style="background:#EEEEEE;height:90px">
        <div>
          <el-col :span=8 style="text-align: left">
            <div style="margin-top:25px;cursor:pointer;display: inline-block;margin-left:10px;" @click="switchLanguage"><img src="../assets/earth.png" style="width:15%;height:auto;float:left;" /><span style="margin-left:5px;float:left;margin-top:7px">中文 - 简体</span></div>
          </el-col>
          <el-col :span=8>
            <div style="font-size:12px;margin-top:10px">2020.3 Version 0.1.0</div>
            <div style="font-size:12px;margin-top:10px">2020 © Lung AI</div>
          </el-col>
          <el-col :span=8></el-col>
        </div>


      </el-footer>
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
        searchEngine: "",
        popup_visible: false,
        intro: false,
      };
    },
    components: {},
    mounted() { },
    methods: {
      gotoManage(){
        this.$router.push("/Manage/Overall")
      },
      toPanel() {
        this.$router.push("/Panel/Upload");
      },
      toHelp(){
        this.$router.push("/Help");
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
      gotoIntro() {
        // this.$router.push('/Ordinary/Help')
        this.intro = !this.intro;
      },
      switchLanguage(){
        //TODO
      }
    }
  };
</script>

<style scoped>
  .bg-image {
    margin-top: 30px;
    background-image: url(../assets/background.jpg);
    width: 100%;
    height: 100%;
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
    /* overflow: hidden;

        background-size: cover; */
    /* 或者background-size: 100%; */
    transition: 0.5s;
  }

  .outroduction-enter-active,
  .outroduction-leave-active {
    transition: opacity .5s;
    transition: translateY(100%)
  }

  .outroduction-enter,
  .outroduction-leave-to

  /* .introduction-leave-active below version 2.1.8 */
    {
    opacity: 0;
  }

  .introduction-enter-active {
    transition: all .8s ease;
  }

  .introduction-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .introduction-enter,
  .introduction-leave-to

  /* .introduction-leave-active for below version 2.1.8 */
    {
    transform: translateY(100%);
    opacity: 0;
  }

  #rect_oneclick {
    box-shadow: 0 3px 5px 0 rgba(47, 55, 213, 0.3);
    background: #67c23a;
    width: 200px;
    height: 75px;
    transition: transform 0.5s;
  }

  #rect_ordinary {
    box-shadow: 0 3px 5px 0 rgba(47, 55, 213, 0.3);
    background: #409eff;
    width: 200px;
    height: 75px;
    transition: transform 0.5s;
  }

  #rect_ordinary:hover {
    box-shadow: 0 10px 20px 0 rgba(47, 55, 213, 0.3);
    transform: scale(1.05);
  }

  #rect_oneclick:hover {
    box-shadow: 0 10px 20px 0 rgba(47, 55, 213, 0.3);
    transform: scale(1.05);
  }
</style>