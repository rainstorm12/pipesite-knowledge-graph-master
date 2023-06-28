<template>
    <div>
        <div class='setting-box'>
            <h1>可视化设置</h1>
            <div class="setting-drag">
                <span>节点拖动效果</span>
                <el-switch
                    @change="Setting_drag1"
                    v-model="value0"
                    inactive-text="弹性"
                    active-text="固定">
                </el-switch>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name: 'SettingPage',
    props: {},
    data () {
        return {
            value0:false,
        }
    },
    mounted(){
        this.value0 = this.is_fixed_drag_setting
    },
    computed:{
        //借助mapState生成计算属性，从state中读取数据
        ...mapState(['is_fixed_drag_setting']),
    },
    methods:{
        //设置更新
        Setting_drag1(){
            var settings = []
            settings.push(this.value0)
            this.$store.commit('UPDATE_SETTING',settings)
        },
    },
}
</script>

<style scoped>

.setting-box{
    display:flex;
    flex-direction: column;
    justify-content: start;/*子元素*/
    align-items: start;/*子元素纵轴*/
    margin:10px 20px;
    padding:10px 20px;
    /* background:rgba(227,237,245,1); */
    /* height:95vh; */
}
.setting-box>h1{
    margin-bottom:10px;
    padding-bottom:10px;
    font-weight:bolder;
}
.setting-box>h2{
    margin:10px 0;
    padding:10px 0;
    font-weight:bold;
}
.setting-box>h3{
    margin:20px 0;
    padding:10px 5px 0 0;
    font-weight:normal;
}
.setting-box>p{
    margin:3px 0;
    padding:3px 5px;
    font-weight:normal;
    color: rgba(94,109,130,1);
}
.setting-drag{
    display:flex;
    flex-direction: row;
    justify-content: space-between;/*子元素*/
    align-items: center;/*子元素纵轴*/
    width:400px;
    background-color: whitesmoke;
    padding:10px 12px;
    margin:20px 5px 0 5px;
    border-radius: 6px;
}
.setting-drag>span{
    /* font-size: 14px; */
    font-weight: bold;
}
</style>
   