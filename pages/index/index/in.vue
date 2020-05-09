<template>
	<view>
		<u-search placeholder="请输入手机号" v-model="keyword" :show-action="false" @search="search"></u-search>
		<view class="example">
			<v-table :columns="columnsCheckBox" :list="data2" selection="single" @on-selection-change="onSelectionChange"></v-table>
			<uni-pagination @change="handlePage" :total="total" :current="pageNum" :pageSize="pageSize"></uni-pagination>
		</view>
		<u-mask :show="show" mask-click-able=false>
			<view class="warp">
				<view :class="rect">
					<u-steps :list="numList" :current="current" mode="number" type="success"></u-steps>
					<!-- 步骤1-->
					<view v-show="bz1">
						<view class="gpp-cf">
							<view class="gpp-cf-form">
								<view class="gpp-cf-content">
									<view class="gpp-cf-content-item">
										<view class="item-name">
											<text class="red">*</text>预约码</view>
										<view class="item-content">
											<input type="text" v-model="code" />
											<text class="item-ct-unit"></text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 步骤2-->
					<view v-show="bz2">
						<view class="gpp-cf">
							<view class="gpp-cf-form">
								<view class="gpp-cf-content">
									<!-- 手机号-->
									<!-- <view class="gpp-cf-content-item">
										<view class="item-name">
											<text class="red">*</text>手机号</view>
										<view class="item-content">
											<input type="text" v-model="phone" disabled="true" style="background-color:#F1F1F1;" />
											<text class="item-ct-unit"></text>
										</view>
									</view> -->
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
									<view class="gpp-cf-content-item">
										<view class="item-name">
											<text class="red">*</text>到访公司</view>
										<view class="item-content">
											<input type="text" v-model="company" disabled="true" style="background-color:#F1F1F1;" />
											<text class="item-ct-unit"></text>
										</view>
									</view>
									<view class="gpp-cf-content-item">
										<view class="item-name">
											<text class="red">*</text>到访时间</view>
										<view class="item-content">
											<input type="text" v-model="reservationTime" disabled="true" style="background-color:#F1F1F1;" />
											<text class="item-ct-unit"></text>
										</view>
									</view>

								</view>
							</view>
						</view>
					</view>
					<u-button type="primary" size="medium" :plain="true" @click="cancel" style="margin-left:20px ;">取消</u-button>
					<u-button type="error" size="medium" :plain="true" @click="ok" style="margin-left: 40px;">{{value}}</u-button>




				</view>
			</view>
		</u-mask>
	</view>
</template>
<script>
	import vTable from "@/components/table/table.vue";
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
	export default {
		components: {
			vTable,
			uniPagination
		},
		data() {
			return {
				flag:false,
				code:'',
				code2:'',
				errorMessage: '',
				bz1: true,
				bz2: '',
				reservationTime: '',
				company: '',
				rect: 'rect',
				value: '黑名单',
				id: '',
				idcard: '',
				name: '',
				phone: '',
				show: false,
				total: '',
				pageNum: 1,
				pageSize: '10',
				current: 0,
				keyword: '',
				columnsCheckBox: [{
						title: 'ID',
						key: 'id',
						$width:"60px"
					},
					{
						title: '姓名',
						key: 'name'
					},
					{
						title: '手机号',
						key: 'phone',
					},
					{
						title: '到访公司',
						key: 'company',
					},
				
					{
						title: '到访时间',
						key: 'reservationTime',
					}
				],
				data2: '',
				numList: [{
					name: '查看'
				}, {
					name: '签到'
				}, {
					name: '签退'
				}, {
					name: '完成'
				}, ],
			}
		},
		methods: {
			onSelectionChange(obj) {
				this.id = obj.new.item.id;
				this.phone = obj.new.item.phone;
				this.idcard = obj.new.item.idCard;
				this.name = obj.new.item.name;
				this.current = obj.new.item.step;
				this.reservationTime =  obj.new.item.reservationTime;
				this.company =  obj.new.item.company;
				this.code2 =  obj.new.item.code;
				this.current = obj.new.item.step;
				if(this.current==0){
					this.bz1 =true;
					this.bz2 =false;
					this.rect = "rect";
					this.value = "下一步";
				}
				if(this.current==1){
					this.bz1 =false;
					this.bz2 =true;
					this.rect = "rect2";
					this.value = "签到";
				}
				if(this.current==2){
					this.bz1 =false;
					this.bz2 =true;
					this.rect ="rect2";
					this.value = "签退"
				}
				if(this.current==3){
					this.bz1 =false;
					this.bz2 =true;
					this.rect = "rect2";
					this.value = "完成"
				}
				this.show = true;
			},
			cancel() {
				if(this.flag){
					uni.request({
						url: 'http://localhost:8080/reservation/queryCodeByPhone',
						method: 'POST',
						data: {
							name:this.keyword,
							pageSize: this.pageSize,
							pageNum: this.pageNum
						},
						success: res => {
							var page = res.data.data.page
							this.total = page.totalSize
							this.data2 = page.content
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					uni.request({
						url: 'http://localhost:8080/reservation/queryCodeByPhone',
						method: 'POST',
						data: {
							name:'',
							pageSize: this.pageSize,
							pageNum: this.pageNum
						},
						success: res => {
							var page = res.data.data.page
							this.total = page.totalSize
							this.data2 = page.content
						},
						fail: () => {},
						complete: () => {}
					});
				}
				this.show = false
			},
			ok() {
				if(this.current==0){
					this.bz1 =true;
					this.rect = "rect";
					this.value = "下一步";
					if(this.code!=this.code2){
						uni.showToast({
							icon:"none",
							title:"验证码错误"
						})
					}else{
						uni.request({
							url: 'http://localhost:8080/reservation/confirmCode',
							method: 'POST',
							data: {
								id:this.id
							},
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							success: res => {
								if(res.data.status==200){
									this.current=1;
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}
				if(this.current==1){
					this.bz1 =false;
					this.bz2 =true;
					this.rect = "rect2";
					this.value = "签到";
					uni.request({
						url: 'http://localhost:8080/reservation/confirmIn',
						method: 'POST',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data: {
							id:this.id
						},
						success: res => {
							if(res.data.status==200){
								this.current=2;
								this.value = "签退";
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
				if(this.current==2){
					this.bz1 =false;
					this.bz2 =true;
					this.rect ="rect2";
					this.value = "签退";
					uni.request({
						url: 'http://localhost:8080/reservation/confirmOut',
						method: 'POST',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data: {
							id:this.id
						},
						success: res => {
							if(res.data.status==200){
								this.current=3;
							}
							this.value = "完成"
						},
						fail: () => {},
						complete: () => {}
					});
				}
				if(this.current==3){
					if(this.flag){
						uni.request({
							url: 'http://localhost:8080/reservation/queryCodeByPhone',
							method: 'POST',
							data: {
								name:this.keyword,
								pageSize: this.pageSize,
								pageNum: this.pageNum
							},
							success: res => {
								var page = res.data.data.page
								this.total = page.totalSize
								this.data2 = page.content
							},
							fail: () => {},
							complete: () => {}
						});
					}else{
						uni.request({
							url: 'http://localhost:8080/reservation/queryCodeByPhone',
							method: 'POST',
							data: {
								name:'',
								pageSize: this.pageSize,
								pageNum: this.pageNum
							},
							success: res => {
								var page = res.data.data.page
								this.total = page.totalSize
								this.data2 = page.content
							},
							fail: () => {},
							complete: () => {}
						});
					}
					this.show = false
					
				}
			},
			search() {
				uni.request({
					url: 'http://localhost:8080/reservation/queryCodeByPhone',
					method: 'POST',
					data: {
						name:this.keyword,
						pageSize: this.pageSize,
						pageNum: this.pageNum
					},
					success: res => {
						var page = res.data.data.page
						this.total = page.totalSize
						this.data2 = page.content
					},
					fail: () => {},
					complete: () => {}
				});
				if(this.keyword!=''){
					this.flag =true;
				}
			},
			onShow: function() {
				uni.request({
					url: 'http://localhost:8080/reservation/queryCodeByPhone',
					method: 'POST',
					data: {
						name:'',
						pageSize: this.pageSize,
						pageNum: this.pageNum
					},
					success: res => {
						var page = res.data.data.page
						this.total = page.totalSize
						this.data2 = page.content
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		margin-top: -200px;
		width: 300px;
		height: 200px;
		background-color: #fff;
	}

	.rect2 {
		width: 300px;
		height: 450px;
		background-color: #fff;
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
