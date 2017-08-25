<template>
	<div class="wrap">
		<c-header></c-header>
	</div>
</template>
<script>
	import ContentJson from './content.json';
	import CHeader from './component/c-header';
	export default {
		name:'content',
		components:{
			CHeader
		},
		mounted(){
			console.log('*************', ContentJson)
		},
	}
</script>
<style>
	.wrap{
		width: 100%;
		height: 100%;
		background-color: red;
	}
</style>




