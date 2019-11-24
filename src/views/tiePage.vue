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
            {{ area }} > {{ dept }} > {{ sub }}
          </el-col>
        </el-row>

        <div v-for="tie in ties">
          <el-row>
            <el-card class="block">
              <el-row type="flex" align="middle">
                <el-col :span="20">
                  <el-button type="text" class="tietitle">{{ tie.name }}</el-button>
                </el-col>
                <el-col :span="3">
                  <el-row type="flex" align="middle" class="newestreply">
                    最新回复
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复者：{{ tie.replyer }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复时间：{{ tie.time }}
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
export default {
  name: 'TiePage',
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
      area: '课程评价',
      dept: '计算机系',
      sub: '计算机专业',
      ties: [{name: '喵喵', replyer: 'Gromah', time: '114514秒前'},
            {name: '喵喵喵', replyer: 'Gromah', time: '114514秒前'},
            {name: '喵喵喵喵', replyer: 'Gromah', time: '114514秒前'},
            {name: '喵喵喵喵喵喵喵喵', replyer: 'Gromah', time: '114514秒前'},
            {name: '喵喵喵喵喵喵喵喵喵喵喵喵', replyer: 'Gromah', time: '114514秒前'},
            {name: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵', replyer: 'Gromah', time: '114514秒前'}]
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
  .block{
    background: #CAE1FF;
    width: 80%;
  }
  .title{
    color: #104E8B;
    font-weight: bold;
    font-size: 30px;
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
