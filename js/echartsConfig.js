//饼状图配置
var pieEchart = echarts.init(document.getElementById('pieEchart'));
var legendFontStyle = {
	fontSize: 10
};
var pieOption = {
	tooltip: {
		trigger: 'item',
		formatter: '{b} - {d}%',
		padding: 3,
		textStyle: {
			fontSize: 12
		}
	},
	legend: {
		orient: 'vertical',
		padding: [
			20, // 上
			10, // 右
			10, // 下
			10, // 左
		],
		align: 'left',
		itemGap: 16,
		itemWidth: 12,
		itemHeight: 12,
		right: 110,
		data: [{
			name: 'Html',
			icon: 'rect',
			textStyle: legendFontStyle
		}, {
			name: 'CSS',
			icon: 'rect',
			textStyle: legendFontStyle
		}, {
			name: 'JavaScript',
			icon: 'rect',
			textStyle: legendFontStyle
		}, {
			name: 'jQuery',
			icon: 'rect',
			textStyle: legendFontStyle
		}, {
			name: 'Ajax',
			icon: 'rect',
			textStyle: legendFontStyle
		}, {
			name: 'Html5',
			icon: 'rect',
			textStyle: legendFontStyle
		}, {
			name: 'Echart3',
			icon: 'rect',
			textStyle: legendFontStyle
		}, {
			name: 'BdMapAPI',
			icon: 'rect',
			textStyle: legendFontStyle
		}]
	},
	series: [{
		name: '访问来源',
		type: 'pie',
		center: ['20%', '50%'],
		radius: ['45%', '85%'],
		//是否启用防止标签重叠策略，默认开启，在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠。
		avoidLabelOverlap: false,
		//是否开启 hover 在扇区上的放大动画效果。
		hoverAnimation: false,
		label: {
			normal: {
				show: false,
				position: 'center'
			},
			emphasis: {
				show: true,
				textStyle: {
					fontSize: '13',
					fontWeight: 'bold'
				}
			}
		},
		labelLine: {
			normal: {
				show: false
			}
		},
		itemStyle: {
			normal: {
				borderColor: '#fff',
				borderWidth: 1
			}
		},
		data: [{
			value: Math.round(Math.random() * 100),
			name: 'Html'
		}, {
			value: Math.round(Math.random() * 100),
			name: 'CSS'
		}, {
			value: Math.round(Math.random() * 100),
			name: 'JavaScript'
		}, {
			value: Math.round(Math.random() * 100),
			name: 'jQuery'
		}, {
			value: Math.round(Math.random() * 100),
			name: 'Ajax'
		}, {
			value: Math.round(Math.random() * 100),
			name: 'Html5'
		}, {
			value: Math.round(Math.random() * 100),
			name: 'Echart3'
		}, {
			value: Math.round(Math.random() * 100),
			name: 'BdMapAPI'
		}, ]
	}]
};
pieEchart.setOption(pieOption);
//加载数据
var timeTicketS = setInterval(function() {
	pieOption = {
		series: [{
			data: [{
				value: Math.round(Math.random() * 100),
				name: 'Html'
			}, {
				value: Math.round(Math.random() * 100),
				name: 'CSS'
			}, {
				value: Math.round(Math.random() * 100),
				name: 'JavaScript'
			}, {
				value: Math.round(Math.random() * 100),
				name: 'jQuery'
			}, {
				value: Math.round(Math.random() * 100),
				name: 'Ajax'
			}, {
				value: Math.round(Math.random() * 100),
				name: 'Html5'
			}, {
				value: Math.round(Math.random() * 100),
				name: 'Echart3'
			}, {
				value: Math.round(Math.random() * 100),
				name: 'BdMapAPI'
			}, ]
		}]
	};
	pieEchart.setOption(pieOption);
}, 5000);

//柱状图配置
//存放时间的一个数组
var dateArr = [];
var time = +new Date();
var year;
var month;
for (var i = 0; i < 28; i++) {
	time -= 60 * 1000 * 60 * 24;
	var date = new Date(time);
	year = date.getFullYear();
	month = date.getMonth();
	day = date.getDate();
	if (month < 10) {
		month = '0' + (month + 1);
	}
	if (day < 10) {
		day = '0' + day;
	}
	dateArr.push(year + '-' + month + '-' + day);
}
dateArr.reverse(dateArr);
var barEchart = echarts.init(document.getElementById('barEchart'));
var seriesData = [
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
	Math.round(Math.random() * 150),
];
var barOption = {
	toolbox: {
		feature: {
			dataView: {
				show: true,
				readOnly: false
			},
			magicType: {
				show: true,
				type: ['line', 'bar']
			},
			restore: {
				show: true
			},
			saveAsImage: {
				show: true
			}
		}
	},
	tooltip: {
		trigger: 'axis',
		//坐标轴指示器配置项
		axisPointer: {
			type: 'shadow'
		},
		padding: 3,
		textStyle: {
			fontSize: 12
		}
	},
	//网格
	grid: {
		x: '35px',
		y: '40px',
		x2: '15px',
		y2: '15px',
	},
	xAxis: {
		type: 'category',
		data: [
			'2016-12-14',
			'2016-12-15',
			'2016-12-16',
			'2016-12-17',
			'2016-12-18',
			'2016-12-19',
			'2016-12-20',
			'2016-12-21',
			'2016-12-22',
			'2016-12-23',
			'2016-12-24',
			'2016-12-25',
			'2016-12-26',
			'2016-12-27',
			'2016-12-28',
			'2016-12-29',
			'2016-12-30',
			'2016-12-31',
			'2017-01-01',
			'2017-01-02',
			'2017-01-03',
			'2017-01-04',
			'2017-01-05',
			'2017-01-06',
			'2017-01-07',
			'2017-01-08',
			'2017-01-09',
			'2017-01-10'
		],
		axisLabel: {
			show: false,
			//0表示全部显示
			//interval :0,
		},
		//刻度
		axisTick: {
			show: false
		},
		//分割线
		splitLine: {
			show: false
		},
		//坐标轴线
		axisLine: {
			show: false
		}
	},
	yAxis: [{
		type: 'value',
		//设置坐标轴刻度的最大最小值
		min: 0,
		max: 150,
		//强制设置坐标轴分割间隔。
		interval: 50,
		axisLabel: {
			//刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
			formatter: '{value}'
		},
		//刻度
		axisTick: {
			show: false
		},
		//坐标轴线
		axisLine: {
			lineStyle: {
				color: '#999'
			}
		}
	}, ],
	series: [{
		name: '声望',
		//默认值是bar，修改为line，初始状态为折线图
		type: 'line',
		barWidth: 10,
		itemStyle: {
			normal: {
				color: '#5CB85C'
			}
		},
		data: seriesData
	}]
};
barEchart.setOption(barOption);
//加载数据
var timeTicketT = setInterval(function() {
	barOption = {
		xAxis: {
			data: dateArr
		},
		series: [{
			data: [
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
				Math.round(Math.random() * 150),
			]
		}]
	};
	barEchart.setOption(barOption);
}, 5000);