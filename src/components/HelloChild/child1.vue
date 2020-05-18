<template>
    <div @click="editHandle('今天吃啥')">{{newMsg}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
    @Prop() private newMsg!: string;
    @Emit("editHandleEmit")
    private editHandle(msg: string): string {
        return msg;
    }
}
</script>