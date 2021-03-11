<template>
  <div class="home">
    <div class="icon-list">
      <bc-svg
        v-for="icon in iconList"
        :key="icon"
        class-name="icon"
        :icon-class="icon"
      />
    </div>
    <!-- <img alt="Vue logo" src="~@/assets/logo.png"> -->
    <div>余额{{ moeny | formatMoney }}</div>
    <van-button @click="handleGoHome">go home</van-button>
    <van-button @click="handleToWeather">go weather</van-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      moeny: 5757,
      iconList: [
        'checked',
        'pay-checked',
        'pay-uncheck',
        'uncheck'
      ]
    }
  },
  methods: {
    handleGoHome() {
      this.$router.push({
        path: '/home'
      })
    },
    handleToWeather() {
      this.$router.push({
        path: '/weather'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-list {
  margin: 15px;
  font-size: 24px;
  .icon {
    margin: 0 10px;
  }
}
</style>
