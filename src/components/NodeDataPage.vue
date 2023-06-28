<template>
    <div class="data-box">
        <!-- <el-row display="margin-top:10px">
            <el-input v-model="input" placeholder="请输入节点信息" style="display:inline-table; width: 30%; float:left"></el-input>
            <el-button type="primary" @click="addNode()" style="float:left; margin: 2px;">新增</el-button>
            <el-button type="danger" @click="delNode()" style="float:left; margin: 2px;">删除</el-button>
        </el-row> -->
        <el-row>
            <el-table :data="nodeList" style="width: 99%" border>
                <el-table-column prop="id" label="编号" min-width="100">
                    <template slot-scope="scope"> {{ scope.row.id }} </template>
                </el-table-column>
                <el-table-column prop="nodeName" label="节点名称" min-width="100">
                    <template slot-scope="scope"> {{ scope.row.title }} </template>
                </el-table-column>
                <el-table-column prop="typeName" label="节点类型" min-width="100">
                    <template slot-scope="scope"> {{ scope.row.type }} </template>
                </el-table-column>
                <el-table-column prop="attribute" label="节点属性" min-width="100">
                    <template slot-scope="scope"> {{ scope.row.attribute }} </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    name: 'NodeDataPage',
    props: {},
    data () {
        return {
            input: '',
            nodeList: [],
        }
    },
    mounted(){
      this.showNodes()
    },
    computed:{
        //借助mapState生成计算属性，从state中读取数据
        ...mapState(['server_ip']),
    },
    methods: {
      addNode(){
        axios.get('http://'+this.server_ip+'/api/add_Node?node_name=' + this.input).then(
          response=>{
            console.log('请求成功',response.data)
            this.showNodes()
            this.input=''
          },
          error=>{
            console.log('请求失败',error.message)
          }
        )
      },
      delNode(){
        this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                axios.get('http://'+this.server_ip+'/api/del_Nodes').then(
                    response=>{
                        console.log('请求成功',response.data)
                        this.showNodes()
                    },
                    error=>{
                        console.log('请求失败',error.message)
                    }
                )
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });       
            });
      },
      showNodes () {
        axios.get('http://'+this.server_ip+'/api/show_neo_old').then(
          response=>{
            console.log('请求成功',response.data['nodes'])
            this.nodeList = response.data['nodes']
          },
          error=>{
            console.log('请求失败',error.message)
          }
        )
      },
    }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
list-style-type: none;
padding: 0;
}

li {
display: inline-block;
margin: 0 10px;
}

a {
color: #42b983;
}
</style>
   