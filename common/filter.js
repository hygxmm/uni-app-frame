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
	returnArr.push(date.getFullYear());
	returnArr.push(formatNumber(date.getMonth() + 1));
	returnArr.push(formatNumber(date.getDate()));
	returnArr.push(formatNumber(date.getHours()));
	returnArr.push(formatNumber(date.getMinutes()));
	returnArr.push(formatNumber(date.getSeconds()));
	for(let i in returnArr){
		format = format.replace(formateArr[i],returnArr[i]);
	}
	return format;
})