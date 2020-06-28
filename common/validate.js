module.exports = {
	error: '',
	check(data,rule){
		for(let i=0,l=rule.length;i<l;i++){
			if(!rule[i].checkType) return true;
			if(!rule[i].name) return true;
			if(!rule[i].errorMsg) return true;
			switch(rule[i].checkType){
				case 'string':
					if(!this.isString(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'email':
					if(!this.isEmail(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'mobile':
					if(!this.isMobile(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'password':
					if(!this.isMobile(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'card':
					if(!this.isMobile(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'code':
					if(!this.isMobile(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
			}
		}
		this.error = '';
		return true;
	},
	// 验证邮箱格式
	isEmail(s){
		return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
	},
	// 验证手机号码
	isMobile(s){
		return /^1[0-9]{10}$/.test(s);
	},
	// 验证电话号码
	isPhone(s){
	    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
	},
	// 验证是否url地址
	isURL(s){
	    return /^http[s]?:\/\/.*/.test(s);
	},
	// 验证是否字符串
	isString(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'String';
	},
	// 验证是否数字
	isNumber(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Number';
	},
	// 验证是否boolean
	isBoolean(o){
		return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean';
	},
	// 验证是否函数
	isFunction(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Function';
	},
	// 验证是否null
	isNull(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Null';
	},
}