//已解决问题：1、用户名大小写区分已解决，2、用户名和手机号都可以登陆成功问题已解决。
//问题一：191行，修改密码成功之后不能打开模态框。199行，修改失败不能打开！

//问题四：火狐浏览器数据库报错，显示不了数据
//获取到DOM节点
var $username = $('.register-form input[name="username"]');
var $telephone = $('.register-form input[name="telephone"]');
var $password = $('.register-form  input[name="password"]');
var $passwords = $('.register-form  input[name="passwords"]');

function modal() {
	//初始化模态框
	$("#modalfail").modal({
		backdrop: true,
		keyboard: false,
		show: false
	});
	//用JS方式打开模态框
	$("#modalfail").modal("show");
	//解绑之后关闭模态框事件
	$(".closeBtn").unbind('click');
	$(".closeBtn").on("click", function() {
		$("#modalfail").modal("hide");
	});
}

//---------------------注册用户表单按钮提交事件---------------
$('.register-form .btn').unbind('click');
$('.register-form .btn').on('click', function(event) {
	var $user = $username.val();
	var $tel = $telephone.val();
	var $pwd = $password.val();
	var $pwds = $passwords.val();
	var $saying = '';

	//修改资料页面的个人资料数据信息以及工作数据信息
	var $perDataInfo = {};
	var $workDataInfo = {};
	// var $protectpwdDataInfo = {};

	//用户的粉丝以及关注的人的数据信息
	var $fansDataInfo = [];
	var $attentionsDataInfo = [];

	//文章的数据信息
	var $articleDataInfo = [];
	var $hottopicDataInfo = [];
	var $noteDataInfo = [];
	//收藏夹的数据信息
	var $markDataInfo = [];
	//console.log($tel,$pwd);
	//调用用户构造函数
	var person = new User.Person($user, $tel, $pwds, $saying, $perDataInfo, $workDataInfo, $fansDataInfo, $attentionsDataInfo, $articleDataInfo, $hottopicDataInfo, $noteDataInfo, $markDataInfo);
	//点击注册判断用户名是否为空，电话号码是否为空，密码是否为空，电话号码是否是11位，密码不少于6位，
	//用户名被注册之后便不可注册(也就是说当离焦之后提示信息'该用户名已被注册'不出现的时候才能进行注册)
	if ($user.length !== 0 && $tel.length !== 0 && $pwds.length !== 0 && $tel.length === 11 && $pwds.length >= 6 && $pwd === $pwds && $('.user .remove').css('display') !== 'block') {
		//调用保存方法
		User.savePerson(person, 'UserPwdF', function() {
			//更改模态框中的内容，调用打开模态框方法
			$("#modalfail .modal-body").text('注册成功！');
			modal();
			//reset是js的方法，先将jQuery对象装化为Dom对象
			$('.register-form')[0].reset();
			//隐藏提示信息
			$('.register-form p').hide();
		});
	} else {
		//更改模态框中的内容，调用打开模态框方法
		$("#modalfail .modal-body").text('请仔细检查是否填写正确！');
		modal();
	}
});

//------------------注册表单中的input离焦校验事件------------------
//验证用户名是否已经被注册
$username.unbind('blur');
$username.on('blur', function() {
	var $user = $username.val();
	User.findSomePerson('UserPwdF', $user, function(event) {
		//通过用户名找到对应的一条用户记录
		if (event.target.result === undefined) {
			if ($user.length === 0) {
				$('.user .blank').show().siblings('p').hide();
			} else {
				$('.user .ok').show().siblings('p').hide();
			}
		} else {
			var Dname = event.target.result.username;
			if (Dname === $user) {
				$('.user .remove').show().siblings('p').hide();
			}
		}
	});
});

//验证电话号码是否正确，并且判断电话号码是否已经被注册
$telephone.unbind('blur');
$telephone.on('blur', function() {
	var $tel = $telephone.val();
	User.findAllPerson('UserPwdF', function(event) {
		//通过电话号码找到对应的一条用户记录
		var searchObj = {};
		searchObj['telephone'] = $tel;
		var serdata = (event.target.result).filter(function(item, index) {
			return searchObj.telephone == item.telephone;
		});
		if (serdata.length === 0) {
			if ($tel.length === 11) {
				$('.tel .ok').show().siblings('p').hide();
			} else {
				$('.tel .remove').show().siblings('p').hide();
			}
		} else {
			$('.tel .hasregis').show().siblings('p').hide();
		}
	});
});

//验证密码是否正确
$password.unbind('blur');
$password.on('blur', function() {
	var $pwd = $password.val();
	if ($pwd.length < 6) {
		$('.passw .remove').show().siblings('p').hide();
	} else {
		$('.passw .ok').show().siblings('p').hide();
	}
});

//验证再次输入密码是否正确
$passwords.unbind('blur');
$passwords.on('blur', function() {
	var $pwd = $password.val();
	var $pwds = $passwords.val();
	if ($pwd !== $pwds || $pwds.length == 0) {
		$('.password .remove').show().siblings('p').hide();
	} else {
		$('.password .ok').show().siblings('p').hide();
	}
});

//--------------------用户登录按钮提交事件----------------------
$('.login-form .btn').unbind('click');
$('.login-form .btn').on('click', function(event) {
	var $user = $('.login-form input[name="username"]').val();
	var $pwd = $('.login-form input[name="password"]').val();
	//调用查询数据库对象仓库中的数据
	User.findSomePerson('UserPwdF', $user, function(event) {
		if (event.target.result === undefined) {
			$("#modalfail .modal-body").text('用户名或密码错误！');
			modal();
		} else {
			var Dname = event.target.result.username;
			var Dpassword = event.target.result.password;
			if ($user === Dname && $pwd === Dpassword) {
				//保存数据在本地存储中，进入另一个页面中再次拿出来
				localStorage.setItem("$user", $user);
				localStorage.setItem("$pwd", $pwd);
				window.location.href = 'user.html';
			} else {
				//更改模态框中的内容，调用打开模态框方法
				$("#modalfail .modal-body").text('用户名或密码错误！');
				modal();
			}
		}
		return false;
	});
});

//----------------当点击头部logo回到首页--------------------
$('.cursor').unbind('click');
$('.cursor').on('click', function() {
	window.location.href = 'index.html';
	//当点击头部logo回到首页，清除本地存储
	localStorage.clear();
});


//--------------------修改密码模块-----------------------
var username = localStorage.getItem("$user");
var password = localStorage.getItem("$pwd");
//显示用户名但不可更改
$('.default-user input').val(username);

//修改密码表单按钮点击事件
//修改密码思路：通过用户名找到仓库中对应的记录，然后通过更改密码，
$('.update-btn').unbind('click');
$('.update-btn').on('click', function() {
	var oldUser = $('.default-user input[name="username"]').val();
	var oldPwd = $('.default-password input').val();
	var newPwd = $('.new-password input').val();
	if ($('.default-password .ok').css('display') === 'block' && $('.new-password .ok').css('display') === 'block' && oldPwd != newPwd) {
		//调用修改密码函数
		User.updatePerson('UserPwdF', oldUser, function(objectStore, event) {
			event.target.result.password = newPwd;
			objectStore.put(event.target.result);
			//更改模态框中的内容，调用打开模态框方法
			$("#modalfail .modal-body").text('修改成功,请重新登录！');
			modal();
			alert('修改成功,请重新登录！');
			window.location = 'login-register.html';
		});
	} else {
		//不能打开？？？？
		//更改模态框中的内容，调用打开模态框方法
		$("#modalfail .modal-body").text('请仔细检查是否填写正确！');
		modal();
		alert('请仔细检查是否填写正确！');
	}
});

//验证原始密码
$('.default-password input').on('blur');
$('.default-password input').on('blur', function() {
	var oldPwd = $('.default-password input').val();
	if (oldPwd != password) {
		$('.default-password .remove').show().siblings('p').hide();
	} else {
		$('.default-password .ok').show().siblings('p').hide();
	}
});

//验证新密码是否正确
$('.new-password input').on('blur');
$('.new-password input').on('blur', function() {
	var oldPwd = $('.default-password input').val();
	var newPwd = $('.new-password input').val();
	if (newPwd.length < 6 || newPwd === oldPwd) {
		$('.new-password .remove').show().siblings('p').hide();
	} else {
		$('.new-password .ok').show().siblings('p').hide();
	}
});

//----------------------忘记密码模块--------------------------
$('.js-get-username').off('clicks').on('click',function(){
	var self = $(this);
	var $fusername = $('.forgot-form').find('input[name=username]').val();
	User.findSomePerson('UserPwdF', $fusername, function(event) {
		if(event.target.result){
			self.addClass('hasUser');
			console.log(event.target.result);
			if(event.target.result.protectpwdDataInfo){
				$('.QAQone').find('label').text(event.target.result.protectpwdDataInfo.question1);
				$('.QAQtwo').find('label').text(event.target.result.protectpwdDataInfo.question2);
			} else{
				alert('抱歉,未设置密保问题!');
			}	
		} else{
			self.removeClass('hasUser');
			alert('未找到该用户!');
		}
	});
});
$('.forgot-btn').off('clicks').on('click',function(){
	var $fusername = $('.forgot-form').find('input[name=username]').val();
	var $fanswer1 = $('.forgot-form').find('input[name=question1]').val();
	var $fanswer2 = $('.forgot-form').find('input[name=question2]').val();
	if($('.js-get-username').hasClass('hasUser')){
		User.findSomePerson('UserPwdF', $fusername, function(event) {
			var sqlanswer1 = event.target.result.protectpwdDataInfo.answer1;
			var sqlanswer2 = event.target.result.protectpwdDataInfo.answer2;
			if(sqlanswer1 === $fanswer1 && sqlanswer2 === $fanswer2){
				alert(event.target.result.password);
			} else{
				alert('抱歉,您的回答错误!');
			}
		});
	} else{
		alert('请输入正确的用户名');
	}
});

//------------------弹性盒模型回到顶部--------------------
(function scrollTop() {
	$('.qrcode-desc').hide();
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 250) {
			$('.qrcode-desc').fadeIn();
		} else {
			$('.qrcode-desc').fadeOut();
		}
	});
	//跳转到顶部
	$('.qrcode-desc').on('click', function() {
		$('html,body').animate({
			scrollTop: 0
		}, 500);
	});
	//悬浮显示二维码大图
	$('.code').on({
		'mouseover': function() {
			$('.qrcode-img').show();
		},
		'mouseout': function() {
			$('.qrcode-img').hide();
		}
	});
})();