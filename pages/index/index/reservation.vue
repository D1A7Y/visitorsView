<template>
	<view class="gpp-cf">
		<view class="gpp-cf-form">
			<view class="gpp-cf-title">
				<text class="titleBeforeOpen" style="background: #6BA1FF;"></text>预约填写</view>
			<view class="gpp-cf-content">
				<!-- 手机号-->
				<view class="gpp-cf-content-item">
					<view class="item-name">
						<text class="red">*</text>手机号</view>
					<view class="item-content">
						<input type="text" v-model="phone" />
						<text class="item-ct-unit"></text>
					</view>
				</view>
				<!-- 姓名-->
				<view class="gpp-cf-content-item">
					<view class="item-name">
						<text class="red">*</text>姓名</view>
					<view class="item-content">
						<input type="text" v-model="name" />
						<text class="item-ct-unit"></text>
					</view>
				</view>
				<!-- 身份证号码-->
				<view class="gpp-cf-content-item">
					<view class="item-name">
						<text class="red">*</text>身份证号码</view>
					<view class="item-content">
						<input type="text" v-model="idcard" />
						<text class="item-ct-unit"></text>
					</view>
				</view>
				<!-- 性别-->
				<view class="gpp-cf-content-item">
					<view class="item-name">
						<text class="red">*</text>性别</view>
					<view class="item-content">
						<radio-group @change="radioChange">
							<label class="item-radio">
								<radio value="0">男</radio>
							</label>
							<label class="item-radio">
								<radio value="1">女</radio>
							</label>
						</radio-group>
					</view>
				</view>
				<!-- 公司选择-->
				<view class="gpp-cf-content-item">
					<view class="item-name"><text class="red">*</text>到访公司</view>
					<view class="item-content">
						<picker @change="bindPickerChange" :value="index" range-key="name" :range="array">
							<view class="item-select">{{array[index].name}}</view>
						</picker>
					</view>
				</view>
				<!-- 日期选择-->
				<view class="gpp-cf-content-item">
					<view class="item-name"><text class="red">*</text>到访日期</view>
					<view class="item-content">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="item-select">{{date}}</view>
						</picker>
					</view>
				</view>
				<!-- 时间选择-->
				<view class="gpp-cf-content-item">
					<view class="item-name"><text class="red">*</text>到访时间</view>
					<view class="item-content">
						<picker mode="time" :value="time" start="09:00" end="16:00" @change="bindTimeChange">
							<view class="item-select">{{time}}</view>
						</picker>
					</view>
				</view>
				<!-- 备注-->
				<view class="gpp-cf-content-item">
					<view class="item-name"><text class="red"></text>备注</view>
					<view class="item-content">
						<textarea v-model="remarks" />
						</view>
				</view>
				
				<button class="zai-btn" @click="submit">提交</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				phone:'',
				name:'',
				idcard:'',
				sex:'',
				companyId:'',
				remarks:'无',
				reservationTime:'',
				array: '',
				index:0,
				date: currentDate,
				time:'10:00'
			}

		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		methods: {
			bindPickerChange: function(e) {
		            console.log('picker发送选择改变，携带值为', e)
		            this.index = e.target.value;
					this.companyId=this.array[this.index].id;
					console.log(this.companyId);
		        },
			bindDateChange: function(e) {
		            this.date = e.target.value
		        },
			bindTimeChange: function(e) {
			           this.time = e.target.value
			       },
			getDate(type) {
		            const date = new Date();
		            let year = date.getFullYear();
		            let month = date.getMonth() + 1;
		            let day = date.getDate();
		
		            if (type === 'start') {
		                year = year;
		            } else if (type === 'end') {
		                year = year + 2;
		            }
		            month = month > 9 ? month : '0' + month;;
		            day = day > 9 ? day : '0' + day;
		            return `${year}-${month}-${day}`;
		        },
			radioChange:function(e){
				this.sex = e.target.value;
				console.log(this.sex);
			},
			submit:function(){
				var flag = true;
				if(this.sex==''){
					flag=false;
					uni.showToast({
						icon:'none',
						title:'性别不能为空'
					})
				}
				if(this.phone==''){
					flag=false;
					uni.showToast({
						icon:'none',
						title:'手机号不能为空'
					})
				}
				if(this.name==''){
					flag=false;
					uni.showToast({
						icon:'none',
						title:'姓名不能为空'
					})
				}
				if(this.idcard==''){
					flag=false;
					uni.showToast({
						icon:'none',
						title:'身份证不能为空'
					})
			}
			if(flag){
				this.reservationTime = this.date +" "+this.time+":00"
				uni.request({
					url: 'http://localhost:8080/reservation/insert',
					method: 'POST',
					data: {
							"companyId": this.companyId,
							"phone": this.phone,
							"remarks": this.remarks,
							"reservationTime": this.reservationTime
					},
					success: res => {
						if(res.data.status==200){
							uni.showModal({
								title: '预约',
								content: "预约成功，请耐心等待管理员确认，请勿多次提交",
								showCancel:false,
								success() {
									uni.switchTab({
										url:'index'
									})
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		},
		onShow:function(){
			this.phone=uni.getStorageSync("UPHONE");
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
			uni.request({
				url: 'http://localhost:8080/comppany/query',
				method: 'GET',
				data: {},
				success: res => {
					this.array=res.data.data.data;
					this.companyId=this.array[0].id
				},
				fail: () => {},
				complete: () => {}
			});
			
		}
	}}
</script>

<style lang="scss">
	.zai-btn{
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
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
