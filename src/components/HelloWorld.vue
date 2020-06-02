<template>
    <div class="hello">
        <child1 @editHandleEmit="editHandle" userName="老王" food="吃肉" />
        <div title="计算属性">{{getComputedMsg}}</div>
        <button @click="helloNum++">点击切换触发watch</button>
        <br />
        <!-- <el-upload action="dsafas/dsfasd/fsad">
            <i class="el-icon-plus"></i>
        </el-upload>-->
        <br />
        <button @click="newHelloNum++">另一种方式</button>
        <br />
        <br />
        <el-button @click="clickMrpFile">点击上传</el-button>
        <ul>
            <li v-for="(item,index) in fileList" :key="index">
                {{item.name}}
                <a
                    @click="removeFile(item.name)"
                    class="el-icon-close"
                    style="font-weight:bold"
                ></a>
            </li>
        </ul>
        <br />
        <input
            style="display:none"
            id="mrpFile"
            type="file"
            @change="addImg"
            ref="inputer"
            multiple
            accept="image/png, image/jpeg, image/gif, image/jpg"
        />
        <el-button type="primary" @click="uploadFileNow">上传</el-button>
        <el-button type="primary" @click="downLoadFile">下载文件</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import child1 from "./HelloChild/child1.vue";
import { ajax, download } from "@/assets/js/ajaxUrl";
import { Form } from "element-ui";
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
    @Prop() private newMsg?: string; // ? 不是必填
    helloNum: number = 0;
    newHelloNum: number = 0;
    fileList: Array<File> = [];
    imgLen: number = 0;
    mounted() {
        // 两种prop入参取值方式
        const ConStyle: string =
            "background:#41b883;color:#fff;border-radius:3px;padding:0 3px;";
        console.log(`%c${this.msg}`, ConStyle);
        console.log(`%c${this.$props.isSix}`, ConStyle);
        ajax({
            type: "get",
            url: "http://localhost:8888/county.json", // vueCli3中静态json放在public中直接使用url访问
            timeOut: "6",
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
    addImg(event: any) {
        let inputDOM: any = this.$refs.inputer;
        // 通过DOM取文件数据
        let fil = inputDOM.files;
        let fileAllName: Array<string> = [];
        this.fileList.map(item => {
            fileAllName.push(item.name);
        });
        let oldLen = this.imgLen;
        let len = fil.length + oldLen;
        if (len > 4) {
            inputDOM.value = "";
            alert("最多可上传4张，您还可以上传" + (4 - oldLen) + "张");
            return false;
        } else {
            let newFile = [...fil];
            newFile = newFile.filter(item => {
                return fileAllName.indexOf(item.name) == -1;
            });
            this.fileList = [...this.fileList, ...newFile];
            this.imgLen = this.fileList.length;
        }
        for (let i = 0; i < fil.length; i++) {
            let size = Math.floor(fil[i].size / 1024);
            if (size > 5 * 1024 * 1024) {
                alert("请选择5M以内的图片！");
                return false;
            }
        }
    }
    clickMrpFile() {
        let mrpFile = document.getElementById("mrpFile");
        let event;
        event = new MouseEvent("click");
        if (mrpFile) mrpFile.dispatchEvent(event);
    }
    consoleFile() {
        console.log(this.fileList);
        console.log(this.imgLen);
    }
    removeFile(fileName: string) {
        this.fileList = this.fileList.filter(item => {
            if (item.name != fileName) {
                return true;
            } else {
                return false;
            }
        });
        this.imgLen--;
    }
    uploadFileNow() {
        let fileForm: FormData = new FormData();
        for (var i in this.fileList) {
            fileForm.append("files", this.fileList[i]);
        }
        ajax({
            type: "post",
            url: "http://localhost:8888/adfasdf/dasfsad", // vueCli3中静态json放在public中直接使用url访问
            timeOut: "6",
            data: fileForm
        })
            .then(reposne => {
                console.table(JSON.parse(reposne).data[0]);
            })
            .catch(reject => {
                console.assert(!reject, reject);
            });
    }
    downLoadFile() {
        download({
            url: "http://localhost:8888/adfasdf/dasfsad",
            // data: { name: 1, age: 2 }
        });
    }
    // 计算属性 computed
    get getComputedMsg(): string {
        return "abc";
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
        // display: inline-block;
        // text-align: left;
        margin: 0 10px;
    }
    a {
        // color: #42b983;
        cursor: pointer;
    }
    a:hover {
        color: lightblue;
    }
}
</style>
