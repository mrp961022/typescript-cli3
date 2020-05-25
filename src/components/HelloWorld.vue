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
    }
})
export default class HelloWorld extends Vue {
    mounted() {
        ajax({
            type: "get",
            url: "http://localhost:8888/county.json" // vueCli3中静态json放在public中直接使用url访问
            // data: { name: "1", age: 2, sex: "male" },
            // contentType: "application/x-www-form-urlencoded;charset=UTF-8" // post入参时如果需要就加
        })
            .then(reposne => {
                console.log(reposne);
            })
            .catch(reject => {
                console.log(reject);
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
