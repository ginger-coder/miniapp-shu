export default {
    state: {
        list: [
            {
                text: "首页",
                pagePath: "/pages/index/index",
                iconPath: "/static/tabbar/icon-index.png",
                selectedIconPath: "/static/tabbar/icon-index-active.png",
            },
            // {
            //     text: "学情",
            //     pagePath: "/pages/study/index",
            //     iconPath: "/static/tabbar/icon-study.png",
            //     selectedIconPath: "/static/tabbar/icon-study-active.png",
            // },
            {
                text: "图书",
                pagePath: "/pages/book/index",
                iconPath: "/static/tabbar/icon-book.png",
                selectedIconPath: "/static/tabbar/icon-book-active.png",
            },
            {
                text: "我的",
                pagePath: "/pages/mine/index",
                iconPath: "/static/tabbar/icon-mine.png",
                selectedIconPath: "/static/tabbar/icon-mine-active.png",
            },
        ],
        activeColor: "#00B1BC",
        inactiveColor: "#C7C7C7",
        activeTab: 0,
    },
    getters: {},
    mutations: {
        onTab(state, data) {
            state.activeTab = data;
            uni.switchTab({
                url: state.list[data].pagePath,
            });
        },
    },
    actions: {},
};
