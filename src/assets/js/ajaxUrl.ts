import router from '@/router'
interface Config {
    type?: string; // get/post
    url: string; // url路径
    data?: DataObj | FormData; // 入参 没有就不填
    dataType?: string; // 返参类型
    contentType?: string; // 请求头 默认application/json
    timeOut?: number | string; // 超时时间 默认6秒 单位秒
}
interface DownloadConfig {
    url: string; // url路径
    data?: DataObj; // 入参
}
interface DataObj {
    [index: string]: number | string | Array<string | number> // 定义入参类型
}
enum StatusAll { // 枚举属性 主要用于存储状态码常量
    success = 200,
    notFind = 404,
    serverError = 500
}
export function ajax(config: Config) {
    return new Promise((resolve: (value: string) => void, reject: (value: string) => void) => { // 定义返回值类型为字符型
        let data = config.data || {}, timeOut = Number(config.timeOut);
        let type = (config.type || 'get').toLocaleLowerCase();
        let urlData: string = Object.entries(data).map(([key, val]) => `${key}=${val}`).join("&")
        // entries 将对象转成可迭代类型数据 数组中包含键和值 {a:1,b:2} => [["a",1],["b",2]]
        // 箭头函数不带大括号相当于{return ***}
        let xhr = new XMLHttpRequest(); // 创建xhr对象
        if (type === "get" && urlData) {
            xhr.open(type, `${config.url}?${urlData}`, true); // 设置请求方式、url、是否异步
            // get有参数url请求头拼接参数
        } else {
            xhr.open(type, config.url, true); // post或者get没参数
        }
        if (config.contentType) {
            xhr.setRequestHeader("Content-Type", config.contentType) // 设置请求头 例如postformdata类型需要修改请求头 get不需要
            xhr.send(urlData); // 发送请求 post入参
        } else {
            xhr.send(data instanceof FormData ? data : (type === "get" ? null : JSON.stringify(data))) // get或者post application/json post入参 
        }
        xhr.timeout = (timeOut || 6) * 1000;
        xhr.ontimeout = (event) => { // 超时监听
            alert("请求超时！");
        }
        xhr.onreadystatechange = () => { // 监听请求步骤
            if (xhr.readyState === 4) { // ajax请求最后一步 一共四步
                if (xhr.status === StatusAll.success) { // 状态码
                    // 登录的状态码
                    let resErrorCode = JSON.parse(xhr.responseText).errorCode || "0001"
                    console.log(resErrorCode)
                    if (resErrorCode === '0001') {
                        router.push('About')
                    }
                    resolve(xhr.responseText)
                } else { // 最后一步且状态码不是200即为请求失败 处理报错
                    reject(`${type.toLocaleUpperCase()} ${xhr.responseURL} ${xhr.status} (${xhr.statusText})`)
                    if (xhr.statusText) {
                        alert(xhr.status) // 有返回值 5++ 4++ 状态报错
                    } else {
                        alert("断网啦！") // 没有返回值即为用户或服务器断网了
                    }
                }
            }
        }
    })

}
export function download(config: DownloadConfig) {
    let data = config.data || {}, urlStr = `${config.url}`
    let urlData: string = Object.entries(data).map(([key, val]) => `${key}=${val}`).join("&")
    // window.location.href = urlData ? `${urlStr}?${urlData}` : urlStr
    /**
     * @description 下载(本地)文件
     * @description location.href有些文件会打开 不会下载 例如 json、图片、txt文件
     * @description download属性决定下载文件的文件名以及类型
     */
    let a: any = document.createElement("a");
    a.download = (urlData ? `${urlStr}?${urlData}` : urlStr).split('/').reverse()[0];
    a.href = urlData ? `${urlStr}?${urlData}` : urlStr;
    document.getElementsByTagName("body")[0].append(a); // 修复firefox中无法触发click
    a.click();
    a.remove();
    /**
     * @description post调用接口后端返回文件流使用
     * @description get直接下载就行了
     */
    // if (xhr.status === StatusAll.success) {// 成功
    //     let blob = xhr.response;
    //     let reader = new FileReader();
    //     reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
    //     reader.onload = function (e) {
    //       // 转换完成，创建一个a标签用于下载
    //       let a = document.createElement("a");
    //       a.download = name + ".xls";
    //       a.href = e.target.result;
    //       $("body").append(a); 
    //       a.click();
    //       resolve(StatusAll.success)
    //       $(a).remove();
    //     };
    //   }

}