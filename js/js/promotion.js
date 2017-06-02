/*
	活动页面js
*/
require(['config'],function(){
	require(['jquery'],function($){
		/*
			热卖推荐倒计时
		*/
		var time = $('.time');
		// 设置一个未来时间
		var end = new Date('2017/06/2 20:30');
		// 设置一个定时器
		var timer = setInterval(function(){
			handleTime();
		},1000);
		// 手动添加现在的时间与未来时间的差
		function handleTime(){
			var now = new Date;
			//console.log(now);
			var num = end - now;
			//console.log(num);
			var d = parseInt(num/1000/60/60/24);
			var h = parseInt(num/1000/60/60);
			var m = parseInt(num/1000/60%60);
			var day = '剩余'+d+'天'+h+'小时'+m+'分';
			time.html(day);
			if(num <= 0){
				clearInterval(timer);
			}

		}

		/*
			热卖推荐选项卡
		*/
		var allCon = $('.single-goodlist .ul-goodsl-list');
		$('.tab ul li').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			allCon.eq($(this).index()).show().siblings().hide();
		});
		/*
			热卖推荐商品拼接
		*/
		$.ajax({
			url:"http://localhost/workspace/trunk/sunqi/mianshui365/src/json/promotion.json"
		})
		.then(function(res){
			var html = "";
			$.each(res,function(index,obj){
				html += '<ul class="goods-item">'+
							'<li><a href="javascript:;"><img src="'+obj.img+'"></a></li>'+
							'<li>'+obj.name+'</li>'+
							'<li>'+obj.type+'</li>'+
							'<li>'+obj.price+'</li>'+
						'</ul>';
			});
			$('.ul-goodsl-list').html(html);
		});

		/*
			国际品牌折扣商品拼接
		*/
		$.ajax({
			url:"http://localhost/workspace/trunk/sunqi/mianshui365/src/json/discount.json"
		})
		.then(function(res1){
			var con = "";
			$.each(res1,function(index1,obj1){
				con += '<li>'+
							'<a href="javascript:;">'+
								'<img src="'+obj1.img+'">'+
								'<div style="padding: 15px 0">'+
									'<span class="activity">'+obj1.activity+'</span>'+
									'<span class="introduce">'+obj1.introduce+'</span>'+
									'<span class="bt">'+obj1.button+'</span>'+
								'</div>'+
							'</a>'+
						'</li>';
			});
			$('.shopping-con').html(con);
		});

		/*
			活动页面的楼层
		*/
		var floor = {
			floorBox: $('.floor'),
			floorItem: $('.floor-title'),
			floorList: $('.floor-list'),
			flag: true, // true 自己滚动   false代表点击标签
			init: function(){
				
				this.scroll();
				
				this.swichFloor();
			},
			
			scroll: function(){
				var that = this;
				$(window).scroll(function(){
					//处理楼层标签的显示与隐藏
					var scrollT = $(this).scrollTop();
					if(scrollT >= 500){
						that.floorBox.fadeIn(300);
					}else{
						that.floorBox.fadeOut(300);
					}
					
					if(!that.flag){
						return;
					}

					for(var k=0; k<that.floorItem.length; k++){	
						var t =  that.floorItem.eq(k).offset().top;
						var bottom = t +  that.floorItem.eq(k).height();
						
						if(
							scrollT < t + $(window).height()/2
						){
							that.floorList.eq(k)
								.addClass('one')
								.siblings().removeClass('one');
							break;
						}
					}
				});
			},
			swichFloor: function(){
				var that = this;
				this.floorList.click(function(){
					that.flag = false;
					$(this).addClass('one').siblings().removeClass('one');
					var t = that.floorItem
						.eq($(this).index())
						.offset().top;
					$('html,body').stop(true).animate({
						scrollTop: t
					},function(){
						that.flag = true;
					});
				});
			}
		};
		floor.init();
		/*
			回到顶部
		*/
		$('.floor-top').click(function(){
			$('html,body').animate({scrollTop:0},500);
		});

		/*
			引入底部页面
		*/
		$('.footer1').load('http://localhost/workspace/trunk/sunqi/mianshui365/src/footer.html');

	});
});
	
/*<ul class="goods-item">
	<li><a href="javascript:;"><img src="imgs/hd1-1.jpg"></a></li>
	<li>BRAUN博朗</li>
	<li>电动剃须刀配件1系刀头网膜组合 10B</li>
	<li>¥74.4</li>
</ul>*/

/*<li>
	<a href="javascript:;">
		<img src="http://img.mianshui365.com/upload/00/1a/24/001a247521d6bd5fb19d1b7417a6aa75.jpg">
		<div style="padding: 15px 0">
			<span class="activity">蔻驰</span>
			<span class="introduce">全场低至322元</span>
			<span class="bt">立即抢购</span>
		</div>
	</a>
</li>*/