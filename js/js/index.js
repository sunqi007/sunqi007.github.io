/*
	首页js
*/
require(['config'],function(){
	require(['jquery','jquery.banner'],function($,jb){
		
			/*
				回到顶部
			*/
			$('.icon-top').click(function(){
				//console.log( $('body').scrollTop() );
				$('html,body').animate({scrollTop:0},500);
			});
			$('.floor-top').click(function(){
				$('html,body').animate({scrollTop:0},500);
			});
			/*
				右边侧边栏
			*/
		
			
			$('.icon-item-1').mouseenter(function(){
				$(this).children('.icon-name').stop().animate({width:80},300);
			});
			$('.icon-item-1').mouseleave(function(){
				$(this).children('.icon-name').stop().animate({width:0},300);
			});
			$('.icon-item-2').mouseenter(function(){
				$(this).children('.icon-name').stop().animate({width:80},300);
			});
			$('.icon-item-2').mouseleave(function(){
				$(this).children('.icon-name').stop().animate({width:0},300);
			});
			$('.icon-item-3').mouseenter(function(){
				$(this).children('.icon-name').stop().animate({width:80},300);
			});
			$('.icon-item-3').mouseleave(function(){
				$(this).children('.icon-name').stop().animate({width:0},300);
			});
			$('.icon-item-4').mouseenter(function(){
				$(this).children('.icon-name').stop().animate({width:80},300);
			});
			$('.icon-item-4').mouseleave(function(){
				$(this).children('.icon-name').stop().animate({width:0},300);
			});
			$('.icon-item-5').mouseenter(function(){
				$(this).children('.icon-name').stop().animate({width:80},300);
			});
			$('.icon-item-5').mouseleave(function(){
				$(this).children('.icon-name').stop().animate({width:0},300);
			});
			$('.icon-item-6').mouseenter(function(){
				$(this).children('.icon-name').stop().animate({width:80},300);
			});
			$('.icon-item-6').mouseleave(function(){
				$(this).children('.icon-name').stop().animate({width:0},300);
			});
			$('.icon-item-7').mouseenter(function(){
				$(this).children('.icon-name').stop().animate({width:80},300);
			});
			$('.icon-item-7').mouseleave(function(){
				$(this).children('.icon-name').stop().animate({width:0},300);
			});
			$('.icon-item-8').mouseenter(function(){
				$(this).children('.icon-name').stop().animate({width:80},300);
			});
			$('.icon-item-8').mouseleave(function(){
				$(this).children('.icon-name').stop().animate({width:0},300);
			});

			var rg = $('.rb-qr');
			$('.icon-1').mouseenter(function(){
				rg.stop().animate({width:300},300);
			});
			$('.icon-1').mouseleave(function(){
				rg.stop().animate({width:0},300);
			});
			

			/*
				banner图轮播
			*/
			var banner = {
				imgs: $('.banner img'),
				sqqR: $('.sqq-right'),
				sqqL: $('.sqq-left'),
				circles: $('.circle-item'),
				banner: $('.banner'),
				now: 0,
				next: 0,
				timer: null,
				init: function(){
					this.autoPlay();
					this.dianji();
					this.xiaoyuanquan();
					this.tingzhi();
				},
				dianji: function(){
					var _this = this;
					this.sqqR.click(function(){
						_this.next++;
						_this.next %= _this.imgs.length;
						_this.imgSwitch();
					});
					this.sqqL.click(function(){
						_this.next--;
						_this.next %= _this.imgs.length-1;
						if(_this.next < 0){
							_this.next = _this.imgs.length-1;
						}
						_this.imgSwitch();
					});
				},
				xiaoyuanquan: function(){
					var _this = this;
					for(var i=_this.circles.length-1; i>=0; i--){
						_this.circles[i].index = i;
						_this.circles.mouseenter(function(){
							_this.now = _this.circles.index;
							_this.imgSwitch();		
						});
					}
				},
				tingzhi: function(){
					var _this = this;
					this.banner.on('mouseenter',function(){
						clearInterval(_this.timer);
					});
					this.banner.mouseleave(function(){
						_this.autoPlay();
					});
				},
				autoPlay:function(){
					var _this = this;
					this.timer = setInterval(function(){
						_this.next++;
						_this.next %= _this.imgs.length;
						_this.imgSwitch();
					},2000);
				},
				imgSwitch: function(){
					this.imgs.eq(this.now).stop().fadeTo(1000,0);
					this.imgs.eq(this.next).stop().fadeTo(1000,1);
					this.circles.removeClass('active');
					this.circles.eq(this.next).addClass('active');
					this.now = this.next;
				}
			};
			banner.init();

			/*
				大牌推荐
			*/
			var allCurrent = $('.current');
			var brandItem = $('.brand-list-item');
			allCurrent.mouseenter(function(){
				brandItem.eq($(this).index()).show().siblings().hide();
			});

			/*
				国家馆的手风琴
			*/
			$('.hp-global ul li').mouseenter(function(){
				$(this).stop().animate({'width':'40%'}).siblings().stop().animate({'width':'20%'});
			});
			/*
				轮播插件
			*/
			$('.swiper-wrapper-1').banner();
			$('.swiper-wrapper-2').banner();
			$('.swiper-wrapper-3').banner();
			$('.swiper-wrapper-4').banner();
			$('.swiper-wrapper-5').banner();
			$('.swiper-wrapper-6').banner();

			/*
				护肤的选项卡
			*/
			var bsw = $('.brand-swiper ul');
			$('.floor-con-brand .paging span').mouseenter(function(){
				$(this).addClass('current').siblings().removeClass('current');
				bsw.eq($(this).index()).show().siblings().hide();
			});

			/*
				楼层
			*/
			var floor = {
				floorBox: $('.floor'),
				floorItem: $('.floor-item'),
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
						if(scrollT >= 1000){
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
									.addClass('active')
									.siblings().removeClass('active');
								break;
							}
						}
					});
				},
				swichFloor: function(){
					var that = this;
					this.floorList.click(function(){
						that.flag = false;
						$(this).addClass('active').siblings().removeClass('active');
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
				免税热卖选项卡
			*/
			var allCon = $('.hp-hotsale .ul-goodsl-list');
			$('.tab ul li').click(function(){
				$(this).addClass('click_focus').siblings().removeClass('click_focus');
				allCon.eq($(this).index()).show().siblings().hide();
			});
			/*
				加载底部的html
			*/
			$('.footer1').load('http://localhost/workspace/trunk/sunqi/mianshui365/src/footer.html');
	});
	
});
