<template>
    <view class="page">
        <view>
            <view v-for="(item,index) in cells" :key="item.title">
                <view class="list-cell-item" @click="jumpTo" :data-url="item.path">{{item.title}}</view>
            </view>
        </view>
        <button @click="chooseAvatar">
            <view>
                <button>头像</button>
                <image class="avatar" src=""></image>
            </view>
        </button>
    </view>
</template>

<script>
    const lists = [
        // {title: '裁剪头像',path: '/pages/video/video'},

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
            chooseAvatar(){
                uni.chooseImage({
                    count: 1,
                    sizeType: ['original','compressed'],
                    sourceType: ['album','camera'],
                    success: res => {
                        const filePath = res.tempFilePaths[0];
                        console.log('filePath',filePath);
                        uni.navigateTo({
                            url: '/pages/image-cropper/image-cropper?src='+filePath
                        })
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .list-cell-item{
        padding: 0 32rpx;
        height: 100rpx;
        align-items: flex-start;
        justify-content: center;
        font-size: 28rpx;
        line-height: 100rpx;
        color: #666666;
        border-bottom-width: 1rpx;
        border-bottom-color: #eeeeee;
    }
    .avatar{
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background-color: #999999;
    }
</style>
