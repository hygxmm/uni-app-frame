<template>
    <view class="page">

    </view>
</template>

<script>
    import updateManager from '@/common/update.js';
    import config from '@/common/config.js';
    export default {
        data() {
            return {

            };
        },
        methods: {

        },
        onReady() {
            // #ifdef APP-PLUS
            updateManager(config.apiHost + this.$api.common.appUpdate);
            // #endif



        }

    }
</script>

<style lang="scss" scoped>
    .page {
        min-height: 100vh;
        background-color: #FFFFFF;
    }
</style>
