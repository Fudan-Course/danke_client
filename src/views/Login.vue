<template>
  <div class="register-wrap" style="margin-top: 60px">
    <img src="../assets/Danke_logo.png" style="text-align: center; height: 250px; width: 250px">
    <br><br>
    <div class="register-wrap" v-show="showLogin">
      <h3 style="font-size: 20px">登   录</h3>
      <br>
      <p v-show="showTishi">{{tishi}}</p>
      <el-input placeholder="请输入邮箱" v-model="username" size="large" prefix-icon="el-icon-user" style="width: 300px;"></el-input><br>
      <el-input placeholder="请输入密码" v-model="password" size="large" prefix-icon="el-icon-lock" style="width: 300px;" show-password></el-input><br>
      <el-button type = "primary" v-on:click="login" style="width: 300px; height:40px">登录</el-button><br><br>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3 style="font-size: 20px">注   册</h3>
      <br>
      <p v-show="showTishi">{{tishi}}</p>
      <el-input placeholder="请输入邮箱" v-model="newUsername" size="large" prefix-icon="ios-person" style="width: 300px;"></el-input><br>
      <el-input placeholder="请输入密码" v-model="newPassword" size="large" style="width: 300px;" show-password></el-input><br>
      <el-button type="primary" v-on:click="register" >注册</el-button><br><br>
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<style>

</style>

<script>
  export default{
    // name: "Login",
    data(){
      return{
        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        username: '',
        password: '',
        newUsername: '',
        newPassword: ''
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>

</style>
