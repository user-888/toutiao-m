<template>
    <div class="search-container">
        <!-- 搜索栏 -->
        <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
        <form action="/">
        <van-search
        v-model="searchText" 
        placeholder="请输入搜索关键词" 
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus  = "isResultShow = false"
        />
        </form>
        <!-- /搜索栏 -->

            <!-- 搜索结果 -->
        <search-result  
        v-if="isResultShow"
        :search-text = "searchText"
        />
        <!-- /搜索结果 -->

        <!-- 联想建议 -->
            <search-suggestion 
            v-else-if="searchText" 
            :search-text= "searchText"
            @search= "onSearch"
            />
        <!-- /联想建议 -->

        <!-- 历史记录 -->
        <search-history  
        v-else
        :search-histories= "searchHistories"
        />
        <!-- /历史记录 -->

    </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
export default {
    name: 'SearchIndex',
    components: {
        searchSuggestion,
        searchHistory,
        searchResult
    },
    props: {},
    data() {
        return {
            searchText: '' , // 搜索输入框内容
            isResultShow: false,  // 控制搜索结果的显示状态
            searchHistories: []     // 搜索历史数据
        }
    },
    computed: {},
    created () {
        
    },
    methods: {
        onSearch (searchText) {
            // 让输入框设置为你要搜索的文本
            this.searchText = searchText
            // indexof找到匹配字符索引
            const index =  this.searchHistories.indexOf(searchText)
            if (index !== -1) {
                // 把重复项删除
                this.searchHistories.splice(index , 1)
            }

            // 把最新的搜索记录放到顶部
            this.searchHistories.unshift(searchText)

            // 显示搜索结果
            this.isResultShow = true
        }
    },
    watch: {},
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>

</style>