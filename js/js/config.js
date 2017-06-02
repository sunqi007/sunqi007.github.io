/*
	配置文件
*/
require.config({
	baseUrl: 'js',
	paths: {
		"jquery": "libs/jquery-1.11.3",
		"jquery.cookie": "plug/jquery.cookie",
		"template":"plug/template",
		"layer":"plug/layer/layer",
		"jquery.banner":"js/jquery.banner",
		"jquery.pagination":"plug/jquery.pagination"
	},
	//处理非AMD规范的js文件    指定某个文件的依赖  || 暴露接口
	shim: {
		"jquery.cookie": ['jquery'],
		"layer":['jquery'],
		"jquery.banner":['jquery'],
		"jquery.pagination":['jquery']
	}
});