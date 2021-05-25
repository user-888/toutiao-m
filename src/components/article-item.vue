<template>
    <!-- <div class="article-item">文章列表项</div> -->
    <van-cell class="article-item">
        <div slot="title" class="title van-multi-ellipsis--l3"> {{ article.title }} </div>
        <div slot="label"> 
            <div 
            v-if="article.cover.type === 3"
            class="cover-wrap"
            >
                <div 
                class="cover-wrap-item"
                v-for="(img , index) in article.cover.image"
                :key="index"
                >
                    <van-image
                            width="116"
                            height="73"
                            fit="cover"
                            v-for="(img , index) in article.cover.image"
                            :src="img"
                            :key="index"
                            />
                </div>
            </div>
            <div class="label-wrap">
                <span>{{ article.aut_name }}</span> 
                <span> {{ article.comm_count }} 评论</span>
                <span> {{ article.pubdate | relativeTime}} </span>
            </div>
            </div>
            <van-image
                v-if="article.cover.type === 1"
                class="right-cover"
                fit="cover"
                :src="article.cover.images[0]"
                />
    </van-cell>
</template>

<script>
export default {
    name: 'ArticleItem',
    components: {},
    props: {
        article: {
            type: Object ,
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
    .article-item {
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }
    /deep/ .van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }
    .right-cover {
        width: 116px;
        height: 73px;
    }
    .cover-wrap {
        padding: 15px 0;
        display: flex;
        .cover-wrap-item {
            flex: 1;
            height: 73px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover-item {
                width: 100%;
                height: 73px;
            }
        }
    }
    .label-wrap {
        font-size: 11px;
        color: #b4b4b4;
    }
    .label-wrap span {
        margin-right: 12px;
    }
}
</style>