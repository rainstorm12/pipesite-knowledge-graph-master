<template>
    <div>
        <div class='about-box'>
            <h1>地下管廊运维知识图谱系统</h1>
            <h2>基本功能</h2>
            <h3>可视化展示</h3>
            <p>1.点击节点展示详情并选中，移动时拖拽节点</p>
            <p>2.点击画布取消选中，移动时整个图谱</p>
            <p>3.鼠标滚轮/左键双击，实现放大缩小</p>
            <h3>详情栏</h3>
            <p>1.节点编辑：修改除序号之外的文字内容</p>
            <p>2.节点隐藏：在图谱中隐藏选中节点</p>
            <p>3.节点展开：在图谱中展示选中节点及叶子节点</p>
            <p>4.删除节点：永久删除选中节点</p>
            <h3>搜索框</h3>
            <p>1.输入文字时自动选择相关节点</p>
            <p>2.点击搜索/按下空格，通过关键词查询节点及叶子节点</p>
            <p>3.点击画布左上角返回键，回到原始图谱</p>
            <h2>模式层</h2>
            <p>系统->巡检项目->巡检子项目->内容->方法(根据官方手册其实可以分为巡检方法和维护方法)</p>
            <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;->巡检周期</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',
    props: {},
    data () {
        return {
        }
    },
}
</script>

<style scoped>

.about-box{
    display:flex;
    flex-direction: column;
    justify-content: start;/*子元素*/
    align-items: start;/*子元素纵轴*/
    margin:10px 20px;
    padding:10px 20px;
    /* background:rgba(227,237,245,1); */
    /* height:95vh; */
}
.about-box>h1{
    margin-bottom:10px;
    padding-bottom:10px;
    font-weight:bolder;
}
.about-box>h2{
    margin:10px 0;
    padding:10px 0;
    font-weight:bold;
}
.about-box>h3{
    margin:20px 0;
    padding:10px 5px 0 0;
    font-weight:normal;
}
.about-box>p{
    margin:3px 0;
    padding:3px 5px;
    font-weight:normal;
    color: rgba(94,109,130,1);
}
</style>
   