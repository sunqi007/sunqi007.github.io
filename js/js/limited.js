
	/*
		限量抢
	*/
	var con = document.querySelector('.hp-limited-goods');
		sqq();
		function sqq(){
			var xhr = new XMLHttpRequest();
			xhr.open('get','json/limited.json');
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if( xhr.readyState == 4 && xhr.status == 200 ){
					var r = JSON.parse( xhr.responseText );
					handle(r);
				}
			}
		}
		function handle(r){
			var str = '';
			for(var i in r){
				//console.log(r[i]);
				str += `
						<ul>
							<li><a href="details.html" target="_blank"><img src="  ${r[i].img}"></a></li>
							<li>${r[i].name}</li>
							<li>${r[i].type}</li>
							<li>${r[i].price}</li>
						</ul>
				`;
		}
		//console.log(str);
		con.innerHTML = str;
	}

	/*
		护肤
	*/
	var con1 = document.querySelector('.con-item-1');
		sqq1();
		function sqq1(){
			var xhr = new XMLHttpRequest();
			xhr.open('get','json/goods.json');
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if( xhr.readyState == 4 && xhr.status == 200 ){
					var r1 = JSON.parse( xhr.responseText );
					handle1(r1);
				}
			}
		}
		function handle1(r1){
			var str1 = '';
			for(var i in r1){
				//console.log(r[i]);
				str1 += `
						<ul>	
							<li>${r1[i].name}</li>
							<li>${r1[i].type}</li>
							<li>${r1[i].price}</li>
							<li><img src="${r1[i].img}"></li>
						</ul>
				`;
		}
		//console.log(str1);
		con1.innerHTML = str1;
	}
	/*
		彩妆香氛
	*/
	var con2 = document.querySelector('.con-item-2');
		sqq2();
		function sqq2(){
			var xhr = new XMLHttpRequest();
			xhr.open('get','json/goods1.json');
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if( xhr.readyState == 4 && xhr.status == 200 ){
					var r2 = JSON.parse( xhr.responseText );
					handle2(r2);
				}
			}
		}
		function handle2(r2){
			var str2 = '';
			for(var i in r2){
				//console.log(r[i]);
				str2 += `
						<ul>	
							<li>${r2[i].name}</li>
							<li>${r2[i].type}</li>
							<li>${r2[i].price}</li>
							<li><img src="${r2[i].img}"></li>
						</ul>
				`;
		}
		//console.log(str1);
		con2.innerHTML = str2;
	}
	/*
		腕表
	*/
	var con3 = document.querySelector('.con-item-3');
		sqq3();
		function sqq3(){
			var xhr = new XMLHttpRequest();
			xhr.open('get','json/goods2.json');
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if( xhr.readyState == 4 && xhr.status == 200 ){
					var r3 = JSON.parse( xhr.responseText );
					handle3(r3);
				}
			}
		}
		function handle3(r3){
			var str3 = '';
			for(var i in r3){
				//console.log(r[i]);
				str3 += `
						<ul>	
							<li>${r3[i].name}</li>
							<li>${r3[i].type}</li>
							<li>${r3[i].price}</li>
							<li><img src="${r3[i].img}"></li>
						</ul>
				`;
		}
		//console.log(str1);
		con3.innerHTML = str3;
	}
	/*
		箱包
	*/
	var con4 = document.querySelector('.con-item-4');
		sqq4();
		function sqq4(){
			var xhr = new XMLHttpRequest();
			xhr.open('get','json/goods3.json');
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if( xhr.readyState == 4 && xhr.status == 200 ){
					var r4 = JSON.parse( xhr.responseText );
					handle4(r4);
				}
			}
		}
		function handle4(r4){
			var str4 = '';
			for(var i in r4){
				//console.log(r[i]);
				str4 += `
						<ul>	
							<li>${r4[i].name}</li>
							<li>${r4[i].type}</li>
							<li>${r4[i].price}</li>
							<li><img src="${r4[i].img}"></li>
						</ul>
				`;
		}
		//console.log(str1);
		con4.innerHTML = str4;
	}
	/*
		配饰
	*/
	var con5 = document.querySelector('.con-item-5');
		sqq5();
		function sqq5(){
			var xhr = new XMLHttpRequest();
			xhr.open('get','json/goods4.json');
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if( xhr.readyState == 4 && xhr.status == 200 ){
					var r5 = JSON.parse( xhr.responseText );
					handle5(r5);
				}
			}
		}
		function handle5(r5){
			var str5 = '';
			for(var i in r5){
				//console.log(r[i]);
				str5 += `
						<ul>	
							<li>${r5[i].name}</li>
							<li>${r5[i].type}</li>
							<li>${r5[i].price}</li>
							<li><img src="${r5[i].img}"></li>
						</ul>
				`;
		}
		//console.log(str1);
		con5.innerHTML = str5;
	}
	/*
		生活
	*/
	var con6 = document.querySelector('.con-item-6');
		sqq6();
		function sqq6(){
			var xhr = new XMLHttpRequest();
			xhr.open('get','json/goods5.json');
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if( xhr.readyState == 4 && xhr.status == 200 ){
					var r6 = JSON.parse( xhr.responseText );
					handle6(r6);
				}
			}
		}
		function handle6(r6){
			var str6 = '';
			for(var i in r6){
				//console.log(r[i]);
				str6 += `
						<ul>	
							<li>${r6[i].name}</li>
							<li>${r6[i].type}</li>
							<li>${r6[i].price}</li>
							<li><img src="${r6[i].img}"></li>
						</ul>
				`;
		}
		//console.log(str1);
		con6.innerHTML = str6;
	}
	/*
		免税热卖
	*/
	var con7 = document.querySelector('.ul-goodsl-list');
		sqq7();
		function sqq7(){
			var xhr = new XMLHttpRequest();
			xhr.open('get','json/hotgoods.json');
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if( xhr.readyState == 4 && xhr.status == 200 ){
					var r7 = JSON.parse( xhr.responseText );
					handle7(r7);
				}
			}
		}
		function handle7(r7){
			var str7 = '';
			for(var i in r7){
				//console.log(r[i]);
				str7 += `
						<ul class="goods-item">
							<li><a href="javascript:;"><img src="${r7[i].img}"></a></li>
							<li>${r7[i].name}</li>
							<li>${r7[i].type}</li>
							<li>${r7[i].price}</li>
						</ul>
				`;
		}
		//console.log(str);
		con7.innerHTML = str7;
	}

	


	
