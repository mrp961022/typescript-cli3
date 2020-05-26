<template>
    <div class="about">
        <div id="charts"></div>
        <div>
            <el-button @click="aa" type="primary">确认</el-button>
            <el-button @click="bb">取消</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HighCharts from "highcharts";
@Component({
    name: "about"
})
export default class About extends Vue {
    mounted() {
        this.drawCharts();
    }
    drawCharts() {
        let option: object = {
            // option声明类型 不然ts会报错
            chart: {
                type: "bar" //指定图表的类型，默认是折线图（line）
            },
            title: {
                text: "我的第一个图表" // 标题
            },
            xAxis: {
                categories: ["苹果", "香蕉", "橙子"] // x 轴分类
            },
            yAxis: {
                title: {
                    text: "吃水果个数" // y 轴标题
                }
            },
            series: [
                {
                    // 数据列
                    name: "小明", // 数据列名
                    data: [1, 0, 4] // 数据
                },
                {
                    name: "小红",
                    data: [5, 7, 3]
                }
            ]
        };
        HighCharts.chart("charts", option); // 或者 直接键入option对象 as object
    }
    aa() {
        this.$store.commit("increment", 222);
    }
    bb() {
        console.log(this.$store.state.count);
    }
}
</script>
