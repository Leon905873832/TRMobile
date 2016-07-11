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

	return {
		query: query
	}
})();

document.addEventListener('DOMContentLoaded', function(){
	// 获取的DOM节点
	var DOM = (function(){
		var oMenuToggle = document.getElementsByClassName('menu-toggle-btn')[0];
		var oMenu = document.getElementsByClassName('menu-list')[0];
		var oNav = oMenu.parentNode;
		var oMenuItem = Util.query('li', oMenu);
		return {
			oMenuToggle: oMenuToggle,
			oMenu: oMenu,
			oNav: oNav,
			oMenuItem: oMenuItem
		}
	})();

	// 入口函数
	var main = function () {
		effect();
	}

	// 页面效果相关
	var effect = function () {
		// 点击导航按钮，唤出导航菜单
		DOM.oMenuToggle.addEventListener('click', function(){
			DOM.oNav.classList.toggle('open');
		}, false);

		// 点击任意菜单条目，菜单隐藏,并切换当前状态
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

		// 首页banner图
		var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: true,
		    autoplay: 2000,
		    speed: 600,
		    autoplayDisableOnInteraction: false,
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		  });

	}

	// 执行入口函数
	main();
}, false);
