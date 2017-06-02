/*
	详情页面  js
*/
require(['config'],function(){
	require(['jquery','template','jquery.cookie','layer'],function($,template){
		layer.config({
			baseUrl: 'js',
			path: "js/plug/layer/"
		});
		var glass = $('.glass'),
			midWrap = $('.middle'),
			filter = $('.filter'),
			largeWrap = $('.large'),
			midImg = $('.middle img'),
			largeImg = $('.large img'),
			imgs = $('.img-wrap img'),
			arrowR = $('.glass-slide .arrow-right'),
			arrowL = $('.glass-slide .arrow-left'),
			imgWrap = $('.img-wrap');

		var ol = midWrap.offset().left;
		var ot = midWrap.offset().top;

		midWrap.mousemove(function(e){
			e = e || window.event;
			var l = e.pageX - ol - 255;
			var t = e.pageY - ot - 255;

			l = l < 0 ? 0 : (l> 200 ? 200 : l);
			t = t < 0 ? 0 : (t> 200 ? 200 : t);

			filter.css({
				left:l,
				top:t
			});
			largeImg.css({
				left: -l*2,
				top: -t*2
			});
		});
		midWrap.mouseenter(function(){
			filter.show();
			largeWrap.show();
		});
		midWrap.mouseleave(function(){
			filter.hide();
			largeWrap.hide();
		});

		imgs.click(function(){
			var src = $(this).attr('data-url');
			midImg.attr('src',src);
			largeImg.attr('src',src);
			$(this).addClass('active').siblings().removeClass('active');
		});
		var index = 0;
		arrowR.click(function(){
			index++;
			if(index > imgs.length - 8){
				index = imgs.length - 8;
			}
			stop(true);
			imgWrap.animate({
				marginLeft: -index*90
			});
		});
		arrowL.click(function(){
			index--;
			if(index < 0){
				index = 0;
				return;			
			}
			stop(true);
			imgWrap.animate({
				marginLeft: -index*90
			});
		});

		var detail = {
			data: {},
			init: function(){
				var _this = this;
				$.getJSON('json/data.json',function(result){
					_this.data = result;
					var list = template('type-list',result);
					$('.color-content').html( list );
					var first = $('.color-content li:first');
					first.addClass('selected');
					var id = first.data('id');
					$('.goods-price').html( result.color[id].sale_price );
					$('.stock-num').html( result.color[id].stock );
				});

				this.colorSwitch();
				this.increase();
				this.decrease();
				this.input();
				this.addToCart();
			},
			colorSwitch: function(){
				var _this = this;
				$('.color-content').on('click','.tb-con-item',function(){
					$(this).addClass('selected').siblings().removeClass('selected');
					var id = $(this).data('id');
					$('.goods-price').html( _this.data.color[id].sale_price );
					$('.stock-num').html( _this.data.color[id].stock );
				});
			},
			increase: function(){
				$('.amount-increase').click(function(){
					var amount = parseInt( $(this).prev().val() );
					var stock = $('.stock-num').html();
					if(amount >= stock) return;
					amount++;
					$(this).prev().val( amount );
				});
			},
			decrease: function(){
				$('.amount-decrease').click(function(){
					var input = $(this).parent().find('.amount-input');
					var amount = parseInt( input.val() );
					if(amount <= 1) return;
					amount--;
					input.val(amount);
				});
			},
			input: function(){
				$('.amount-input').on('input',function(){
					var amount = $(this).val();
					if(amount === '') return;
					amount = parseInt(amount);
					if( isNaN(amount) ){
						amount = 1;
					}

					var stock = $('.stock-num').html();
					if(amount >= stock){
						amount = stock;
					}
					$(this).val(amount);
				});
				
				$('.amount-input').blur(function(){
					var amount = $(this).val();
					if(amount === ''){
						 $(this).val(1);
					}
				});
			},
			addToCart: function(){
				$('.option-addCart').click(function(){
					var goods = $('.tb-con-item.selected');
					var id = goods.data('id');
					var amount = parseInt( $('.amount-input').val() );		
					var cart = $.cookie('tm-cart') || '{}';
					cart = JSON.parse(cart);	
					if(!cart[id]){
						cart[id] = {
							id: id,
							amount: amount
						};
					}else{
						cart[id].amount += amount;
					}
					layer.alert('成功加入购物车');		
					$.cookie('tm-cart',JSON.stringify(cart),{expires: 365,path: '/'});
				});
			}
		};
		detail.init();
		/*
			引入页面底部
		*/

		$('.footer1').load('http://localhost/workspace/trunk/sunqi/mianshui365/src/footer.html');
	});
});