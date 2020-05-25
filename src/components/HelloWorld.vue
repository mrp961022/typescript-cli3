<template>
    <div class="hello">
        <child1 @editHandleEmit="editHandle" :userName="'老王'" :food="'吃肉'" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import child1 from "./HelloChild/child1.vue";
import { ajax } from "@/assets/js/ajaxUrl";
@Component({
    name: "helloWorld",
    components: {
        child1
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
    mounted() {
        // 两种prop入参取值方式
        console.log(`%c${this.msg}`, "background:#41b883;color:#fff;border-radius:3px;padding:0 3px;");
        console.log(`%c${this.$props.isSix}`, "background:#41b883;color:#fff;border-radius:3px;padding:0 3px;");
        ajax({
            type: "get",
            url: "http://localhost:8888/county.json" // vueCli3中静态json放在public中直接使用url访问
            // data: { name: "1", age: 2, sex: "male" },
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
