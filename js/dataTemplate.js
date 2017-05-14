[{
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
		"username": "feedblog",
		"saying": "走进李宗盛的生活",
		"imgsrc": "img/Lizs.png"
	}, {
		"username": "binbin",
		"saying": "春夏秋冬",
		"imgsrc": "img/Leslie_.png"
	}],
	"articleDataInfo": [{
		"type": "文章",
		"title": ".javaScript的2种变量范围有什么不同？",
		"con": "全局变量：当前页面内有效局部变量：方法内有效全局变量：当前页面内有效局部变量：方法内有效全局变量：当前页面内有效局部变量：方法内有效全局变量：当前页面内有效局部变量：方法内有效全局变量：当前页面内有效局部变量：方法内有效",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}, {
		"type": "文章",
		"title": "谈一谈Javascript作用域链",
		"con": "当执行一段Javascript代码（全局代码或函数）时，Javascript引擎会创建为其创建一个作用域又称为执行上下文（Execution Context），在页面加载后会首先创建一个全局的作用域，然后每执行一个函数，会建立一个对应的作用域，从而形成了一条作用域链。每个作用域都有一条对应的作用域链，链头是全局作用域，链尾是当前函数作用域。作用域链的作用是用于解析标识符，当函数被创建时（不是执行），会将this、arguments、命名参数和该函数中的所有局部变量添加到该当前作用域中，当Javascript需要查找变量X的时候（这个过程称为变量解析），它首先会从作用域链中的链尾也就是当前作用域进行查找是否有X属性，如果没有找到就顺着作用域链继续查找，直到查找到链头，也就是全局作用域链，仍未找到该变量的话，就认为这段代码的作用域链上不存在x变量，并抛出一个引用错误（ReferenceError）的异常。",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}],
	"hottopicDataInfo": [{
		"type": "头条",
		"title": ".form中的input可以设置为readonly和disable，请问2者有什么区别？",
		"con": "readonly不可编辑，但可以选择和复制；值可以传递到后台disabled不能编辑，不能复制，不能选择；值不可以传递到后台readonly不可编辑，但可以选择和复制；值可以传递到后台disabled不能编辑，不能复制，不能选择；值不可以传递到后台",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}],
	"noteDataInfo": [{
		"type": "笔记",
		"title": "Javascript基础数据类型",
		"con": "Javascript数据类型包括原始类型和引用类型，原始类型有五个:  Number（数值） String（字符串） Boolean（布尔） Null（空） Undefined（未定义）引用类型有一个： Object（对象）通过typeof(x)可以返回一个变量x的数据类型“number”、“string”、“boolean”、“undefined”、\"object\"，这里要注意一点：typeof运算符对于null类型返回的是object。《Javascript高级程序设计》： 这实际上是Javascript最初实现中的一个错误，后来被ECMAscript沿用了。现在null被认为是对象的占位符，从而解释了这一矛盾。但是从技术上来说，它仍然是原始值。",
		"author": "java",
		"date": "2017年03月26日",
		"imgsrc": "img/Leslie.png"
	}],
	"markDataInfo": [{
		"title": "谈谈final, finally, finalize的区别。 ",
		"author": "lisi",
		"con": "final?修饰符（关键字）如果一个类被声明为final，意味着它不能再派生出新的子类，不能作为父类被继承。因此一个类不能既被声明为 abstract的，又被声明为final的。将变量或方法声明为final，可以保证它们在使用中不被改变。被声明为final的变量必须在声明时给定初值，而在以后的引用中只能读取，不可修改。被声明为final的方法也同样只能使用，不能重载 ",
		"date": "2017年03月26日"
	}],
	"protectpwdDataInfo": {
		"question1": "你最喜欢哪首歌？",
		"answer1": "春夏秋冬",
		"question2": "你最喜欢哪支球队？",
		"answer2": "骑士队"
	}
}
]