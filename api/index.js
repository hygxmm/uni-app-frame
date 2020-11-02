export default {
	common: {
        appUpdate: "5f3de8d284639", // 软件更新
		upload: "5d5fa8984f0c2" // 上传图片
	},
	user: {
		get_address_list: "v1/5cadcdd909c17", //获取收货地址列表
		add_address: "v1/5cadb304426d8", //添加收货地址
		get_edit_address: "v1/5cadc769e4f16", //获取修改的收货地址
		edit_address: "v1/5cadcf462e1ad", //修改的收货地址
		change_default_address: "v1/5cadce9008a62", //修改默认地址
		del_address: "v1/5cadd0d3a0c93", //删除收货地址
		get_one_address: "v1/5cadc769e4f16", //获取单条收货地址列表
	}
}

/**
 * @description 批量导入文件
 * */
// const modulesFiles = require.context('./',true,/\.js$/);
// console.log('modulesFiles',modulesFiles);
// const modules = modulesFiles.keys().reduce((modules,modulePath) => {
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/,'$1');
//     const value = modulesFiles(modulePath);
//     modules[moduleName] = value.default;
//     return modules;
// },{});
// console.log('modules',modules);
// export default modules;
