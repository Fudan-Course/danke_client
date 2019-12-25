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
              <el-breadcrumb-item :to="{ path: '/MainPage' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ area }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ dept }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ sub }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3" :offset="3" class="title">
            {{sub}}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3" :offset="3" class="subtitle">
            {{sub_title}}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3" :offset="1" class="subsubtitle">
            置顶帖
          </el-col>
        </el-row>

        <div v-for="department in zhiding" :key="department">
          <el-row>
            <el-card class="block">
              <el-row type="flex" align="middle">
                <el-col :span="16">
                  <el-row style="text-align:left;">
                    <!-- 改成了文字链接跳转，在href处输入链接 -->
                    <el-link :underline="false" class="subtitle" v-on:click="go_to_topic(department.id)">{{ department.title }}</el-link>
                  </el-row>
                  <el-row class="subsubtitle" style="text-align:left;">
                    {{ department.preview }}
                  </el-row>
                  <el-row class="num" style="text-align:left;">
                    发帖人：{{ department.user.nickname }}，回复数：{{ department.count_posts }}，浏览数：{{ department.count_views }}
                  </el-row>
                </el-col>
                <el-col :span="8">
                  <el-row type="flex" align="middle" class="newestreply">
                    {{ department.last_reply_post_title }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    摘要：{{ department.last_reply_post_preview }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复者：{{ department.last_reply_user_nickname }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复时间：{{ department.time }}
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-row>
        </div>

        <!-- 同样也没做排序回复事件和方法 -->
        <el-row>
          <el-col :span="12" :offset="3" class="subtitle">
            <el-button type="text">最新回复</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text">最多回复</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text">最多点赞</el-button>
          </el-col>
          <el-col :span="9" class="subtitle">
            <el-popover placement="bottom" width="500">
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="mainreply"></el-input>
              <!-- 未绑定回复事件 -->
              <el-button type="info" size="mini" class="replybtn">发布帖子</el-button>
              <el-button type="text" slot="reference">发布帖子</el-button>
            </el-popover>
          </el-col>
        </el-row>

        <div v-for="department in tiezi" :key="department">
          <el-row>
            <el-card class="block">
              <el-row type="flex" align="middle">
                <el-col :span="16">
                  <el-row style="text-align:left;">
                    <!-- 改成了文字链接跳转，在href处输入链接 -->
                    <el-link :underline="false" class="subtitle" v-on:click="go_to_topic(department.id)">{{ department.title }}</el-link>
                  </el-row>
                  <el-row class="subsubtitle" style="text-align:left;">
                    {{ department.preview }}
                  </el-row>
                  <el-row class="num" style="text-align:left;">
                    发帖人：{{ department.user.nickname }}，回复数：{{ department.count_posts }}，浏览数：{{ department.count_views }}，
                  </el-row>
                </el-col>
                <el-col :span="8">
                  <el-row type="flex" align="middle" class="newestreply">
                    {{ department.last_reply_post_title }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    摘要：{{ department.last_reply_post_preview }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复者：{{ department.last_reply_user_nickname }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复时间：{{ department.time }}
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
  name: 'TiePage',
  data(){
    return {
      logourl: require("../assets/Danke_logo.png"),
      username: 'Gromah',
      login: true,
      area: '课程评价',
      dept: '计算机系',
      sub: '子板块一',
      sub_title: '副标题',
      mainreply: '',
      zhiding: [{id: 1, title: '置顶一', preview: '摘要', user: {nickname: 'Gromah'}, count_posts: 0, count_views: 0, last_reply_post_title: '新回复：XXXXX', last_reply_post_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'},
      {id: 2, title: '置顶二', preview: '摘要', user: {nickname: 'Gromah'}, count_posts: 0, count_views: 0, last_reply_post_title: '新回复：XXXXX', last_reply_post_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'},
      {id: 3, title: '置顶三', preview: '摘要', user: {nickname: 'Gromah'}, count_posts: 0, count_views: 0, last_reply_post_title: '新回复：XXXXX', last_reply_post_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'}],
      tiezi: [{id: 4, title: '帖子一', preview: '摘要', user: {nickname: 'Gromah'}, count_posts: 0, count_views: 0, last_reply_post_title: '新回复：XXXXX', last_reply_post_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'},
      {id: 5, title: '帖子二', preview: '摘要', user: {nickname: 'Gromah'}, count_posts: 0, count_views: 0, last_reply_post_title: '新回复：XXXXX', last_reply_post_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'},
      {id: 6, title: '帖子三', preview: '摘要', user: {nickname: 'Gromah'}, count_posts: 0, count_views: 0, last_reply_post_title: '新回复：XXXXX', last_reply_post_preview: '高大爷天下第一', last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'}]
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
      this.dept = data.supforums[1].title
      this.sub = data.title
      this.sub_title = data.sub_title
      
      this.zhiding = data.top_topics
      this.tiezi = data.topics
      
    })
  },
  methods: {
    go_to_topic: function(id){
      this.$router.push({
        name: 'TieZi',
        params: {topic_id: id}
      })
    },
    handleCommand: function(command) {
      if(command == "changeProfile"){
        this.$message('跳转到个人资料页');
        // TODO:
        // 做好后删掉弹窗
      }
      else if(command == "logout"){
        this.login = false;
        this.$message('退出登录');
        // TODO:
        // 做好后删掉弹窗
      }
      else{
        this.$message('什么事都没有发生');
        // 为之后的功能做准备
      }
    },
    loginAc: function(){
      this.login = true;
      this.$message('登录');
      // TODO:
      // 做好后删掉弹窗
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
    margin-top: 5px;
  }
  .num{
    font-size: 12px;
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
  .replybtn{
    margin-top: 5px;
  }
</style>
