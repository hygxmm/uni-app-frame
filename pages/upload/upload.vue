<template>
	<view>
		<ben-upload col="4" :max="4" @change="chooseImages"></ben-upload>
	</view>
</template>

<script>
	import benUpload from '@/components/ben-upload/ben-upload';
	export default {
		components: {
			benUpload,
		},
		data() {
			return {
				
			};
		},
		methods: {
			chooseImages(){
				
			}
		}
	}
</script>

<style lang="scss">

</style>
