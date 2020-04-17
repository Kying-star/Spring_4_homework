const isComplexDataType = obj =>(typeof obj === 'object'||typeof obj ==='function')&&(obj !== null);

const deepcopy = function(obj,hash = new WeakMap()){
    if(hash.has(obj))return hash.get(obj);
    let type = [Date,RegExp,Set,Map,WeakMap,WeakSet];
    if(type.includes(obj.constructor)) return new obj.constructor(obj);

    let allDesc = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj),allDesc);
    hash.set(obj,cloneObj);

    for(let key of Reflect.ownKeys(obj)){
        cloneObj[key] = (isComplexDataType(obj[key])&&typeof obj[key]!=='function')?deepcopy(obj[key],hash):obj[key]
    }
    return cloneObj;
}

let obj = {
    arr:[1,2,3,4],
    fun:()=>{
        console.log("hello");
    },
    num:1,
    reg:/123/,
    obj:{name:"lqx",year:"19"}
}
let obj1 = deepcopy(obj);
obj1.num = 2;
console.log(obj1,obj); 

obj1.fun();