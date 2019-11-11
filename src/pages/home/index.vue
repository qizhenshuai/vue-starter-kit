<template>
  <div class="home">
    <img alt="Vue logo" src="~@/assets/logo.png">
    <div>余额{{ moeny | formatMoney }}</div>
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
  }
}
</script>
