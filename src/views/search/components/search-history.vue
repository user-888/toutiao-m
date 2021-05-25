<template>
    <div class="search-history">
        <van-cell
        title="搜索历史"
        >
        <div>
            <span>全部删除</span>
            &nbsp; &nbsp;
            <span>完成</span>
        </div>
        <!-- <van-icon name="delete-o" /> -->
        </van-cell>
        <van-cell
        :title="history"
        v-for="(history , index) in searchHistories"
        :key="index"
        >
        <van-icon name="close" />
        </van-cell>
    </div>
</template>

<script>
export default {
    name: 'searchHistoryIndex',
    components: {},
    props: {
        searchHistories: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            
        }
    },
    computed: {},
    created () {
        
    },
    methods: {
        
    },
    watch: {},
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>

</style>