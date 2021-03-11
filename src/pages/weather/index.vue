<template>
  <div>
    天气
  </div>
</template>

<script>
import API from '@/api'
export default {
  name: 'weather',
  mounted() {
    this.fetchWeatherInfo()
  },
  methods: {
    async fetchWeatherInfo() {
      const result = await API.queryWeatherData({
        city: '北京',
        key: process.env.VUE_APP_JUHE_KEY
      })
      console.log('请求天气数据', result)
    }
  }
}
</script>
