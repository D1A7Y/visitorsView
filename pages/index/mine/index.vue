<template>
	<view>
		<button @click="loginout">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			loginout: function() {
				uni.removeStorageSync("UPHONE");
				uni.removeStorageSync("UID");
				uni.removeStorageSync("UNAME");
				uni.removeStorageSync("UROLE");
				uni.redirectTo({
					url: '../../user/login/index'
				});
			}
		}
	}
</script>

<style>

</style>
