<template>
  <view>
    <view class="zan solid">
      <block v-for="(item, index) in animates" :key="item.id">
        <view class="dot iconfont iconfavorites-fill" :id="item.id" :animation="item.animate" :style="{ color: item.color }"></view>
      </block>
      <view class="point iconfont iconfavorites-fill" @click="start"></view>
    </view>
    <!-- <button @click="start">开始</button> -->
    <!-- <button @click="stop">停止</button> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      animates: [],
      animation: null,
      observer: null,
      timer: null
    };
  },
  onShow() {
    var animation = uni.createAnimation({
      duration: 3000,
      timingFunction: 'linear'
    });
    this.animation = animation;
    this.observer = uni.createIntersectionObserver(this);
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        let newAnimate = this.createAnimate();
        this.animates.push(newAnimate);
        this.$nextTick(() => {
          uni
            .createIntersectionObserver(this)
            .relativeTo('.zan')
            .observe('#' + newAnimate.id, res => {
              // console.log(res);
              if (res.intersectionRect.bottom == 0 && res.intersectionRect.top == 0) {
                let _index = this.animates.findIndex(ele => ele.id == newAnimate.id);
                this.animates.splice(_index, 1);
                // console.log(_index, '删除了' + newAnimate.id, '数组元素数量' + this.animates.length);
              }
            });
        });
      }, 200);
    },
    stop() {
      clearInterval(this.timer);
      // uni.upx2px();
    },
    createAnimate() {
      let num = this.randomNum(0, 20);
      let id = this.uuid();
      let color = this.randomColor();
      for(let i=0;i<24;i++){
        this.animation.translateY(-i*10).translateX(this.randomNum(-10, 20)).opacity(i/10).step({ duration: 200 });
      }
      let animate = this.animation.export();
      return { id, color, animate };
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * max + min);
    },
    uuid() {
      return (
        's' +
        Math.random()
          .toString(32)
          .substr(2)
      );
    },
    randomColor() {
      return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
    }
  }
};
</script>

<style>
.zan {
  width: 100rpx;
  height: 360rpx;
  position: relative;
}
.point{
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0,0,0,.5);
  font-size: 24rpx;
  line-height: 40rpx;
  text-align: center;
  border-radius: 50%;
  color: #FFFFFF;
  position: absolute;
  left: 30rpx;
  bottom: 10rpx;
  z-index: 99999;
  cursor: pointer;
}
.dot {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  position: absolute;
  left: 30rpx;
  bottom: 10rpx;
}

@font-face {
  font-family: 'iconfont';
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKYAAsAAAAABlAAAAJMAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApUaQE2AiQDCAsGAAQgBYRtBzgblwXIrrApw70IpBJibMCtee63HTjAN0QQ7febfe++akItEkWzaIh4KiQoXUMkFbpmMldrukmJVG1mbQBlVJkVPuz98/3cb5FUp0JGqJKv0GVf1s3/6IHuYzy+Vl/VGXJ67fNcTm8CHcj8QDnuRWNNmtQL6F4cSIHugVFkJZRxw9gFL/AxgaoxOYm9oYkFaJbYqwJx51gaNBdiksSKZaHYcDCJRw3K2X32CDxE349flWgmU8jZbYcXgyb0fHLKOv4/thwQ4iCg4wXkWAEScdqY21cnGFenmqs3BY7VHHwi8IqjugT76+zGOhiB6mfSeNpHLWbwWFMNgPFJtxGD2+509vrL6c+Y4v35XPufFP0P18Opabf8WqhRyTrxA6hZ9kMP+2f5XfJJAsFbW6m1rrW/ci2Bj1xFzmRYAJR35A9+iGbgUDJ0tidLmqZRmRmcqKOqin841PU51T44uzKUJwRKRjPkymbIxK6goGYVRWWbqFo2fLymR6kTqYIlFwCh7R6Zpnfk2p7IxH6gYOgfRe2oQ9V59C6smQundVeRxmSivoOOIUPh+rg1bp4ja8PXVF4X8UukYieJ5UKpXBymkNQSW+JNq8IsUCgZ4BB4jnxfYqSkSwYXbOaoWiyKpjcVDBlAq10K0TBiQrodyGGQQiIYz1orn59DLBt8GtUxUFddQpSYMzsqKygNIIfN4aCBR3kltslSwZiABEUKoCEwj/h8Eoqa57mIgRXYEzKRqqIzSgw1F7a3Bn93AqpsRxbOLbnmhbYplcMU54Xj+wAAAA==');
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfavorites-fill:before {
  content: '\e721';
}
</style>
