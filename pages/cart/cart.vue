<template>
  <view class="cart-container" v-if="cart.length!==0">
    <my-address></my-address>
    <uni-swipe-action>
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-title-text">购物车</text>
      </view>
      <block v-for="(goods,i) in cart" :key="i">
        <uni-swipe-action-item :options="Options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true"
            @num-change="numerChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <text class="tip-text">空空如也~~~</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      }
    },
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      numerChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      swipeActionClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>