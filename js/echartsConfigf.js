//首页南丁格尔玫瑰图
var pieMEchart = echarts.init(document.getElementById('pieMEchart'));
var pieMOption = {
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series : [
    {
      name:'访问来源',
      type:'pie',
      radius : [20, 75],
      center : ['50%', '50%'],
      roseType : 'area',
      data:[
        {value:10, name:'AngularJS'},
        {value:5, name:'Js'},
        {value:15, name:'Python'},
        {value:20, name:'Vue'},
        {value:35, name:'Nodejs'},
        {value:30, name:'Java'},
        {value:40, name:'Echarts'}
      ]
    }
  ]
};
pieMEchart.setOption(pieMOption);
//加载数据
var timeTicketF = setInterval(function () {
	pieMOption = {
		series:[
			{
				data:[
        	{value:Math.round(Math.random()*100),name:'AngularJS'},
        	{value:Math.round(Math.random()*100),name:'Js'},
        	{value:Math.round(Math.random()*100),name:'Vue'},
        	{value:Math.round(Math.random()*100),name:'python'},
        	{value:Math.round(Math.random()*100),name:'Nodejs'},
        	{value:Math.round(Math.random()*100),name:'Java'},
        	{value:Math.round(Math.random()*100),name:'Echarts'},
        ]
			}
		]
	};
	pieMEchart.setOption(pieMOption);
},4000);