<template>
    <div class="search-result">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell 
            v-for="(acticle , index) in list" 
            :key="index" 
            :title="acticle.title" />
        </van-list>
    </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
    name: 'SearchResult',
    components: {},
    props: {
        searchText: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,     // 页码
            perPage: 10      // 每页大小
        }
    },
    computed: {},
    created () {
        
    },
    methods: {
    async   onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            // 1、请求获取数据
                const { data } =await getSearchResult({
                    page: this.page,    // 页码
                    per_page: this.perPage,  //  每页大小
                    q : this.searchText //  搜索字符
                })
            // console.log(JSON.parse(data))
            // 2、将数据放到数据列表中
            const { results } = JSON.parse(data).data
            this.list.push(...results)
            // 3、关闭本次loading
            this.loading = false
            // 4、判断是否还有数据 
            if (results.length) {
                // 如果有，则更新获取下一页数据的页码
                this.page++
            } else {
                // 如果没有，则把finished 设置为true ，关闭加载更多
                this.finished= true
            }
        }
    },
    watch: {},
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>
    .search-result {
        position: fixed;
        left: 0;
        right: 0;
        top: 54px;
        bottom: 0;
        overflow-y: auto;
    }
</style>