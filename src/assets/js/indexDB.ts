interface DBType {
    key: string, // 键名 key
    value: any // 键值 value
}

export namespace MrpIndexDB {
    // 打开数据库 并新建表
    export function openDB(name: string) {
        sessionStorage.DBName = name;
        sessionStorage.DBNum = "1";
        let db = window.indexedDB.open(name, Number(sessionStorage.DBNum))
        db.onupgradeneeded = (event) => {  // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
            // 监听版本变化 (只有版本变化的时候才能createObjectStore)
            let db = (event.target as any).result;
            if (!db.objectStoreNames.contains("persion")) {// 判断表格是否存在
                // 创建对象仓库 (keyPath 主键)
                db.createObjectStore("person", { keyPath: "key" });
                // 如果没有合适的主键，可以选择自动生成主键
                // let objectStore = db.createObjectStore("person",{ autoIncrement:true});

                // 三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。
                // store.createIndex("by_title", "title", {
                //     unique: true
                // })
            }
        }
    }
    // 删除库
    export function deleDB(name: string) {
        window.indexedDB.deleteDatabase(name); // indexedDB是永远存在的存储 有时需要清除
    }
    // 新建表 要修改库的版本 监听版本变化 创建表格
    export function createTable(name: string, key: string) {
        /**
         * @param name 表名
         * @param key 键
         */
        sessionStorage.DBNum = (Number(sessionStorage.DBNum) + 1).toString();
        let db: any = window.indexedDB.open(sessionStorage.DBName, Number(sessionStorage.DBNum))
        db.onupgradeneeded = (event: { target: any; }) => {  // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
            // 监听版本变化 (只有版本变化的时候才能createObjectStore)
            let db = (event.target as any).result;
            if (!db.objectStoreNames.contains(name)) {// 判断表格是否存在
                // 创建对象仓库 (keyPath 主键)
                db.createObjectStore(name, { keyPath: key });

            }
        }
    }
    // 增加和修改数据
    export function addData(storename: string, data: DBType) {
        /**
         * @param storename 表名
         * @param data 插入的数据 根据key名会自动判断 如果重复会修改 反之插入
         */
        let db: any = window.indexedDB.open(sessionStorage.DBName)
        db.onsuccess = () => {
            let store = db.result.transaction(storename, "readwrite").objectStore(storename);
            store.put(data); // 有则改之 无则加勉
        }
    }
    // 查询数据
    export function seleData(storename: string, key: string) {
        /**
         * @param storename 表名
         * @param key 键值 用来查询对应数据
         */
        return new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
            let db: any = window.indexedDB.open(sessionStorage.DBName);
            db.onsuccess = () => {
                let store = db.result.transaction(storename, "readwrite").objectStore(storename);
                let request = store.get(key);
                request.onerror = () => {
                    reject("seleData error");
                };
                request.onsuccess = (event: any) => {
                    let result = event.target.result;
                    resolve(result ? result.value : result);
                };
            };
        });
    }
    // 删除数据
    export function deleteData(storename: string, key: string) {
        /**
         * @param storename 表名
         * @param key 键值 用于删除指定数据
         */
        let db: any = window.indexedDB.open(sessionStorage.DBName)
        db.onsuccess = function () {
            let store = db.result.transaction(storename, "readwrite").objectStore(storename);
            store.delete(key)
            console.log("已删除存储空间" + storename + "中" + key + "记录");
        }
    }
}