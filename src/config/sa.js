import sensors from 'sa-sdk-miniprogram';
// 配置初始化参数
sensors.setPara({
    name: 'sensors',
    server_url: 'https://sensorsdata-6.talbrain.com:8080/sa?project=meiweilai',
    // 全埋点控制开关
    autoTrack:{
        appLaunch: false, // 默认为 true，false 则关闭 $MPLaunch 事件采集
        appShow: false, // 默认为 true，false 则关闭 $MPShow 事件采集
        appHide: false, // 默认为 true，false 则关闭 $MPHide 事件采集
        pageShow: false, // 默认为 true，false 则关闭 $MPViewScreen 事件采集
        pageShare: false, // 默认为 true，false 则关闭 $MPShare 事件采集
        mpClick: false, // 默认为 false，true 则开启 $MPClick 事件采集
        mpFavorite: false, // 默认为 true，false 则关闭 $MPAddFavorites 事件采集
		pageLeave: false // 默认为 false， true 则开启 $MPPageLeave事件采集
    },
    // 自定义渠道追踪参数，如 source_channel: ["custom_param"]
    source_channel: [],
    // 是否允许控制台打印查看埋点数据(建议开启查看)
    show_log: true,
    // 是否允许修改 onShareAppMessage 里 return 的 path，用来增加(登录 ID，分享层级，当前的 path)，在 app onShow 中自动获取这些参数来查看具体分享来源、层级等
    allow_amend_share_path: true
});

export default sensors;
