export const weeks = ['一', '二', '三', '四', '五', '六', '日'];
const getWeekDayFn = (dateString) => {
	let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/;
	if (dateString.match(dateStringReg)) {
		let presentDate = new Date(dateString),
			today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
		return Array.from(new Array(7), function(val, index) {
			return formatDate(new Date(presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 *
				1000));
		});
	} else {
		throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"');
	}

	function formatDate(date) {
		let day = date.getDate();
		let mon = date.getMonth() + 1;
		let _d = day < 10 ? '0' + day : day;
		let _m = mon < 10 ? '0' + mon : mon;
		let everyDay = date.getFullYear() + '-' + _m + '-' + _d;
		let dayString = date.getFullYear() + '' + _m + '' + _d;

		let weekM = date.getDay();
		let isToDay = isDay(everyDay);
		return {
			time: everyDay,
			day: _d,
			isToDay,
			week: weeks[weekM ? weekM - 1 : 6],
			active: isToDay ? true : false,
			month: mon,
			dayString
		};
	}

	function isDay(date) {
		let now = new Date();
		let day = now.getDate();
		let mon = now.getMonth() + 1;
		let _d = day < 10 ? '0' + day : day;
		let _m = mon < 10 ? '0' + mon : mon;
		let everyDay = now.getFullYear() + '-' + _m + '-' + _d;
		return everyDay == date;
	}
}

export const getWeekDay = (date) => {
	let dayData = getWeekDayFn(date);
	return dayData;
}

export const currentWeek = () => {
	var date = new Date();
	// 本周一的日期
	date.setDate(date.getDate() - date.getDay() + 1);
	var start = date.getFullYear() + "" + _add(date.getMonth() + 1) + "" + _add(date.getDate());

	// 本周日的日期
	date.setDate(date.getDate() + 6);
	var end = date.getFullYear() + "" + _add(date.getMonth() + 1) + "" + _add(date.getDate());

	return {
		start,
		end
	}
}

function _add(date) {
	return date < 10 ? '0' + date : date;
}

export const formartParamsDate = (date) => {
	let $year = date.substring(0, 4);
	let $month = date.substring(4, 6);
	let $day = date.substring(6);

	return `${$year}/${$month}/${$day}`;

};


export const getFirstAndSunDay = (date) => {
	var nowTime = date.getTime();
	var day = date.getDay() || 7;
	var oneDayTime = 24 * 60 * 60 * 1000;
	//显示周一
	var MondayTime = nowTime - (day - 1) * oneDayTime;
	//显示周日
	var SundayTime = nowTime + (7 - day) * oneDayTime;
	//初始化日期时间
	var dayjsOne = new Date(MondayTime);
	var dayjsSeven = new Date(SundayTime);
	return {
		start: dayjsOne.getFullYear() + '' + fCurrent(dayjsOne.getMonth() + 1) + '' + fCurrent(dayjsOne.getDate()),
		end: dayjsSeven.getFullYear() + '' + fCurrent(dayjsSeven.getMonth() + 1) + '' + fCurrent(dayjsSeven
			.getDate())
	}
}

function getFirstOfWeek(date) {
	var day = date.getDay() || 7;
	return new Date(date.getFullYear(), fCurrent(date.getMonth() + 1), fCurrent(date.getDate() + 1 - day))
}

function fCurrent(date) {
	return date < 10 ? '0' + date : date;
}
