<template>
  <el-container id="mainpage">

    <el-header class="head">
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <el-image style="width:60px;height:60px" :src="logourl"></el-image>
        </el-col>
        <el-col :span="6" :offset="15">
          <el-button type="primary" round="true">登录</el-button>
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

        <div v-for="department in departments">
          <el-row>
            <el-card class="block">
              <el-row type="flex" align="middle">
                <el-col :span="20">
                  <el-col :span="4" class="subtitle">
                      {{ department.name }}
                  </el-col>
                  <div v-for="block in department.subblock">
                    <el-col :span="3">
                      <el-button type="text" class="subblock">{{ block }}</el-button>
                    </el-col>
                  </div>
                </el-col>
                <el-col :span="3">
                  <el-row type="flex" align="middle" class="newestreply">
                    最新回复
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复者：{{ department.replyer }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复时间：{{ department.time }}
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-row>
        </div>

        <el-pagination small layout="prev, pager, next" :page-size="3" :total="30" background="true" class="forumbox"></el-pagination>
      </div>

      <el-divider class="divider"></el-divider>

      <div align="center">
        <el-row>
          <el-col :span="3" :offset="3" class="title">
            课程论坛
          </el-col>
        </el-row>

        <div v-for="department in departments">
          <el-row>
            <el-card class="block">
              <el-row type="flex" align="middle">
                <el-col :span="20">
                  <el-col :span="4" class="subtitle">
                      {{ department.name }}
                  </el-col>
                  <div v-for="block in department.subblock">
                    <el-col :span="3">
                      <el-button type="text" class="subblock">{{ block }}</el-button>
                    </el-col>
                  </div>
                </el-col>
                <el-col :span="3">
                  <el-row type="flex" align="middle" class="newestreply">
                    最新回复
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复者：{{ department.replyer }}
                  </el-row>
                  <el-row type="flex" align="middle" class="replymsg">
                    回复时间：{{ department.time }}
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
export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  data(){
    return {
      logourl: require("../assets/Danke_logo.png"),
      departments: [{name: '计算机', subblock: ['子版块A', '子版块B', '子版块C'], replyer: 'Gromah', time: '114514秒前'},
      {name: '另一个院系', subblock: ['子版块A', '子版块B'], replyer: 'Gromah', time: '114514秒前'},
      {name: '第三个院系', subblock: ['子版块A', '子版块B', '子版块C'], replyer: 'Gromah', time: '114514秒前'}]
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
    color: #000000;
    font-weight: bold;
    font-size: 20px;
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
