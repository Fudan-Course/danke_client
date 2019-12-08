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
      <!-- 没做跳转页面事件和方法 -->
      <el-row>
        <el-col :span="9"  class="title">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- 未给出路径 -->
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ area }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ dept }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ sub }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="title">
          {{tietitle}}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="subtitle">
          发布时间：{{lztime}}, 回复数： {{ replynum }}
        </el-col>
      </el-row>

      <el-card class="tiezi">
        <el-row>
          <el-col :span="3">
            <el-row>
              <el-avatar :size="50" :src="logourl"></el-avatar>
            </el-row>
            <el-row class="nickname">
              {{ lzname }}
            </el-row>
          </el-col>
          <el-col :span="20">
            <el-row class="content">
              {{ lzcontent }}
            </el-row>
          </el-col>
        </el-row>
      </el-card>

      <!-- 同样也没做排序回复事件和方法 -->
      <el-row>
        <el-col :span="12" class="subtitle">
          <el-button type="text">最新回复</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text">最多回复</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text">最多点赞</el-button>
        </el-col>
        <el-col :span="12" class="subtitle">
          <el-popover placement="bottom" width="500">
            <el-input type="textarea" :rows="5" placeholder="请输入回复" v-model="mainreply"></el-input>
            <!-- 未绑定回复事件 -->
            <el-button type="info" size="mini" class="replybtn">发送回复</el-button>
            <el-button type="text" slot="reference">发布回复</el-button>
          </el-popover>
        </el-col>
      </el-row>

      <div v-for="reply in replies">
        <el-card class="tiezi">
          <el-row>
            <el-col :span="3">
              <el-row>
                <el-avatar :size="50" :src="reply.logo"></el-avatar>
              </el-row>
              <el-row class="nickname">
                {{ reply.nickname }}
              </el-row>
            </el-col>
            <el-col :span="20">
              <el-row class="content">
                {{ reply.content }}
              </el-row>
              <!-- 同样也没做赞踩回复事件和方法 -->
              <el-row class="time" style="height:20px;">
                <el-col :span="1">
                  <el-button type="text" disabled>{{ reply.num }}楼</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="text" disabled>{{ reply.time }}</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="text">赞</el-button>
                  <el-button type="text" disabled>{{ reply.good }}</el-button>
                </el-col>
                <el-col :span="1">
                  <el-button type="text">踩</el-button>
                </el-col>
                <el-col :span="1">
                  <el-popover placement="bottom" width="500">
                    <el-input type="textarea" :rows="5" placeholder="请输入回复" v-model="subreply"></el-input>
                    <!-- 未绑定回复事件 -->
                    <el-button type="info" size="mini" class="replybtn">发送回复</el-button>
                    <el-button type="text" slot="reference">回复</el-button>
                  </el-popover>
                </el-col>
              </el-row>
              <el-divider>回复</el-divider>
              <el-row class="cmt" style="height:50px;" v-for="cmt in reply.reply">
                <el-col :span="1">
                    <el-avatar :size="30" :src="cmt.logo"></el-avatar>
                </el-col>
                <el-col :span="23">
                    <el-row>
                      {{ cmt.nickname }} : {{ cmt.content }}
                    </el-row>
                    <!-- 同样也没做赞踩回复事件和方法 -->
                    <el-row>
                      <el-col :span="2">
                        <el-button type="text" disabled size="small">{{ reply.time }}</el-button>
                      </el-col>
                      <el-col :span="2">
                        <el-button type="text" size="small">赞</el-button>
                        <el-button type="text" disabled size="small">{{ reply.good }}</el-button>
                      </el-col>
                      <el-col :span="1">
                        <el-button type="text" size="small">踩</el-button>
                      </el-col>
                      <el-col :span="1">
                        <el-popover placement="bottom" width="500">
                          <el-input type="textarea" :rows="5" placeholder="请输入回复" v-model="subsubreply"></el-input>
                          <!-- 未绑定回复事件 -->
                          <el-button type="info" size="mini" class="replybtn">发送回复</el-button>
                          <el-button type="text" size="small" slot="reference">回复</el-button>
                        </el-popover>
                      </el-col>
                    </el-row>
                </el-col>
              </el-row>
              <el-pagination small layout="prev, pager, next" :page-size="4" :total="5" background="true"></el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </div>

      <el-pagination small layout="prev, pager, next" :page-size="6" :total="100" background="true" class="forumbox"></el-pagination>


    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'TieZi',
  methods: {
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
  },
  data(){
    return {
      logourl: require("../assets/Danke_logo.png"),
      username: 'Gromah',
      login: true,
      mainblock: '计算机科学技术学院',
      subblock: '子版块',
      tietitle: '这是帖子题目',
      lzname: '无敌高大爷',
      lzcontent: 'We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!We love Gromah!',
      lztime: '114514秒前',
      area: '课程评价',
      dept: '计算机系',
      sub: '子板块一',
      replynum: 4,
      replies: [{num: 1, logo: require("../assets/Danke_logo.png"), nickname: 'Gromah', content: '高大爷太强了', time: '114514秒前', good: 114514, reply: [{nickname: '迷弟', logo: require("../assets/Danke_logo.png"), content: '高大爷太强了'}, {nickname: '迷弟', logo: require("../assets/Danke_logo.png"), content: '高大爷太强了'}]},
                {num: 2, logo: require("../assets/Danke_logo.png"), nickname: 'Gromah', content: '高大爷太强了', time: '114514秒前', good: 114514, reply: [{nickname: '迷弟', logo: require("../assets/Danke_logo.png"), content: '高大爷太强了'}, {nickname: '迷弟', logo: require("../assets/Danke_logo.png"), content: '高大爷太强了'}]},
                {num: 3, logo: require("../assets/Danke_logo.png"), nickname: 'Gromah', content: '高大爷太强了', time: '114514秒前', good: 114514, reply: [{nickname: '迷弟', logo: require("../assets/Danke_logo.png"), content: '高大爷太强了'}, {nickname: '迷弟', logo: require("../assets/Danke_logo.png"), content: '高大爷太强了'}]},
                {num: 4, logo: require("../assets/Danke_logo.png"), nickname: 'Gromah', content: '高大爷太强了', time: '114514秒前', good: 114514, reply: [{nickname: '迷弟', logo: require("../assets/Danke_logo.png"), content: '高大爷太强了'}, {nickname: '迷弟', logo: require("../assets/Danke_logo.png"), content: '高大爷太强了'}]}],
      mainreply: '',
      subreply: '',
      subsubreply: ''
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
    _height: 0px;
    min-height: 50px;
  }
  .title{
    color: #104E8B;
    font-weight: bold;
    font-size: 30px;
    text-align: left;
    margin-bottom: 10px;
  }
  .subtitle{
    color: #104E8B;
    font-weight: bold;
    font-size: 15px;
    text-align: left;
  }
  .nickname{
    margin-top: 10px;
    font-size: 15px;
  }
  .content{
    font-size: 20px;
    text-align: left;
  }
  .time{
    color: #B5B5B5;
    font-size: 13px;
    text-align: left;
  }
  .cmt{
    font-size: 13px;
    text-align: left;
    margin-left: 10px;
  }
  .tiezi{
    min-height: 125px;
  }
  .replybtn{
    margin-top: 5px;
  }
</style>
