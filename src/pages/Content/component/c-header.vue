<template>
	<div class="h_wrap">
		<div class="top_wrap">
			<div class="left_icon">
				<img :src="userIcon" class="left_img" >
				<div class="left_icon_name">
					<span>{{userName}}</span>
					<div>Lv.{{level}}</div>
				</div>
			</div>
			<div class="right_wrap">
				<span>签到</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'c-header',
		data(){
			return{
				userIcon:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2340154269,1211682813&fm=26&gp=0.jpg',//用户头像
				userName:'雪儿',//用户名
				level:6,//等级
				sign:false,//是否签到
				dynamics:9,//动态
				attention:8,//关注
				fans:99,//粉丝

			}
		}
	}
</script>
<style>
	.h_wrap{
		width: 100%;
		height: 150px;
		background: #555631;
	}
	.top_wrap{
		width: 100%;
		height: 150px;
		display: flex;
		flex:1;
		justify-content: space-between;
		align-items: center;
	}
	.left_icon{
		display: flex;
		/*flex: 1;*/
		flex-direction: row;

	}
	.left_img{
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.left_icon_name{
		margin-left: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right_wrap{
		/*display: flex;
		flex: 1;*/
	}
</style>


