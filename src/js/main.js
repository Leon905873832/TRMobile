/**
 * 
 * @authors Leon (you@example.org)
 * @date    2016-07-10 18:19:11
 * @version $Id$
 */

// 定义的公用方法
var Util = (function(){
	var query = function(selector, context){
		/**
		 * 根据选择器查询dom节点，
		 * 先决条件：selector是必需参数，必须是正确的选择器
		 * context是父级元素，如果缺少该参数，默认为document
		*/
		context = context || document;
		var elements = context.querySelectorAll(selector);
		return Array.prototype.slice.call(elements);
	}

	var tpl = function (arg) {
		/**
		 * 根据数据编译html模板，与ajax配合使用比较方便
		 * 先决条件：依赖与artTemplate.js插件
		 * 参数是个对象，期望接收tplId，wrapId，和data三个字段
		 * tplId是模板的id，wrapId是需要填充内容的元素id，data是请求到的数据
		*/
		var arg = arg || {};
		if (window.template) {
			var html = template(arg.tplId, arg.data);
			var oWrap = document.getElementById(arg.wrapId);
			if (oWrap) {
				oWrap.innerHTML = html;
			}
		}
	}

	return {
		query: query,
		tpl: tpl
	}
})();

document.addEventListener('DOMContentLoaded', function(){
	// 获取的DOM节点
	var DOM = (function(){
		var oMenuToggle = document.getElementsByClassName('menu-toggle-btn')[0];
		var oMenu = document.getElementsByClassName('menu-list')[0];
		var oNav = oMenu.parentNode;
		var oMenuItem = Util.query('li', oMenu);
		var oClubMenu = document.getElementsByClassName('club-menu')[0];
		return {
			oMenuToggle: oMenuToggle,
			oMenu: oMenu,
			oNav: oNav,
			oMenuItem: oMenuItem,
			oClubMenu: oClubMenu
		}
	})();

	// 入口函数
	var main = function () {
		effect();
		builder();
	}

	// 页面效果相关
	var effect = function () {
		// 点击导航按钮，唤出导航菜单
		if (DOM.oMenuToggle) {
			DOM.oMenuToggle.addEventListener('click', function(){
				DOM.oNav.classList.toggle('open');
			}, false);
		}

		// 点击任意菜单条目，菜单隐藏,并切换当前状态
		if (DOM.oMenuItem) {
			DOM.oMenuItem.forEach(function(obj){
				obj.addEventListener('click', function(){
					var siblings = this.parentNode.children;
					for (var i = 0, length = siblings.length; i < length; i++) {
						siblings[i].classList.remove('current');
					}
					this.classList.add('current');
					DOM.oNav.classList.remove('open');
				}, false)
			});
		}

		// 首页banner图
		if (window.Swiper) {
			var trNewsSwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal',
			    loop: true,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			 });
		}

		// TR社区页的导航
		if (DOM.oClubMenu) {
			DOM.oClubMenu.addEventListener('click',function(event){
				var obj = event.target;
				var siblings = this.children;
				for (var i = 0, length = siblings.length; i < length; i++) {
					siblings[i].classList.remove('current');
				}
				obj.classList.add('current');
			},false);
		}
	}

	// 构建页面相关函数
	var builder = function () {
		// 首页 绽放社区 版块的数据，需要根据后台传值确定
		var clubData = {
			list: [
				{
					src: 'images/club_item_img.jpg',
					pro: '3,193',
					msg: '1,193',
					link: '693',
					title: '我爱美丽',
					text: ['美丽从来与外表无关，它是内心积极的态度', 'EX-TR600 遇见更美丽的自己！'],
					href: '#'
				},
				{
					src: 'images/club_item_img.jpg',
					pro: '3,193',
					msg: '1,193',
					link: '693',
					title: '我爱美丽',
					text: ['美丽从来与外表无关，它是内心积极的态度', 'EX-TR600 遇见更美丽的自己！'],
					href: '#'
				}
			]
		}

		// 编译生成绽放社区的html
		Util.tpl({
			tplId: 'club-item',
			wrapId: 'club-activity-list',
			data: clubData
		});
	}	

	// 执行入口函数
	main();
}, false);
