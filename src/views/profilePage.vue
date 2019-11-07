<template>
  <el-container id="profilePage">

    <el-header class="head">
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <el-image style="width:60px;height:60px" :src="logourl"></el-image>
        </el-col>
        <el-col :span="9" :offset="12" v-if="login" class="profile">
          欢迎，{{ username }}。
          <el-dropdown  @command="handleCommand">
            <span class="el-dropdown-link">
              选项<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changeProfile">个人资料</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="6" :offset="15" v-else>
          <el-button type="primary" round="true" @click.native="loginAc">登录</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main class="forumbox">
      <el-row class="title" align="center">
          个人资料
      </el-row>
      <el-card class="personalProfile">
        <el-row class="profileRow">
          <el-input placeholder="请填写昵称" v-model="nickname" v-bind:disabled="disableChange" maxlength="10" show-word-limit>
            <template slot="prepend">昵称：</template>
          </el-input>
        </el-row>
        <el-row class="profileRow">
          <el-input placeholder="请填写用户名" v-model="username" v-bind:disabled="disableChange" maxlength="10" show-word-limit>
            <template slot="prepend">用户名：</template>
          </el-input>
        </el-row>
        <el-row class="profileRow">
          <el-input placeholder="请填写邮箱" v-model="email" v-bind:disabled="disableChange">
            <template slot="prepend">邮箱：</template>
          </el-input>
        </el-row>
        <el-row class="profileRow">
          <el-input placeholder="请填写个人介绍" v-model="intro" v-bind:disabled="disableChange" maxlength="50" show-word-limit>
            <template slot="prepend">个人介绍：</template>
          </el-input>
        </el-row>
      </el-card>
      <el-row class="profileRow" v-if="disableChange">
        <el-button type="warning" @click.native="change">修改资料</el-button>
      </el-row>
      <div v-else>
        <el-row class="profileRow" >
          <el-button type="success" @click.native="submitChange">提交修改</el-button>
        </el-row>
        <el-row class="profileRow">
          <el-button type="danger"  @click.native="discardChange">放弃修改</el-button>
        </el-row>
    </div>
    </el-main>
  </el-container>
</template>

<script>
import {setCookie, getCookie, delCookie} from '../assets/js/cookie.js'
import axios from 'axios';
export default {
  name: 'ProfilePage',
  props: {
    msg: String
  },
  mounted(){
    let uid = getCookie(cname='user_id')
    if(uid == ""){
      this.$router.push('/')
    }else{
      let that = this
      let path = 'http://127.0.0.1:8000/api/v1/users/' + uid + '/profile'
      axios.get(path, {
        
      })
        .then(function (response) {
          that.username = response.data.username
          that.nickname = response.data.nickname
          that.email = response.data.email
          that.intro = response.data.description
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function (){

        })
    }
  },
  methods: {
      handleCommand: function(command) {
        if(command == "changeProfile"){
          this.$message('跳转到个人资料页');

          // =================应该是跳转到“主页”吧？
          // TODO:
          // 做好后删掉弹窗
        }
        else if(command == "logout"){
          this.login = false;
          this.$message('退出登录');
          // TODO: DONE
          // 做好后删掉弹窗
          delCookie()
        }
        else{
          this.$message('什么事都没有发生');
          // 为之后的功能做准备
        }
      },
      loginAc: function(){
        this.login = true;
        this.$message('登录');
        // TODO: DONE
        // 做好后删掉弹窗
        setTimeout(function(){
          this.$router.push('/')
        }, 500)
      },
      change: function(){
        this.nicknameBackup = this.nickname;
        this.usernameBackup = this.username;
        this.emailBackup = this.email;
        this.introBackup = this.intro;
        this.disableChange = false;
      },
      submitChange: function(){
        // this.$message('提交修改到后端');
        // this.disableChange = true;
        // TODO: DONE
        // 做好后删掉弹窗
        let uid = getCookie(cname='user_id')
        let session_id = getCookie()
        let that = this
        let path = 'http://127.0.0.1:8000/api/v1/users/' + uid + '/profile'
        axios.put(path, {
          session_id: session_id
        })
          .then(function (response){
            let respcode = response.data.err_code
            let resphint = response.data.message
            if(respcode == 0){
              that.nicknameBackup = that.nickname
              that.usernameBackup = that.username
              that.emailBackup = that.email
              that.introBackup = that.intro
            }else{
              
            }
            that.$message(resphint)
            that.disableChange = true
          })
          .catch(function (error){
            console.log(error)
          })
          .finally(function (){

          })
      },
      discardChange: function(){
        this.nickname = this.nicknameBackup;
        this.username = this.usernameBackup;
        this.email = this.emailBackup;
        this.intro = this.introBackup;
        this.$message('撤销修改');
        this.disableChange = true;
        // TODO:
        // 做好后删掉弹窗
      }
  },
  data(){
    return {
      logourl: require("../assets/Danke_logo.png"),
      username: 'Gromah',
      login: true,
      disableChange: true,
      nickname: '无敌高大爷',
      email: "GromahIsLovedByEveryone@fudan.edu.cn",
      intro: "我是高大爷，我是最强的！",
      // 仅用于伪交互功能，实现交互后请删除
      // - 没关系，挂载的时候可以把它覆盖掉，留着当彩蛋吧hhh
      nicknameBackup: "",
      usernameBackup: "",
      emailBackup: "",
      introBackup: "",
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head{
    background: #104E8B;
    box-shadow: 5px 5px 3px 0px #E5E5E5;
  }
  .profile{
    color: #F5F5F5;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #F5F5F5;
  }
  .forumbox{
    background: #F0F4FF;
    _height: 650px;
    min-height: 650px;
  }
  .personalProfile{
    margin: 20px;
  }
  .profileRow{
    margin-bottom: 20px;
  }
  .title{
    color: #104E8B;
    font-weight: bold;
    font-size: 30px;
  }
</style>
