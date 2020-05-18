<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <child1 @editHandleEmit="editHandle" :newMsg="'今天吃肉肉吗'" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import child1 from "./HelloChild/child1.vue";
@Component({
    components: {
        child1
    }
})
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
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
