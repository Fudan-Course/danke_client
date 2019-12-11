<template>
  <div class="register-wrap" style="margin-top: 60px">
    <img src="../assets/Danke_logo.png" style="text-align: center; height: 250px; width: 250px" />
    <br />
    <br />
    <div class="register-wrap" v-show="showLogin">
      <h3 style="font-size: 20px">登 录</h3>
      <br />
      <p v-show="showTishi">{{tishi}}</p>
      <el-input placeholder="请输入邮箱" v-model="username" prefix-icon="el-icon-user" test-input1-login></el-input>
      <br />
      <el-input
        placeholder="请输入密码"
        v-model="password"
        prefix-icon="el-icon-lock"
        show-password
        test-input2-login
      ></el-input>
      <br />
      <el-button type="primary" v-on:click="login" test-button-login>登录</el-button>
      <br />
      <br />
      <span v-on:click="ToRegister" test-span-login>没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3 style="font-size: 20px">注 册</h3>
      <br />
      <p v-show="showTishi">{{tishi}}</p>

      <el-input
        placeholder="请输入用户名"
        v-model="newNickname"
        prefix-icon="el-icon-user"
        test-input1-register
      ></el-input>
      <br />
      <el-input
        placeholder="请输入邮箱"
        v-model="newUsername"
        prefix-icon="el-icon-user"
        test-input2-register
      ></el-input>
      <br />
      <br />
      <el-input
        placeholder="请输入密码"
        v-model="newPassword"
        prefix-icon="el-icon-lock"
        show-password
        test-input3-register
      ></el-input>
      <br />
      <el-input
        placeholder="请再次输入密码"
        v-model="newPasswordConfirm"
        prefix-icon="el-icon-lock"
        show-password
        test-input3-register
      ></el-input>
      <br />
      <el-button type="primary" v-on:click="register" test-button-register>注册</el-button>
      <br />
      <br />
      <span v-on:click="ToLogin" test-span-register>已有账号？马上登录</span>
    </div>

    <div>
      <el-dialog title="验证码已发送至您的邮箱！" :visible.sync="dialogFormVisible">
        <p v-show="showVerifyResult">{{verify_result}}</p>
        <el-input placeholder="请输入验证码" v-model="verified_code" autocomplete="off"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" style="width: 100px">取 消</el-button>
          <el-button type="primary" @click="verify" style="width: 100px">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<style>
.register-wrap {
  text-align: center;
}
button {
  width: 300px;
  height: 40px;
  line-height: 40px;
  border: none;
  font-size: 16px;
  margin-bottom: 5px;
}
span {
  cursor: pointer;
  font-size: 16px;
}
span:hover {
  color: #2d8bef;
}
p {
  color: red;
  font-size: 16px;
}
.el-input {
  width: 300px;
  size: "large";
}
.el-button {
  width: 300px;
  height: 40px;
}
</style>


<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie.js";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: "",
      username: "",
      password: "",
      newUsername: "",
      newPassword: "",
      newPasswordConfirm: "",
      newNickname: "",
      verified_code: "",
      dialogFormVisible: true,
      showVerifyResult: false,
      verify_result: ""
    };
  },
  mounted() {
    if (getCookie()) {
      this.$router.push("/MainPage");
    }
  },
  methods: {
    login() {
      var that = this;
      const path = "http://127.0.0.1:8000/api/v1/auth/login";

      axios
        .post(path, {
          username_or_email: that.username,
          password: that.password
        })
        .then(function(response) {
          console.log(response);
          let respcode = response.data.err_code;
          let resphint = response.data.message;
          let respsession = response.data.session_id;

          that.tishi = resphint;
          if (respcode == 0) {
            that.showTishi = true;
            setCookie("user_id", response.data.user_id, respsession, 1000 * 60);
            const path_post_code = "http://127.0.0.1:8000/api/v1/auth/send_code";
            axios
              .post(path_post_code, {
                session_id: respsession
              })
              .then(function(response) {
                console.log(response);
                if (response.data.err_code == 0) {
                  dialogFormVisible = true;
                } else {
                  delCookie();
                  that.$router.push("/")
                }
              });
            dialogFormVisible = true;

            setTimeout(
              function() {
                that.$router.push("/mainPage"); // Router to main page
              }.bind(that),
              1000
            );
          } else if (respcode == 1) {
            that.username = "";
            that.password = "";
            that.showTishi = true;
          } else if (respcode == 2) {
            that.username = "";
            that.password = "";
            that.showTishi = true;
          } else if (respcode == 3) {
            that.username = "";
            that.password = "";
            that.showTishi = true;
          } else if (respcode == 4) {
            that.password = "";
            that.showTishi = true;
          } else if (respcode == 9) {
            that.username = "";
            that.password = "";
            that.tishi = "Error";
            that.showTishi = true;
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {});
    },
    verify() {
      var that = this;
      const path = "http://127.0.0.1:8000/api/v1/auth/verify"
      axios
        .post(path, {
          session_id: getCookie(),
          code: that.verified_code
        })
        .then(function(response) {
          if(response.data.err_code == 0){
            that.$router.push("/MainPage");
          }else if(response.data.err_code == 2){
            that.verify_result = "验证码错误！"
            that.showVerifyResult = true;
            setTimeout(function() {
              that.verify_result = "";
              that.showVerifyResult = false;
            }, 2000);
          }else {
            delCookie();
            that.$router.push("/");
          }
        })
    },
    register() {
      var that = this;
      const path = "http://127.0.0.1:8000/api/v1/auth/register";
      if (that.newPassword != that.newPasswordConfirm) {
        that.tishi = "两次密码输入不符！";
        that.showTishi = true;
        setTimeout(function() {
          that.showTishi = false;
          that.tishi = "";
          that.newPassword = "";
          that.newPasswordConfirm = "";
        }, 2000);
        return;
      }
      axios
        .post(path, {
          username: that.newNickname,
          email: that.newUsername,
          password: that.newPassword
        })
        .then(function(response) {
          console.log(response);
          let respcode = response.data.err_code;
          let resphint = response.data.message;

          that.tishi = resphint;
          if (respcode == 0) {
            that.showTishi = true;
            setTimeout(
              function() {
                that.newUsername = "";
                that.newPassword = "";
                that.newNickname = "";
                that.username = "";
                that.password = "";
                that.showRegister = false;
                that.showLogin = true;
                that.showTishi = false;
              }.bind(this),
              2000
            );
          } else if (respcode == 1) {
            that.newNickname = "";
            that.showTishi = true;
          } else if (respcode == 2) {
            that.newPassword = "";
            that.showTishi = true;
          } else if (respcode == 3) {
            that.newUsername = "";
            that.showTishi = true;
          } else if (respcode == 4) {
            that.newNickname = "";
            that.showTishi = true;
          } else if (respcode == 5) {
            that.newUsername = "";
            that.showTishi = true;
          } else if (respcode == 9) {
            that.newUsername = "";
            that.newPassword = "";
            that.newNickname = "";
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {});
    },
    post_verified_code() {},
    ToRegister() {
      this.showTishi = false;
      this.showRegister = true;
      this.showLogin = false;
      this.username = "";
      this.password = "";
    },
    ToLogin() {
      this.showTishi = false;
      this.showRegister = false;
      this.showLogin = true;
      this.newUsername = "";
      this.newPassword = "";
    }
  }
};
</script>

<style scoped>
</style>
