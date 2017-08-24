<template>
	<div>
		<span>个人中心界面</span>
		<img src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2340154269,1211682813&fm=26&gp=0.jpg' alt="">
	</div>
</template>
<script>
	import ContentJson from './content.json';
	export default {
		name:'content',
		mounted(){
			console.log('*************', ContentJson)
		},
	}
</script>
<style>
	
	img{
		width: 100%;
		height: 300px;
	}
</style>




