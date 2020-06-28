import Vue from 'vue';

/**
 * 全局过滤器
 * 
 * */
function formatNumber(n){
	n = n.toString();
	return n[1] ? n : '0' + n;
}
 
Vue.filter('filterTime',function(value,format = 'Y/M/D h:m:s'){
	const formatArr = ['Y','M','D','h','m','s'];
	let returnArr = [];
	const date = new Date(value*1000);
	
	
})