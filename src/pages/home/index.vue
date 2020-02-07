<template>
  <div class="home">
    <img alt="Vue logo" src="~@/assets/logo.png">
    <div>余额{{ moeny | formatMoney }}</div>
    <van-button @click="handleGoHome">go home</van-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      moeny: 5757
    }
  },
  methods: {
    handleGoHome() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>
