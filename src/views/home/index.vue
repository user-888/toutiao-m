<template>
    <div class="home-container">
        <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"> 
    <van-button 
    slot="title"
    icon="search"
    type="info"
    round
    size="small"
    class="search-btn"
    to="/search"
    >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
        <van-tabs v-model="active" class="channel-tabs">
                <van-tab 
                class="tab-item"
                :title="channel.name"
                :key="channel.id"
                v-for="channel in channels"
                >
                <!-- 文章列表 -->
                <article-list :channel="channel"/>
                <!-- / 文章列表 -->
                </van-tab>
                <!-- 汉堡按钮定位把列表最后的为主给抵挡住了，解决办法就是在这里添加一个占位元素 -->
                <div 
                slot="nav-right" 
                class="wap-nav-placeholder"
                >
                    
                </div>
                <div 
                class="wap-nav-wrap" 
                slot="nav-right" 
                @click="isChannelEditShow = true"
                >
                    <van-icon name="wap-nav" />
                </div>
        </van-tabs>
    <!--/ 文章频道列表 -->

    <van-popup 
    v-model="isChannelEditShow" 
    position="bottom" 
    class="channel-edit-popup"
    closeable
    close-icon-position="top-left"
    get-container="body"
    style="height: 100%;"
    >
    <!-- 模板当中表示事件参数 ， 代表函数定义的参数 -->
    <channel-edit 
    :user-channels = "channels"
    @close= "isChannelEditShow = false"
    @update-active = "active = $event"
    :active= "active"
    />
    </van-popup >

    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
    name: 'HomeIndex',
    components: {
        ArticleList,
        ChannelEdit
    },
    props: {},
    data() {
        return {
            active: 0  ,// 操控被激活的标签
            channels: [ ] ,  // 频道列表
            isChannelEditShow: true     // 控制编辑频道显示状态
        }
    },
    computed: {
        ...mapState(['user'])
    },
    created () {
        this.loadChannels()
    },
    methods: {
        async loadChannels () {
            // 请求获取频道数据
            // const { data } = await getUserChannels() 
            // this.channels = JSON.parse(data).data.channels
            let channels = []
            if (this.user) {
                // 已登录，请求获取线上的用户频道列表数据
                const { data } = await getUserChannels() 
                channels = JSON.parse(data).data.channels
            } else {
                // 没有登录，判断是否由本地存储频道的数据
                const lacalChannels = getItem('user-channels')
                // 如果由本地存储的列表则使用
                if (lacalChannels) {
                    channels = lacalChannels
                } else {
                    // 用户没有登录，也没有本地存储的频道，那就请求获取默认推荐的频道列表
                    const { data } = await getUserChannels() 
                    channels = JSON.parse(data).data.channels
                }
            }
            // 把处理好的数据放到 data 中以供模板使用
            this.channels = channels
        }
        // onUpdateArtive (index) {
        //     this.active = index
        // }
    },
    watch: {},
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>
    .home-container {
    /deep/    .van-nav-bar__title {
            max-width: unset;
        }
        .search-btn {
            width: 277px;
            height: 32px;
            background-color: #5dabfb;
            border: none;
            .van-icon {
                font-size: 16px;
            }
            .van-button__text {
                font-size: 14px;
            }
        }
        .channel-tabs {
            /deep/ .van-tab {
                border-right: 1px solid #edeff3;
                border-bottom: 1px solid #edeff3;
            }
            /deep/  .van-tabs__line {
                width: 15px  !important; 
                height: 3px;
                background-color: #3296fa;
                bottom: 20px;
            }
        }
        .wap-nav-placeholder {
            width: 33px;
            flex-shrink: 0;
        }
            .wap-nav-wrap {
            position: fixed;
            right: 0;
            width: 33px;
            height: 43px;
            background-color: #fff;
            opacity: .9;
            display: flex;
            justify-content: center;
            align-items: center;
            .van-icon {
                font-size: 24px;
            }
            &:before {
                content: '';
                width: 1px;
                height: 43px;
                background: url("./line.png") no-repeat;
                background-size: contain;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
</style>