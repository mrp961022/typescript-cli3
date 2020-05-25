interface Config {
    type: string; // get/post
    url: string; // url路径
    data?: DataObj; // 入参 没有就不填
    dataType?: string; // 返参类型
    contentType?: string; // 请求头 默认application/json
    timeOut?: number; // 超时时间 默认6秒 单位秒
}
interface DataArr {
    [index: number]: object // 定义一个对象数组类型
}
interface DataObj {
    [index: string]: number | string | Array<string | number> | DataArr // 定义入参类型
}
export function ajax(config: Config) {
    return new Promise((resolve: (value: string) => void, reject) => { // 定义返回值类型为字符型
        let data = config.data || {};
        config.type == config.type.toLocaleLowerCase()
        let urlData: string = Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&')
        // entries 将对象转成可迭代类型数据 数组中包含键和值 {a:1,b:2} => [['a',1],['b',2]]
        // 箭头函数不带大括号相当于{return ***}
        let xhr = new XMLHttpRequest();
        if (config.type.toLocaleLowerCase() == 'get') {
            xhr.open(config.type, `${config.url}${urlData ? "?" + urlData : ""}`, true);
        } else {
            xhr.open(config.type, `${config.url}`, true);
        }
        if (config.contentType) {
            xhr.setRequestHeader('Content-Type', config.contentType)
            xhr.send(urlData);
        } else {
            config.type === 'get' ? xhr.send() : xhr.send(JSON.stringify(data));
        }
        xhr.timeout = (config.timeOut || 6) * 1000;
        xhr.ontimeout = function (event) {
            alert('请求超时！');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) { // ajax请求最后一步 一共四步
                if (xhr.status == 200) { // 状态码
                    resolve(xhr.responseText)
                } else {
                    reject(`${config.type.toUpperCase()} ${xhr.responseURL} ${xhr.status} (${xhr.statusText})`)
                }
            }
        }
    })

}