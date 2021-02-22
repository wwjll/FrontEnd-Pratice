import tpl from './info.tpl'

const oApp = document.querySelector('#app')

const info = tpl({
  name: 'xiaoye',
  age: 34,
  career: 'developer',
  hobby: "food, piano"
})

console.log(info)