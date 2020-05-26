<template>
    <div class="hello">
        <child1 @editHandleEmit="editHandle" userName="老王" food="吃肉" />
        <button @click="helloNum++">点击切换触发watch</button>
        <br />
        <br />
        <button @click="newHelloNum++">另一种方式</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import child1 from "./HelloChild/child1.vue";
import { ajax } from "@/assets/js/ajaxUrl";
@Component({
    name: "helloWorld",
    components: {
        child1
    },
    watch: {
        newHelloNum(newVal: number, oldVal: number): void {
            console.log(`${oldVal} ${newVal} 第二种`);
        }
    },
    props: {
        isSix: {
            type: String, // 定义类型为大写 如果赋值是小写
            required: false // 是否必传 否
        }
    }
})
export default class HelloWorld extends Vue {
    @Prop() private msg!: string; // !表示父组件必传
    helloNum: number = 0;
    newHelloNum: number = 0;
    mounted() {
        // 两种prop入参取值方式
        const ConStyle: string =
            "background:#41b883;color:#fff;border-radius:3px;padding:0 3px;";
        console.log(`%c${this.msg}`, ConStyle);
        console.log(`%c${this.$props.isSix}`, ConStyle);
        ajax({
            type: "get",
            url: "http://localhost:8888/county.json", // vueCli3中静态json放在public中直接使用url访问
            timeOut: 2,
            data: { name: "1", age: 2, gender: "male" }
            // contentType: "application/x-www-form-urlencoded;charset=UTF-8" // post入参时如果需要就加
        })
            .then(reposne => {
                console.table(JSON.parse(reposne).data[0]);
            })
            .catch(reject => {
                console.assert(!reject, reject);
            });
    }
    editHandle(msg: string) {
        console.log(msg);
    }
    @Watch("helloNum") // watch监听哪个
    getHelloNum(newVal: number, oldVal: number): void {
        console.log(`${oldVal} ${newVal} 第一种`);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
    // background: #cccccc;
    // color: #ffffff;
    h3 {
        margin: 40px 0 0;
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
}
</style>
