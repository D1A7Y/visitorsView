<template>
	<view class="example">
		<view class="gpp-cf">
			<view class="gpp-cf-form">
				<view class="gpp-cf-title">
					<text class="titleBeforeOpen" style="background: #DD524D;"></text>已取消预约</view>
			</view>
		</view>
		<v-table :columns="columnsOperate" :list="dataOperate" @edi="ediFn"></v-table>
		<uni-pagination @change="handlePage" :total="total" :current="pageNum" :pageSize="pageSize"></uni-pagination>
	</view>
</template>

<script>
	import vTable from "@/components/table/table.vue";
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
	const operateCol = {
		operate: {
			edi: {
				label: "查看",
				fn(row, index) {
					//this.alertFnCallback(row,index);
				}
			}
		}
	}
	export default {
		components: {
			vTable,
			uniPagination
		},
		data() {
			return {
				total: '',
				pageNum: 1,
				pageSize: '10',
				phone: '',
				columnsOperate: [{
						title: 'ID',
						key: 'id',
						$width: "40px"
					},
					{
						title: '预约公司',
						key: 'companyId'
					},
					{
						title: '预约时间',
						key: 'reservationTime',
						$width: "150px"
					},
					{
						title: "操作",
						key: "$operate",
						$operateList: [{
								label: "查看",
								event: "edi",
								id: "edi"
							}],
						$width: "70px"
					}
				],
				//自定义操作列
				dataOperate: ''
				
			}
		},
		methods: {
			handlePage(e) {
				this.pageNum = e.current
				uni.request({
					url: 'http://localhost:8080/reservation/queryAllT',
					method: 'GET',
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						phone: this.phone
					},
					success: res => {
						var page = res.data.data.page
						this.total = page.totalSize
						this.dataOperate = page.content
					},
					fail: () => {},
					complete: () => {}
				});
			},
			ediFn(data) {
				uni.navigateTo({
					url: 'cancelR?id=' + data.row.id
				})
			},
			onShow() {
				this.phone = uni.getStorageSync("UPHONE");
				uni.request({
					url: 'http://localhost:8080/reservation/queryAllT',
					method: 'GET',
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						phone: this.phone
					},
					success: res => {
						var page = res.data.data.page
						this.total = page.totalSize
						this.dataOperate = page.content
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style lang="scss">
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
			}
		}
	}
</style>
