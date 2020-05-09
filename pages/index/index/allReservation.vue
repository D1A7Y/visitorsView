<template>
	<view>
		<custom-cel-width/>
		<uni-pagination @change="handlePage" title="标题文字" :total="total" :current="pageNum" :pageSize="pageSize" ></uni-pagination>
	</view>
</template>

<script>
	import vTable from "@/components/table/table.vue";
	import customCelWidth from "@/components/table/example/customCelWidth.vue";
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
	export default {
		components: {
			vTable,
			customCelWidth,
			uniPagination
		}
		,data() {
			return {
				total:"30",
				pageNum:1,
				pageSize:'5',
				phone:''
			}
		},
		methods: {
			handlePage(e){
				this.pageNum=e.current
				console.log(e)
				console.log(this.pageNum)
			}
		}
	}
</script>

<style>

</style>
