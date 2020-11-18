# typescript-cli3

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### vue-cli3 创建项目 typescript
> 建议使用vscode、webstorm等编辑器中进行操作
#### vue create 项目名
#### 键盘上下箭头选择最后一个自定义
#### 选上typescript 其他的根据需要选择 数字对应需要安装的依赖（也可以上下选择需要的空格） 全选 a(建议不要全选 太慢了)
#### 项目根目录新建 vue.config.js 设置配置项

```
module.exports = {
    runtimeCompiler: true,
    //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
    publicPath: "./",
    devServer: {
        port: 8888 //端口
    },
    productionSourceMap: false // 是否生成map文件 建议false 减小打包体积
}
```
#### yarn serve / npm run serve 或者 vue ui 在ui页面进行操作

#### src 根目录的.d.ts文件为ts语法的忽略

```
declare module *** // 忽略模块
declare ***  // 忽略方法、变量等

```

### @*** 装饰器 常用于规范方法、变量、类等的格式，装饰器看写在谁的前面，写在类前就是类装饰器，变量前就是变量装饰器，方法前面就是方法装饰器

> vue中的各种装饰器 注意装饰器后面一定不要带分号
* @Component 类装饰器，用于规范vue的实例类，可以直接使用@Component规范，也可以增加其他入参
```
@Component({
    components: {
        // 各种引入的vue组件
    }
})
```

* @Prop 属性装饰器，用于规定vue的入参的个数及格式
```
@Prop() private msg!: string; // 父组件必须传入msg且类型是字符串型
```

* @Watch 方法装饰器，用于监听变量的变化
```
@Watch("msg") // 变量名
getMsg(newVal: number, oldVal: number) {
    console.log(`${ oldVal } ${ newVal }`)
}
```
* @Emit 方法装饰器，用于子组件调用父组件的方法
```
// 父组件
<Child @eat='eatFood'/> <!-- 组件 -->
eatFood(str: string) {
    console.log(str);
}
// 子组件
<button @click='emitEat("meat")'>触发父组件方法</button><!-- 调用emit方法 -->
@Emit('eat') // 父组件传入的key
emitEat(str:string){
    return str; // 这里是子组件传给父组件的变量
}
```
> 计算属性 需要声明返回值类型及要返回该类型的数据
```
<P>{{ abc }}</P>   <!-- 组件 -->

// 计算属性声明方式
get abc(): string { 
    return 'abc'
}
```

### typescript中声明入参的几种方式
> 直接声明入参的类型 用于参数较少且为基本类型时使用
```
eat(name: string, food: string){
    console.log(`${name}吃${food}`)
}
```
> 使用接口声明类型 用于参数较多或者是对象入参的时使用
```
interface Animal {
    name: string;
    food: string;
}
eat(dog: Animal) {
    let { name, type } = dog;
    console.log(`${name}吃${food}`)
}
```
> 参数是否必传，aa: string或者aa!: string必传，aa?:string = ""，有?或者有默认值可以不用传，但是如果传的话要注意类型

### typescript中的枚举 主要用于状态管理
```
enum StatusAll {
    success = 200,
    notFind = 404,
    serverError = 500
}
// ajax接口判断是否成功
xhr.onreadystatechange = () => { 
    if (xhr.readyState === 4) { 
       if(xhr.status == StatusAll.success) {
           console.log('成功')
       }else {
           console.log('失败')
       }
    }
}
```

### typescript抽象类 抽象类可以作为父级构造器，配合抽象方法用来限制子类的方法声明，抽象方法只能放在抽象类中，子类必须实现抽象方法
```
abstract class Father { // 父类声明抽象类
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract eat(): string; // 声明抽象方法eat
}
class Child extend Father {
    constructor(name: string) {
        super(name);
    }
    eat() { // 子类必须实现父类声明的抽象方法
        return `${name}吃饭`
    }
}
```

#### 下载（本地）文件
> 如果是本地文件需要将文件放在根目录的`public`文件里，下载的url就是你运行环境的地址然后拼接`public`中的地址
