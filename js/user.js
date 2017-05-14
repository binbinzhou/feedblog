var username = localStorage.getItem("$user");
var password = localStorage.getItem("$pwd");
var $randomNum = Math.round(Math.random() * 1000);
var $imgSrc = 'http://images.nowcoder.com/head/' + $randomNum + 't.png';
$('.to-index').on('click', function() {
	window.location.href = 'index.html';
});

function showAttenFans() {
	User.findSomePerson('UserPwdF', username, function(event) {
		var personLen = event.target.result.attentionsDataInfo.length;
		var fansLen = event.target.result.fansDataInfo.length;
		$('.fun-head').find('.attention').text(personLen + '人');
		$('.fun-head').find('.fans').text(fansLen + '人');
	});
}
//左侧栏中菜单中的各个页面中的a标签打开模态框配置函数开始
function showATitleCon(conClass) {
	//关闭模态框
	$('.js-close-Modal').off('click').on("click", function() {
		$('#modal-show-con').modal("hide");
	});
	//点击a标签弹出模态框显示当前点击的文章内容	
	$(conClass).off('click').on('click', 'li a', function() {
		$('#modal-show-con .dialog-con').text($(this).attr('title'));
		$('#modal-show-con .modal-title').text($(this).text());
		$("#modal-show-con").modal("show");
	});
}
//左侧栏中菜单中的各个页面中的a标签打开模态框配置函数结束

//我的主页中面板中的各种数据中的a标签打开模态框展示数据信息开始
function showPTitleCon(conId) {
	//关闭模态框
	$('.js-close-Modal').off('click').on("click", function() {
		$('#modal-show-con').modal("hide");
	});
	//点击a标签弹出模态框显示当前点击的文章内容	
	$(conId).find('.con-write-wrap').off('click').on('click', 'a', function() {
		$('#modal-show-con .dialog-con').text($(this).text());
		$('#modal-show-con .modal-title').text($(this).attr('title'));
		$("#modal-show-con").modal("show");
	});
}
//我的主页中面板中的各种数据中的a标签打开模态框展示数据信息结束

//展示我的主页页面开始
function showUserData() {
	User.findSomePerson('UserPwdF', username, function(event) {
		// console.log(event.target.result);
		$('.p-name').text(username);
		//第一次进入页面的时候，图片的路径还未存储在数据库中，因为只有当用户点击编辑按钮的时候用户头像的路径的属性等一系列属性才会生成；	
		var $src = event.target.result.perDataInfo.imgsrc;
		if ($src) {
			$('.headscu img').attr('src', $src);
			//先获取大图像的路径，然后用split通过.切割成数组，在点前面加上-01，再拼接在一起，
			//就是小图的路径，
			var $srcArr = $src.split('.');
			var $endSrc = $srcArr[0] + '-01.' + $srcArr[1];
			$('.user-pic').css('background', 'url(' + $endSrc + ') no-repeat center');
		} else {
			$('.headscu img').attr('src', $imgSrc);
			$('.user-pic').css('background', 'url(' + $imgSrc + ') no-repeat center');
		}
		$('.profile-content p').text(event.target.result.saying);
		$('.s-address').text(event.target.result.perDataInfo.address);
		$('.s-school').text(event.target.result.perDataInfo.school);
		$('.s-company').text(event.target.result.perDataInfo.company);
		$('.s-website').text(event.target.result.perDataInfo.website);

		//渲染数据
		User.findSomePerson('UserPwdF', username, function(event) {
			var $articles = event.target.result.articleDataInfo;
			var $notes = event.target.result.noteDataInfo;
			var $hottopics = event.target.result.hottopicDataInfo;
			var $allcontent = $articles.concat($notes).concat($hottopics);
			//概述数据
			if ($allcontent) {
				var $addcontentLis = '';
				$allcontent.forEach(function(item, index) {
					$addcontentLis = '<li>' +
						'<div class="padd-r0 pull-left">' +
						'<span class="con-type label">' + item.type + '</span>' +
						'</div>' +
						'<div class="pl10 con-write-wrap">' +
						'<a class="con-write" href="javascript:void(0);" title="' + item.title + '">' + item.con + '</a>' +
						'</div>' +
						'</li>';
					$('#navContent ul').append($addcontentLis);
				});
				//根据不同类型展示对应的label颜色
				$('.con-type').each(function(index, item) {
					var $labelTxt = $(item).text();
					switch ($labelTxt) {
						case '文章':
							$(item).addClass('label-warning');
							break;
						case '笔记':
							$(item).addClass('label-primary');
							break;
						case '头条':
							$(item).addClass('label-success');
							break;
					}
				});
				//调用打开模态框并且显示标题和内容的模态框，关闭模态框函数
				showPTitleCon('#navContent');
			}

			//文章数据			
			if ($articles) {
				var $addArticleLis = '';
				$articles.forEach(function(item, index) {
					$addArticleLis = '<li>' +
						'<div class="padd-r0 pull-left">' +
						'<span class="con-type label label-warning">文章</span>' +
						'</div>' +
						'<div class="pl10 con-write-wrap">' +
						'<a class="con-write" href="javascript:void(0);" title="' + item.title + '">' + item.con + '</a>' +
						'</div>' +
						'</li>';
					$('#navArticle ul').append($addArticleLis);
				});
				//调用打开模态框并且显示标题和内容的模态框，关闭模态框函数
				showPTitleCon('#navArticle');
			}

			//笔记数据
			if ($notes) {
				var $addNoteLis = '';
				$notes.forEach(function(item, index) {
					$addNoteLis = '<li>' +
						'<div class="padd-r0 pull-left">' +
						'<span class="con-type label label-primary">笔记</span>' +
						'</div>' +
						'<div class="pl10 con-write-wrap">' +
						'<a class="con-write" href="javascript:void(0);" title="' + item.title + '">' + item.con + '</a>' +
						'</div>' +
						'</li>';
					$('#navNote ul').append($addNoteLis);
				});
				//调用打开模态框并且显示标题和内容的模态框，关闭模态框函数
				showPTitleCon('#navNote');
			}

			//头条数据
			if ($hottopics) {
				var $addHottopicsLis = '';
				$hottopics.forEach(function(item, index) {
					$addHottopicsLis = '<li>' +
						'<div class="padd-r0 pull-left">' +
						'<span class="con-type label label-success">头条</span>' +
						'</div>' +
						'<div class="pl10 con-write-wrap">' +
						'<a class="con-write" href="javascript:void(0);" title="' + item.title + '">' + item.con + '</a>' +
						'</div>' +
						'</li>';
					$('#navHottopic ul').append($addHottopicsLis);
				});
				//调用打开模态框并且显示标题和内容的模态框，关闭模态框函数
				showPTitleCon('#navHottopic');
			}

		});
	});

	//异步加载echarts.js文件，减少加载时间。
	function loadScript(src) {
		var $script = $('<script class="echarts"></script>');
		$script.attr('src', src);
		$('body').append($script);
	}
	loadScript('js/echartsConfig.js');
}
//展示我的主页页面结束

//展示我的资料页面函数开始
function showAboutData() {
	function showPerData() {
		User.findSomePerson('UserPwdF', username, function(event) {
			$('.p-name').text(username);
			$('.s-address').text(event.target.result.perDataInfo.address);
			$('.s-school').text(event.target.result.perDataInfo.school);
			$('.s-company').text(event.target.result.perDataInfo.company);
			$('.s-website').text(event.target.result.perDataInfo.website);

			var $src = event.target.result.perDataInfo.imgsrc;
			if ($src) {
				$('.headscu img').attr('src', $src);
				$('.touxiang').attr('src', $src);
				var $srcArr = $src.split('.');
				var $endSrc = $srcArr[0] + '-01.' + $srcArr[1];
				$('.user-pic').css('background', 'url(' + $endSrc + ') no-repeat center');
			} else {
				$('.touxiang').attr('src', $imgSrc);
			}
			$('.i-name').text(event.target.result.perDataInfo.realName);
			$('.i-gender').text(event.target.result.perDataInfo.gender);
			$('.i-birthday').text(event.target.result.perDataInfo.birthday);
			$('.i-website').text(event.target.result.perDataInfo.website);
			$('.i-telephone').text(event.target.result.perDataInfo.telephone);
			$('.i-email').text(event.target.result.perDataInfo.email);
			$('.i-staycity').text(event.target.result.perDataInfo.nowStayCity);
			$('.i-school').text(event.target.result.perDataInfo.school);
			$('.i-address').text(event.target.result.perDataInfo.address);
			$('.i-company').text(event.target.result.perDataInfo.company);
			$('.i-introduction').text(event.target.result.perDataInfo.introduction);


			$('.profile-content p').text(event.target.result.saying);
		});
	}
	showPerData();

	var dsrc;
	//上传头像预览
	if (typeof FileReader == 'undefined') {
		$('.ml160 p').text("<h1>当前浏览器不支持FileReader接口</h1>");
		//使选择控件不可操作
		$('.upload-btn').attr("disabled", "disabled");
	}
	//选择图片，马上预览
	function UploadImg(obj) {
		var file = obj.files[0];
		console.log(obj);
		console.log(file);
		console.log("file.size = " + file.size); //file.size 单位为byte
		var reader = new FileReader();
		//读取文件过程方法
		reader.onloadstart = function(e) {
			console.log("开始读取....");
		};
		reader.onprogress = function(e) {
			console.log("正在读取中....");
		};
		reader.onabort = function(e) {
			console.log("中断读取....");
		};
		reader.onerror = function(e) {
			console.log("读取异常....");
		};
		reader.onload = function(e) {
			console.log("成功读取....");
			var $img = $("#userTX");
			//$img.attr('src',e.target.result);
			$img.attr('src', 'img/' + file.name);
			dsrc = 'img/' + file.name;
			//或者 this.result;   
		};
		reader.readAsDataURL(file);
	}
	// $('#upload-avatar').on('click',function(){
	//    $('#fileUpload').trigger('click');
	//  });
	$('#fileUpload').on('change', function() {
		UploadImg(this);
	});

	//编辑按钮--中间个人资料展示与个人资料修改切换
	$('.self-info .edit').off('click').on('click', function() {
		
		//input聚焦未输入消失
		$('input').on('focus',function(){
			if($(this).val() === '未输入'){
				$(this).val('');
			}
		});
		//获取到页面上的值赋给表单
		$('#userTX').attr('src', $('.headscu img').attr('src'));
		$('input[name=name]').val($('.i-name').text());
		//性别
		var gstr = $('.i-gender').text();
		if (gstr === '男') {
			$('input[value=male]').prop('checked', true);
		} else {
			$('input[value=female]').prop('checked', true);
		}
		$('input[name=birthday]').val($('.i-birthday').text());
		$('input[name=website]').val($('.i-website').text());
		$('input[name=telephone]').val($('.i-telephone').text());
		$('input[name=email]').val($('.i-email').text());
		$('input[name=staycity]').val($('.i-staycity').text());
		$('input[name=school]').val($('.i-school').text());
		$('input[name=address]').val($('.i-address').text());
		$('input[name=company]').val($('.i-company').text());
		$('textarea[name=introduction]').val($('.i-introduction').text());

		$('.personal-info').hide().siblings().show();
		$('.self-info .editor').hide();
	});
	//取消按钮
	$('.personal-info-edit .js-cancel').off('click').on('click', function() {
		$('.personal-info-edit').hide().siblings().show();
		$('.self-info .editor').show();
	});
	//保存按钮
	$('.personal-info-edit .js-submit').off('click').on('click', function() {
		var dname = $('input[name=name]').val();
		//性别
		var dgender;
		if ($(('input[name=gender]:checked')).val() === 'female') {
			dgender = '女';
		} else if ($(('input[name=gender]:checked')).val() === 'male') {
			dgender = '男';
		}
		var dbirthday = $('input[name=birthday]').val();
		var dwebsite = $('input[name=website]').val();
		var dtelephone = $('input[name=telephone]').val();
		var demail = $('input[name=email]').val();
		var dstaycity = $('input[name=staycity]').val();
		var dschool = $('input[name=school]').val();
		var daddress = $('input[name=address]').val();
		var dcompany = $('input[name=company]').val();
		var dintroduction = $('textarea[name=introduction]').val();

		var perDataInfo = {
			imgsrc: dsrc,
			realName: dname,
			telephone: dtelephone,
			gender: dgender,
			birthday: dbirthday,
			email: demail,
			address: daddress,
			nowStayCity: dstaycity,
			school: dschool,
			company: dcompany,
			website: dwebsite,
			introduction: dintroduction
		};

		//通过用户名找到对应的一条记录，添加个人资料属性信息
		User.updatePerson('UserPwdF', username, function(objectStore, event) {
			event.target.result.perDataInfo = perDataInfo;
			objectStore.put(event.target.result);
		});
		showPerData();

		$('.personal-info-edit').hide().siblings().show();
		$('.self-info .editor').show();
	});

	//展示工作资料部分的函数
	function showWorkData() {
		User.findSomePerson('UserPwdF', username, function(event) {
			$('.i-experience').text(event.target.result.workDataInfo.experience);
			$('.i-job').text(event.target.result.workDataInfo.wantJob);
			$('.i-salary').text(event.target.result.workDataInfo.wantSalary);
			$('.i-wantcity').text(event.target.result.workDataInfo.wantCity);
		});
	}
	//进去页面默认从数据库获取数据展示到页面上
	showWorkData();

	//编辑按钮--右边工作资料展示与工作资料修改切换
	$('.want-job .edit').off('click').on('click', function() {
		//将展示的工作的信息数据赋给表单中
		$('select[name=experience]').val($('.i-experience').text());
		$('input[name=wantJob]').val($('.i-job').text());
		$('input[name=wantSalary]').val($('.i-salary').text());
		$('input[name=wantCity]').val($('.i-wantcity').text());

		$('.want-job').children().eq(0).hide().siblings().show();
		$('.want-job .editor').hide();
	});
	//取消按钮
	$('.personal-work-edit .js-cancel').off('click').on('click', function() {
		$('.personal-work-edit').hide().siblings().show();
		$('.want-job .editor').show();
	});
	//保存按钮
	$('.personal-work-edit .js-submit').off('click').on('click', function() {
		var dexperience = $('select[name=experience]').val();
		var dwantJob = $('input[name=wantJob]').val();
		var dwantSalary = $('input[name=wantSalary]').val();
		var dwantCity = $('input[name=wantCity]').val();
		var workDataInfo = {
			experience: dexperience,
			wantJob: dwantJob,
			wantSalary: dwantSalary,
			wantCity: dwantCity
		};
		//通过用户名找到对应的一条记录，添加工作资料属性信息
		User.updatePerson('UserPwdF', username, function(objectStore, event) {
			event.target.result.workDataInfo = workDataInfo;
			objectStore.put(event.target.result);
		});
		//修改成功之后调用展示工作信息数据函数，将页面上的资料渲染一遍
		showWorkData();
		$('.personal-work-edit').hide().siblings().show();
		$('.want-job .editor').show();
	});

	//设置密保问题函数//展示工作资料部分的函数
	function showProtectData() {
		User.findSomePerson('UserPwdF', username, function(event) {
			if(event.target.result.protectpwdDataInfo){
				$('.i-question1').text(event.target.result.protectpwdDataInfo.question1);
				$('.i-answer1').attr('data-answ',event.target.result.protectpwdDataInfo.answer1);
				$('.i-question2').text(event.target.result.protectpwdDataInfo.question2);
				$('.i-answer2').attr('data-answ',event.target.result.protectpwdDataInfo.answer2);
			}
		});
	}
	//进去页面默认从数据库获取数据展示到页面上
	showProtectData();
	//编辑按钮--密保资料展示与密保资料修改切换
	$('.protect-password .edit').off('click').on('click', function() {
		User.findSomePerson('UserPwdF', username, function(event) {
			var $sqlpwd = event.target.result.password;
			var $pwdensure = prompt("请输入密码");
			if($pwdensure === $sqlpwd){
				//将展示的密保的信息数据赋给表单中
				$('input[name=question1]').val($('.i-question1').text());
				$('input[name=answer1]').val($('.i-answer1').attr('data-answ'));
				$('input[name=question2]').val($('.i-question2').text());
				$('input[name=answer2]').val($('.i-answer2').attr('data-answ'));

				$('.protect-password').children().eq(0).hide().siblings().show();
				$('.protect-password .editor').hide();
			} else{
				alert('请输入正确的密码！');
			}
		});		
	});
	//取消按钮
	$('.protect-password-edit .js-cancel').off('click').on('click', function() {
		$('.protect-password-edit').hide().siblings().show();
		$('.protect-password .editor').show();
	});
	//保存按钮
	$('.protect-password-edit .js-submit').off('click').on('click', function() {
		var dquestion1 = $('input[name=question1]').val();
		var danswer1 = $('input[name=answer1]').val();
		var dquestion2 = $('input[name=question2]').val();
		var danswer2 = $('input[name=answer2]').val();
		var protectpwdDataInfo = {
			question1: dquestion1,
			answer1: danswer1,
			question2: dquestion2,
			answer2: danswer2
		};
		//通过用户名找到对应的一条记录，添加密保属性信息
		User.updatePerson('UserPwdF', username, function(objectStore, event) {
			event.target.result.protectpwdDataInfo = protectpwdDataInfo;
			objectStore.put(event.target.result);
		});

		//修改成功之后调用展示工作信息数据函数，将页面上的资料渲染一遍
		showProtectData();
		$('.protect-password-edit').hide().siblings().show();
		$('.protect-password .editor').show();
	});
}
//展示我的资料页面函数结束

//展示我的文章页面函数开始
function showArticleData() {
	User.findSomePerson('UserPwdF', username, function(event) {
		// 将json对象转换成字符串以便查看数据格式
		// var Ostr = JSON.stringify(event.target.result);
		// console.log(Ostr);		
		var $articles = event.target.result.articleDataInfo;
		var $addLis = '';
		$articles.forEach(function(item, index) {
			$addLis = '<li>' +
				'<div class="row">' +
				'<div class="col-md-9">' +
				'<a href="javascript:void(0);" title="' + item.con + '">' + item.title + '</a>' +
				'</div>' +
				'<div class="col-md-2 text-right">' +
				'<span>' + item.date + '</span>' +
				'</div>' +
				'<div class="col-md-1 text-right js-article-delect">' +
				'<button class="btn btn-default btn-xs">删除</button>' +
				'</div>' +
				'</div>' +
				'</li>';
			$('.article-con').append($addLis);
		});
		//删除文章按钮点击事件
		$('.js-article-delect').off('click').on('click', '.btn', function() {
			var flag = confirm('确认删除吗?');
			if (flag) {
				var $liIndex = $(this).parents('li').index();
				$articles.splice($liIndex, 1);
				//调用修改方法再次将数组放进去，
				User.updatePerson('UserPwdF', username, function(objectStore, event) {
					event.target.result.articleDataInfo = $articles;
					objectStore.put(event.target.result);
				});
				$(this).parents('li').remove();
			} else {
				return false;
			}
		});

		//调用打开模态框并且显示标题和内容的模态框，关闭模态框函数
		showATitleCon('.article-con');

	});
}
//展示我的文章页面函数结束

//展示我的关注粉丝页面函数开始
//在没有设置头像和座右铭之前关注其他人是会出问题
function showFollowing() {
	User.findSomePerson('UserPwdF', username, function(event) {
		var $person = event.target.result.attentionsDataInfo;
		var $fans = event.target.result.fansDataInfo;
		var $addLis = '';
		var $addLiss = '';
		$('#person .atten-fans').empty();
		$person.forEach(function(item, index) {
			$addLis = '<li>' +
				'<div class="row">' +
				'<div class="col-md-10">' +
				'<img class="pull-left img-circle" src="' + item.imgsrc + '" alt="pic">' +
				'<div>' +
				'<a href="javascript:void(0);">' + item.username + '</a>' +
				'<p>' + item.saying + '</p>' +
				'</div>' +
				'</div>' +
				'<div class="col-md-2 text-right js-person-delect">' +
				'<button class="btn btn-default btn-xs">取消关注</button>' +
				'</div>' +
				'</div>' +
				'</li>';
			$('#person .atten-fans').append($addLis);
		});
		$('#fans .atten-fans').empty();
		$fans.forEach(function(item, index) {
			$addLiss = '<li>' +
				'<div class="row">' +
				'<div class="col-md-10 fans-info">' +
				'<img class="pull-left img-circle" src="' + item.imgsrc + '" alt="pic">' +
				'<div>' +
				'<a href="javascript:void(0);">' + item.username + '</a>' +
				'<p>' + item.saying + '</p>' +
				'</div>' +
				'</div>' +
				'<div class="col-md-2 text-right js-fans-add">' +
				'<button class="btn btn-default btn-xs">加关注</button>' +
				'</div>' +
				'</div>' +
				'</li>';
			$('#fans .atten-fans').append($addLiss);
		});
		//取消关注按钮点击事件
		$('.js-person-delect').off('click').on('click', '.btn', function() {
			var flag = confirm('确认取消关注吗?');
			if (flag) {
				//当前点击的用户名
				var delename = $(this).parent().prev().find('a').text();
				var $liIndex, $liIndex_;
				$person.forEach(function(item, index) {
					if (item.username === delename) {
						$liIndex = index;
					}
				});
				$person.splice($liIndex, 1);
				//找到页面的用户，将自身的关注列表中去掉点击的用户，
				User.updatePerson('UserPwdF', username, function(objectStore, event) {
					event.target.result.attentionsDataInfo = $person;
					objectStore.put(event.target.result);
				});

				//找到当前点击的用户名将粉丝列表中去掉当前用户，因为页面的用户取消了对当前用户的关注
				User.updatePerson('UserPwdF', delename, function(objectStore, event) {
					var fanss = event.target.result.fansDataInfo;
					fanss.forEach(function(item, index) {
						if (item.username === username) {
							$liIndex_ = index;
						}
						fanss.splice($liIndex_, 1);
						event.target.result.fansDataInfo = fanss;
						objectStore.put(event.target.result);
					});
				});
				showAttenFans();
				$(this).parents('li').slideUp().remove();
			} else {
				return false;
			}
		});
		//加为关注
		$('.js-fans-add').off('click').on('click', '.btn', function() {
			//暂时删除粉丝列表
			// User.updatePerson('UserPwdF', username, function(objectStore, event) {
			// 	event.target.result.fansDataInfo.shift();
			// 	objectStore.put(event.target.result);
			// });
			var flag = confirm('确认添加关注吗?');
			if (flag) {
				var self = $(this);
				var fname = self.parent().prev('.fans-info').find('a').text();
				var $somefans = {
					username: fname,
					saying: self.parent().prev('.fans-info').find('p').text(),
					imgsrc: self.parent().prev('.fans-info').find('img').attr('src')
				};
				User.updatePerson('UserPwdF', username, function(objectStore, event) {
					//模糊查询判断是否已经关注过
					var searchObj = {};
					searchObj['username'] = fname;
					var serdata = (event.target.result.attentionsDataInfo).filter(function(item, index) {
						return searchObj.username == item.username;
					});
					if (serdata.length === 0) {
						event.target.result.attentionsDataInfo.push($somefans);
						objectStore.put(event.target.result);
						var usernamef = {
							username: username,
							saying: event.target.result.saying,
							imgsrc: event.target.result.perDataInfo.imgsrc
						};
						//将点击关注的当前用户添加到粉丝列表中
						User.updatePerson('UserPwdF', fname, function(objectStore, event) {
							event.target.result.fansDataInfo.push(usernamef);
							objectStore.put(event.target.result);
						});
						showAttenFans();
						alert('关注成功！');
					} else {
						alert('已经关注过了！');
					}
				});
			} else {
				return false;
			}
		});
	});
}
//展示我的关注粉丝页面函数结束
$(document).ready(function() {
	//利用超时调用
	var play = setTimeout(function() {
		// debugger
		$.get('template/users.html', function(data) {
			$(".load-pages").html(data);
			//展示我的主页压面
			showUserData();
			//获取到关注人数和粉丝人数
			showAttenFans();
		});
	}, 100);
});

if (username) {
	//当用户登录之后右上角显示用户信息，以及头像，并且显示功能模块，
	//例如发布文章，提问、写笔记
	$('.options').show();
	$('.user-name span').text(username);

	//点击头像显示的下拉菜单中的我的主页点击事件
	$('.js-personal').off('click').on('click', 'li', function() {
		var str = $(this).find('a').text();
		switch (str) {
			case '我的主页':
				$.get('template/users.html', function(data) {
					$(".load-pages").html(data);
					//展示我的主页页面
					showUserData();
					$('.fun-nav').children().eq(0).addClass('active').siblings().removeClass('active');
				});
				break;
			case '我的资料':
				$.get('template/about.html', function(data) {
					$(".load-pages").html(data);
					//展示我的主页页面
					showAboutData();
					$('.fun-nav').children().eq(1).addClass('active').siblings().removeClass('active');
				});
				break;
		}
	});
	$('.ml15 a').off('click').on('click', function() {
		$.get('template/about.html', function(data) {
			$(".load-pages").html(data);
			//展示我的主页页面
			showAboutData();
			$('.fun-nav').children().eq(1).addClass('active').siblings().removeClass('active');
		});
	});

	//右侧展示关注的人以及粉丝数量点击事件
	$('.fun-head').find('a').off('click').on('click', function() {
		$.get('template/following.html', function(data) {
			$(".load-pages").html(data);
			$('.fun-nav').children().eq(5).addClass('active').siblings().removeClass('active');
			showFollowing();
		});
	});

} else {
	//当没有进行登录进入首页之后将右上角的内容填充为注册登录按钮
	$('.loginregister').show();
}

//点赞、送礼物、互动
$('[data-toggle=tooltip]').tooltip();
$('.badges-awards .glyphicon').click(function() {
	var count = $(this).next().next().text();
	$(this).next().next().text(++count);
});

//编辑座右铭模块	
$('.profile-heading .edit').off('click').on('click', function() {
	var txt = $('.profile-content p').text();
	$('.txt-form textarea').text(txt);
	$('.profile-content p').hide().siblings().show();
	$('.profile-heading .editor').hide();
});
//BUG1：编辑座右铭时，当出现文本输入框时，第一次点击取消或者保存的时候会重新载入页面，第二次则不会
//取消
$('.txt-form .js-cancel').off('click').on('click', function() {
	$('.con-form').hide().siblings().show();
	$('.profile-heading .editor').show();
});
//保存
$('.txt-form .js-submit').off('click').on('click', function() {
	var val = $('.txt-form textarea').val();
	$('.profile-content p').text(val);
	//通过用户名找到对应的一条记录，添加座右铭属性值
	User.updatePerson('UserPwdF', username, function(objectStore, event) {
		event.target.result.saying = val;
		objectStore.put(event.target.result);
		$('.profile-content p').text(event.target.result.saying);
	});
	$('.con-form').hide().siblings().show();
	$('.profile-heading .editor').show();
});


//左侧菜单点击事件
$('.fun-nav').off('click').on('click', 'li', function() {
	if (!$(this).hasClass('active')) {
		$(this).addClass('active').siblings().removeClass('active');
		$target = $(this).find('a').attr('target') + "?time=" + new Date().getTime();
		var str = $(this).find('a').text();
		switch (str) {
			case '我的主页':
				$.get($target, function(data) {
					$(".load-pages").html(data);
					showUserData();
				});
				break;
			case '我的资料':
				$.get($target, function(data) {
					$(".load-pages").html(data);
					showAboutData();
				});
				break;
			case '我的文章':
				$.get($target, function(data) {
					$(".load-pages").html(data);
					showArticleData();
				});
				break;
			case '我的头条':
				$.get($target, function(data) {
					$(".load-pages").html(data);
					User.findSomePerson('UserPwdF', username, function(event) {
						var $hottopics = event.target.result.hottopicDataInfo;
						var $addLis = '';
						$hottopics.forEach(function(item, index) {
							$addLis = '<li>' +
								'<div class="row">' +
								'<div class="col-md-9">' +
								'<a href="javascript:void(0);" title="' + item.con + '">' + item.title + '</a>' +
								'</div>' +
								'<div class="col-md-2 text-right">' +
								'<span>' + item.date + '</span>' +
								'</div>' +
								'<div class="col-md-1 text-right js-hottopic-delect">' +
								'<button class="btn btn-default btn-xs">删除</button>' +
								'</div>' +
								'</div>' +
								'</li>';
							$('.hottopic-con').append($addLis);
						});
						//删除头条按钮点击事件
						$('.js-hottopic-delect').off('click').on('click', '.btn', function() {
							var flag = confirm('确认删除吗?');
							if (flag) {
								var $liIndex = $(this).parents('li').index();
								$hottopics.splice($liIndex, 1);
								//调用修改方法再次将数组放进去，
								User.updatePerson('UserPwdF', username, function(objectStore, event) {
									event.target.result.hottopicDataInfo = $hottopics;
									objectStore.put(event.target.result);
								});
								$(this).parents('li').remove();
							} else {
								return false;
							}
						});

						//调用打开模态框并且显示标题和内容的模态框，关闭模态框函数
						showATitleCon('.hottopic-con');
					});
				});
				break;
			case '我的笔记':
				$.get($target, function(data) {
					$(".load-pages").html(data);
					User.findSomePerson('UserPwdF', username, function(event) {
						var $notes = event.target.result.noteDataInfo;
						var $addLis = '';
						$notes.forEach(function(item, index) {
							$addLis = '<li>' +
								'<div class="row">' +
								'<div class="col-md-9">' +
								'<a href="javascript:void(0);" title="' + item.con + '">' + item.title + '</a>' +
								'</div>' +
								'<div class="col-md-2 text-right">' +
								'<span>' + item.date + '</span>' +
								'</div>' +
								'<div class="col-md-1 text-right js-note-delect">' +
								'<button class="btn btn-default btn-xs">删除</button>' +
								'</div>' +
								'</div>' +
								'</li>';
							$('.note-con').append($addLis);
						});
						//删除笔记按钮点击事件
						$('.js-note-delect').off('click').on('click', '.btn', function() {
							var flag = confirm('确认删除吗?');
							if (flag) {
								var $liIndex = $(this).parents('li').index();
								$notes.splice($liIndex, 1);
								//调用修改方法再次将数组放进去，
								User.updatePerson('UserPwdF', username, function(objectStore, event) {
									event.target.result.noteDataInfo = $notes;
									objectStore.put(event.target.result);
								});
								$(this).parents('li').slideUp().remove();
							} else {
								return false;
							}
						});

						//调用打开模态框并且显示标题和内容的模态框，关闭模态框函数
						showATitleCon('.note-con');
					});
				});
				break;
			case '我的关注':
				$.get($target, function(data) {
					$(".load-pages").html(data);
					showFollowing();
				});
				break;
			case '我的收藏':
				$.get($target, function(data) {
					$(".load-pages").html(data);
					var arrsAll,
						//每页的记录条数
						pageSize = 6;
					User.findSomePerson('UserPwdF', username, function(event) {
						arrsAll = event.target.result.markDataInfo;
						var nowPage = 1;
						//分页
						option = {
							"maxNum": Math.ceil(arrsAll.length / pageSize),
							//显示的页码数
							"length": 3,
							"nowPage": 1,
							"str": "page"
						};
						var myObj = new TurnPage(option);
						myObj.loadPage = loadPage1;
						myObj.init();

						deleteMark();
						//调用打开模态框并且显示标题和内容的模态框，关闭模态框函数
						showATitleCon('.marks-con');
					});

					function deleteMark() {
						//取消收藏按钮点击事件
						$('.js-mark-delect').off('click').on('click', '.btn', function() {
							var flag = confirm('确认删除吗?');
							if (flag) {
								//通过文章标题找到该文章在数据中的索引，再截取数组
								var delearticle = $(this).parent().prev().prev().find('a').text();
								var $liIndex;
								arrsAll.forEach(function(item, index) {
									if (item.title === delearticle) {
										$liIndex = index;
									}
								});
								arrsAll.splice($liIndex, 1);
								//调用修改方法再次将数组放进去，
								User.updatePerson('UserPwdF', username, function(objectStore, event) {
									event.target.result.markDataInfo = arrsAll;
									objectStore.put(event.target.result);
								});
								$(this).parents('li').slideUp().remove();
							} else {
								return false;
							}
						});
					}
					/* 回调用于显示切换页面（视情况需要重写）  */
					var loadPage1 = function(nowPage) {
						var self = this,
							_length = arrsAll.length,
							trList = "";
						//循环生成表格
						for (var i = 0; i < pageSize; i++) {
							if (arrsAll[(nowPage - 1) * pageSize + i]) {
								trList += '<li>' +
									'<div class="row">' +
									'<div class="col-md-9">' +
									'<a href="javascript:void(0);" title="' + arrsAll[(nowPage - 1) * pageSize + i].con + '">' + arrsAll[(nowPage - 1) * pageSize + i].title + '</a>' +
									'</div>' +
									'<div class="col-md-2 text-right">' +
									'<span>' + arrsAll[(nowPage - 1) * pageSize + i].date + '</span>' +
									'</div>' +
									'<div class="col-md-1 text-right js-mark-delect">' +
									'<button class="btn btn-default btn-xs">取消收藏</button>' +
									'</div>' +
									'</div>' +
									'</li>';
							}
						}
						$('.marks-con').empty();
						$('.marks-con').append(trList);
						deleteMark();

						return self;
					};

				});
				break;
		}
	}　　
});

/* maxNum 最大页数  length 每次最多显示的页数 nowPage当前页面数 */
function TurnPage(option) {
	var defaults = {
		maxNum: 1,
		length: 1,
		nowPage: 1,
		arr: ["front", "behind"]
	};
	this.oConfig = $.extend(defaults, option);
}
TurnPage.prototype = {
	init: function() {
		var self = this;
		// 判断参数显示长度是否超过最大页数
		if (self.oConfig.length > self.oConfig.maxNum) {
			self.oConfig.length = self.oConfig.maxNum;
		}
		// 判断参数当前页是否超过最大页数
		if (self.oConfig.nowPage > self.oConfig.maxNum) {
			self.oConfig.nowPage = self.oConfig.maxNum;
		}
		if (self.oConfig.maxNum === 0) {
			self.oConfig.maxNum = 1;
			self.oConfig.length = 1;
			self.oConfig.nowPage = 1;
		}
		self.loadPage(self.oConfig.nowPage).initShow().initTurn();
	},
	/* 展示换页部分 */
	initShow: function() {
		var self = this;
		var pagestr = '<li>' +
			'<a href="javascript:void(0);"><span id=\"front\">&laquo;</span></a>' +
			'</li>' +
			'<li>' +
			'<a href="javascript:void(0);"><span id=\"behind\">&raquo;</span></a>' +
			'</li>';
		$("." + self.oConfig.str + " .page-number").html(pagestr);

		for (var i = self.oConfig.length; i >= 1; i--) {
			if ((self.oConfig.nowPage + self.oConfig.length - 1) <= self.oConfig.maxNum) {
				$("." + self.oConfig.str + " .page-number").find("li").eq(0).after('<li><a href="javascript:void(0);">' + (self.oConfig.nowPage + i - 1) + '</a></li>');
			} else {
				var _nowPage = self.oConfig.maxNum + i - self.oConfig.length;
				$("." + self.oConfig.str + " .page-number").find("li").eq(0).after('<li class="active"><a href="javascript:void(0);">' + _nowPage + '</a></li>');
			}
		}
		//当前页的页码高亮
		$("." + self.oConfig.str + " .page-number").find("li").each(function() {
			if ($(this).find('a').html() == self.oConfig.nowPage) {
				$(this).addClass("active").siblings().removeClass('active');
				return;
			}
		});
		return self;
	},
	initTurn: function() {
		/* 跳转页面部分 */
		var self = this;
		$("." + self.oConfig.str + " .page-number").find("a").unbind("click");
		$("." + self.oConfig.str + " .page-number").find("a").click(function() {
			var num = Number($(this).html());
			if (Number(num)) {
				/* 正常跳转   */
				if (self.oConfig.nowPage != num) {
					self.oConfig.nowPage = num;
					self.init();
				}
			} else {
				var str = $(this).find("span").attr("id"),
					index = $.inArray(str, self.oConfig.arr),
					_index = 0;
				switch (index) {
					case 0:
						_index = -1;
						/* <<箭头跳转 上一页*/
						break;
					case 1:
						_index = 1;
						/* >>箭头跳转 下一页 */
						break;
				}
				var _nowPage = _index + self.oConfig.nowPage;
				if ((_nowPage >= 1) && (_nowPage <= self.oConfig.maxNum)) {
					self.oConfig.nowPage = _nowPage;
					self.init();
				}
			}
		});
		return self;
	},
	loadPage: function(p) {}
};