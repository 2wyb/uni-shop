<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}">
    <!-- 使用view组件模拟input输入框的形式 -->
    <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    data() {
      return {
        wh: 0
      };
    },
    props: {
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        default: 18
      }
    },
    methods: {
      searchBoxHandler() {
        // 点击了模拟的input输入框
        // 触发外界通过@click绑定的click事件处理函数
        this.$emit('click')
      }
    },
    onLoad() {
      const sysInfo = uni.getSystemInfo()
      // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = sysInfo.windowHeight - 50
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    // background-color: #c00000;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    // border-radius: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
</style>