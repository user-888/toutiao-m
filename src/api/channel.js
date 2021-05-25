// 频道相关请求模块
import request from '@/utils/request'
    /**
     * 获取使用频道列表
     */
        export const getAllChannels = () => {
        return request({
            method: 'GET',
            url: '/app/v1_0/channels'
        })
        }
            /**
     * 获取使用频道列表
     */
            export const addUserChannel = data => {
            return request({
                method: 'PATCH',
                url: `/app/v1_0/user/channels`,
                data
            })
            }
        /**
     * 删除用户指定使用频道列表
     */
                export const deleteUserChannel = channelID => {
                    return request({
                        method: 'DELETE',
                        url: ` /app/v1_0/user/channels/${channelID}`,
                        data
                    })
                    }