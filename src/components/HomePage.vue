<template>
    <div>
        <div class="content-box">
            <!-- 知识图谱可视化 -->
            <div class="svg-box">
                <svg width="1000" height="800"></svg>
                <!-- 刷新小组件 -->
                <div class="widget">
                    <div class="refresh" @click="Refresh">
                        <i class="el-icon-refresh-left"></i>
                    </div>
                </div>
            </div>
            <div class="tool-box">
                <div class="tool-box-head">
                    <!-- 搜索框 -->
                    <div class="search-box">
                        <el-select v-model="search_select_type" slot="prepend" placeholder="任意类型">
                            <el-option 
                                v-for="(ntype, key) in nodetype"
                                :key="key"
                                :label="ntype"
                                :value="ntype"
                                ></el-option>
                            <el-option label="不限制类型" value="all"></el-option>
                        </el-select>
                        <el-select style="margin-left: 5px;" v-model="search_select_property" slot="prepend" placeholder="模糊搜索">
                            <el-option label="精确搜索" value="precise"></el-option>
                            <el-option label="模糊搜索" value="fuzzy"></el-option>
                            <!-- <el-option label="不限制属性" value="all"></el-option> -->
                        </el-select>
                        <el-input 
                            style="margin-top: 5px;" 
                            placeholder="请输入内容" 
                            v-model="search_input" 
                            class="input-with-select" 
                            @keydown.native.enter="ActSearch">
                            <el-button slot="append" icon="el-icon-search" @click="ActSearch"></el-button>
                        </el-input>
                    </div>
                    <!-- 创建节点框 -->
                    <div class="create-box">
                        <button :class="create_box_button_class(1)" @click="CreateNewNode">新建节点</button>
                        <button :class="create_box_button_class(2)" @click="CreateNewRelation">新建关系</button>
                        <button :class="create_box_button_class(3)" @click="CreateNewTuple">新建三元组</button>
                    </div>
                    <!-- 节点选择框 -->
                    <!-- 新建节点 -->
                    <div class="newnode-box" v-show="CreateNewNode_visio===1">
                        <div class="newnode-box-son">
                            <span>节点类型</span>
                            <el-autocomplete
                                class="inline-input"
                                v-model="node1_newcreate"
                                :fetch-suggestions="querySearch_node"
                                placeholder="请输入内容"
                                ></el-autocomplete>
                        </div>
                        <div class="newnode-box-son1">
                            <span>节点名称</span>
                            <el-input v-model="title1_newcreate" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="newnode-box-son1">
                            <span>节点属性</span>
                            <el-input v-model="arr1_newcreate" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="newnode-box-son2">
                            <button class="newnode-button" @click="SubmitNewNode">提交</button> 
                            <button class="newnode-button" @click="closeCreateNew">关闭</button>
                        </div>
                    </div>
                    <!-- 新建关系 -->
                    <div class="newnode-box" v-show="CreateNewNode_visio===2">
                        <div class="newnode-box-son">
                            <span>头节点类型</span>
                            <el-autocomplete
                                class="inline-input"
                                v-model="node1_newcreate"
                                :fetch-suggestions="querySearch_node"
                                placeholder="请输入内容"
                                ></el-autocomplete>
                        </div>
                        <div class="newnode-box-son1">
                            <span>头节点名称</span>
                            <el-input v-model="title1_newcreate" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="newnode-box-son">
                            <span>尾节点类型</span>
                            <el-autocomplete
                                class="inline-input"
                                v-model="node2_newcreate"
                                :fetch-suggestions="querySearch_node"
                                placeholder="请输入内容"
                                ></el-autocomplete>
                        </div>
                        <div class="newnode-box-son1">
                            <span>尾节点名称</span>
                            <el-input v-model="title2_newcreate" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="newnode-box-son">
                            <span>关系类型</span>
                            <el-autocomplete
                                class="inline-input"
                                v-model="type_newcreate"
                                :fetch-suggestions="querySearch_rel"
                                placeholder="请输入内容"
                                ></el-autocomplete>
                        </div>
                        <div class="newnode-box-son2">
                            <button class="newnode-button" @click="SubmitNewLink">提交</button> 
                            <button class="newnode-button" @click="closeCreateNew">关闭</button>
                        </div>
                    </div>
                    <!-- 新建三元组 -->
                    <div class="newnode-box" v-show="CreateNewNode_visio===3">
                        <div class="newnode-box-son">
                            <span>头节点类型</span>
                            <el-autocomplete
                                class="inline-input"
                                v-model="node1_newcreate"
                                :fetch-suggestions="querySearch_node"
                                placeholder="请输入内容"
                                ></el-autocomplete>
                        </div>
                        <div class="newnode-box-son1">
                            <span>头节点名称</span>
                            <el-input v-model="title1_newcreate" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="newnode-box-son1">
                            <span>头节点属性</span>
                            <el-input v-model="arr1_newcreate" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="newnode-box-son">
                            <span>尾节点类型</span>
                            <el-autocomplete
                                class="inline-input"
                                v-model="node2_newcreate"
                                :fetch-suggestions="querySearch_node"
                                placeholder="请输入内容"
                                ></el-autocomplete>
                        </div>
                        <div class="newnode-box-son1">
                            <span>尾节点名称</span>
                            <el-input v-model="title2_newcreate" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="newnode-box-son1">
                            <span>尾节点属性</span>
                            <el-input v-model="arr2_newcreate" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="newnode-box-son">
                            <span>关系类型</span>
                            <el-autocomplete
                                class="inline-input"
                                v-model="type_newcreate"
                                :fetch-suggestions="querySearch_rel"
                                placeholder="请输入内容"
                                ></el-autocomplete>
                        </div>
                        <div class="newnode-box-son2">
                            <button class="newnode-button" @click="SubmitNewTuple">提交</button> 
                            <button class="newnode-button" @click="closeCreateNew">关闭</button>
                        </div>
                    </div>
                </div>
                <!-- 鼠标点击节点详情 -->
                <div class="info-box">
                    <div class="info" v-show="selectnode.name !== undefined" >
                        <el-card class="node-card">
                            <div slot="header">
                                <span>{{ selectnode.type }}</span>
                                <el-button class="edit-btn" type="text" @click="StartEdit">编辑</el-button>
                            </div>
                            <div class="card-content">
                                <span>序号:<span>{{selectnode.name}}</span></span>
                                <span>名称:<span>{{selectnode.title}}</span></span>
                                <span 
                                    v-for="(item, key) in selectnode.attribute"
                                    :key="key" 
                                    >{{key}}:<span>{{item}}</span>
                                </span>
                            </div>
                            <div class="card-btn">
                                <button @click="HiddenNode">隐藏节点</button>
                                <button @click="ExpandNode">展开节点</button>
                                <button @click="QuestionDel" class="del-btn">删除节点</button>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑框 -->
        <el-dialog :visible.sync="isOpenDialog">
            <el-form class="dialog-form">
                <el-form-item>
                    <span>名称:</span>
                    <el-input v-model="editnode.title"/>
                </el-form-item>
                <el-form-item 
                    v-for="(value, key) in editnode.attribute"
                    :key="key"
                    >
                    <span>{{key}}:</span>
                    <el-input v-model="editnode.attribute[key]"/>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="StopEdit">取消</el-button>
                <el-button type="primary" @click="ActEdit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as d3 from 'd3'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import axios from 'axios'
//深拷贝对象函数
var cloneObj = function (obj) {
    var newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (var key in obj) {
        var val = obj[key];
        newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
    }
    return newObj;
}
export default {
    name: 'HomePage',
    // props: ['nodesData','linksData'],
    data(){
        return{
            svg:null,
            NodesData:[],//从数据库中获得的节点数据
            LinksData:[],//从数据库中获得的关系数据
            svgNodes:{},//待渲染的nodes
            svgLinks:{},//待渲染的links
            isFixNode: false, //是否处于鼠标选中状态
            isOpenDialog: false, //是否编辑对话框
            nodetype:['系统','巡查项目','内容','巡检方法','维护方法','巡检周期'],
            nodecolor:[//不同节点对应的颜色
            'rgba(241,102,103,1)',
            'rgba(247,151,103,1)',
            'rgba(76,142,218,1)',
            'rgba(86,148,128,1)',
            'rgba(87,199,227,1)',
            'rgba(201,144,192,1)',
            ],
            selectnode:{},//鼠标选中的节点
            editnode:{},//编辑时临时使用的节点
            search_select_type: '',//搜索框的搜索类型
            search_select_property:'',//搜索框的搜索属性
            search_input: '',//搜索框的输入内容
            search_nodes:[],//搜索到的节点列表
            //create部分
            CreateNewNode_visio:false,
            node_create_type:[],
            relation_create_type:[],
            watch_CreateNewNode_visio:1,
            type_newcreate:'',
            node1_newcreate:'',
            title1_newcreate:'',
            arr1_newcreate:'',
            node2_newcreate:'',
            title2_newcreate:'',
            arr2_newcreate:'',
        }
    },
    watch:{
        //监测搜索框的事实输入
        search_input(val){
            //当前版本暂时弃用掉了
            let search_value = val
            let search_type = this.search_select_type
            let search_property = this.search_select_property
            this.DoSearch(search_type,search_property,search_value)
        },
        //清空表格
        watch_CreateNewNode_visio(){
            this.node1_newcreate = ''
            this.node2_newcreate = ''
            this.type_newcreate = ''
            this.title1_newcreate = ''
            this.title2_newcreate = ''
            this.arr1_newcreate = ''
            this.arr2_newcreate = ''
        },
    },
    computed:{
        //借助mapState生成计算属性，从state中读取数据
        ...mapState(['nodesData','linksData','isfirstinit','is_fixed_drag_setting','server_ip']),
    },
    mounted(){
        this.mount_init()
        this.node_create_type = this.loadAllnodetype();
        this.relation_create_type = this.loadAllrelationtype();
    },
    methods: {
        //mounted函数
        mount_init(){
            axios.get('http://'+this.server_ip+'/api/show_neo').then(
                response=>{
                    console.log('请求成功',response.data)
                    this.NodesData = response.data['nodes']
                    this.LinksData = response.data['links']
                    //数据传到vuex
                    this.$store.commit('nodesData',this.NodesData)
                    this.$store.commit('linksData',this.LinksData)
                    //数据初始化
                    // if (this.isfirstinit){
                    this.datainit()
                    // }
                    //渲染初始化
                    this.svginit()
                },
                error=>{
                    console.log('请求失败',error.message)
                }
            )
        },
        //数据预处理函数（可以写在别的组件中）
        datainit(){
            //从store获取数据
            var nodesData = this.nodesData
            var linksData = this.linksData
            var NewnodesData = []
            var NewlinksData = []
            //将原先name设为title，新的name为序号or随机数（需要不重复）
            for (let key in nodesData){
                let val = cloneObj(nodesData[key])
                // this.$set(val,'title',val.fields.nodeName)
                this.$set(val,'name',val.id)
                // this.$set(val,'type',val.fields.typeName)
                // this.$set(val,'attribute',val.attribute)
                NewnodesData.push(val)
            }
            // console.log(NewnodesData)
            //按照title找到原先的source和target节点
            for (let key in linksData){
                let val = cloneObj(linksData[key])
                this.$set(val,'source',val.id1)
                this.$set(val,'target',val.id2)
                // this.$set(val,'type',val.fields.linkType)
                // for (let i in NewnodesData){
                //     if (val.source === NewnodesData[i].title){
                //         val.source = NewnodesData[i].name
                //         break
                //     }
                // }
                // for (let i in NewnodesData){
                //     if (val.target === NewnodesData[i].title){
                //         val.target = NewnodesData[i].name
                //         break
                //     }
                // }
                NewlinksData.push(val)
            }
            // console.log(NewlinksData)
            //用处理好的数据替换掉原来的数据
            var newdata = [NewnodesData,NewlinksData]
            this.$store.commit('INIT_DATA',newdata)
        },
        svginit(){
            this.svgGetnode()
            this.svgRendering()
        },
        svgGetnode(){
            //从store获取数据
            this.svgNodes = this.nodesData
            this.svgLinks = this.linksData
        },
        //图像渲染初始化
        svgRendering(){
            //初始化
            var svg = d3.select("svg")
            let width = +svg.attr('width')
            let height = +svg.attr('height')
            var _this=this
            // 渲染前清空svg内的元素
            svg.selectAll('*').remove()
            
            //zoom移动与缩放
            const zoom = d3.zoom().scaleExtent([0.1, 10]).on("zoom",zoomed);
            function zoomed(){          
                var scale = d3.event.transform.k
                var translate = [d3.event.transform.x, d3.event.transform.y]
                _this.transform ='translate(' + translate[0] + ', ' + translate[1] + ') scale(' + scale + ')'
                svg.attr("transform", _this.transform);
            }

            //画布动作
            svg = d3.select("svg")
                .on('click',()=>{//点击空白区域取消选中
                    this.isFixNode=false
                    this.ClearAllStyle()
                })
                .call(zoom).append("g")
            
            //svg添加到data中
            this.svg = svg
            this.svg.attr("transform", _this.transform);
            
            // 定义碰撞检测模型
            var forceCollide = d3.forceCollide()
            // .radius(d => { return 16 * 3*1.2  })
            // .iterations(0.15/10)//迭代次数
            // .strength(0.75/5)//力量
            .radius(d => { return 16 * 3  })
            .iterations(1)//迭代次数
            .strength(1)//力量

            let simulation = d3.forceSimulation()
            .velocityDecay(0.5)
            .alphaDecay(0.03) 
            .nodes(this.svgNodes)
            .force('charge_force', d3.forceManyBody().strength(-250))
            .force('center_force', d3.forceCenter(width / 2, height / 2))
            .force('collision', forceCollide)
            .force('link', d3.forceLink(this.svgLinks).id((d) => { return d.name }))
            
            simulation.force("link")
            .links(this.svgLinks)
            .distance(d => { // 设置链接力大小
            let distance = 150
            return distance 
            })

            //定义箭头
            let defs = this.svg.append("defs")
            .append("marker")
            .attr("id", "Marker")
            .attr("orient", "auto")
            .attr("stroke-width", 2)
            .attr("markerUnits", "strokeWidth")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 35.25)
            .attr("refY", 0)
            .attr("markerWidth", 15)
            .attr("markerHeight", 12)
            .append("path")
            .attr("d", "M 0 -5 L 10 0 L 0 5")
            .attr('fill', '#e0cac1')
            .attr("stroke-opacity", 0.6)

            //边
            let link = this.svg.append('g')
            .attr('class', 'links')//类型为link
            .selectAll('line')
            .data(this.svgLinks)
            .enter()//操作dom
            .append('line')
            .attr('stroke-width', 2)//边框宽度
            .style('stroke', "#e0cac1")//边框色
            .join('path')
            .attr("marker-end", "url(#Marker)")//链接到箭头属性

            //边上的文字
            let linkname = svg.append('g')
            .attr('class','linkTexts')
            .selectAll("text")
            .data(this.svgLinks)
            .enter()
            .append('text')
            .style('text-anchor','middle')
            .style("fill", '#A5ABB6')
            .style('font-size', 12)
            .text(d => d.type)

            //节点
            let node = this.svg.append('g')
            .attr('class', 'nodes')//类型为node
            .selectAll('circle')
            .data(this.svgNodes)
            .enter()
            .append('circle')
            .attr('r', 32)//圆半径
            .attr('fill', this.circleColorfill)//填充颜色
            .attr('stroke-width', 2)//边框宽度
            .call(drag(simulation))
            .on('click', (event) =>{//鼠标点击事件
                d3.event.stopPropagation() // 阻止事件冒泡，否则会触发画布点击事件
                this.isFixNode=true
                this.MouseFixNode(event)
                
            })
            .on('mouseenter', (event) =>{//鼠标划过事件
                // console.log(d3.event.path[0])
                if(!this.isFixNode){
                    this.MouseScratchNode(event)
                }
            })
            .on('mouseleave', (event) =>{//鼠标划开事件
                if(!this.isFixNode){
                    this.ClearAllStyle()
                }
            })

            //文字
            let text = this.svg.append('g')
            .attr('class', 'texts')//类型为text
            .selectAll("text")
            .data(this.svgNodes)
            .enter()
            .append("text")
            .attr("font-size", 10)
            .attr("fill", '#fff')
            .attr('name', d => d.title)
            .attr("text-anchor", "middle")
            .attr('x', function (d) {
            return textBreaking(d3.select(this), d.title)
            })
            .call(drag(simulation))
            .on('click', (event) =>{//鼠标点击事件
                d3.event.stopPropagation() // 阻止事件冒泡
                this.isFixNode=true
                this.MouseFixNode(event)
            })
            .on('mouseenter', (event) =>{//鼠标划过事件
                if(!this.isFixNode){
                    this.MouseScratchNode(event)
                }
            })

            simulation.on('tick', tickAction)

            //确定link线的起始点x、y坐标 node确定中心点 文本通过translate平移变化
            function tickAction () {
            link
                .attr('x1', (d) => { return d.source.x })
                .attr('y1', (d) => { return d.source.y })
                .attr('x2', (d) => { return d.target.x })
                .attr('y2', (d) => { return d.target.y })
            linkname
                .attr('transform', function(d) {
                    let x = Math.min(d.source.x, d.target.x) + Math.abs(d.source.x - d.target.x) / 2 
                    let y = Math.min(d.source.y, d.target.y) + Math.abs(d.source.y - d.target.y) / 2 
                    let tanA = Math.abs(d.source.y - d.target.y) / Math.abs(d.source.x - d.target.x)
                    let angle = Math.atan(tanA) / Math.PI * 180
                    if (d.source.x > d.target.x) {
                        if (d.source.y <= d.target.y) {
                        angle = -angle
                        }
                    }
                    else if(d.source.y > d.target.y){
                        angle = -angle
                    }
                    return 'translate(' + x + ',' + y + ')' + 'rotate(' + angle + ')'
                })
            node
                .attr('cx', (d) => { return d.x })
                .attr('cy', (d) => { return d.y })
            text
                .attr('transform', function(d) {
                let size = 0
                return 'translate(' + (d.x - size / 2 ) + ',' + (d.y + size / 2) + ')'
                })
            }
            //文字排列的设置
            function textBreaking(d3text, text) {
                const len = text.length
                if (len <= 3) {
                    d3text.append('tspan')
                        .attr('x', 0)
                        .attr('y', 2)
                        .text(text)
                } 
                else {
                    const topText = text.substring(0, 3)
                    const midText = text.substring(3, 7)
                    let botText = text.substring(7, len)
                    let topY = -16
                    let midY = 0
                    let botY = 16
                    if (len <= 7) {
                        topY += 10
                        midY += 10
                    } 
                    else if (len > 10){
                        botText = text.substring(7, 9) + '...'
                    }
        
                    d3text.text('')
                    d3text.append('tspan')
                        .attr('x', 0)
                        .attr('y', topY)
                        .text(function () {
                        return topText
                        })
                    d3text.append('tspan')
                        .attr('x', 0)
                        .attr('y', midY)
                        .text(function () {
                        return midText
                        })
                    d3text.append('tspan')
                        .attr('x', 0)
                        .attr('y', botY)
                        .text(function () {
                        return botText
                        })
                }
            }
            var is_fixed_drag_setting = this.is_fixed_drag_setting
            //节点拖拽
            function drag(simulation) {
                function dragsubject(event) {
                    event = d3.event
                    return simulation.find(event.x, event.y);
                }

                function dragstarted(event) {
                    event = d3.event
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    event.subject.fx = event.subject.x;
                    event.subject.fy = event.subject.y;
                }
                
                function dragged(event) {
                    event = d3.event
                    event.subject.fx = event.x;
                    event.subject.fy = event.y;
                }
                
                function dragended(event) {
                    event = d3.event
                    if (!event.active) 
                        simulation.alphaTarget(0);
                    if (!is_fixed_drag_setting){
                        // 拖动结束后不固定节点
                        event.subject.fx = null;
                        event.subject.fy = null;
                    }
                }
                
                return d3.drag()
                    .subject(dragsubject)
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            }
        },
        circleColorfill (d) {//节点颜色
            for (let i =0;i<this.nodetype.length;i++){
                if (d.type == this.nodetype[i]){
                    return this.nodecolor[i]
                }
            }
        },
        MouseScratchNode(event){//鼠标划过节点样式
            this.$set(this.selectnode, 'index', event.index)
            this.$set(this.selectnode, 'name', event.name)
            this.$set(this.selectnode, 'title', event.title)
            this.$set(this.selectnode, 'type', event.type)
            this.$set(this.selectnode, 'attribute', event.attribute)
            this.svg.select('.nodes').selectAll('circle').attr('class', d => {
                if(d.index == event.index) {
                return 'scratched'
                }
            })
        },
        MouseFixNode(event){//鼠标选中节点样式
            this.$set(this.selectnode, 'index', event.index)
            this.$set(this.selectnode, 'name', event.name)
            this.$set(this.selectnode, 'title', event.title)
            this.$set(this.selectnode, 'type', event.type)
            this.$set(this.selectnode, 'attribute', event.attribute)
            this.svg.select('.nodes').selectAll('circle').attr('class', d => {
                if(d.index == event.index) {
                return 'fixed'
                }
            })
        },
        ClearAllStyle(){//清除所有样式
            this.svg.select('.nodes').selectAll('circle').attr('class', '')
            this.svg.select(".texts").selectAll('text').attr('class', '')
            this.svg.select('.links').selectAll('line').attr('class', '').attr('marker-end', 'url(#Marker)')
            this.svg.select(".linkTexts").selectAll('text').attr('class', '')
        },
        StartEdit(){//打开编辑框
            this.editnode = cloneObj(this.selectnode)//深拷贝
            this.isOpenDialog = true
        },
        StopEdit(){//关闭编辑框
            this.isOpenDialog = false
        },
        ActEdit(){//执行编辑操作
            this.isOpenDialog = false
            this.selectnode = cloneObj(this.editnode)
            this.$store.commit('UPDATE_NODE',this.editnode)
            // this.datainit()
            this.svginit()
            this.$message({
                message: '编辑成功',
                type: 'success'
            })
        },
        HiddenNode(){
            //隐藏节点
            this.svgNodes = this.svgNodes.filter(node => {
                if (node.name===this.selectnode.name)
                    return false
                else
                    return true
            })
            //隐藏邻边
            this.svgLinks = this.svgLinks.filter(link => {
                if (link.source.name===this.selectnode.name||
                    link.target.name===this.selectnode.name)
                    return false
                else
                    return true
            })
            this.svgRendering()//重新渲染
        },
        ExpandNode(){
            //定义关键节点的叶子节点
            // console.log(this.selectnode)
            axios.get('http://'+this.server_ip+'/api/search_id?node_id='
                +this.selectnode.name).then(
                response=>{
                    console.log('请求成功',response.data)
                    let resnodes = response.data['nodes']
                    let reslinks = response.data['links']
                    let isrepeat = 0
                    // console.log(this.NodesData)
                    for (let key in resnodes){
                        isrepeat = 0
                        for (let j in this.NodesData){
                            if (this.NodesData[j].id===resnodes[key].id)
                                isrepeat = 1
                        }
                        // console.log(isrepeat)
                        if(isrepeat===0)
                            this.NodesData.push(resnodes[key])
                    }
                    for (let key in reslinks){
                        isrepeat = 0
                        for (let j in this.LinksData){
                            if (this.LinksData[j].id===reslinks[key].id)
                                isrepeat = 1
                        }
                        if(isrepeat===0)
                            this.LinksData.push(reslinks[key])
                    }
                    // this.NodesData = response.data['nodes']
                    // this.LinksData = response.data['links']
                    // console.log(this.NodesData)
                    //数据传到vuex
                    this.$store.commit('nodesData',this.NodesData)
                    this.$store.commit('linksData',this.LinksData)
                    //数据初始化
                    // if (this.isfirstinit){
                    this.datainit()
                    // }
                    //渲染初始化
                    this.svginit()
                },
                error=>{
                    console.log('请求失败',error.message)
                }
            )
            this.svgRendering()//重新渲染
        },
        ExpandNode_old(){//旧版本函数，主要是在前端存储中做节点展开
            //定义关键节点的叶子节点
            let leafnodes=[]
            // 遍历关系
            this.svgLinks = this.linksData.filter(link => {
                let iskeylink = 0
                if (link.source.name === this.selectnode.name){
                    leafnodes.push(link.target)
                    return true
                }
                else if (link.target.name === this.selectnode.name){
                    leafnodes.push(link.source)
                    return true
                }
                else
                    return false  
            })
            // 遍历节点（可能有重复）
            this.svgNodes = this.nodesData.filter(node => {
                let iskeynode = 0
                if (node.name === this.selectnode.name)//关键节点
                    iskeynode = 1    
                for (let key in leafnodes){//关键节点的叶子节点
                    if (node.name === leafnodes[key].name)
                        iskeynode = 1    
                }
                if (iskeynode) 
                    return true
                else
                    return false
            })
            this.svgRendering()//重新渲染
        },
        QuestionDel(){
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
                    this.DeleteNode()
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });       
                });
        },
        DeleteNode(){
            //删除节点
            this.svgNodes = this.svgNodes.filter(node => {
                if (node.name===this.selectnode.name)
                    return false
                else
                    return true
            })
            //删除邻边
            this.svgLinks = this.svgLinks.filter(link => {
                if (link.source.name===this.selectnode.name||
                    link.target.name===this.selectnode.name)
                    return false
                else
                    return true
            })
            //将选择节点置空
            var selectnodename = this.selectnode.name
            this.selectnode.name = undefined
            //删除数据上传
            var nodes_links = [this.svgNodes,this.svgLinks]
            this.$store.commit('ALL_FRESH_DATA',nodes_links)//前端隐藏
            this.$store.commit('DEL_NODE',selectnodename)//后端删除
            // this.datainit()
            this.svginit()//刷新图谱，重新渲染
        },
        Refresh(){//刷新图谱，重新渲染
            // this.svginit()
            this.mount_init()
        },
        ActSearch(){//执行搜索操作
            // console.log("????")
            let search_value = this.search_input
            let search_type = this.search_select_type
            let search_property = this.search_select_property
            if(search_type === ''||search_type === 'all'){
                search_type = 'all'
            }
            if(search_property===''||search_property==='fuzzy'){
                search_property = 'fuzzy'
            }
            axios.get('http://'+this.server_ip+'/api/search_node?node_type='
                +search_type+'&node_name='+search_value + '&node_attribute='+ search_property).then(
                response=>{
                    console.log('请求成功',response.data)
                    if (response.data['nodes'].length===0){
                        //没有搜索结果
                        this.$message({
                            message: '无有效结果',
                            type: 'error'
                        })
                        return 
                    }
                    this.NodesData = response.data['nodes']
                    this.LinksData = response.data['links']
                    //数据传到vuex
                    this.$store.commit('nodesData',this.NodesData)
                    this.$store.commit('linksData',this.LinksData)
                    //数据初始化
                    this.datainit()
                    //渲染初始化
                    this.svginit()
                },
                error=>{
                    console.log('请求失败',error.message)
                }
            )
            // this.svgRendering()//重新渲染
        },
        DoSearch(search_type,search_property,search_value){//执行搜索操作
            let result_node={}
            let result_list=[]
            this.search_nodes=[]
            // 暂时停用，本来希望做个提示功能
            },
        ActSearch_old(){//执行搜索操作
            let search_value = this.search_input
            let search_type = this.search_select_type
            let search_property = this.search_select_property
            this.DoSearch(search_type,search_property,search_value)
            if (this.search_nodes.length===0){
                //没有搜索结果
                this.$message({
                    message: '无有效结果',
                    type: 'error'
                })
                return 
            }
            //定义关键节点的叶子节点
            let leafnodes=[]
            // 遍历关系
            this.svgLinks = this.linksData.filter(link => {
                let iskeylink = 0
                for (let j in this.search_nodes){
                    if (link.source.name === this.search_nodes[j].name){
                        iskeylink = 1
                        leafnodes.push(link.target)
                    }
                    else if (link.target.name === this.search_nodes[j].name){
                        iskeylink = 1
                        leafnodes.push(link.source)
                    }  
                }
                if(iskeylink){//当前link是与关键节点相连的
                    return true
                }
                else
                    return false
            })
            // 遍历节点（可能有重复）
            this.svgNodes = this.nodesData.filter(node => {
                let iskeynode = 0
                for (let key in this.search_nodes){//关键节点
                    if (node.name === this.search_nodes[key].name)
                        iskeynode = 1    
                }
                for (let key in leafnodes){//关键节点的叶子节点
                    if (node.name === leafnodes[key].name)
                        iskeynode = 1    
                }
                if (iskeynode) 
                    return true
                else
                    return false
            })
            this.svgRendering()//重新渲染
        },
        DoSearch_old(search_type,search_property,search_value){//执行搜索操作 但是基于前端的搜索，消耗内存太大，不搞了
            let result_node={}
            let result_list=[]
            this.search_nodes=[]
            for(let key in this.nodesData){
                result_node={} //init
                let node = this.nodesData[key]
                if(search_type === node.type||search_type === ''||search_type === 'all'){
                    if(search_property==='title'){
                        if(node.title.indexOf(search_value)!==-1 && search_value!==''){
                            result_node = node 
                        }
                    }
                    else if(search_property==='index'){
                        if(node.index.toString() === search_value){
                            result_node = node 
                        }
                    }
                    else if(search_property===''||search_property==='all'){
                        if(node.title.indexOf(search_value)!==-1 && search_value!==''
                            ||node.index.toString() === search_value){
                            result_node = node 
                        }
                    }
                }
                if (JSON.stringify(result_node) !== '{}'){//判断本次循环是否找到有效节点
                    result_list.push(result_node.name)//搜索到name作为节点唯一标识
                    this.search_nodes.push(result_node)
                }
            }
            this.svg.select('.nodes').selectAll('circle').attr('class', d => {
                for (let key in result_list){
                    if(d.name == result_list[key]) {
                        return 'iskeyword'
                    }
                }
            })
        },
        //create框部分
        CreateNewNode(){
            this.CreateNewNode_visio=1
            this.watch_CreateNewNode_visio = !this.watch_CreateNewNode_visio
        },
        CreateNewRelation(){
            this.CreateNewNode_visio=2
            this.watch_CreateNewNode_visio = !this.watch_CreateNewNode_visio
        },
        CreateNewTuple(){
            this.CreateNewNode_visio=3
            this.watch_CreateNewNode_visio = !this.watch_CreateNewNode_visio
        },
        closeCreateNew(){
            this.CreateNewNode_visio=false
            this.watch_CreateNewNode_visio = !this.watch_CreateNewNode_visio
        },
        create_box_button_class(e){
            let showclass = false
            if (this.CreateNewNode_visio===e){
                showclass = false
            }
            else{
                showclass = true
            }
            return {"create-box-button":showclass,"create-box-button-hover":!showclass}
        },
        /*提交节点 */
        SubmitNewNode(){
            if(this.node1_newcreate===''){
                this.$message({
                message: '节点类型不能为空',
                type: 'warning'
                })
                return false
            }
            if(this.title1_newcreate===''){
                this.$message({
                message: '节点名称不能为空',
                type: 'warning'
                })
                return false
            }
            axios.get('http://'+this.server_ip+'/api/create_new_node?node_type='
                +this.node1_newcreate+'&node_name='+this.title1_newcreate+'&node_arr'+this.arr1_newcreate).then(
                response=>{
                    if (response.data['message']==='IsRepeat'){
                        this.$message({
                            message: '节点重复',
                            type: 'warning'
                        })
                        this.NodesData = response.data['nodes']
                        this.LinksData = response.data['links']
                        //数据传到vuex
                        this.$store.commit('nodesData',this.NodesData)
                        this.$store.commit('linksData',this.LinksData)
                        //数据初始化
                        this.datainit()
                        //渲染初始化
                        this.svginit()
                        return false
                    }
                    if (response.data['message']==='IsOK'){
                        console.log('请求成功',response.data)
                        let resnodes = response.data['nodes']
                        this.NodesData.push(resnodes)
                        //数据传到vuex
                        this.$store.commit('nodesData',this.NodesData)
                        this.$store.commit('linksData',this.LinksData)
                        //数据初始化
                        this.datainit()
                        //渲染初始化
                        this.svginit()
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        })
                        //重置表格
                        this.CreateNewNode_visio=false
                        this.watch_CreateNewNode_visio = !this.watch_CreateNewNode_visio
                    }
                },
                error=>{
                    console.log('请求失败',error.message)
                }
            )
        },
        /*提交关系 */
        SubmitNewLink(){
            if(this.node1_newcreate===''||this.node2_newcreate===''){
                this.$message({
                message: '节点类型不能为空',
                type: 'warning'
                })
                return false
            }
            if(this.title1_newcreate===''||this.title2_newcreate===''){
                this.$message({
                message: '节点名称不能为空',
                type: 'warning'
                })
                return false
            }
            if(this.type_newcreate===''){
                this.$message({
                message: '关系不能为空',
                type: 'warning'
                })
                return false
            }
            axios.get('http://'+this.server_ip+'/api/create_new_link?node1_type='
                +this.node1_newcreate+'&node1_name='+this.title1_newcreate+'&node2_type='
                +this.node2_newcreate+'&node2_name='+this.title2_newcreate+'&link_type='
                +this.type_newcreate).then(
                response=>{
                    console.log('请求成功',response.data)
                    if (response.data['message']==='LackHT'){
                        this.$message({
                            message: '头尾节点均不存在',
                            type: 'warning'
                        })
                        return false
                    }
                    if (response.data['message']==='LackHead'){
                        this.$message({
                            message: '头节点不存在',
                            type: 'warning'
                        })
                        return false
                    }
                    if (response.data['message']==='LackTail'){
                        this.$message({
                            message: '尾节点不存在',
                            type: 'warning'
                        })
                        return false
                    }
                    if (response.data['message']==='IsRepeat'){
                        this.$message({
                            message: '该两节点已存在关系',
                            type: 'warning'
                        })
                        this.NodesData = response.data['nodes']
                        this.LinksData = response.data['links']
                        //数据传到vuex
                        this.$store.commit('nodesData',this.NodesData)
                        this.$store.commit('linksData',this.LinksData)
                        //数据初始化
                        this.datainit()
                        //渲染初始化
                        this.svginit()
                        return false
                    }
                    if (response.data['message']==='IsOK'){
                        this.NodesData = response.data['nodes']
                        this.LinksData = response.data['links']
                        //数据传到vuex
                        this.$store.commit('nodesData',this.NodesData)
                        this.$store.commit('linksData',this.LinksData)
                        //数据初始化
                        this.datainit()
                        //渲染初始化
                        this.svginit()
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        })
                        //重置表格
                        this.CreateNewNode_visio=false
                        this.watch_CreateNewNode_visio = !this.watch_CreateNewNode_visio
                    }
                },
                error=>{
                    console.log('请求失败',error.message)
                }
            )
        },
        /*提交三元组 */
        SubmitNewTuple(){
            if(this.node1_newcreate===''||this.node2_newcreate===''){
                this.$message({
                message: '节点类型不能为空',
                type: 'warning'
                })
                return false
            }
            if(this.title1_newcreate===''||this.title2_newcreate===''){
                this.$message({
                message: '节点名称不能为空',
                type: 'warning'
                })
                return false
            }
            if(this.type_newcreate===''){
                this.$message({
                message: '关系不能为空',
                type: 'warning'
                })
                return false
            }
            axios.get('http://'+this.server_ip+'/api/create_new_tuple?node1_type='
                +this.node1_newcreate+'&node1_name='+this.title1_newcreate+'&node2_type='
                +this.node2_newcreate+'&node2_name='+this.title2_newcreate+'&node1_arr='
                +this.arr1_newcreate+'&node2_arr='+this.arr2_newcreate+'&link_type='
                +this.type_newcreate).then(
                response=>{
                    console.log('请求成功',response.data)
                    if (response.data['message']==='IsRepeat'){
                        this.$message({
                            message: '该两节点已存在关系',
                            type: 'warning'
                        })
                        this.NodesData = response.data['nodes']
                        this.LinksData = response.data['links']
                        //数据传到vuex
                        this.$store.commit('nodesData',this.NodesData)
                        this.$store.commit('linksData',this.LinksData)
                        //数据初始化
                        this.datainit()
                        //渲染初始化
                        this.svginit()
                        return false
                    }
                    else{
                        this.NodesData = response.data['nodes']
                        this.LinksData = response.data['links']
                        //数据传到vuex
                        this.$store.commit('nodesData',this.NodesData)
                        this.$store.commit('linksData',this.LinksData)
                        //数据初始化
                        this.datainit()
                        //渲染初始化
                        this.svginit()
                        //重置表格
                        this.CreateNewNode_visio=false
                        this.watch_CreateNewNode_visio = !this.watch_CreateNewNode_visio
                    }
                    if (response.data['message']==='NewHT'){
                        this.$message({
                            message: '成功创建新三元组',
                            type: 'success'
                        })
                    }
                    if (response.data['message']==='NewHead'){
                        this.$message({
                            message: '成功创建新的头节点',
                            type: 'success'
                        })
                    }
                    if (response.data['message']==='NewTail'){
                        this.$message({
                            message: '成功创建新的尾节点',
                            type: 'success'
                        })
                    }
                    if (response.data['message']==='IsOK'){
                        this.$message({
                            message: '关系创建成功',
                            type: 'success'
                        })
                    }
                },
                error=>{
                    console.log('请求失败',error.message)
                }
            )
        },
        //自动提示类型
        querySearch_node(queryString, cb) {
            var node_create_type = this.node_create_type;
            var results = queryString ? node_create_type.filter(this.createFilter_node(queryString)) : node_create_type;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter_node(queryString) {
            return (node_create_type) => {
            return (node_create_type.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAllnodetype() {
            return [
                { "value": "系统" },
                { "value": "巡查项目" },
                { "value": "巡查子项目" },
                { "value": "内容" },
                { "value": "方法" },
                { "value": "巡检周期" },
            ]
        },
        querySearch_rel(queryString, cb) {
            var relation_create_type = this.relation_create_type;
            var results = queryString ? relation_create_type.filter(this.createFilter_rel(queryString)) : relation_create_type;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter_rel(queryString) {
            return (relation_create_type) => {
            return (relation_create_type.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAllrelationtype() {
            return [
                { "value": "巡查项目" },
                { "value": "巡查子项目" },
                { "value": "内容" },
                { "value": "方法" },
                { "value": "巡检周期" },
            ]
        }
    }
}
</script>

<style scoped>
/* 内容界面 */
.content-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    /* width:max-content; */
}
/*图谱*/
.svg-box{
    flex:1;/*撑满布局 */
    height:100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:rgba(227,237,245,1);
}
svg {
    border: 1px solid rgba(227,237,245,1);
    background-color: rgba(255,255,255,0.8);
    /* border-left:0px; */
}
/*组件框*/
.widget{
    height:800px;
}
/* 刷新小组件 */
.refresh{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:10px;
    width:20px;
    height:20px;
    /* position: absolute;
    left: 1278px;
    top: 109px; */
    border:1px solid #ccc;
    border-radius: 5px;
    background-color: white;
}
.refresh:hover{
    background-color:rgba(236,245,255,1);
    color:rgba(76,163,255,1);
    /* border-color: rgba(76,163,255,1); */
}
/* 工具界面 */
.tool-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height:99.8vh;
    width:352px;
    border-left:1px solid #ccc;
    /* border-left: 0px; */
}
.tool-box-head{
    display: flex;
    flex-direction: column;
    justify-content: start;
}
/* 搜索盒子 */
.search-box{
    padding:5px;
    background-color: #fff;
    border-block-end:1px solid #ccc;
}
/*创建栏盒子 */
.create-box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    padding:5px 10px 5px 5px;
    border-block-end:1px solid #ccc;
}
.create-box-button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding:10px 8px 10px 10px;
    font-size: 14px;
    color:rgba(128,128,128,0.6);
    /* font-weight: bold; */
    background: white;
    border: 1px solid rgba(128,128,128,0.2);
    border-radius:5px;
    height:40px;
    width:100px;
}.create-box-button:hover{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding:10px 8px 10px 10px;
    font-size: 14px;
    color:rgba(128,128,128,0.8);
    /* font-weight: bold; */
    background: white;
    border: 1px solid rgba(128,128,128,0.6);
    border-radius:5px;
    height:40px;
    width:100px;
}
.create-box-button-hover{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding:10px 8px 10px 10px;
    font-size: 14px;
    border-radius:5px;
    height:40px;
    width:100px;
    color:#409EFB;
    background: rgba(64,158,251,0.1);
    border: 1px solid #409EFB;
}
/*创建栏的下属编辑框 */
.newnode-box{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding:5px 0 5px 0;
    border-block-end:1px solid #ccc;
}
.newnode-box-son{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    /* border-block-end:1px solid #ccc; */
    padding:10px;
    /* width:100%; */
}
.newnode-box-son1{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    /* border-block-end:1px solid #ccc; */
    padding:10px;
    /* width:100%; */
}
.newnode-box-son2{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: space-between;
    /* border-block-end:1px solid #ccc; */
    padding:10px;
    width:300px;
}
.newnode-box-son span{
    display: flex;
    justify-content: center;
    padding:10px 8px 10px 10px;
    font-size: 14px;
    color:#409EFB;
    font-weight: bold;
    background: rgba(236,245,255,1);
    border-radius:5px 0px 0px 5px;
    height:20px;
    width:72px;
}
.newnode-box-son1 span{
    display: flex;
    justify-content: center;
    padding:10px 8px 10px 10px;
    font-size: 14px;
    color:#409EFB;
    font-weight: bold;
    background: rgba(236,245,255,1);
    border-radius:5px 0px 0px 5px;
    height:20px;
    width:100px;
}
.newnode-button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding:10px 8px 10px 10px;
    font-size: 14px;
    color:#409EFB;
    font-weight: bold;
    background: rgba(64,158,251,0.05);
    border: 1px solid rgba(64,158,251,0.4);
    border-radius:5px;
    height:40px;
    width:100px;
}
.newnode-button:hover{
    background: rgba(64,158,251,0.2);
}
/* 信息展示盒子 */
.info-box{
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: auto;
    margin-right:1.5px;
}
/* 信息展示卡框 */
.info {
    /* position: absolute; */
    /* bottom: 40px;
    right: 30px; */
    width: 350px;
}
/* 信息展示卡 */
.node-card {
    border: 1px solid #9faecf;
    background-color: #fff;
    color: rgba(0,0,0,0.8);
    text-align: left;
}
/* 信息展示卡按键槽 */
.card-btn{
    padding:20px 10px 0px 5px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
}
.card-btn>button{
    width:90px;
    height:40px;
    font-size:14px;
    border:1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    color:rgba(96,98,102,1);
}
.card-btn>button:hover{
    background-color:rgba(236,245,255,1);
    color:rgba(76,163,255,1);
    border-color: rgba(76,163,255,1);
}
.card-btn>.del-btn:hover{
    background-color:rgba(254,240,240,1);
    color:rgba(245,108,108,1);
    border-color: rgba(245,108,108,1);
}
.el-card__header {
    border-bottom: 1px solid #50596d;
}
.edit-btn{
    float: right; 
    padding: 3px 0;
    color: #409EFB;
    font-size: 15px;
}  
.card-content{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
}
.card-content>span{
    padding:3px 0;
    font-weight: bold;
}
.card-content>span>span{
    font-stretch: extra-condensed;
    font-weight: normal;
}
.dialog-form{
    width: 500px; 
    margin-left:50px;
}

</style>

<style>
.links line {
    stroke: #999;
    stroke-opacity: 0.6;
}
/*基本样式*/
.nodes circle {
    stroke: #fff;
    stroke-width: 1.5px;
}
/* 鼠标划过时的样式 */
.nodes .scratched{
    stroke: rgba(207,236,255,0.8);
    stroke-width: 10px;
}
/* 鼠标选中节点时的样式 */
.nodes .fixed{
    stroke: rgba(207,236,255,1);
    stroke-width: 10px;
}
/* 鼠标选中节点时的样式 */
.nodes .iskeyword{
    stroke: rgba(207,236,255,1);
    stroke-width: 10px;
}
/* 搜索框*/
.el-select .el-input {
    width: 150px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
/*搜索按钮 */
.el-input-group__append:hover{
    background-color: rgba(236,245,255,1);
    color:rgba(76,163,255,1);
    /* border-color:rgba(255,255,255,1); */
}
/*创建栏框 */
.newnode-box .el-input__inner{
    border-radius:0px 4px 4px 0px;
    width:210px;
}
</style>
  