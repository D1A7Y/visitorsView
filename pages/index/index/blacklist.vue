<template>
	<view>
		<u-subsection :list="list" :current="current" active-color="#fa3534" mode="subsection" @change="sectionChange">
		</u-subsection>
		<u-search placeholder="请输入姓名" v-model="keyword" :show-action="false" @search="search"></u-search>
		<view class="example">
			<v-table :columns="columnsCheckBox" :list="data2" selection="single" @on-selection-change="onSelectionChange"></v-table>
			<uni-pagination @change="handlePage" :total="total" :current="pageNum" :pageSize="pageSize"></uni-pagination>
		</view>
		<u-mask :show="show" mask-click-able=false>
			<view class="warp">
				<view class="rect">
					<view class="gpp-cf">
						<view class="gpp-cf-form">
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
								<u-button type="primary"  size="medium" :plain="true" @click="cancel">取消</u-button>
								<u-button type="error"  size="medium" :plain="true" @click="ok" style="margin-left: 40px;">{{value}}</u-button>
							</view>
						</view>
					</view>
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
				value:'黑名单',
				id:'',
				idcard:'',
				name:'',
				phone:'',
				show: false,
				total: '',
				pageNum: 1,
				pageSize: '10',
				list: [{
						name: '所有'
					},
					{
						name: '黑名单'
					}
				],
				current: 0,
				keyword: '',
				columnsCheckBox: [{
						title: 'ID',
						key: 'id'
					},
					{
						title: 'name',
						key: 'name'
					},
					{
						title: 'phone',
						key: 'phone',
						$width: "150px"
					}
				],
				data2:''
			}
		},
		methods: {
			sectionChange(index) {
				this.value='拉入';
				this.current = index
				if(this.current==0){
					uni.request({
						url: 'http://localhost:8080/user/getAll',
						method: 'POST',
						data: {
							name:"",
							pageSize:this.pageSize,
							pageNum:this.pageNum
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
				if(this.current==1){
					this.value='拉出';
					uni.request({
						url: 'http://localhost:8080/user/getByName',
						method: 'POST',
						data: {
							name:"",
							pageSize:this.pageSize,
							pageNum:this.pageNum
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
				
			},
			onSelectionChange(obj) {
				this.id = obj.new.item.id;
				this.phone = obj.new.item.phone;
				this.idcard = obj.new.item.idCard;
				this.name = obj.new.item.name;
				this.show = true;
			},
			cancel(){
				this.show = false
			},
			ok(){
				var flag=true;
				if(this.current==0){
					flag= true;
				}
				if(this.current==1){
					flag = false;
				}
				uni.request({
					url: 'http://localhost:8080/user/black',
					method: 'GET',
					data: {
						id:this.id,
						flag:flag
					},
					success: res => {
						if(res.data.status==200){
							if(flag){
								uni.request({
									url: 'http://localhost:8080/user/getAll',
									method: 'POST',
									data: {
										name:"",
										pageSize:this.pageSize,
										pageNum:this.pageNum
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
									url: 'http://localhost:8080/user/getByName',
									method: 'POST',
									data: {
										name:"",
										pageSize:this.pageSize,
										pageNum:this.pageNum
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
						}else{
							uni.showToast({
								title:'error'
							})
						}
						this.show =false;
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			search(){
				var flag = false;
				if(this.current==0){
					flag= true;
				}
				if(this.current==1){
					flag = false;
				}
				if(flag){
					uni.request({
						url: 'http://localhost:8080/user/getAll',
						method: 'POST',
						data: {
							name:this.keyword,
							pageSize:this.pageSize,
							pageNum:this.pageNum
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
						url: 'http://localhost:8080/user/getByName',
						method: 'POST',
						data: {
							name:this.keyword,
							pageSize:this.pageSize,
							pageNum:this.pageNum
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
			},
			onShow:function(){
				if(this.current==0){
					uni.request({
						url: 'http://localhost:8080/user/getAll',
						method: 'POST',
						data: {
							name:"",
							pageSize:this.pageSize,
							pageNum:this.pageNum
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
				if(this.current==1){
					uni.request({
						url: 'http://localhost:8080/user/getByName',
						method: 'POST',
						data: {
							name:"",
							pageSize:this.pageSize,
							pageNum:this.pageNum
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
		width: 300px;
		height: 400px;
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
