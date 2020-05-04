<template>
	<view class="zai-box">
		<image src="../../../static/images/logo2.png" mode='aspectFit' class="zai-logo"></image>
		<view class="zai-form">
			<input v-model="phone" class="zai-input" placeholder-class placeholder="请输入手机号" maxlength="11" />
			<input  v-model="password" class="zai-input" placeholder-class password placeholder="请输入密码"/>
			<view style="width: 100% ;">
				<navigator url="../forget/index" hover-class="none" class="zai-label">忘记密码？</navigator>
				<navigator url="../register/index" hover-class="none" class="zai-label">立即注册</navigator>
			</view>
			<button class="zai-btn" @click="login">立即登录</button>
		</view>
	</view>
</template>

<script>
export default {
		data() {
			return {
				phone:'',
				password:''
			}
		},
		methods: {
			login:function(){
				if(this.phone!=''&&this.password!=''){
					uni.request({
						url: 'http://localhost:8080/user/login',
						method: 'POST',
						data: {
							'phone':this.phone,
							'password':this.password
						},
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						success: res => {
							var user=res.data.data.user
						if(res.data.status!=200){
							uni.showModal({
							    title: '错误',
							    content: res.data.message,
								showCancel:false
							});
						}else{
							uni.setStorageSync("UPHONE",user.phone);
							uni.setStorageSync("UID",user.id);
							uni.setStorageSync("UNAME",user.name);
							uni.setStorageSync("UROLE",user.role);
							//TODO user角色处理，考虑是否需要对应跳转
							uni.switchTab({
								url:'../../index/index/index'
							})
						}
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					uni.showToast({
						icon:'none',
						title:'请填写账号密码'
					})
				}
			}
		}
	}
</script>

<style>
	.zai-box{
		padding: 0 100upx;
		position: relative;
	}
	.zai-logo{
		width: 100%;
		height: 310upx;
	}
	.zai-title{
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}
	.zai-form{
		margin-top: 100upx;
	}
	.zai-input{
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .zai-input{
		color: #94afce;
	}
	.zai-label{
		float: left;
		width: 50%;
		padding: 30upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.zai-btn{
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
	}
	.zai-btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.zai-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>
