/*
	页面头部js
*/
	$(function(){
		/*
			引入到首页
		*/
		$('.top').load('http://localhost/workspace/trunk/sunqi/mianshui365/src/header.html',function(){
			var perc = $('.per_center');
			var kfc = $('.kf_center');
			var clt = $('.client');
			var country = $('.all_country');
			var brands = $('.brands');
			perc.mouseenter(function(){
				$('.dropdown').show();
			});
			perc.mouseleave(function(){
				$('.dropdown').hide();
			});

			kfc.mouseenter(function(){
				$('.kf_center_down').show();
			});
			kfc.mouseleave(function(){
				$('.kf_center_down').hide();
			});
			clt.mouseenter(function(){
				$('.client_down').show();
			});
			clt.mouseleave(function(){
				$('.client_down').hide();
			});
			brands.mouseenter(function(){
				$(this).children('.sub-block').show();
			});
			brands.mouseleave(function(){
				$(this).children('.sub-block').hide();
			});
			country.mouseenter(function(){
				$(this).children('.sub-block').show();
			});
			country.mouseleave(function(){
				$(this).children('.sub-block').hide();
			});

			/*
				侧边栏导航的选项卡效果
			*/
			var allSub = $('.sub-nav');
			$('#nav-items .item').mouseover(function(){
				$(this).addClass('active').siblings().removeClass('active');
				//console.log($(this).index());
				allSub.eq($(this).index()).show().siblings().hide();
				//console.log(allSub.eq($(this).index()).siblings());
			});
			$('#nav-items .item').mouseout(function(){
				$(this).removeClass('active');
				allSub.eq($(this).index()).hide();
			});

			/*
				搜索框
			*/
			var text = $('.search .txt');
			var btn = $('.btn-search');
			var ul = $('.keyword ul');
			$('.searchBtn').click(function(){
				window.location = 'http://www.baidu.com/s?wd=' + search.value;
			});
			//搜索框输入
			var script;
			text.on('input', function(e){
				stopPropagation(e);
				jsonp();
				index = -1;
			});
			ul.click(function(e){
				stopPropagation(e);
				e = e || window.event;
				var target = e.target || e.srcElement;
				if(target.nodeName == 'LI'){
					text.val = target.innerText;
					jsonp();
				};
				if(target.nodeName == 'B'){
					text.val += target.innerText;
				}
			});
			
			//获取关联词方法
			function jsonp(){
				var value = text.val();
				script && document.body.removeChild(script);
				script = document.createElement('script');
				script.src = 'http://suggestion.baidu.com/su?wd='+value+'&cb=getData';
				document.body.appendChild(script);
			}
			
			//将关联词放在搜索框下方
			getData = function(data){
				var value = text.val();
				var content = '';
				for(var i in data.s){
					var ds = data.s[i].substr(value.length);
					content += '<li>'+value+'<b>'+ds+'</b></li>'
				}
				ul.html(content);
			}
			
			//点击空白处，关联词框隐藏
			document.body.onclick = function(e){
				ul.hide();
			}
			//搜索框获焦时，关联词框显示
			text.focus(function(){
				ul.show();
			});
			text.click(function(e){
				stopPropagation(e);
			});
			//阻止冒泡
			function stopPropagation(e){
				e = e || window.event;
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;
				}
			}

		});
	});
		
