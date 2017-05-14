var username = localStorage.getItem("$user");
var password = localStorage.getItem("$pwd");
var $randomNum = Math.round(Math.random() * 1000);
var $imgSrc = 'http://images.nowcoder.com/head/' + $randomNum + 't.png';
if (username) {
	$('.options').show();
	$('.user-name span').text(username);

	//点击发布文章按钮获取表单数据存储进数据库中
	$('.js-submit-articleModal').off('click').on('click', function() {
		var Atitle = $('input[name=articleTitle]').val();
		var Aarticlecon = $('textarea[name=articleDesc]').val();
		//调用函数获取当前时间
		var date = showTime();
		var $article = {
			type: '文章',
			title: Atitle,
			con: Aarticlecon,
			author: username,
			date: date
		};
		if(Atitle && Aarticlecon){
			if(Aarticlecon.length<40){
				alert('文章内容不得少于40个字!');
			} else{
				User.updatePerson('UserPwdF', username, function(objectStore, event) {
					$article.imgsrc = event.target.result.perDataInfo.imgsrc;
					event.target.result.articleDataInfo.push($article);
					objectStore.put(event.target.result);
					alert('文章发布成功！');
					$('#modal-write-article').modal("hide");
					$('.fun-nav').children().eq(2).trigger('click');
				});
			}
		} else{
			alert('请输入文章标题和文章内容');
		}
	});

	//点击编写笔记按钮获取表单数据存储进数据库中
	$('.js-submit-noteModal').off('click').on('click', function() {
		var Atitle = $('input[name=noteTitle]').val();
		var Anotecon = $('textarea[name=noteDesc]').val();
		//调用函数获取当前时间
		var date = showTime();
		var $note = {
			type: '笔记',
			title: Atitle,
			con: Anotecon,
			author: username,
			date: date
		};
		if(Atitle && Anotecon){
			if(Anotecon.length<20){
				alert('笔记内容不得少于20个字!');
			} else{
				User.updatePerson('UserPwdF', username, function(objectStore, event) {
					$note.imgsrc = event.target.result.perDataInfo.imgsrc;
					event.target.result.noteDataInfo.push($note);
					objectStore.put(event.target.result);
					alert('笔记发布成功！');
					$('#modal-write-note').modal("hide");
					$('.fun-nav').children().eq(3).trigger('click');
				});
			}
		} else{
			alert('请输入笔记标题和笔记内容');
		}
	});

	//点击发布头条按钮获取表单数据存储进数据库中
	$('.js-submit-hottopicModal').off('click').on('click', function() {
		var Atitle = $('input[name=hottopicTitle]').val();
		var Ahottopiccon = $('textarea[name=hottopicDesc]').val();
		//调用函数获取当前时间
		var date = showTime();
		var $hottopic = {
			type: '头条',
			title: Atitle,
			con: Ahottopiccon,
			author: username,
			date: date
		};
		if(Atitle && Ahottopiccon){
			if(Ahottopiccon.length<20){
				alert('头条内容不得少于20个字!');
			} else{
				User.updatePerson('UserPwdF', username, function(objectStore, event) {
					$hottopic.imgsrc = event.target.result.perDataInfo.imgsrc;
					event.target.result.hottopicDataInfo.push($hottopic);
					objectStore.put(event.target.result);
					alert('头条发布成功！');
					$('#modal-write-hottopic').modal("hide");
					$('.fun-nav').children().eq(4).trigger('click');
				});
			}
		} else{
			alert('请输入头条标题和头条内容');
		}
	});


} else {
	//当没有进行登录进入首页之后将右上角的内容填充为注册登录按钮
	$('.options').hide();
	$('.loginregister').show();
}
//博客首页tab切换
$('.index-tabs').find('a').off('click').on('click', function() {
	if (!$(this).hasClass('current')) {
		$(this).addClass('current').parent().siblings().children().removeClass('current');
		var $index = $(this).parent().index();
		$('.stream').eq($index).addClass('s-current').siblings().removeClass('s-current');
	}
});

function showTime() {
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var day = new Date().getDate();
	if (month < 10) {
		month = '0' + (month + 1);
	}
	if (day < 10) {
		day = '0' + day;
	}
	var date = year + '年' + month + '月' + day + '日';
	return date;
}
//模态框初始化操作
function modalWrite(modalId, closeClass) {
	//模态框初始化操作
	$(modalId).modal({
		//模态框显示出来之后是否可以通过点击底部页面来关闭模态框，true表示可以
		backdrop: true,
		//键盘上的 esc 键被按下时是否关闭模态框。(测试未成功)
		keyboard: true,
		//模态框初始化之后是否立即显示出来。
		show: false,
	});
	//用JS方式关闭模态框
	$(closeClass).off("click").on("click", function() {
		$(modalId).modal("hide");
	});
}
modalWrite("#modal-write-article", ".js-close-articleModal");
modalWrite("#modal-write-hottopic", ".js-close-hottopicModal");
modalWrite("#modal-write-note", ".js-close-noteModal");