// 格式化数字
export const outputdollars = numberStr => {
	if (numberStr.length <= 3) return numberStr === '' ? '0' : numberStr
	else {
		var mod = numberStr.length % 3
		var output = mod === 0 ? '' : numberStr.substring(0, mod)
		for (let i = 0; i < Math.floor(numberStr.length / 3); i++) {
			if (mod === 0 && i === 0) output += numberStr.substring(mod + 3 * i, mod + 3 * i + 3)
			else output += ',' + numberStr.substring(mod + 3 * i, mod + 3 * i + 3)
		}
		return output
	}
}
// 深拷贝(对象，数组，函数都可以)
const deepCopy = anything => {
	let type = Object.prototype.toString.call(anything)
	if (type === '[object Object]') {
		let newObj = {}
		for (let key in anything) {
			newObj[key] = deepCopy(anything[key])
		}
		return newObj
	}
	if (type === '[object Array]') {
		let newArr = []
		for (let i = 0, len = anything.length; i < len; i++) {
			newArr[i] = deepCopy(anything[i])
		}
		return newArr
	}
	if (type === '[object Function]') {
		let newFun = eval('(' + anything.toString() + ')')
		return newFun
	}
	return anything
}
