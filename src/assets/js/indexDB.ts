interface DBType {
    key: string,
    value: any
}

export function openDB(name: string) {
    sessionStorage.DBName = name;
    let db = window.indexedDB.open(name)
    db.onupgradeneeded = (event) => {  // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
        // 监听版本变化 (只有版本变化的时候才能createObjectStore)
        let db = (event.target as any).result;
        if (!db.objectStoreNames.contains('persion')) {// 判断表格是否存在
            // 创建对象仓库 (keyPath 主键)
            let store = db.createObjectStore('person', { keyPath: 'key' });
            // 如果没有合适的主键，可以选择自动生成主键
            // let objectStore = db.createObjectStore('person',{ autoIncrement:true});

            // 三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。
            store.createIndex('by_title', 'title', {
                unique: true
            })
        }
    }
}

export namespace MrpIndexDB {
    // 增加和修改
    export function addData(storename: string, data: DBType) {
        /**
         * @param storename 表名
         * @param data 插入的数据 根据key名会自动判断 如果重复会修改 反之插入
         */
        let db: any = window.indexedDB.open(sessionStorage.DBName)
        db.onsuccess = function () {
            let store = db.result.transaction(storename, 'readwrite').objectStore(storename);
            store.put(data); // 有则改之 无则加勉
        }
    }
    // 查询
    export function seleData(storename: string, key: string, ) {
        /**
         * @param storename 表名
         * @param key 键值 用来查询对应数据
         */
        let db: any = window.indexedDB.open(sessionStorage.DBName)
        db.onsuccess = function () {
            let store = db.result.transaction(storename, 'readwrite').objectStore(storename);
            let request = store.get(key);
            request.onerror = function () {
                console.error('seleData error');
            };
            request.onsuccess = function (event: any) {
                let result = event.target.result;
                console.log(result);
            };
        }
    }
    // 删除
    export function deleteData(storename: string, key: string) {
        /**
         * @param storename 表名
         * @param key 键值 用于删除指定数据
         */
        let db: any = window.indexedDB.open(sessionStorage.DBName)
        db.onsuccess = function () {
            let store = db.result.transaction(storename, 'readwrite').objectStore(storename);
            store.delete(key)
            console.log('已删除存储空间' + storename + '中' + key + '记录');
        }
    }
}