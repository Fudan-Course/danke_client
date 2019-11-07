<template>
  <div class="register-wrap" style="margin-top: 60px">
    <img src="../assets/Danke_logo.png" style="text-align: center; height: 250px; width: 250px">
    <br><br>
    <div class="register-wrap" v-show="showLogin">
      <h3 style="font-size: 20px">登   录</h3>
      <br>
      <p v-show="showTishi">{{tishi}}</p>
      <el-input placeholder="请输入邮箱" v-model="username" size="large" prefix-icon="el-icon-user" style="width: 300px;" test-input1-login></el-input><br>
      <el-input placeholder="请输入密码" v-model="password" size="large" prefix-icon="el-icon-lock" style="width: 300px;" show-password test-input2-login></el-input><br>
      <el-button type = "primary" v-on:click="login" style="width: 300px; height:40px" test-button-login>登录</el-button><br><br>
      <span v-on:click="ToRegister" test-span-login>没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3 style="font-size: 20px">注   册</h3>
      <br>
      <p v-show="showTishi">{{tishi}}</p>
      
      <el-input placeholder="请输入用户名" v-model="newNickname" size="large" prefix-icon="el-icon-user" style="width: 300px;" test-input1-register></el-input><br>
      <el-input placeholder="请输入邮箱" v-model="newUsername" size="large" prefix-icon="el-icon-user" style="width: 300px;" test-input2-register></el-input><br>
      <el-input placeholder="请输入密码" v-model="newPassword" size="large" prefix-icon="el-icon-lock" style="width: 300px;" show-password test-input3-register></el-input><br>
      <el-button type="primary" v-on:click="register" style="width: 300px; height:40px" test-button-register>注册</el-button><br><br>
      <span v-on:click="ToLogin" test-span-register>已有账号？马上登录</span>
    </div>
  </div>
</template>


<style>
  .register-wrap{text-align:center;}
  Button{width:300px; height:40px; line-height: 40px;border:none;font-size:16px; margin-bottom:5px;}
  span{cursor:pointer;font-size:16px}
  span:hover{color:#2d8bef;}
  p{color:red; font-size:16px}
</style>


<script>
  import {setCookie,getCookie} from '../assets/js/cookie.js';
  import axios from 'axios';
  export default{
    name: "Login",
    data(){
      return{
        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        newNickname: ''
      }
    },
    mounted(){
      if(getCookie()){
        // if(getCookie('username')== 'admin')
        //   this.$router.push('/admin_page')
        // else
        //   this.$router.push('/personal_page')
        this.$router.push('/MainPage')
      }
    },
    methods:{
      login(){
        var that = this
        const path = 'http://127.0.0.1:8000/api/v1/auth/login'
        axios.post(path, {
          username_or_email: that.username,
          password: that.password
        })
          .then(function (response) {
            console.log(response)
            let respcode = response.data.err_code
            let resphint = response.data.message
            let respsession = response.data.session_id

            that.tishi = resphint
            if(respcode == 0){
              that.showTishi = true
              setCookie('user_id', response.data.user_id, respsession ,1000*60)
              setTimeout(function(){
                that.$router.push('/mainPage') // Router to main page
              }.bind(that),1000)
            }else if(respcode == 1){
              that.username = ''              
              that.password = ''
              that.showTishi = true
            }else if(respcode == 2){
              that.username = ''              
              that.password = ''
              that.showTishi = true
            }else if(respcode == 3){
              that.username = ''              
              that.password = ''
              that.showTishi = true
            }else if(respcode == 4){
              that.password = ''
              that.showTishi = true
            }else if(respcode == 9){
              that.username = ''              
              that.password = ''
              that.tishi = 'Error'
              that.showTishi = true
            }else{

            }

          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function (){

          })
      },
      register(){
        var that = this
        const path = 'http://127.0.0.1:8000/api/v1/auth/register'
        axios.post(path, {
          username: that.newNickname,
          email: that.newUsername,
          password: that.newPassword
        })
          .then(function (response) {
            console.log(response)
            let respcode = response.data.err_code
            let resphint = response.data.message

            that.tishi = resphint
            if(respcode == 0){
              that.showTishi = true
              setTimeout(function(){
                that.newUsername = ''
                that.newPassword = ''
                that.newNickname = ''
                that.username = ''
                that.password = ''
                that.showRegister = false
                that.showLogin = true
                that.showTishi = false
              }.bind(this),2000)
            }else if (respcode == 1){
              that.newNickname = ''
              that.showTishi = true
            }else if (respcode == 2){
              that.newPassword = ''
              that.showTishi = true
            }else if (respcode == 3){
              that.newUsername = ''
              that.showTishi = true
            }else if (respcode == 4){
              that.newNickname = ''
              that.showTishi = true
            }else if (respcode == 5){
              that.newUsername = ''
              that.showTishi = true
            }else if (respcode == 9){
              that.newUsername = ''
              that.newPassword = ''
              that.newNickname = ''
            }else{

            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function (){

          })
      },
      ToRegister(){
        this.showTishi =false
        this.showRegister = true
        this.showLogin = false
        this.username =''
        this.password =''
      },
      ToLogin(){
        this.showTishi =false
        this.showRegister = false
        this.showLogin = true
        this.newUsername =''
        this.newPassword =''
      }
    }
  }
</script>

<style scoped>

</style>
