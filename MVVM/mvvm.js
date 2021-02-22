// from bilibili 小野森森 
class MVVM {
  constructor(id, data) {
    this.el = document.querySelector(id)
    this._data = data  
    this.domPool = {}
    this.init()
  }

  
  init() {
    this.initData()
    this.bindDom(this.el)
    this.bindInput(this.el)
  }


  initData() {
    // defineProperty 版
    const _this = this
    this.data = {}    
    // for (let key in this._data) {
    //   Object.defineProperty(this.data, key, {
    //     get() {
    //       // console.log("获取数据：", key, _this._data[key])
    //       return _this._data[key]
    //     },
    //     set(newVal) { 
    //       // console.log("设置数据：", key, newVal)
          
    //       _this.domPool[key].innerHTML = newVal
    //       _this._data[key] = newVal
    //     }
    //   })
    //   // console.log(this.data['age'])
    // }

    // Proxy 版
    this.data = new Proxy(this.data, {
      get(target, key) {
        return Reflect.get(target, key)
      },
      set(target, key, value) {
        _this.domPool[key].innerHTML = value
        return Reflect.set(target, key, value)
      }
    })
  }

  bindDom(el) {
    const childNodes = el.childNodes

    // debugger
    childNodes.forEach(item => {
      if (item.nodeType === 3) {
        let _value = item.nodeValue

        if (_value.trim().length) {
          let _isValid = /\{\{(.+?)\}\}/.test(_value)
          if (_isValid) {
            // console.log(item)
            const _key = _value.match(/\{\{(.+?)\}\}/)[1].trim()
            this.domPool[_key] = item.parentNode

            item.parentNode.innerText = this.data[_key] || undefined

          }
        }
      }

      item.childNodes && this.bindDom(item)
    })
  }

  bindInput(el) {
    const _allInputs = el.querySelectorAll('input')
    _allInputs.forEach(input => {
      const _vModel = input.getAttribute('v-model')
      // console.log(_vModel)
      if (_vModel) {
        input.addEventListener('keyup', this.handleInput.bind(this, _vModel, input), false)
      }
    })
  }

  handleInput(key, input) {
    const _value = input.value
    this.data[key] = _value
  }

  setData(key, value) {
    this.data[key] = value
  }
}


/*
* 1.数据 -> 响应式数据 Object.defineProperties Proxy
* 2.input -> input/keyup -> 事件处理函数绑定 -> 改变数据
* 3.相关 DOM 绑定数据
    操作数据某个属性 -> 对应的 DOM 改变
*/