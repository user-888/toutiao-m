<template>
    <div class="layout-container">
        <!-- 子路由出口-->
        <router-view/>
        <!-- /子路由出口 -->
        <!-- 底部导航栏 -->
        <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o"  to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="comment-o"  to="/qa">问答</van-tabbar-item>
        <van-tabbar-item icon="play-circle-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="friends-o"  to="/my">我的</van-tabbar-item>
        </van-tabbar>
    <!-- /底部导航栏 -->
    </div>
</template>

<script>
export default {
    name: 'LayoutIndex',
    components: {},
    props: {},
    data() {
        return {
            active: 0
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