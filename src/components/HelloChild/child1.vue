<template>
    <div @click="editHandle('今天吃啥')">{{userName+food}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component({
    name:"helloWorldChild1"
})
export default class HelloWorld extends Vue {
    @Prop() private userName!: string; // prop入参
    @Prop() private food!: string;
    mounted(){
        console.log(this.$store.state.jsonArray)
    }
    @Emit("editHandleEmit") // 调用父组件的方法
    private editHandle(msg: string): string {
        return msg;
    }
}
</script>