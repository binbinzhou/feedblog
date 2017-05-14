var $randomNum = Math.round(Math.random() * 1000);
var $imgSrc = 'http://images.nowcoder.com/head/' + $randomNum + 't.png';
//获取到设置好的头像
if (username) {
	var stay = setTimeout(function() {
		$('.options').show();
		$('.user-name span').text(username);
		//找到当前用户渲染头像
		User.findSomePerson('UserPwdF', username, function(event) {
			var $src = event.target.result.perDataInfo.imgsrc;
			if ($src) {
				var $srcArr = $src.split('.');
				var $endSrc = $srcArr[0] + '-01.' + $srcArr[1];
				$('.user-pic').css('background', 'url(' + $endSrc + ') no-repeat center');
			} else {
				$('.user-pic').css('background', 'url(' + $imgSrc + ') no-repeat center');
			}
		});
	}, 100);
}
//关注用户函数
function attenfans($thisName) {
	var $userinfomodal = $('.userinfo-modal');
	$('.userinfo-modal').find('.p-name').text($thisName);
	//找到当前用户渲染头像
	User.findSomePerson('UserPwdF', $thisName, function(event) {
		//渲染个人资料
		var $result = event.target.result;
		var $src = event.target.result.perDataInfo.imgsrc;
		if ($src) {
			$userinfomodal.find('.headscu img').attr('src', $src);
		} else {
			$userinfomodal.find('.headscu img').attr('src', $imgSrc);
		}
		$userinfomodal.find('.profile-content p').text(event.target.result.saying);
		$userinfomodal.find('.s-address').text(event.target.result.perDataInfo.address);
		$userinfomodal.find('.s-school').text(event.target.result.perDataInfo.school);
		$userinfomodal.find('.s-company').text(event.target.result.perDataInfo.company);
		$userinfomodal.find('.s-website').text(event.target.result.perDataInfo.website);
		//渲染用户的文章数据
		var $thisarticles = event.target.result.articleDataInfo;
		var $addArticleLis = '';
		$userinfomodal.find('.profile-mine').empty();
		$thisarticles.forEach(function(item, index) {
			$addArticleLis = '<li>' +
				'<div class="padd-r0 pull-left">' +
				'<span class="con-type label label-warning">文章</span>' +
				'</div>' +
				'<div class="pl10 con-write-wrap">' +
				'<a class="con-write" href="javascript:void(0);" title="' + item.title + '">' + item.con + '</a>' +
				'</div>' +
				'</li>';
			$userinfomodal.find('.profile-mine').append($addArticleLis);
		});
	});
	$('.js-attention').off('click').on('click', function() {
		var self = $(this);
		var $someuser = {
			username: $thisName,
			saying: $userinfomodal.find('.profile-content p').text(),
			imgsrc: $userinfomodal.find('.headscu img').attr('src')
		};
		if (username) {
			User.updatePerson('UserPwdF', username, function(objectStore, event) {
				//模糊查询判断是否已经关注过
				var searchObj = {};
				searchObj['username'] = $thisName;
				var serdata = (event.target.result.attentionsDataInfo).filter(function(item, index) {
					return searchObj.username == item.username;
				});
				if (username === $thisName) {
					alert('不能关注自己啦！');
				} else if (serdata.length === 0) {
					event.target.result.attentionsDataInfo.push($someuser);
					objectStore.put(event.target.result);
					var usernamef = {
						username: username,
						saying: event.target.result.saying,
						imgsrc: event.target.result.perDataInfo.imgsrc
					};
					//将点击关注的当前用户添加到粉丝列表中
					User.updatePerson('UserPwdF', $thisName, function(objectStore, event) {
						event.target.result.fansDataInfo.push(usernamef);
						objectStore.put(event.target.result);
					});
					alert('关注成功！');
				} else {
					alert('已经关注过了！');
				}
			});
		} else {
			alert('请登录注册!');
		}
	});
}
//收藏函数
function markFun() {
	$('.media').off('click').on('click', '.js-mark', function() {
		var self = $(this);
		//将要收藏的文章的数据信息拿到然后放进markDataInfo数组中，此时需要判断数据库中是否已经有改文章，不能重复收藏！
		var $m_title = self.parents('.media').find('.str-main').attr('title'),
			$m_author = self.parents('.media').find('.str-user').text(),
			$m_con = self.parents('.media').find('.str-main').text(),
			$m_date = self.parents('.media').find('.str-main').attr('data-time');
		$markData = {
			title: $m_title,
			author: $m_author,
			con: $m_con,
			date: $m_date
		};
		if (username) {
			User.updatePerson('UserPwdF', username, function(objectStore, event) {
				var searchObj = {};
				searchObj['title'] = $m_title;
				var serdata = (event.target.result.markDataInfo).filter(function(item, index) {
					return searchObj.title == item.title;
				});
				if (serdata.length === 0) {
					event.target.result.markDataInfo.push($markData);
					objectStore.put(event.target.result);
					alert('收藏成功');
				} else {
					alert('已经收藏过了！');
				}
			});
		} else {
			alert('请登录注册!');
		}
	});
}
//当游客进入首页时
var stayS = setTimeout(function() {
	//查找所有用户渲染所有文章，头条笔记数据
	User.findAllPerson('UserPwdF', function(event) {
		// debugger
		var $users = event.target.result;
		var $articles = [],
			$notes = [],
			$hottopic = [];
		// console.log($users);
		$users.forEach(function(item, index) {
			(item.articleDataInfo).forEach(function(item, index) {
				//将所有用户的所有文章放进一个数组中，进行遍历渲染到节点上
				$articles.push(item);
			});
			(item.noteDataInfo).forEach(function(item, index) {
				//将所有用户的所有文章放进一个数组中，进行遍历渲染到节点上
				$notes.push(item);
			});
			(item.hottopicDataInfo).forEach(function(item, index) {
				//将所有用户的所有文章放进一个数组中，进行遍历渲染到节点上
				$hottopic.push(item);
			});
		});
		//添加自定义方法对数据中的时间日期进行倒序排序
		String.prototype.change = function() {
			var self = this;
			return parseInt(self.substring(0, 4) + self.substring(5, 7) + self.substring(8, 10));
		};

		function Compare(key) {
			return function(obj1, obj2) {
				return obj2[key].change() - obj1[key].change();
			};
		}
		$articles = $articles.sort(Compare('date'));
		var $addLis = '';
		//将所有文章按时间先后顺序排列渲染
		$articles.forEach(function(item, index) {
			$addLis = '<li class="media">' +
				'<div class="media-left media-middle">' +
				'<a href="javascript:void(0);">' +
				'<img src="' + (item.imgsrc===undefined?$imgSrc:(item.imgsrc)) + '" alt="" class="media-object img-circle">' +
				'</a>' +
				'</div>' +
				'<div class="media-body">' +
				'<p class="media-heading">' +
				'<a class="str-user" href="javascript:void(0);">' + item.author + '</a>' +
				'</p>' +
				'<p class="text-justify">' +
				'<a class="str-main" href="javascript:void(0);" title="' + item.title + '" data-time="' + item.date + '">' + item.con + '</a>' +
				'</p>' +
				'</div>' +
				'<div class="media-right">' +
				'<a class="str-comment" href="#">' +
				'<button class="btn btn-default btn-xs js-mark">收藏</button>' +
				'</a>' +
				'</div>' +
				'</li>';
			$('.stream-article').append($addLis);
		});

		//将所有头条渲染
		// console.log($hottopic);
		$hottopic.forEach(function(item, index) {
			$addLis = '<li class="media">' +
				'<div class="media-left media-middle">' +
				'<a href="javascript:void(0);">' +
				'<img src="' + (item.imgsrc===undefined?$imgSrc:(item.imgsrc)) + '" alt="" class="media-object img-circle">' +
				'</a>' +
				'</div>' +
				'<div class="media-body">' +
				'<p class="media-heading">' +
				'<a class="str-user" href="javascript:void(0);">' + item.author + '</a>' +
				'</p>' +
				'<p class="text-justify">' +
				'<a class="str-main" href="javascript:void(0);" title="' + item.title + '" data-time="' + item.date + '">' + item.con + '</a>' +
				'</p>' +
				'</div>' +
				'<div class="media-right">' +
				'<a class="str-comment" href="#">' +
				'<button class="btn btn-default btn-xs js-mark">收藏</button>' +
				'</a>' +
				'</div>' +
				'</li>';
			$('.stream-hottopic').append($addLis);
		});

		//将所有笔记渲染			
		// console.log($notes);
		$notes.forEach(function(item, index) {
			$addLis = '<li class="media">' +
				'<div class="media-left media-middle">' +
				'<a href="javascript:void(0);">' +
				'<img src="' + (item.imgsrc===undefined?$imgSrc:(item.imgsrc)) + '" alt="" class="media-object img-circle">' +
				'</a>' +
				'</div>' +
				'<div class="media-body">' +
				'<p class="media-heading">' +
				'<a class="str-user" href="javascript:void(0);">' + item.author + '</a>' +
				'</p>' +
				'<p class="text-justify">' +
				'<a class="str-main" href="javascript:void(0);" title="' + item.title + '" data-time="' + item.date + '">' + item.con + '</a>' +
				'</p>' +
				'</div>' +
				'<div class="media-right">' +
				'<a class="str-comment" href="#">' +
				'<button class="btn btn-default btn-xs js-mark">收藏</button>' +
				'</a>' +
				'</div>' +
				'</li>';
			$('.stream-notes').append($addLis);
		});

		markFun();

		//搜索按钮
		$('.js-search').off('click').on('click', function() {
			var $serStr = $('input[name="question"]').val();
			if ($serStr === '') {
				alert('请输入要查询的关键字！');
			} else {
				User.findAllPerson('UserPwdF', function(event) {
					var $users = event.target.result;
					var $articles = [];
					$users.forEach(function(item, index) {
						(item.articleDataInfo).forEach(function(item, index) {
							//将所有用户的所有文章放进一个数组中，进行遍历渲染到节点上
							$articles.push(item);
						});
					});
					//获取所有的文章数据
					// console.log($articles);
					var nPos;
					var searchObj = [];
					$articles.forEach(function(item, index) {
						var sTxt = item.con || '';
						nPos = findart($serStr, sTxt);
						if (nPos >= 0) {
							searchObj.push(item);
						}
					});
					//搜索之后返回的数组
					// console.log(searchObj);
					if (searchObj.length === 0) {
						alert('未找到匹配该字段的文章!');
						window.location.reload();
					} else {
						$('.stream-article').empty();
						searchObj.forEach(function(item, index) {
							$addLis = '<li class="media">' +
								'<div class="media-left media-middle">' +
								'<a href="javascript:void(0);">' +
								'<img src="' + item.imgsrc + '" alt="" class="media-object img-circle">' +
								'</a>' +
								'</div>' +
								'<div class="media-body">' +
								'<p class="media-heading">' +
								'<a class="str-user" href="javascript:void(0);">' + item.author + '</a>' +
								'</p>' +
								'<p class="text-justify">' +
								'<a class="str-main" href="javascript:void(0);" title="' + item.title + '" data-time="' + item.date + '">' + item.con + '</a>' +
								'</p>' +
								'</div>' +
								'<div class="media-right">' +
								'<a class="str-comment" href="#">' +
								'<button class="btn btn-default btn-xs js-mark">收藏</button>' +
								'</a>' +
								'</div>' +
								'</li>';
							$('.stream-article').append($addLis);
						});
					}
					//调用收藏的方法
					markFun();
					$('.index-tabs').find('a').eq(0).trigger('click');
				});

				function findart($serStr, sObj) {
					var nSize = $serStr.length;
					var nLen = sObj.length;
					var sCompare;
					if (nSize <= nLen) {
						for (var i = 0; i <= nLen - nSize + 1; i++) {
							sCompare = sObj.substring(i, i + nSize);
							if (sCompare == $serStr) {
								return i;
							}
						}
					}
					return -1;
				}
			}
		});
		//首页中的文章以及笔记内容展示模态框事件
		$('.stream-list').off('click').on('click', '.str-main', function() {
			$('#modal-show-con .dialog-con').text($(this).text());
			$('#modal-show-con .modal-title').text($(this).attr('title'));
			$("#modal-show-con").modal("show");
		});
		//关闭模态框
		$('#modal-show-con .js-close-Modal').off('click').on("click", function() {
			$('#modal-show-con').modal("hide");
		});


		//首页中的用户名或者头像点击展示用户信息模态框事件
		//点击头像情况
		$('.media-left').off('click').on('click', '.img-circle', function() {
			$("#modal-show-userinfo").modal("show");
			var $thisName = $(this).parents('.media').find('.str-user').text();
			attenfans($thisName);
		});
		//点击用户名情况
		$('.media-body').off('click').on('click', '.str-user', function() {
			$("#modal-show-userinfo").modal("show");
			var $thisName = $(this).text();
			attenfans($thisName);
		});
		//关闭模态框
		$('#modal-show-userinfo .js-close-Modal').off('click').on("click", function() {
			$('#modal-show-userinfo').modal("hide");
		});
	});
}, 100);

//回到顶部
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


function moveModal(id){
	var oBox = document.getElementById(id);
		oBox.onmousedown = function(e){
			debugger
			var oEvent =e || window.event,
				disL = oEvent.clientX - oBox.offsetLeft,
				disT = oEvent.clientY - oBox.offsetTop,
				maxL = document.documentElement.clientWidth - oBox.offsetWidth,
				maxT = document.documentElement.clientHeight - oBox.offsetHeight;
				
			document.onmousemove = function(e){
				var oEvent = e || window.event,
					disX = oEvent.clientX - disL,
					disY = oEvent.clientY - disT;
					
					//console.log(disX);
				if(disX <=0){ disX =0;}
				if(disY <=0){ disY =0;}
				if(disX >=maxL){ disX =maxL;}
				if(disY >=maxT){ disY =maxT;}
				oBox.style.left = disX+'px';
				oBox.style.top = disY+'px';
			};
		};
		document.onmouseup = function(){
			document.onmousemove = null;
		};
}
// moveModal('modal-show-con');