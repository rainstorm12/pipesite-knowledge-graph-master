import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { nanoid } from 'nanoid'

Vue.use(Vuex)

const actions = {
}
const mutations = {
  //从axios获得赋值
  nodesData(state,data){
    state.nodesData = data;
  },
  linksData(state,data){
    state.linksData = data;
  },
  modelnodesData(state,data){
    state.modelnodesData = data;
  },
  modellinksData(state,data){
    state.modellinksData = data;
  },
  //数据预处理
  INIT_DATA(state,newdata){
    var NewnodesData=newdata[0]
    var NewlinksData=newdata[1]
    state.nodesData = NewnodesData
    state.linksData = NewlinksData
    state.isfirstinit = false
  },
  INIT_DATA_MODEL(state,newdata){
    var NewnodesData=newdata[0]
    var NewlinksData=newdata[1]
    state.modelnodesData = NewnodesData
    state.modellinksData = NewlinksData
    state.isfirstinit = false
  },
  //编辑的时候更新数据
  UPDATE_NODE(state,node){
    //前端修改
    for(let i=0 ; i<state.nodesData.length;i++){
      if(state.nodesData[i].name===node.name){
        state.nodesData[i].title = node.title
        state.nodesData[i].attribute = node.attribute
      }
    }
    //后端修改
    axios.get('http://'+state.server_ip+'/api/update_Node?node_id=' + node.name + 
      '&node_name='+node.title + '&node_attribute='+ node.attribute).then(
      response=>{
          console.log('请求成功',response.data)
      },
      error=>{
          console.log('请求失败',error.message)
      }
    )
  },
  //model界面的edit
  UPDATE_NODE_MODEL(state,edit_tuple){
    //当前关系中设计到的关系数据变动
    for(let i=0 ; i<state.modellinksData.length;i++){
      if(state.modellinksData[i].id===edit_tuple.id){
        state.modellinksData[i].title1 = edit_tuple.title1
        state.modellinksData[i].type1 = edit_tuple.type1
        state.modellinksData[i].type = edit_tuple.type
        state.modellinksData[i].title2 = edit_tuple.title2
        state.modellinksData[i].type2 = edit_tuple.type2
      }
    }
    //设计到的节点变动
    for(let i=0 ; i<state.modelnodesData.length;i++){
      if(state.modelnodesData[i].id===edit_tuple.id1){
        state.modelnodesData[i].title = edit_tuple.title1
        state.modelnodesData[i].type = edit_tuple.type1
      }
      if(state.modelnodesData[i].id===edit_tuple.id2){
        state.modelnodesData[i].title = edit_tuple.title2
        state.modelnodesData[i].type = edit_tuple.type2
      }
    }
    //与节点相关的关系变动
    for(let j=0 ; j<state.modellinksData.length;j++){
      if(state.modellinksData[j].id1===edit_tuple.id1){
        state.modellinksData[j].title1 = edit_tuple.title1
        state.modellinksData[j].type1 = edit_tuple.type1
      }
      if(state.modellinksData[j].id2===edit_tuple.id1){
        state.modellinksData[j].title2 = edit_tuple.title1
        state.modellinksData[j].type2 = edit_tuple.type1
      }
      if(state.modellinksData[j].id1===edit_tuple.id2){
        state.modellinksData[j].title1 = edit_tuple.title2
        state.modellinksData[j].type1 = edit_tuple.type2
      }
      if(state.modellinksData[j].id2===edit_tuple.id2){
        state.modellinksData[j].title2 = edit_tuple.title2
        state.modellinksData[j].type2 = edit_tuple.type2
      }
    }
  },
  //model界面的del
  DEL_RELATION_MODEL(state,del_tuple){
    //关系删除
    let newmodellinksData = []
    for(let j=0 ; j<state.modellinksData.length;j++){
      if(state.modellinksData[j].id!==del_tuple.id){
        newmodellinksData.push(state.modellinksData[j])
      }
    }
    state.modellinksData = newmodellinksData
    //节点删除 逻辑是没有叶子的节点直接被删除
    let newmodelnodesData = []
    for(let j=0 ; j<state.modelnodesData.length;j++){
      for(let i=0 ; i<state.modellinksData.length;i++){
        if(state.modelnodesData[j].id === state.modellinksData[i].id1 || 
          state.modelnodesData[j].id === state.modellinksData[i].id2){
          newmodelnodesData.push(state.modelnodesData[j])
          break
        }
      }
    }
    state.modelnodesData = newmodelnodesData
  },
  //model界面的add
  ADD_RELATION_MODEL(state,add_tuple){
    let id = nanoid()
    let id1 = nanoid()
    let id2 = nanoid()
    let newnode ={}
    //subject不存在的情况
    let isrepeat_subject = 0
    for(let j=0 ; j<state.modelnodesData.length;j++){
      if (add_tuple.title1===state.modelnodesData[j].title && 
        add_tuple.type1===state.modelnodesData[j].type){
          isrepeat_subject = 1
          id1 = state.modelnodesData[j].id
        }
    }
    if (isrepeat_subject===0){
      newnode = {"id":id1,"title":add_tuple.title1,"type":add_tuple.type1}
      state.modelnodesData.push(newnode)
    }
    //object不存在的情况
    let isrepeat_object = 0
    for(let j=0 ; j<state.modelnodesData.length;j++){
      if (add_tuple.title2===state.modelnodesData[j].title && 
        add_tuple.type2===state.modelnodesData[j].type){
          isrepeat_object = 1
          id2 = state.modelnodesData[j].id
        }
    }
    if (isrepeat_object===0){
      newnode = {"id":id2,"title":add_tuple.title2,"type":add_tuple.type2}
      state.modelnodesData.push(newnode)
    }
    //添加新关系
    let isrepeat_type = 0
    for(let j=0 ; j<state.modellinksData.length;j++){
      if (add_tuple.title1===state.modellinksData[j].title1 && 
        add_tuple.type1===state.modellinksData[j].type1 &&
        add_tuple.title2===state.modellinksData[j].title2 &&
        add_tuple.type2===state.modellinksData[j].type2         
        ){
          isrepeat_type = 1
        }
        if (add_tuple.title2===state.modellinksData[j].title1 && 
          add_tuple.type2===state.modellinksData[j].type1 &&
          add_tuple.title1===state.modellinksData[j].title2 &&
          add_tuple.type1===state.modellinksData[j].type2         
        ){
          isrepeat_type = 1
        }
    }
    if (isrepeat_type===0){
      newnode = {"id1":id1,"title1":add_tuple.title1,"type1":add_tuple.type1,
              "id2":id2,"title2":add_tuple.title2,"type2":add_tuple.type2,
              "id":id,"type":add_tuple.type}
      state.modellinksData.push(newnode)
      return true
    }
    if(isrepeat_type===1)
      return false
  },
  //整体刷新数据
  ALL_FRESH_DATA(state,nodes_links){
    var svgNodes = nodes_links[0]
    var svgLinks = nodes_links[1]
    //前端修改
    state.nodesData = svgNodes
    state.linksData = svgLinks
  },
  //后端删除节点
  DEL_NODE(state,del_node){
    axios.get('http://'+state.server_ip+'/api/del_neo_Node?node_id=' + del_node).then(
      response=>{
          console.log('请求成功',response.data)
      },
      error=>{
          console.log('请求失败',error.message)
      }
    )
  },
  //设置项目调用
  UPDATE_SETTING(state,settings){
    state.is_fixed_drag_setting = settings[0]
  },
}
const state = {
  isfirstinit:true, //是否首次初始化
  is_fixed_drag_setting:false,//节点拖动后是否固定
  server_ip: 'localhost:5000',//服务器ip地址
  // server_ip: '10.192.96.29:5000',//服务器ip地址
  nodesData : [],
  linksData : [],
  modelnodesData:[],
  modellinksData:[],
}
const getters = {
  
}

export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})
