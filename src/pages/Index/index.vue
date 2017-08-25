<template>
	<div class="tab_wrap">
		 <tabbar class="tabbar">
      <tabbar-item selected link="/index/music">
        <img slot="icon" src="../../assets/tab/ic_bar_wyymusic.png">
        <span slot="label">发现音乐</span>
      </tabbar-item>
      <tabbar-item link="/index/mymusic">
        <img slot="icon" src="../../assets/tab/ic_bar_mymusic.png">
        <span slot="label">我的音乐</span>
      </tabbar-item>
      <tabbar-item  link="/index/friend">
        <img slot="icon" src="../../assets/tab/ic_bar_friend.png">
        <span slot="label">朋友</span>
      </tabbar-item>
      <tabbar-item link="/index/content">
        <img slot="icon" src="../../assets/tab/ic_bar_me.png">
        <span slot="label">账号</span>
      </tabbar-item>
    </tabbar>
    <router-view></router-view>
	</div>
</template>
<script>
  import { Tabbar, TabbarItem, } from 'vux/src/components/tabbar'
  
	export default {
		name: 'index',
		components:{
			Tabbar,
	    TabbarItem,
		},
		created(){
			console.log('我是index界面。。。')
		}
	}

</script>
<style>
	.tabbar{
    background: #235999;
  }
  .tab_wrap{
    width: 100%;
    height: 100%;
  }
</style>