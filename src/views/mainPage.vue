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
          <el-col :span="3" :offset="3" class="title">
            课程评价
          </el-col>
        </el-row>

        <div v-for="department in departments" :key="department">
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

        <el-pagination small layout="prev, pager, next" :page-size="2" :total="3" background="true" class="forumbox"></el-pagination>
      </div>

      <el-divider class="divider"></el-divider>

      <div align="center">
        <el-row>
          <el-col :span="3" :offset="3" class="title">
            <!-- TODO: 父板块需要修改 -->
            课程论坛
          </el-col>
        </el-row>

        <div v-for="department in departments" :key="department">
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
                  <el-row style="text-align:left;">
                    <el-col :span="4" v-for="block in department.subblock" :key="block">
                      <!-- TODO: 板块路由 -->
                      <el-link :underline="false" class="subblock">{{ block }}</el-link>
                    </el-col>
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

        <el-pagination small layout="prev, pager, next" :page-size="3" :total="30" background="true" class="forumbox"></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {setCookie, getCookie, delCookie} from '../assets/js/cookie.js'
import axios from 'axios'
export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  data(){
    return {
      logourl: require("../assets/Danke_logo.png"),
      username: 'Gromah',
      login: true,
      // TODO: subblock的名字
      departments: [{id: 1, title: '计算机', subtitle: '副标题', last_reply_topic_title: '新帖：XXXXX', last_reply_preview: '高大爷天下第一', subblock: ['子版块A', '子版块B', '子版块C'], last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'},
      {id: 2, title: '另一个院系', subtitle: '副标题', last_reply_topic_title: '新帖：XXXXX', last_reply_preview: '高大爷天下第一', subblock: ['子版块A', '子版块B'], last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'},
      {id: 3, title: '第三个院系', subtitle: '副标题', last_reply_topic_title: '新帖：XXXXX', last_reply_preview: '高大爷天下第一', subblock: ['子版块A', '子版块B', '子版块C'], last_reply_user_nickname: 'Gromah', last_reply_time: '114514秒前'}]
    }
  },
  mounted() {
    if(getCookie() == ""){
      // TODO: 路由到登录页
    }
    const path = "http://127.0.0.1:8000/api/vi/auth/forums/0"
    axios.get(path, {
      session_id: getCookie()
    }).then(function(response){
      this.departments = response.data
    }).catch(function(error) {
      console.log(error);
    })
  },
  methods: {
    go_to_forum: function(id) {
      this.$router.push({
        name: 'BlockPage',
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head{
    background: #104E8B;
    box-shadow: 5px 5px 3px 0px #E5E5E5;
  }
  .forumbox{
    background: #F0F4FF;
  }
  .block{
    background: #CAE1FF;
    width: 80%;
  }
  .divider{
    background: #707070;
  }
  .title{
    color: #104E8B;
    font-weight: bold;
    font-size: 30px;
  }
  .subtitle{
    color: #104E8B;
    font-weight: bold;
    font-size: 20px;
  }
  .subsubtitle{
    color: #104E8B;
    font-size: 15px;
  }
  .subblock{
    color: #FFFFFF;
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
