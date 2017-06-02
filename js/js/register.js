/*
	注册页面 js
*/
require(['config'],function(){
	//加载需要用到的模块
	require(['jquery'],function($){

		//注册处理

		//定义各个注册信息的状态  默认都是false
		var  regStatus = {
			uname: false,
			psw: false
		};

		//定义需要用到的变量
		var unameInput = $('form .account'),
			pswInput = $('form .password'),
			npswInput = $('form .npassword'),
			phoneInput = $('form .phone'),
			title1 = $('form .con1 span'),
			title2 = $('form .con2 span'),
			title3 = $('form .con3 span'),
			title4 = $('form .con4 span'),
			title5 = $('form .con5 span'),
			authcode = $('form .form-authcode'),
			code = $('form .code'),
			regBtn = $('.btn-register');


		//账号验证 (失焦验证  1、用户名是否合法  2、用户名是否已经存在)
		var regUname = /^[a-zA-Z_]\w{5,15}$/;
		unameInput.blur(function(){
			var uname = unameInput.val();
			//假设用户名正确
			regStatus.uname = true;

			//判断用户名是否合法
			if(!regUname.test(uname)){
				title1.html('用户名不合法');
				regStatus.uname = false;						
				return;
			}

			//判断用户名是否已被注册
			$.ajax({
				url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
				data: {
					status:'register',
					userID:uname
				},
				success: function(result){
					console.log(result);
					if(result){
						title1.html('用户名可用');
					}else{
						title1.html('用户名已存在');
						regStatus.uname = false;
						return;
					}
				}
			});

		});

		//密码验证
		var regPsw = /^[\w!@#$%^&*_+]{6,16}$/; 
		pswInput.on('input',function(){
			var psw = pswInput.val();
			regStatus.psw = true;
			//密码处理...
			if(!regPsw.test(psw)){
				title2.html('密码不合法');
				regStatus.psw = false;				
			}else{
				title2.html('密码可用');			
			}
		});
		// 判断再次确认密码与设置的密码是否相同
		npswInput.on('input',function(){
			var psw = pswInput.val();
			var npsw = npswInput.val();
			if(regPsw.test(psw) != regPsw.test(npsw)){
				title3.html('密码不一致');
			}else{
				title3.html('恭喜密码设置成功');
			}
		});
		


		//手机号验证
		var regPhone = /^1[3578]\d{9}$/; 
		phoneInput.on('input',function(){
			var phone = phoneInput.val();
			regStatus.phone = true;
			//手机号处理...
			if(!regPhone.test(phone)){
				title4.html('手机号不合法');
				regStatus.phone = false;
			}else{
				title4.html('手机号可用');
			}
		});

		//生成验证码
		code.click(function(){
			var random = parseInt( Math.random()*Math.pow(36,4) );
			//console.log(random);
			var v = ('0000'+random.toString(36)).substr(4); 
			code.html(v);
		});
		authcode.blur(function(){
			var a = authcode.val();
			var b = code.html();
			//console.log(b);
			if ( a != b ) {
				title5.html('验证码不正确');
			}else{
				title5.html('验证码正确');
			}
		});


		//点击登录
		regBtn.click(function(){

			//判断所有的信息状态，如果有不合法的，不能注册
			for(var i in regStatus){
				//如果找到某个输入不合法，做出相应的提示并返回
				if(!regStatus[i]){
					alert('部分数据不合法');
					return;
				}
			}

			//通过ajax提交表单数据
			$.ajax({
				type: 'post',
				url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
				data: {
					status:'register',
					userID:uname,
					password:psw
				},
				success: function(result){
					console.log(result);
					if(result){
						alert('注册成功');
					}else{
						alert('注册失败');
					}
				}
			});
		});


	});
});