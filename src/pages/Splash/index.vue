<template>
	<div class="splash_wrap">
		<img class="splash_img" src='../../assets/ic_splash_qixi.jpg'>
	</div>
</template>
<script>
	export default {
		name:'splash',
		mounted(){
      this._goIndexPage();
    },
    methods:{
      _goIndexPage(){
        let that = this;
        setTimeout(()=>{
          console.log('我要去跳转。。。。。。')
          that.$router.replace('/index')
        },3000)
      }
    }
	}
</script>
<style>
	.splash_wrap{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.splash_img{
		width: 100%;
		height: 100%;
	}

</style>




