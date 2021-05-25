<template>
    <div class="my-container">
        <van-cell-group v-if="user" class="my-info">
    <van-cell title="单元格" value="内容" center  class="base-info" :border= "false"> 
            <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="currentUser.photo"
    />
        <div slot="title" class="name">{{  currentUser.name  }}</div>
            <van-button 
            size="small"
            class="update-btn"
            round
            >编辑资料</van-button>
    </van-cell>

        <van-grid :border= "false" class="date-info">
    <van-grid-item text="文字" class="date-info-item" >
        <div slot="text" class="text-wrap">
            <div class="const">{{  currentUser.art_count  }}</div>
            <div class="text">头条</div>
        </div>
    </van-grid-item>
    <van-grid-item text="文字"   class="date-info-item">
        <div slot="text" class="text-wrap">
            <div class="const"> {{ currentUser.follow_count }} </div>
            <div class="text">关注</div>
        </div>
    </van-grid-item>
    <van-grid-item text="文字"  class="date-info-item">
        <div slot="text" class="text-wrap">
            <div class="const"> {{  currentUser.fans_count}} </div>
            <div class="text">粉丝</div>
        </div>
    </van-grid-item>
    <van-grid-item text="文字"  class="date-info-item">
        <div slot="text" class="text-wrap">
            <div class="const"> {{  currentUser.like_count}} </div>
            <div class="text">获赞</div>
        </div>
    </van-grid-item>
    </van-grid>
</van-cell-group>

<div class="not-login" v-else>
    <div @click="$router.push('./login')">
        <img src="./shouji.png" alt="" class="mobile">
    </div>
    <div class="text">登录 / 注册</div>
</div>

        <van-grid :column-num = '2' class="nav-grid md-4">
    <van-grid-item icon="star-o" text="收藏" class="nav-grid-item" />
    <van-grid-item icon="browsing-history-o" text="历史" class="nav-grid-item" />
    </van-grid>

        <van-cell title="消息通知" is-link url="/" />
        <van-cell title="小智同学" is-link to="/" class="md-4"/>
        <van-cell title="退出登录"  class="logout-cell" v-if="user" @click="onLogout"/>

    </div>
</template>

    <script>
    import { mapState } from 'vuex'
    import { getCurrentUser } from '@/api/user'

    export default {
    name: 'MyIndex',
    components: {},
    props: {},
    data () {
        return {
        currentUser: {} // 当前登录用户信息
        }
    },
    computed: {
        ...mapState(['user'])
    },
    watch: {},
    created () {
        this.loadCurrentUser()
    },
    mounted () {},
    activated () {
    },
    methods: {
        async loadCurrentUser () {
        const { data } = await getCurrentUser()
        this.currentUser =  JSON.parse(data).data
        // console.log(data)
        },

        onLogout () {
        // 提示用户确认退出
        // 确认 -> 处理退出
        this.$dialog.confirm({
            title: '退出提示',
            message: '确认退出吗？'
        })
            .then(() => { // 确认执行这里
            // 清除用户登录状态
            this.$store.commit('setUser', null)
            })
            .catch(() => { // 退出执行这里
            // on cancel
            })
        }
    }
    }
    </script>

<style lang="less" scoped>
    .my-container {
        .my-info {
            background: url("./banner.png") no-repeat;
            background-size: cover;
            .base-info {
                height: 115px;
                box-sizing: border-box;
                background-color: unset;
                padding-top: 38px ;
                padding-bottom: 11px;
                .avatar {
                    width: 66px;
                    height: 66px;
                    border: 1px solid #fff;
                    box-sizing: border-box;
                    margin-right: 11px;
                }
                .name {
                    color: #fff;
                    font-size: 15px;
                }
                .update-btn {
                    height: 16px;
                    font-size: 10px;
                    color: #666;
                }
            }
            .date-info {
                .date-info-item {
                height: 65px;
                color: #fff;
                .text-wrap {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                .const {
                    font-size: 18px;
                }
                .text {
                    font-size: 11px;
                }
                }
            
            }
            }
            /deep/    .van-grid-item__content {
                background-color: unset;

            }
        }
        .not-login {
            height: 180px;
            background: url('./banner.png') no-repeat;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            background-size: cover;
            .mobile {
                width: 66px;
                height: 66px;
            }
            .text {
                font-size: 14px;
                color: #fff;
            }
        }
    /deep/    .nav-grid {
                .nav-grid-item {
                    height: 70px;
                .van-icon {
                        font-size: 22px;
                    }
                    .van-icon-browsing-history-o {
                        color: #ff9d1d;
                    }
                    .van-icon-star-o {
                        color: #ed5253;
                    }
                    .van-grid-item__text {
                        font-size: 14px;
                        color: #333;
                    }
                }
            }
            .logout-cell {
                text-align: center ;
                color: #d86262;
            }
            .md-4 {
                margin-bottom: 4px;
            }
    }
</style>