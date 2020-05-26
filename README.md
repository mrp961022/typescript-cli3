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
#### 选上typescript 其他的根据需要选择 数字对应需要安装的依赖 全选 a(建议不要全选 太慢了)
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