module.exports = {
        plugins: {
            // autoprefixer设置需要兼容的浏览器厂商声明前缀 vue-cli已经内部默认配置了autoprefixer
        'autoprefixer': {
            // browsers 设置需要配置的系统
            // 这个配置没有问题但是写到这里控制台会报警告
            // 为什么？因为vue-cli 是通过.browserslistrc文件配置用来兼容环境信息的
            browsers: ['Android >= 4.0', 'iOS >= 8']
        },
        'postcss-pxtorem': {
            // 转换的根元素基准值
            // 正常情况下按照你的设计稿来
            // 750px 宽的设计稿 750 / 10 = 75
            // 375 宽的设计稿
            rootValue: 37.5,
            // 指需要设置转换的属性 * 就是全部属性
            propList: ['*']
        }
        }
    }