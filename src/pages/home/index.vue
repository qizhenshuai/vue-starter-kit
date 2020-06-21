<template>
  <div class="home">
    <div class="icon-list">
      <svg-icon
        v-for="icon in iconList"
        :key="icon"
        class="icon"
        :icon-class="icon"
      />
    </div>
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
      moeny: 5757,
      iconList: [
        'dashboard',
        'example',
        'eye-open',
        'eye',
        'form',
        'link',
        'nested',
        'password',
        'table',
        'tree',
        'user',
        '404',
        'checked'
      ]
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

<style lang="scss" scoped>
.icon-list {
  margin: 15px;
  font-size: 24px;
  .icon {
    margin: 0 10px;
  }
}
</style>
