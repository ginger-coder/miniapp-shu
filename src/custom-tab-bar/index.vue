<template>
    <view>
        <u-tabbar
            :value="activeTab"
            @change="onTab"
            :fixed="true"
            :placeholder="true"
            :inactive-color="inactiveColor"
            :active-color="activeColor"
            :safeAreaInsetBottom="true"
        >
            <u-tabbar-item
                :text="item.text"
                v-for="item in tabbarList"
                :key="item.text"
            >
                <image
                    class="u-page__item__slot-icon index-icon"
                    slot="active-icon"
                    :src="item.selectedIconPath"
                >
                </image>
                <image
                    class="u-page__item__slot-icon index-icon"
                    slot="inactive-icon"
                    :src="item.iconPath"
                ></image>
            </u-tabbar-item>
        </u-tabbar>
    </view>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name: "TabBar",
    data() {
        return {};
    },
    mounted() {
        
    },
    computed: {
        ...mapState({
            tabbarList: (state) => state.tabbar.list,
            activeColor: (state) => state.tabbar.activeColor,
            inactiveColor: (state) => state.tabbar.inactiveColor,
            activeTab: (state) => state.tabbar.activeTab,
        }),
    },
    methods: {
        onTab(e) {
            this.$store.commit("onTab", e);
        },
    },
};
</script>

<style lang="scss" scoped>
.index-icon {
    width: 22px;
    height: 22px;
}
</style>
