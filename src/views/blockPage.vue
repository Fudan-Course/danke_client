<template>
  <el-container id="mainpage">

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
      <div align="center">
        <el-row>
          <el-col :span="9" :offset="3" class="title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <!-- 未给出路径 -->
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ area }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ dept }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row> 

        <el-row>
          <el-col :span="3" :offset="3" class="title">
            {{dept}}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3" :offset="3" class="subtitle">
            副标题
          </el-col>
        </el-row>

        <div v-for="department in subblock" :key="department">
          <el-row>
            <el-card class="block">
              <el-row type="flex" align="middle">
                <el-col :span="16">
                  <el-row style="text-align:left;">
                    <!-- 改成了文字链接跳转，在href处输入链接 -->
                    <el-link :underline="false" class="subtitle" v-on:click="go_to_forum(department.id)">{{ department.title }}</el-link>
                  </el-row>
                  <el-row class="subsubtitle" style="text-align:left;">
                    {{ department.subtitle }}
                  </el-row>
                </el-col>
                <el-col :span="8">
                  <el-row type="flex" align="middle" class="newestreply">
                    {{ department.last_reply_topic_title }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    摘要：{{ department.last_reply_preview }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复者：{{ department.last_reply_user_nickname }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复时间：{{ department.last_reply_time }}
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-row>
        </div>

        <el-pagination small layout="prev, pager, next" :page-size="6" :total="100" background="true" class="forumbox"></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie.js";
import axios from 'axios';
export default {
  name: 'BlockPage',
  data(){
    return {
      logourl: require("../assets/Danke_logo.png"),
      username: 'Gromah',
      login: true,
      area: '课程评价',
      dept: '计算机系',
      subblock: [{id: 1, title: '子板块一', subtitle: '副标题', last_reply_topic_title: '新帖：XXXXX', last_reply_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'},
      {id: 2, title: '子板块二', subtitle: '副标题', last_reply_topic_title: '新帖：XXXXX', last_reply_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'},
      {id: 3, title: '子版块三', subtitle: '副标题', last_reply_topic_title: '新帖：XXXXX', last_reply_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'}]
    }
  },
  mounted() {
    if(getCookie() == ""){
      //TODO: 路由到登录页
    }
    const path = "http://127.0.0.1:8000/api/vi/auth/forums/"
    axios.get(path+this.$route.params.forum_id, {
      session_id: getCookie()
    }).then(function(response) {
      let data = response.data
      this.area = data.supforums[0].title
      this.dept = data.title
      this.subblock = data.subforums
    }).catch(function(error) {
      console.log(error);
    })
  },
  methods: {
    go_to_forum: function(id) {
      this.$router.push({
        name: 'TiePage',
        params: {forum_id: id}
      })
    },
    handleCommand: function(command) {
      if(command == "changeProfile"){
        this.$message('跳转到个人资料页');
        this.$router.push("/ProfilePage")
      }
      else if(command == "logout"){
        this.login = false;
        this.$message('退出登录');
        delCookie()
        this.$router.push("/")
      }
      else{
        this.$message('什么事都没有发生');
        // 为之后的功能做准备
      }
    },
    loginAc: function(){
      this.login = true;
      this.$message('登录');
      delCookie()
      this.$router.push("/")
    },
  },
  props: {
    msg: String
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
    _height: 0px;
    min-height: 250px;
  }
  .block{
    background: #CAE1FF;
    width: 80%;
  }
  .title{
    color: #104E8B;
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 10px;
    text-align: left;
  }
  .subtitle{
    color: #104E8B;
    font-weight: bold;
    font-size: 20px;
    text-align: left;
  }
  .subsubtitle{
    color: #104E8B;
    font-size: 15px;
  }
  .tietitle{
    color: #000000;
    margin-right: 10px;
  }
  .newestreply{
    font-weight: bold;
    font-size: 15px;
  }
  .replymsg{
    font-size: 10px;
  }
</style>
