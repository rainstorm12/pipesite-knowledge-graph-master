<template>
  <div>
    <!-- <div class="header">
      <h1>地下管廊运维知识图谱系统</h1>
    </div> -->
    <div class="main-box">
      <div class="column">
          <router-link class="navi-btn" active-class="active" to="/home">
            <i class="el-icon-location"></i><span>主页</span>
          </router-link>
          <button id='navi-btn-data' class="navi-btn" @click="showDatabtn">
            <i class="el-icon-menu"></i><span>数据库</span>
            <div class="navi-arrow">
              <i v-if='!isshowDatabtn' class="el-icon-arrow-up"></i>
              <i v-if="isshowDatabtn" class="el-icon-arrow-down"></i>
            </div>
          </button>
          <el-collapse-transition>
            <div v-if='isshowDatabtn'>
              <router-link  id="sub-button" class="navi-btn" active-class="active" to="/nodedata">
                <i class="el-icon-s-data"></i><span>节点数据</span>
              </router-link>
              <router-link  id="sub-button" class="navi-btn" active-class="active" to="/linkdata">
                <i class="el-icon-s-data"></i><span>关系数据</span>
              </router-link>
            </div>
          </el-collapse-transition>
          <router-link class="navi-btn" active-class="active" to="/model">
            <i class="el-icon-cpu"></i><span>模型</span>
          </router-link>
          <router-link class="navi-btn" active-class="active" to="/setting">
            <i class="el-icon-setting"></i><span>设置</span>
          </router-link>
          <router-link class="navi-btn" active-class="active" to="/about">
            <i class="el-icon-question"></i><span>帮助</span>
          </router-link>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      isshowDatabtn:false,
    }
  },  
  mounted(){
  },
  methods:{
    showDatabtn(){
      this.isshowDatabtn = !this.isshowDatabtn
    }
  },

}

</script>
<style>
*{
  margin:0;
  padding:0;
}
</style>
<style scoped>
.main-box{
  display: flex;
  flex-direction: row;
  /* justify-content: space-between;
  align-items: space-between; */
  /* width: 100vh; */
  height:100vh;
  margin:0;
  /* background-color: #409eff; */
}
.column{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width:auto;
  height:100vh;
  border-right: 1px solid rgba(230,230,230,1);
}
.navi-btn{
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 200px;
  height: 50px;
  border-radius: 1px;
  transition: 0.2s;
  font-size: 15px;
  text-decoration: none;
  color:rgba(144,147,153,1);
  padding-top:3px;
  padding-bottom:3px;
  padding-left:18px;
  border:0px;
  background-color:white;
  margin:0;
}
.navi-btn>span{
  color:rgba(48,49,51,1);
  padding-left: 15px;
  padding-right: 80px;
}
.navi-btn>i{
  font-size: 20px;
}
.navi-arrow>i{
  font-size: 10px;
}
.navi-btn:hover{
  background: rgba(236,245,255,1);
}
/*默认样式应用到button上长和宽有点变化*/
#navi-btn-data{
  width:218px;
  height: 56px;
}
#sub-button>i{
  padding-left:10px;
}
.active{
  background: rgba(236,245,255,1);
  border-radius: 1px;
  transition: 0.2s;
  color:#409eff;
}
.active>span{
  color:#409eff;
}
.content{
  /* width:206.33; */
  flex:1/*充满页面 */
  /* width: auto;
  height: auto; */
}
</style>
