//创建数据库以及仓库
//匿名函数调用，避免占据全局内存
//兼容谷歌、火狐、IE浏览器
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
var request, db;
if (!window.indexedDB) {
	console.log("Your Browser does not support IndexedDB");
} else {
	//删除某个数据库
	//indexedDB.deleteDatabase('databaseF');

	//开始获取数据库
	request = window.indexedDB.open("databaseF", 2);
	//获取数据库失败
	request.onerror = function(event) {
		console.log("Error opening DB", event);
	};
	//当数据库有改变时
	request.onupgradeneeded = function(event) {
		console.log("Upgrading");
		//取得数据库对象
		db = event.target.result;
		//创建仓库
		var objectStore = db.createObjectStore("UserPwdF", {
			keyPath: "username"
		});
	};
	//获取数据库成功
	request.onsuccess = function(event) {
		console.log("Success opening DB");
		db = event.target.result;
	};
}

var User = {
	//用户信息的对象
	//后续属性有：粉丝数据fansDataInfo,关注的人数据attentionsDataInfo,文章数据articleDataInfo，头条数据hottopicDataInfo，笔记数据noteDataInfo，收藏的文章数据markDataInfo
	Person: function(username, telephone, password, saying, perDataInfo, workDataInfo, fansDataInfo, attentionsDataInfo, articleDataInfo, hottopicDataInfo, noteDataInfo, markDataInfo) {
		this.username = username;
		this.telephone = telephone;
		this.password = password;
		this.saying = saying;
		this.perDataInfo = perDataInfo;
		this.workDataInfo = workDataInfo;
		this.fansDataInfo = fansDataInfo;
		this.attentionsDataInfo = attentionsDataInfo;
		this.articleDataInfo = articleDataInfo;
		this.hottopicDataInfo = hottopicDataInfo;
		this.noteDataInfo = noteDataInfo;
		this.markDataInfo = markDataInfo;
	},
	//保存用户信息
	savePerson: function(person, storeName, handler) {
		//开启事务
		var transaction = db.transaction(storeName, "readwrite");
		transaction.oncomplete = function(event) {
			handler(event);
			console.log("Success :)");
		};
		transaction.onerror = function(event) {
			console.log("Error :(");
		};
		//打开仓库对象
		var objectStore = transaction.objectStore(storeName);
		objectStore.add(person);
	},
	//查询所有用户信息
	findAllPerson: function(storeName, handler) {
		var transaction = db.transaction(storeName, "readwrite");
		var objectStore = transaction.objectStore(storeName);
		var request = objectStore.getAll();
		request.onsuccess = function(event) {
			handler(event);
		};
	},
	//查找单个用户信息
	findSomePerson: function(storeName, username, handler) {
		//debugger
		var transaction = db.transaction(storeName, "readwrite");
		var objectStore = transaction.objectStore(storeName);
		var request = objectStore.get(username);
		request.onsuccess = function(event) {
			handler(event);
		};
	},
	//修改用户密码
	updatePerson: function(storeName, username, handler) {
			var transaction = db.transaction(storeName, "readwrite");
			var objectStore = transaction.objectStore(storeName);
			//通过用户名查找到对应的一条记录
			var request = objectStore.get(username);
			request.onsuccess = function(event) {
				handler(objectStore, event);
			};
		}
		/*
		deletePerson:function(storeName, username, handler){
			var transaction = db.transaction(storeName, "readwrite");
			var objectStore = transaction.objectStore(storeName);
			//通过用户名查找到对应的一条记录
			var request = objectStore.delete(username);
			request.onsuccess = function(event) {
				handler(objectStore, event);
			};
		}
		*/
};



/*
$("#removeBtn").click(function() {
	var rollNo = $("#rollno").val();
	db.transaction(["students"], "readwrite").objectStore("students").delete(rollNo);
});
*/


//用户的个人数据
var option = {
	"username": "java",
	"telephone": "15611112222",
	"password": "123456",
	"saying": "今天，你编程了吗？",
	"perDataInfo": {
		"imgsrc": "img/Leslie.png",
		"realName": "Java",
		"telephone": "12345678923",
		"gender": "男",
		"birthday": "2017.03.10",
		"email": "www.javaEmail.com",
		"address": "上海闵行区",
		"nowStayCity": "上海",
		"school": "江西理工",
		"company": "网易",
		"website": "www.java.com",
		"introduction": "java是一门很高深的语言，需要大家耐心钻研！"
	},
	"workDataInfo": {
		"experience": "一年",
		"wantJob": "java开发工程师",
		"wantSalary": "8000",
		"wantCity": "广州、上海、深圳"
	},
	"fansDataInfo": [{
		"username": "feedblog",
		"saying": "走进李宗盛的生活",
		"imgsrc": "img/Lizs.png"
	}],
	"attentionsDataInfo": [{
		"username": "张三",
		"saying": "努力奋斗！",
		"imgsrc": "img/Jay.png"
	}, {
		"username": "feedblog",
		"saying": "走进李宗盛的生活",
		"imgsrc": "img/Lizs.png"
	}],
	"articleDataInfo": [{
		"type": "文章",
		"title": ".javaScript的2种变量范围有什么不同？",
		"con": "全局变量：当前页面内有效 局部变量：方法内有效 全局变量：当前页面内有效 局部变量：方法内有效 全局变量：当前页面内有效 局部变量：方法内有效 全局变量：当前页面内有效 局部变量：方法内有效 全局变量：当前页面内有效 局部变量：方法内有效",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}, {
		"type": "文章",
		"title": "谈一谈Javascript作用域链",
		"con": "当执行一段Javascript代码（全局代码或函数）时，Javascript引擎会创建为其创建一个作用域又称为执行上下文（Execution Context），在页面加载后会首先创建一个全局的作用域，然后每执行一个函数，会建立一个对应的作用域，从而形成了一条作用域链。每个作用域都有一条对应的作用域链，链头是全局作用域，链尾是当前函数作用域。 作用域链的作用是用于解析标识符，当函数被创建时（不是执行），会将this、arguments、命名参数和该函数中的所有局部变量添加到该当前作用域中，当Javascript需要查找变量X的时候（这个过程称为变量解析），它首先会从作用域链中的链尾也就是当前作用域进行查找是否有X属性，如果没有找到就顺着作用域链继续查找，直到查找到链头，也就是全局作用域链，仍未找到该变量的话，就认为这段代码的作用域链上不存在x变量，并抛出一个引用错误（ReferenceError）的异常。",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}, {
		"type": "文章",
		"title": "如何理解Javascript原型链",
		"con": "Javascript中的每个对象都有一个prototype属性，我们称之为原型，而原型的值也是一个对象，因此它也有自己的原型，这样就串联起来了一条原型链，原型链的链头是object,它的prototype比较特殊，值为null。 原型链的作用是用于对象继承，函数A的原型属性(prototype property)是一个对象，当这个函数被用作构造函数来创建实例时，该函数的原型属性将被作为原型赋值给所有对象实例，比如我们新建一个数组，数组的方法便从数组的原型上继承而来。 当访问对象的一个属性时, 首先查找对象本身, 找到则返回; 若未找到, 则继续查找其原型对象的属性(如果还找不到实际上还会沿着原型链向上查找, 直至到根). 只要没有被覆盖的话, 对象原型的属性就能在所有的实例中找到，若整个原型链未找到则返回undefined；",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}],
	"hottopicDataInfo": [{
		"type": "头条",
		"title": ".form中的input可以设置为readonly和disable，请问2者有什么区别？",
		"con": "readonly不可编辑，但可以选择和复制；值可以传递到后台 disabled不能编辑，不能复制，不能选择；值不可以传递到后台 readonly不可编辑，但可以选择和复制；值可以传递到后台 disabled不能编辑，不能复制，不能选择；值不可以传递到后台",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}],
	"noteDataInfo": [{
		"type": "笔记",
		"title": "Javascript基础数据类型",
		"con": "Javascript数据类型包括原始类型和引用类型，原始类型有五个:   Number（数值） String（字符串） Boolean（布尔） Null（空） Undefined（未定义） 引用类型有一个：  Object（对象） 通过typeof(x)可以返回一个变量x的数据类型“number”、“string”、“boolean”、“undefined”、\"object\"，这里要注意一点：typeof运算符对于null类型返回的是object。 《Javascript高级程序设计》：  这实际上是Javascript最初实现中的一个错误，后来被ECMAscript沿用了。现在null被认为是对象的占位符，从而解释了这一矛盾。但是从技术上来说，它仍然是原始值。",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}, {
		"type": "笔记",
		"title": "如何理解和应用Javascript闭包",
		"con": "关于闭包具体的定义文献中给的概念很抽象，我认为闭包是一种使函数能够都去其它函数的局部变量的语法机制。 举个例子： function outFunc(){  var name = \"Vicfeel\";  function inFunc(){   console.log(name);  }  return inFunc; } inFunc(); //控制台显示\"Vicfeel\" 这这个例子我们可以看出，在函数inFunc中依然可以访问outFunc的局部变量name。 闭包应用举例，模拟类的私有属性,利用闭包的性质，局部变量只有在sayAge方法中才可以访问，而name在外部也访问，从而实现了类的私有属性。 function User(){   this.name = \"Vicfeel\"; //共有属性   var age = 23; //私有属性   this.sayAge:function(){    console.log(\"my age is \" + age);    }  }  var user = new User();  console.log(user.name); //\"Vicfeel\"  console.log(user.age); //\"undefined\"  user.sayAge(); //\"my age is 23\" 要了解详细的闭包，推荐一下 阮一峰的网络日志-学习Javascript闭包（Closure）。",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}],
	"markDataInfo": []
};
