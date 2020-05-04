<template>
	<view>
		<view>
			<zy-grid :grid-list=gridList :show-tip="false" :col="3"></zy-grid>
		</view>
	</view>
</template>

<script>
	import zyGrid from '../../../components/zy-grid/zy-grid.vue'
	var loginRes;
	export default {
		components: {
			zyGrid
		},
		data() {
			return {
				gridList: [
					// 	{
					// 	name: '预约',
					// 	imgUrl: '../../static/zy-grid/grid-01.svg',
					// 	tips: 19,
					// 	url: 'reservation'
					// },
				],
				gridList2: [{
						id: 0,
						name: '预约',
						imgUrl: '../../static/icon/icon3.png',
						tips: 19,
						url: 'reservation'
					},
					{	id: 1,
						name: '修改预约',
						imgUrl: '../../static/icon/icon2.png',
						tips: 19,
						url: 'reservation'
					}, {
						id: 2,
						name: '预约信息',
						imgUrl: '../../static/icon/icon1.png',
						tips: 19,
						url: 'reservation'
					}
				]

			}
		},
		methods: {

		},
		onShow: function() {
			var gridList2 = this.gridList2;
			loginRes = this.checkLogin();
			if (!loginRes) {
				uni.redirectTo({
					url: '../../user/login/index'
				})
			} else {
				if (loginRes[3] == 0) {
					//超级管理员

				}
				if (loginRes[3] == 1) {
					//普通用户
					this.gridList = [gridList2[0], gridList2[1],gridList2[2]]
				}
				if (loginRes[3] == 2) {
					//公司员工
				}
				if (loginRes[3] == 3) {
					//门卫
				}
			}
		}
	}
</script>

<style>

</style>
