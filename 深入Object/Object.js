const source = {
    a:1,
    get b() {
        console.log(123)
        return 2
    }
}

// const res = Object.assign({}, source)
// console.log(res)

Object.myAssign = function(target, ...sources) {
    // arguments 获取的是函数运行时的实参，arguments.callee() 获取当前正在运行的函数
    console.log(Object.prototype.toString.call(arguments[1]))
    // 形参中拓展运算符相当于包装了实参, sources = [...sources]
    console.log(sources, Object.prototype.toString.call(sources))
    sources.forEach(source => {
        // 获取自身属性的属性描述器并收集
        // descriptor : { a: { value:1, enumerable: true, writable: true, configurable:true }}
        const descriptors = Object.keys(source).reduce((descriptors, key) => {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
            return descriptors
        }, {})
        Object.defineProperties(target, descriptors)
    })
    return target
}

const res = Object.myAssign({}, source)
console.log(res) 



