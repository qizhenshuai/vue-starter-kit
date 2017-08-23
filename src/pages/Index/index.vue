<template>
	<div>

    <router-view></router-view>

		 <tabbar>
      <tabbar-item link="/music">
        <img slot="icon" src="../../assets/tab/ic_bar_wyymusic_selected.png">
        <span slot="label">发现音乐</span>
      </tabbar-item>
      <tabbar-item show-dot link="/mymusic">
        <img slot="icon" src="../../assets/tab/ic_bar_mymusic.png">
        <span slot="label">我的音乐</span>
      </tabbar-item>
      <tabbar-item selected link="/friend">
        <img slot="icon" src="../../assets/tab/ic_bar_friend.png">
        <span slot="label">朋友</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/content">
        <img slot="icon" src="../../assets/tab/ic_bar_me.png">
        <span slot="label">账号</span>
      </tabbar-item>
    </tabbar>
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
	
</style>