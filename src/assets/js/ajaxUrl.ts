interface Config {
    type: string; // get/post
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
export function ajax(config: Config) {
    return new Promise((resolve: (value: string) => void, reject: (value: string) => void) => { // 定义返回值类型为字符型
        let data = config.data || {}, timeOut = Number(config.timeOut);
        config.type === config.type.toLocaleLowerCase()
        let urlData: string = Object.entries(data).map(([key, val]) => `${key}=${val}`).join("&")
        // entries 将对象转成可迭代类型数据 数组中包含键和值 {a:1,b:2} => [["a",1],["b",2]]
        // 箭头函数不带大括号相当于{return ***}
        let xhr = new XMLHttpRequest(); // 创建xhr对象
        if (config.type.toLocaleLowerCase() === "get" && urlData) {
            xhr.open(config.type, `${config.url}?${urlData}`, true); // 设置请求方式、url、是否异步
            // get有参数url请求头拼接参数
        } else {
            xhr.open(config.type, config.url, true); // post或者get没参数
        }
        if (config.contentType) {
            xhr.setRequestHeader("Content-Type", config.contentType) // 设置请求头 例如postformdata类型需要修改请求头 get不需要
            xhr.send(urlData); // 发送请求 post入参
        } else {
            xhr.send(data instanceof FormData ? data : (config.type === "get" ? null : JSON.stringify(data))) // get或者post application/json post入参 
        }
        xhr.timeout = (timeOut || 6) * 1000;
        xhr.ontimeout = (event) => { // 超时监听
            alert("请求超时！");
        }
        xhr.onreadystatechange = () => { // 监听请求步骤
            if (xhr.readyState === 4) { // ajax请求最后一步 一共四步
                if (xhr.status === 200) { // 状态码
                    resolve(xhr.responseText)
                } else { // 最后一步且状态码不是200即为请求失败 处理报错
                    reject(`${config.type.toLocaleUpperCase()} ${xhr.responseURL} ${xhr.status} (${xhr.statusText})`)
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
    window.location.href = urlData ? `${urlStr}?${urlData}` : urlStr
    /**
     * json文件 图片文件 文本 window.location.href会直接打开 建议改成文件流下载
     * post调用接口后端返回文件流使用
     * get直接下载就行了
     */
    // var a = document.createElement("a");
    // a.id = "downloadFile"
    // a.download = urlData;
    // let e: any = window.event;
    // a.href = e.target.result;
    // document.getElementsByTagName("body")[0].append(a); 
    // a.click();
    // (document.getElementById("downloadFile") as any).remove();
}