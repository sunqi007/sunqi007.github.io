/*
	购物车页面js
*/
require(['config'],function(){
	require(['jquery','cart','template','layer','jquery.cookie'],function($,ct,template,layer){
		// 用到layer时 需要重新配置一下layer文件
		layer.config({
			baseUrl: 'js',
			path: "js/plug/layer/"
		});
		$(function(){
			var cart = {
				cart: {},
				data: {},
				cartMain: $('.cart-main-content'),
				init: function(){
					var _this = this;
					//读取cookie
					this.readCookie();
					$.getJSON('json/data.json',function(data){
						_this.data = data;
						var result = {
							cart:_this.cart,
							data: data
						};
						var list = template('cart-list',result);
						_this.cartMain.html( list );
					});

					//更改数量
					this.increase();
					this.decrease();
					this.input();

					//删除
					this.delete();
					this.deleteSelect();

					//选中
					this.select();
					this.selectAll();
				},
				//数量增加
				increase: function(){
					var _this = this;
					this.cartMain.on('click','.amount-increase',function(){
						var amount = parseInt(  $(this).prev().val() );
						//获取库存
						var stock = $(this).parent().data('stock');
						if(amount >= stock) return;
						amount++;

						_this.handleMoney( $(this), amount );
					});
				},
				//数量减少
				decrease: function(){
					var _this = this;
					this.cartMain.on('click','.amount-decrease',function(){
						var amount = parseInt( $(this).next().val() );
						if(amount <= 1) return;
						amount--;
						_this.handleMoney( $(this), amount );
					});
				},
				//直接输入
				input: function(){
					var _this = this;
					this.cartMain.on('input','.amount-input',function(){
						var amount = parseInt( $(this).val() );

						//一些处理
						
						_this.handleMoney( $(this), amount );
					});
				},
				//处理数量  小计
				handleMoney: function(obj,amount){
					var money = amount * obj.parents('.cart-goods-item')
							.find('.goods-price').html();
						
					obj.parents('.cart-goods-item')
						.find('.goods-money').html( money.toFixed(2) );

					obj.parent().find('.amount-input').val(amount);

					//改变cart
					var id = obj.parents('.cart-goods-item').data('id');
					this.cart[id].amount = amount;
					this.setCookie();

					this.handleInfo();
				},
				//删除
				delete: function(){
					var _this = this;
					this.cartMain.on('click','.delete',function(){
						var that = this;
						layer.confirm('确定删除宝贝吗？',function(){
							layer.closeAll();
							//处理
							//从页面上删除
							$(that).parents('.cart-goods-item').remove();
							//从cookie删除
							var id = $(that).parents('.cart-goods-item').data('id');
							delete _this.cart[id];
							_this.setCookie();
						});
					});
				},
				//批量删除
				deleteSelect: function(){
					var _this = this;
					$('.cart-option .delete').click(function(){
						var allChecked = _this.cartMain.find('input[type=checkbox]:checked');
						//判断是否选中
						if(allChecked.length <= 0){
							layer.alert('请选择商品');
							return;
						}
						layer.confirm('确认删除选中的商品吗？',function(){
							allChecked.each(function(){
								layer.closeAll();
								//处理
								//从页面上删除
								$(this).parents('.cart-goods-item').remove();
								//从cookie删除
								var id = $(this).parents('.cart-goods-item').data('id');
								delete _this.cart[id];
								_this.setCookie();

								//更新总价和全选
								_this.handleInfo();
								$('input.select-all-btn').prop('checked',false);
							});
						});
					});
				},
				select: function(){
					var _this = this;
					this.cartMain.on('change','input[type=checkbox]',function(){

						_this.handleInfo();

						//判断是否需要选中全选按钮
						var allChecked = _this.cartMain.find('input[type=checkbox]:checked');
						var allCheckBox = _this.cartMain.find('input[type=checkbox]');
						if(allChecked.length === allCheckBox.length){
							$('input.select-all-btn').prop('checked',true);
						}else{
							$('input.select-all-btn').prop('checked',false);
						}
					});
				},
				//全选
				selectAll: function(){
					var _this = this;
					$('input.select-all-btn').click(function(){
						//获取自己的状态
						var status = $(this).prop('checked');
						//所有商品状态
						_this.cartMain.find('input').prop('checked',status);
						_this.cartMain.find('input').change();
						//全选按钮状态
						$('input.select-all-btn').prop('checked',status);
					});
				},
				//处理件数和总价
				handleInfo: function(){
					//获取所有被选中的商品
					var allChecked = this.cartMain.find('input[type=checkbox]:checked');
				
					var totalNum = 0;
					var totalMoney = 0;
					//变量所有被选中的商品
					allChecked.each(function(){
						totalNum++;
						var m = $(this).parents('.cart-goods-item').find('.goods-money').html();
						totalMoney += parseFloat( m );
					});

					//判断是否可以结算
					if(totalNum > 0){
						$('.go-pay').addClass('can-pay');
					}else{
						$('.go-pay').removeClass('can-pay');
					}

					//更改件数和总价
					$('.user-goods-amount').html( totalNum );
					$('.user-goods-money').html( totalMoney.toFixed(2) );
				},
				readCookie: function(){
					this.cart = $.cookie('tm-cart') || '{}';
					this.cart = JSON.parse( this.cart );
				},
				setCookie: function(){
					$.cookie('tm-cart',JSON.stringify(this.cart),{expires: 365,path: '/'});
				}
			};
			cart.init();
		});
		/*
			加载页面底部
		*/
		$('.footer1').load('http://localhost/workspace/trunk/sunqi/mianshui365/src/footer.html');

	});
});