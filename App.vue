<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			// uni.redirectTo({
			// 	url:'pages/user/login/index'
			// })
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	@import "./static/flex.less";
</style>
<style lang="scss">
	.example .title{
		font-size:12px;
		line-height: 45px;
	}
	.no-bad-table-wrap {
		.rowClassName {
			.td {
				background: red;

				.td_wrap {
					background: red;
					color: #fff;
				}
			}
		}

		//自定义某一行样式
		.demo-table-info-row .td {
			background-color: #2db7f5;
			color: #fff;

			.td_wrap {
				background-color: #2db7f5;
				color: #fff;
			}
		}

		.demo-table-error-row .td {
			background-color: #ff6600;
			color: #fff;

			.td_wrap {
				background-color: #ff6600;
				color: #fff;
			}
		}

		.td.demo-table-info-column {
			background-color: #2db7f5;
			color: #fff;

			.td_wrap {
				background-color: #2db7f5;
				color: #fff;
			}
		}

	

		.table_box {
			.demo-table-info-cell-name {
				background-color: #2db7f5;
				color: #fff;
			
				.td_wrap {
					background-color: #2db7f5;
					color: #fff;
				}
			}
			.demo-table-info-cell-age {
				background-color: #ff6600;
				color: #fff;

				.td_wrap {
					background-color: #ff6600;
					color: #fff;
				}

			}

			.demo-table-info-cell-address {
				background-color: #187;
				color: #fff;

				.td_wrap {
					background-color: #187;
					color: #fff;
				}
			}
		}


		.btn-delete {
			background: red !important;
			color: #fff !important;
		}


		.example {
			.title {
				line-height: 40px;
				font-weight: bold;
			}
		}
	}
</style>

