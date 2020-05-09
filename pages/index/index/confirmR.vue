<template>
	<view class="gpp-cf">
		<view class="gpp-cf-form">
			<view class="gpp-cf-title">
					<text class="titleBeforeOpen" style="background: #F0AD4E;"></text>确认预约</view>
				
					<view :hidden="userFeedbackHidden" class="popup_content">
							<view class="popup_title">简述驳回理由</view>
							<view class="popup_textarea_item">
								<textarea class="popup_textarea" placeholder='简述驳回理由' v-model="feedbackContent">
								</textarea>
								<view >
									<button class="popup_button2" @click="backReservation">驳回</button>
								</view>
							</view>
						</view>
						<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv"></view>
						
		
			<view class="gpp-cf-content">
				<!-- 手机号-->
				<view class="gpp-cf-content-item">
					<view class="item-name">
						<text class="red">*</text>手机号</view>
					<view class="item-content">
						<input type="text" v-model="phone" disabled="true" style="background-color:#F1F1F1;" />
						<text class="item-ct-unit"></text>
					</view>
				</view>
				<!-- 姓名-->
				<view class="gpp-cf-content-item">
					<view class="item-name">
						<text class="red">*</text>姓名</view>
					<view class="item-content">
						<input type="text" v-model="name" disabled="true" style="background-color:#F1F1F1;" />
						<text class="item-ct-unit"></text>
					</view>
				</view>
				<!-- 身份证号码-->
				<view class="gpp-cf-content-item">
					<view class="item-name">
						<text class="red">*</text>身份证号码</view>
					<view class="item-content">
						<input type="text" v-model="idcard" disabled="true" style="background-color:#F1F1F1;" />
						<text class="item-ct-unit"></text>
					</view>
				</view>
				<!-- 公司选择-->
				<view class="gpp-cf-content-item">
					<view class="item-name"><text class="red">*</text>到访公司</view>
					<view class="item-content">
						<input type="text" v-model="companyId" disabled="true" style="background-color:#F1F1F1;" />
					</view>
				</view>
				<!-- 日期选择-->
				<view class="gpp-cf-content-item">
					<view class="item-name"><text class="red">*</text>到访时间</view>
					<view class="item-content">
						<input type="text" v-model="reservationTime" disabled="true" style="background-color:#F1F1F1;" />
					</view>
				</view>
				<view class="gpp-cf-content-item">
					<view class="item-name"><text class="red">*</text>创建时间</view>
					<view class="item-content">
						<input type="text" v-model="createTime" disabled="true" style="background-color:#F1F1F1;" />
					</view>
				</view>
				<!-- 备注-->
				<view class="gpp-cf-content-item">
					<view class="item-name"><text class="red"></text>备注</view>
					<view class="item-content">
						<textarea v-model="remarks" disabled="true" />
						</view>
				</view>
				<button class="zai-btn" @click="confrim">确认</button>
				<button class="zai-btn2" @click="back">驳回</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				id:'',
				phone:'',
				name:'',
				idcard:'',
				companyId:'',
				remarks:'无',
				reservationTime:'',
				createTime:'',
				userFeedbackHidden: true, // 默认隐藏
				feedbackContent:"无" // 用户反馈内容

			}

		},
		methods: {
		confrim:function(){
			uni.showModal({
				title:'确认预约',
				content:'是否确认预约',
				success:res=>{
					if(res.confirm){
						uni.request({
							url: 'http://localhost:8080/reservation/confirmReservation',
							method: 'POST',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data: {
								"id":this.id
							},
							success: res => {
									uni.showToast({
										title:'已确认'
									});
									
								
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}
			})
		},
		back:function(){
			this.userFeedbackHidden = false
			
		},
		backReservation:function(){
			uni.request({
				url: 'http://localhost:8080/reservation/back',
				method: 'POST',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data: {
					id:this.id,
					reason:this.feedbackContent
				},
				success: res => {
					if(res.data.status==200){
						uni.showToast({
							title:"驳回成功",
							success() {
								setTimeout(function(){
									uni.navigateBack({
										
									})
								},1000)
							}
						});						
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		hideDiv:function(){
			this.userFeedbackHidden = true
		},
		onLoad: function (option) {
			 this.id= option.id;
			uni.request({
				url: 'http://localhost:8080/reservation/queryById',
				method: 'GET',
				data: {
					id:this.id
				},
				success: res => {
					var content=res.data.data.content
					this.reservationTime  = content.reservationTime
					this.createTime  = content.createTime
					this.remarks = content.remarks
					this.companyId = content.companyId
					this.phone = content.phone
					uni.request({
						url: 'http://localhost:8080/user/query',
						method: 'GET',
						data: {
							phone:this.phone
						},
						success: res => {
							var user=res.data.data.user
							if(res.data.status!=200){
								uni.showModal({
								    title: '错误',
								    content: res.data.message+"请稍后再试",
									showCancel:false
								});
								uni.switchTab({
									url:'index'
								})
							}else{
								this.idcard=user.idCard;
								this.name=user.name;
							}
						},
						fail: () => {},
						complete: () => {}
					});
				},
				fail: () => {},
				complete: () => {}
			});
			
			
		}
	}}
</script>

<style lang="scss">
	.popup_overlay {
		position: fixed;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 1001;
		-moz-opacity: 0.8;
		opacity: .80;
		filter: alpha(opacity=88);
		}
	.popup_content {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 520upx;
		height: 550upx;
		margin-left: -270upx;
		margin-top: -270upx;
		border: 10px solid white;
		background-color: white;
		z-index: 1002;
		overflow: auto;
		border-radius: 20upx;
		}
	 
	.popup_title {
		padding-top: 20upx;
		width: 480upx;
		text-align: center;
		font-size: 32upx;
	}
	 
	.popup_textarea_item {
		padding-top: 5upx;
		height: 240upx;
		width: 440upx;
		background-color: #F1F1F1;
		margin-top: 30upx;
		margin-left: 20upx;
	}
	 
	.popup_textarea {
		width: 410upx;
		font-size: 26upx;
		margin-left: 20upx;
	}
	 
	.popup_button {
		color: white;
		background-color: #4399FC;
		border-radius: 20upx;
		
		}
	.popup_button2 {
		color: white;
		background-color: #DD524D;
		border-radius: 20upx;
	}
	.zai-btn{
		background: #4CD964;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		width: 30%;
		float: left;
		border-left: 100px;
	}
	.zai-btn2{
		background: #DD524D;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		width: 30%;
		float: right;
	}
	.zai-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
	.gpp-cf {
		background: #F1F1F1;
		box-sizing: border-box;

		.gpp-cf-form {
			box-sizing: border-box;
			padding-bottom: 10px;
			background: #FFFFFF;
			margin-bottom: 10px;

			.gpp-cf-title {
				position: relative;
				padding: 10px 10px 10px 30px;
				font-size: 16px;

				.titleBeforeOpen {
					transition: all 0.3s ease;
					position: absolute;
					left: 15px;
					top: 13px;
					content: "";
					width: 4px;
					height: 16px;
					border-radius: 2px;
				}

				.titleBeforeClose {
					transition: all 0.3s ease;
					position: absolute;
					left: 8px;
					top: 19px;
					content: "";
					width: 16px;
					height: 4px;
					border-radius: 2px;
				}
			}

			.gpp-cf-title:active {
				background-color: #f8f8f8;
			}

			.gpp-cf-content {
				margin: 10px;
				box-sizing: border-box;
				font-size: 14px;
				color: #777777;

				.gpp-cf-content-item {
					margin-bottom: 16px;

					.item-name {
						margin-bottom: 3px;
					}

					.item-content {
						position: relative;

						.item-ct-unit {
							position: absolute;
							top: 8px;
							right: 10px;
							font-size: 14px;
							color: #d5d5d5;
						}
					}
				}
			}

			.hidden {
				display: none;
			}
		}

		.gpp-cf-form:last-child {
			margin-bottom: 0;
		}

		.red {
			color: #f55347;
		}

		.bottomShadow {
			box-shadow: 0 2px 4px #d0cfcf;
		}

		.arrowBottom {
			top: 11px !important;
			content: " ";
			height: 8px;
			width: 8px;
			border-width: 0 1px 1px 0;
			border-color: #a0a0a0;
			border-style: solid;
			transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		}

		.fork {
			width: 14px;
			height: 14px;
			margin: auto;
			position: relative;
		}

		.fork:before,
		.fork:after {
			content: "";
			position: absolute;
			height: 14px;
			width: 1.5px;
			top: 3px;
			right: 4px;
			background: #a0a0a0;
		}

		.fork:before {
			transform: rotate(45deg);
		}

		.fork:after {
			transform: rotate(-45deg);
		}

		input,
		.item-select {
			box-sizing: border-box;
			width: 100%;
			height: 36px;
			line-height: 34px;
			font-size: 14px;
			padding: 0 40px 0 8px;
			border: 1px solid #e8e5e6;
			border-radius: 8px;
		}

		textarea {
			box-sizing: border-box;
			width: 100%;
			min-height: 90px;
			font-size: 14px;
			padding: 8px;
			border: 1px solid #e8e5e6;
			border-radius: 8px;
		}

		.input-placeholder,
		.textarea-placeholder {
			color: #d5d5d5;
		}

		radio-group,
		checkbox-group {
			margin-top: 8px;
		}

		.item-radio,
		.item-checkbox {
			margin-right: 14px;
		}
	}
</style>
