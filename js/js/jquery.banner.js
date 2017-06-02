/*
	轮播插件
*/
jQuery.fn.banner = function(options){
	options = jQuery.extend({
		btn_left_value:"<",
		btn_right_value:">",
		frquency:3000
	},options || {})

	var index = 0;
	var timer = null ;
	var strBtn = '<div class="btn">'+
					'<button id="left_btn">'+options.btn_left_value+'</button>'+
					'<button id="right_btn">'+options.btn_right_value+'</button>'+
				 '</div>'
	var $btn = $(strBtn);
	this.append($btn);

	var imgNum = this.children("ul").children().size();

	var that = this;

	this.find("#right_btn").on("click",function(){
		if(index == imgNum - 1){
			index = 0;
		}else{
			index ++;
		}
		that.children("ul").children().eq(index)
		.stop().fadeIn()
		.siblings()
		.stop().fadeOut();
	})

	this.on("mouseenter",function(){

		clearInterval(timer);

	})

	this.on("mouseleave",function(){

		timer = setInterval(function(){

			$(".btn button").eq(1).trigger("click");

		}, options.frquency);

	})


	timer = setInterval(function(){

		$(".btn button").eq(1).trigger("click");

	}, options.frquency);

}