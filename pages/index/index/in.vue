<template>
	<view>
		<u-subsection :list="list" :current="1">
		</u-subsection>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '待发货'
					}, 
					{
						name: '待付款'
					}, 
					{
						name: '待评价'
					}
				],
				current: 1
			}
		}
	}
</script>

<style>

</style>
