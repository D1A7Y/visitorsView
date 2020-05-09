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
						url: 'updateReservation'
					},
					{
						id: 2,
						name: '已取消预约',
						imgUrl: '../../static/icon/icon1.png',
						tips: 19,
						url: 'cancelReservation'
					},
					{
						id: 3,
						name: '预约成功信息',
						imgUrl: '../../static/icon/icon4.png',
						tips: 19,
						url: 'successReservation'
					},
					{
						id: 4,
						name: '预约确认',
						imgUrl: '../../static/icon/icon8.png',
						tips: 19,
						url: 'confirmReservation'
					},
					{
						id: 5,
						name: '待完成预约',
						imgUrl: '../../static/icon/icon6.png',
						tips: 19,
						url: 'beReservationCode'
					},
					{
						id: 6,
						name: '已完成预约',
						imgUrl: '../../static/icon/icon7.png',
						tips: 19,
						url: 'doneReservationCode'
					},
					{
						id: 7,
						name: '黑名单',
						imgUrl: '../../static/icon/icon5.png',
						tips: 19,
						url: 'blacklist'
					},
					{
						id: 8,
						name: '被驳回预约',
						imgUrl: '../../static/icon/icon.png',
						tips: 19,
						url: 'failReservation'
					},
					{
						id: 9,
						name: '搜索',
						imgUrl: '../../static/icon/icon9.png',
						tips: 19,
						url: 'in'
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
					this.gridList=[]
				}
				if (loginRes[3] == 1) {
					//普通用户
					this.gridList = [gridList2[0], gridList2[1],gridList2[2],gridList2[3],gridList2[8]]
				}
				if (loginRes[3] == 2) {
					//公司员工
					this.gridList=[gridList2[4],gridList2[5],gridList2[6],gridList2[7]]
				}
				if (loginRes[3] == 3) {
					//门卫
					this.gridList=[gridList2[9]]
				}
			}
		}
	}
</script>

<style>

</style>
