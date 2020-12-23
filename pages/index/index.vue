<template>
    <view class="page">
        <list>
            <cell v-for="(item,index) in cells" :key="item.title">
                <view class="list-cell-item" @click="jumpTo" :data-url="item.path">{{item.title}}</view>
            </cell>
        </list>
        <button @click="openModal">打开弹窗</button>
        <button @click="closeModal">关闭弹窗</button>
    </view>
</template>

<script>
    const lists = [
        // {title: '仿抖音视频播放',path: '/pages/video/video'},

    ];
    export default {
        data() {
            return {
                cells: Object.freeze(lists),
            };
        },
        methods: {
            openModal(){
                this.$showModal({
                    title: '测试呢',
                    content: '个大哥大哥大哥大哥',
                    success: (res) => {
                        console.log(res)
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                })
            },
            closeModal(){
                
            },
        },
        onReady() {

        }
    }
</script>

<style lang="scss" scoped>
    .list-cell-item{
        padding: 0 32rpx;
        height: 100rpx;
        align-items: flex-start;
        justify-content: center;
        font-size: 24rpx;
        color: #666666;
        border-bottom-width: 1rpx;
        border-bottom-color: #eeeeee;
    }
</style>
