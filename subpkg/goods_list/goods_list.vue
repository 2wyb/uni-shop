<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 是否正在请求数据
        isLoading: false,
        goodsList: [],
        total: 0,
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        }
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    // 触底事件
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg("数据加载完毕！")
      if (this.isLoading) return
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    // 下拉刷新事件
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      // 重新发起请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    methods: {
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      async getGoodsList(cb) {
        // 打开节流阀
        this.isLoading = true
        const {
          data: res
        } = await uni.$http.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isLoading = false
        // 只要数据请求完毕就立即按需调用cb回调函数
        cb && cb()

        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      }
    }
  }
</script>

<style lang="scss">

</style>