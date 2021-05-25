<template>
    <div class="search-suggestion">
        <van-cell 
        icon="search"
        v-for="(str , index) in suggestions"
        :key="index"
        @click="$emit('search' , str)"
        >
            <div v-html="highlight(str)" slot="title">
            </div>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import  { debounce } from 'lodash'

export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
        searchText: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            suggestions: [] , // 联想建议数据系统
            htmlStr: 'hello <span style= "color: red"> world</span>'
        }
    },
    computed: {},
    created () {
        
    },
    methods: {
        highlight (str) {
            // 正则表达式 /中间的内容/ 都会当作正则匹配模式字符串来对待
            // (/this.searchText/gi   错误的写法
            // RegExp 是正则表达式的构造函数
            // 参数1：字符串
            // 参数2：匹配模式
            // 参数3：正则对象
            return  str.replace( 
                new RegExp(this.searchText , 'gi'),`<span style= "color: red "> ${this.searchText} </span>`)
        }
    },
    watch: {
        // 属性名，要监视数据的名称
        // searchText () {
        //     console.log('heelo');
        // }
        searchText: {
            // 当数据发生变化则会执行 handler 处理函数
            handler:  debounce( async function () {
                const { data } = await getSearchSuggestions(this.searchText)
                // console.log(data)
                this.suggestions = JSON.parse(data).data.options
            }, 500),
            // async  handler () {
            //     // 找到数据接口
            //     // 请求获取数据
            //     // 模板绑定展示
            //     const { data } = await getSearchSuggestions(this.searchText)
            //     // console.log(data)
            //     this.suggestions = JSON.parse(data).data.options
            // },
            // 该回调将会在开始前被调用
            immediate: true
        }
    },
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>

</style>