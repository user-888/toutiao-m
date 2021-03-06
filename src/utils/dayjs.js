// 初始化dayjs相关配置
import dayjs from 'dayjs'
import Vue from 'vue'
import  'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

//  配置使用转为语言包
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用

// 把处理相对时间的代码包装为全局的过滤器
// 然后就可以在任何组件的模板中使用了
// 所谓过滤器就是一个可以在模板中调用的函数而已
// 再组件的模板中使用过滤器：{{xxx | relativeTime }}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime' , value => {
    return dayjs(value).from(dayjs())
})

// 例如时间日期格式化
// console.log(dayjs().format('YYYY-MM-DD'));
// console.log(dayjs('2020-01-02').from(dayjs()));