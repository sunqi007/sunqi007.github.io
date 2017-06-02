/*
	列表页js
*/
	$(function(){


		$('.s-c-more').eq(0).click(function(){
			$('.s-c-con').eq(0).toggleClass('s-c-con-open');
			$(this).eq(0).toggleClass('s-c-more-open');
		});
		$('.s-c-more').eq(1).click(function(){
			$('.s-c-con').eq(1).toggleClass('s-c-con-open');
			$(this).eq(1).toggleClass('s-c-more-open');
		});
		$('.s-c-more').eq(2).click(function(){
			$('.s-c-con').eq(2).toggleClass('s-c-con-open');
			$(this).eq(2).toggleClass('s-c-more-open');
		});
		$('.s-order-tab .item').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
		});

		/*
			引入页面底部
		*/
		$('.footer1').load('http://localhost/workspace/trunk/sunqi/mianshui365/src/footer.html');


		/*
			分页（列表页）
		*/
		var pag = new Pagination();
		pag.init();
	});
			

        function Pagination(){
			this.json = null;
			this.index = 0;
			this.showNum = 25;
		}
		Pagination.prototype.init = function(showNum){
			if(showNum){
				this.showNum = showNum;
			}
			if(this.json == null){
				var _this = this;
				$.ajax("http://localhost/workspace/trunk/sunqi/mianshui365/src/json/list.json")
				.then(function(result){
					if(typeof result != "object"){
						throw "获取失败";
					}
					_this.json = result;
					//console.log(_this.json);
					_this.usePagination();
					_this.renderingpage();
					
				});
			}else {
				this.usePagination();
				this.renderingpage();
				
			}
		}
		Pagination.prototype.usePagination = function(){
			var _this = this;
			var num = Math.ceil(this.json.length/this.showNum);
			$('#Pagination').pagination(num,{
				items_per_page: 1,
				prev_text: '上一页',
				next_text: '下一页',
				callback: function(index){
					_this.index = index;
					_this.renderingpage();
				}
			});
		}
		Pagination.prototype.renderingpage = function(){
			var html = '<ul class="ul-goodsl-list">';
			var _this = this;
			$.each(this.json,function(index,obj){
				if(index >= _this.index * _this.showNum && index < (_this.index+1) * _this.showNum){
					html += '<li class="goods-item">'+
								'<a href="javascript:;">'+
									'<dl>'+
										'<dt class="goods-icon"><img src="'+obj.img+'"></dt>'+
										'<dd class="brand text-ellipsis1">'+obj.name+'</dd>'+
										'<dd class="name text-ellipsis1">'+obj.type+'</dd>'+
										'<dd class="priceinfo">'+
											'<span class="price">'+
												'<i>￥</i>'+obj.price+
											'</span>'+
											'<span class="price price-old">'+
												'<i>￥</i>'+obj.priceOld+
											'</span>'+
										'</dd>'+
										'<dd class="activeinfo text-ellipsis1">'+
											'<span class="act">每满减</span>每满200减25'+
										'</dd>'+
									'</dl>'+
								'</a>'+
							'</li>';
				}
			});
			html += '</ul>';
			$('.s-data').html(html);
		}


			
