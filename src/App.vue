<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from 'vue-router';
  import Splash from '@/pages/Splash/index';
  export default {
    name: 'app',
  }
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex:1;
}

</style>





<!-- alt="欢迎进入我的音乐世界" -->