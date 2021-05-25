<template>
    <div class="article-list">
                    <!-- List 组件通过 loading 和 finished 两个变量控制加载状态，
            当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 设置成 true，此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
            若数据已全部加载完毕，则直接将 finished 设置成 true 即可。 -->

                        <!-- • load 事件：
                    • List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
            • 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。
                    • loading 属性：控制加载中的 loading 状态
            • 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
            • 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件
                    • finished 属性：控制加载结束的状态
            • 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
            • 所有数据加载结束，finished 为 true，此时不会触发 load 事件 -->
            <van-pull-refresh 
            v-model="isRefreshLoading" 
            :success-text="refreshSuccessText"
            :success-duration = "1500"
            @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <article-item 
            v-for="(article, index) in article" 
            :key="index" 
            :article= "article"
            />
            <!-- <van-cell v-for="(article, index) in article" :key="index" :title="article.title" /> -->
        </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
    name: 'ArticleList',
    components: {
        ArticleItem
    },
    props: { 
        channel: { // 声明接收
            type: Object,  // 什么类型？ 对象类型  
            required: true // 是不是必须的？ 因为必须给个频道才能展示出来 给a频道就加载a频道
        }
    },
    data() {
        return {
            article: [],   // 数据列表
            loading: false,  // 控制加载中的loading状态
            finished: false,  // 控制加载结束的状态，当加载结束不在触发加载更多
            timestamp: null , //  获取下一页时间戳
            isRefreshLoading: false, // 下拉刷新的loading 状态
            refreshSuccessText: ''  // 下拉刷新提示的文本
        }
    },
    computed: {},
    created () {
        
    },
    methods: {
        async onLoad() {
        // 异步更新数据
        // 1、请求获取数据
        const { data } = await getArticles({
            channel_id: this.channel.id ,  // 频道 ID
            timestamp: this.timestamp || Date.now(),   // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
            // timestamp相当于页码，请求最新数据使用当前最新时间擢，历史数据下一页数据使用上一次返回数据中的时间戳
            with_top: 1    // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // console.log( JSON.parse(data) );
        // 2、把数据放到 list 中
        const { results } = JSON.parse(data).data
        this.article.push(...results)
        // 注意是push进去的
        //3、设置本次加载状态结束，它可以判断是否需要加载下一次，否则永远停在哪里
        this.loading = false
         // 4、数据全部加载完成
        if ( results.length ) {
            // 如果还有数据，更新获取下一页数据的页码
            this.timestamp = JSON.parse(data).data.pre_timestamp
        } else {
            // 没有数据了，把加载状态结束，不在触发加载更多
            this.finished = true
        }
        },
        async onRefresh () {
            // 下拉刷新，组件自己就会展示 loading 状态
            // 1、请求获取数据
            const { data } = await getArticles({
            channel_id: this.channel.id ,  // 频道 ID
            timestamp: Date.now(),   
            // 为了方便学习，只要你方便学习，只要你传递不同时间戳，就一定返回不同的数据  而且数据部位空
            with_top: 1    // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
            // 2、把数据放到数据列表中（往顶部追加）
            const { results } = JSON.parse(data).data
            this.article.unshift(...results)
            // 3、关闭刷新 loading 状态
            this.isRefreshLoading = false
            this.refreshSuccessText = `更新了 ${results.length} 条数据`
        }
        
    },
    watch: {},
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>
// 让我们的文章列表固定定位，解决2个问题。不被下面的挡住，它的滚动不会把导航栏带走
.article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
}
</style>