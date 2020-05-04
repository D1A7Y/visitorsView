<template>
	<view class="zai-box">
		<image src="../../../static/images/logo2.png" mode='aspectFit' class="zai-logo"></image>
		<view class="zai-form">
			<input v-model="phone" class="zai-input" placeholder-class placeholder="请输入手机号码" />
			<view class="zai-input-btn">
				<input class="zai-input" v-model="code" placeholder-class placeholder="验证码" />
				<view class="zai-checking" @click="checking" v-if="state===false">获取验证码</view>
				<view class="zai-checking zai-time" v-if="state===true">倒计时{{ currentTime }}s</view>
			</view>
			<input v-model="password" class="zai-input" placeholder-class password placeholder="请输入密码" />
			<input v-model="password2" class="zai-input" placeholder-class password placeholder="请再次输入密码" />
			<button @click="change" class="zai-btn">更改密码</button>
			<navigator url="../login/index" open-type='navigateBack' hover-class="none" class="zai-label">已有账号，点此去登录.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: false, //是否开启倒计时
				totalTime: 60, //总时间，单位秒
				recordingTime: 0, //记录时间变量
				currentTime: 0, //显示时间变量
				phone: '',
				password: '',
				password2: '',
				code:''
			}
		},
		onLoad() {

		},
		methods: {
			change() {
				var message;
				if (this.phone != '' && this.password != '' && this.password2 != ''&& this.code != '') {
					if(this.password==this.password2){
						uni.request({
							url: 'http://localhost:8080/user/forget',
							method: 'POST',
							data: {
						
								"code": this.code,
								"password": this.password,
								"phone": this.phone
						
							},
							success: res => {
								uni.showModal({
									title: '通知',
									content: res.data.message,
									showCancel: false
								});
						
							},
							fail: () => {},
							complete: () => {}
						});
					}else{
						uni.showToast({
							icon: 'none',
							title: '两次密码不同'
						});
					}
				} else {
					message = this.reMessage();
					uni.showToast({
						icon: 'none',
						title: message
					});
				}

			},
			checking() {
				if (this.phone == '') {
					uni.showToast({
						icon: 'none',
						title: '手机号不能为空'
					})
				} else {
					var regex = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}/;
					if (!regex.test(this.phone)) {
						uni.showToast({
							icon: 'none',
							title: "手机号不合法"
						})
					} else {
						//把显示时间设为总时间
						this.currentTime = this.totalTime;
						//开始倒计时
						this.state = true;
						//执行倒计时
						this.checkingTime();
						uni.request({
							url: 'http://localhost:8080/user/regionCode',
							method: 'GET',
							data: {
								phone: this.phone
							},
							success: res => {
								if (res.data.message == "error") {
									uni.showModal({
										title: '错误',
										content: '手机号错误',
										showCancel: false
									});
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}
			},
			checkingTime() {
				let that = this;
				//判断是否开启
				if (this.state) {
					//判断显示时间是否已到0，判断记录时间是否已到总时间
					if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
						//记录时间增加 1
						this.recordingTime = this.recordingTime + 1;
						//显示时间，用总时间 - 记录时间
						this.currentTime = this.totalTime - this.recordingTime;
						//1秒钟后，再次执行本方法
						setTimeout(() => {
							//定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
							that.checkingTime();
						}, 1000)
					} else {
						//时间已完成，还原相关变量
						this.state = false; //关闭倒计时
						this.recordingTime = 0; //记录时间为0
						this.currentTime = this.totalTime; //显示时间为总时间
					}
				} else {
					//倒计时未开启，初始化默认变量
					this.state = false;
					this.recordingTime = 0;
					this.currentTime = this.totalTime;
				}
			},
			reMessage() {

				if (this.phone == '') {
					return '手机号不能为空'
				} else {
					var regex = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}/;
					if (!regex.test(this.phone)) {
						return '手机号不合法'
					}
				}
				if (this.code == '') {
					return '验证码不能为空'
				}
				if (this.password == '') {
					return '密码不能为空'
				}
				if (this.password2!=this.password) {
					return '两次输入密码不同'
				}
			}
		}
	}
</script>

<style>
	.zai-box {
		padding: 0 100upx;
		position: relative;
	}

	.zai-logo {
		width: 100%;
		height: 310upx;
	}

	.zai-title {
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}

	.zai-form {
		margin-top: 50upx;
	}

	.zai-input {
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}

	.input-placeholder,
	.zai-input {
		color: #94afce;
	}

	.zai-label {
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}

	.zai-btn {
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		margin-top: 60upx;
	}

	.zai-btn:after {
		border: 0;
	}

	/*验证码输入框*/
	.zai-input-btn {
		position: relative;
	}

	.zai-input-btn .zai-input {
		padding-right: 260upx;
	}

	.zai-checking {
		position: absolute;
		right: 0;
		top: 0;
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 110upx;
		font-size: 36upx;
		margin-left: auto;
		margin-right: auto;
		padding-left: 28upx;
		padding-right: 28upx;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
		line-height: 2.55555556;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		padding-top: 2upx;
		padding-bottom: 2upx;
	}

	.zai-checking.zai-time {
		background: #a7b6d0;
	}

	/*按钮点击效果*/
	.zai-btn.button-hover {
		transform: translate(1upx, 1upx);
	}
</style>
