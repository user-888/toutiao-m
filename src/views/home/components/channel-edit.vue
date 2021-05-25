<template>
    <div class="channel-edit">
        <van-cell center :border= "false">
            <div slot="title" >
                我的频道
            </div>
            <van-button 
            type="danger" 
            plain 
            round 
            size="mini"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}
            </van-button>
        </van-cell>

        <van-grid :gutter="10">
            <!-- :class="{ active: index === 激活的频道 }" -->
            <van-grid-item 
        v-for="(channel, index) in userChannels" 
            class="grid-item"
            :class="{ active: index === active }"
            :key="index" 
            :text="channel.name" 
            :icon ="isEdit && index !== 0 ? 'clear' : ''"
            @click="onUserChannelClick(channel ,  index)"
            />
            </van-grid>

            <van-cell center :border= "false">
            <div slot="title" >
                频道推荐
            </div>
        </van-cell>

        <van-grid :gutter="10">
            <van-grid-item 
            class="grid-item"
            v-for="(channels , index) in recommendChannels" 
            :key="index" 
            :text="channels.name"
            @click="onAdd(channels)"
            />
            </van-grid>

    </div>
</template>

<script>
import { getAllChannels ,addUserChannel , deleteUserChannel} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
    name: 'ChannelEdit',
    components: {},
    props: {
        userChannels: {
            type: Array,
            require: true
        },
        active: {
            type: Number,
            require: true
        }
    },
    data() {
        return {
            allChannels: [],  // 所有频道数据列表
            isEdit: false // 控制编辑显示状态
        }
    },
    computed: {
        ...mapState(['user']),
        // 推荐的频道列表
        // 计算属性会观测内部依赖数据的变化而重新求值  里面的allChannels，userChannels而重新求值
        recommendChannels () {
            // 思路，所以频道减去我的频道 = 剩下的频道
            // filter方法：过滤数据，根据方法返回的布尔值true来收集数据
            // filter 方法查找满足条件的所有元素
            return  this.allChannels.filter(channels => {
                // 判断channel是否属于用户频道
                // find方法查找满足条件的单个元素
                return   !this.userChannels.find(userChannels => {
                    // 找到满足条件的元素
                    return   userChannels.id === channels.id
                })
            })

            // // 用for 循环实现
            // const arr = [ ]
            // // 遍历所有频道
            // this.allChannels.forEach(channels => {
            //     let flag = false
            //     for (let i = 0; i < this.userChannels.length; i++) {
            //         // 所有频道中的配电箱属于用户频道
            //         if  (this.userChannels[i].id === channels.id) {
            //             flag = true
            //             break
            //         }
            //     }
            //     if  (!flag) {
            //         arr.push(channels)
            //     }
            // })
            // return arr
        }
    },
    created () {
        this.loadAllChannels()
    },
    methods: {
        async  loadAllChannels () {
            const { data } = await getAllChannels()
            // console.log(   JSON.parse(data) );
            this.allChannels =  JSON.parse(data).data.channels
        },
        async onAdd (channels) {
            this.userChannels.push(channels)
            //    TODO 数据持久化
            if (this.user) {
            await   addUserChannel({
                    channels: [
                        { id: channels.id ,  seq: this.userChannels.length  }
                    ]
                })
            } else {
                setItem('user-channels' , this.userChannels)
            }
        },
        onUserChannelClick (channel , index) {
            if (this.isEdit && index !== 0) {
                  // 编辑状态，删除频道
                    this.deleteChannel(channel , index)
            } else {
                  // 非编辑状态，切换频道
                    this.switchChannel(index)
            }
        },

        async  deleteChannel (channel , index) {
            // console.log('删除频道')
            // 如果删除的是当前激活频道之前的频道
            if (index <= this.active) {
                this.$emit('update-active' , this.active - 1)
            }
            this.userChannels.splice(index , 1)

            // 数据持久化
            if (this.user) {
                // 登录了，持久化到数据
            await deleteUserChannel(channels.id)
            } else {
                // 没有登录，持久化到本地
                setItem('user-channels' , this.userChannels)
            }
        },

        switchChannel (index) {
            // console.log('切换频道');
            // 自定义事件 关闭弹出层
            this.$emit('update-active' , index)
            this.$emit('close')
        }
    },
    watch: {},
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>
    .channel-edit {
        padding-top: 54px;
        .channel-title {
            font-size: 16px;
            color: #333;
        }
        .grid-item {
            width: 80px;
            height: 43px;
            /deep/   .van-grid-item__content  {
                    background-color: #f4f5f6;
                    .van-grid-item__text {
                        font-size: 14px;
                        color: #222;
                        margin-top: 0;
                    }
            }
            /deep/  .van-icon {
            position: absolute;
            right: -10px;
            top: -5px;
            font-size: 20px;
            color: #ccc;
        }
        }
                    .active {
        /deep/    .van-grid-item__text{
                    color: red !important;
                }
        }
    }
</style>