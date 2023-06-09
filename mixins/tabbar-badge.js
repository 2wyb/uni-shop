import {
  mapGetters
} from 'vuex'
export default {
  computer: {
    ...mapGetters('m_cart', ['total'])
  },
  watch: {
    total() {
      this.setBudge()
    }
  },
  onShow() {
    this.setBudge()
  },
  methods: {
    setBudge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}