/**
 *
 * @authors Leon (you@example.org)
 * @date    2016-07-10 18:19:11
 * @version $Id$
 */

// 定义的公用方法
var Util = (function () {
    var query = function (selector, context) {
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
    };

    var toggleMenu = function (obj) {
        /**
         * 导航菜单的状态切换，
         * 先决条件：obj是必需参数，且是个Dom元素
         */
        obj.addEventListener('click', function (event) {
            var target = event.target;
            var siblings = this.children;
            for (var i = 0, length = siblings.length; i < length; i++) {
                siblings[i].classList.remove('current');
            }
            target.classList.add('current');
        }, false);
    }

    var isInVisibleArea = function (obj, doc) {
        var doc = doc || document.documentElement;
        if (obj) {
            // 获取浏览器的可视区高度
            var clientHeight = document.documentElement.clientHeight;
            // 获取元素距离页面顶端的高度
            var offsetHeight = obj.offsetTop;
            // 获取滚动条的高度
            var scrollTop = doc.scrollTop;
            if (offsetHeight - scrollTop < clientHeight) {
                return true;
            } else {
                return false
            }
        }
    };

    return {
        query: query,							// 获取元素方法
        tpl: tpl,								// 编译模板方法
        isInVisibleArea: isInVisibleArea,		// 判断元素是否在可是区域
        toggleMenu: toggleMenu
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    // 获取的DOM节点
    var DOM = (function () {
        var oMenuToggle = document.getElementsByClassName('menu-toggle-btn')[0];
        var oMenu = document.getElementsByClassName('menu-list')[0];
        var oNav = oMenu.parentNode;
        var oMenuItem = Util.query('li', oMenu);
        var oClubMenu = document.getElementsByClassName('club-menu')[0];
        var oImgs = document.getElementsByTagName('img');
        var oClubItem = document.getElementById('club-item');
        var oSearchItem = document.getElementById('search-item');
        var oPersonalCenterMenu = document.getElementsByClassName('personal-center-menu')[0];
        var oPersonalList = document.getElementById('personal-list');
        var oPersonalItem = document.getElementById('personal-item');
        var oHeadImage = document.getElementById('head-image');
        var oUpload = document.getElementById('upload');
        var oStoreAddressMenu = document.getElementsByClassName('store_address-menu')[0];
        var oBackTop = document.getElementsByClassName('back-top')[0];
        var oWrap = $('.wrap');
        var oAnimited = $('.animated');
        return {
            oMenuToggle: oMenuToggle,						// 导航栏菜单按钮
            oMenu: oMenu,									// 导航菜单
            oNav: oNav,										// 导航菜单背景层
            oMenuItem: oMenuItem,							// 导航菜单条目
            oClubMenu: oClubMenu,							// 社区活动的导航
            oImgs: oImgs,									// 页面内的图片元素
            oClubItem: oClubItem,							// 首页社区的模板id
            oSearchItem: oSearchItem,						// 搜索结果页的模板id
            oPersonalCenterMenu: oPersonalCenterMenu,		// 个人中心菜单
            oPersonalList: oPersonalList,                   // 个人中心列表项id
            oPersonalItem: oPersonalItem,                   // 个人中心模板id
            oHeadImage: oHeadImage,                         // 上传图片的输入框
            oUpload: oUpload,                               // 实际上传图片的file
            oStoreAddressMenu: oStoreAddressMenu,           // Exilimstore的导航条
            oBackTop: oBackTop,                             // 回到顶部按钮
            oWrap: oWrap                                    // 页面主体部分的外包装元素
        }
    })();

    // 入口函数
    var main = function () {
        builder();
        effect();
    };

    // 页面效果相关
    var effect = function () {
        // 点击导航按钮，唤出导航菜单
        if (DOM.oMenuToggle) {
            DOM.oMenuToggle.addEventListener('click', function () {
                DOM.oNav.classList.toggle('open');
            }, false);
        }

        // 点击任意菜单条目，菜单隐藏,并切换当前状态
        if (DOM.oMenuItem) {
            DOM.oMenuItem.forEach(function (obj) {
                obj.addEventListener('click', function () {
                    var siblings = this.parentNode.children;
                    for (var i = 0, length = siblings.length; i < length; i++) {
                        siblings[i].classList.remove('current');
                    }
                    this.classList.add('current');
                    DOM.oNav.classList.remove('open');
                }, false)
            });
        }

        // 滑动分页
        if (window.Swiper) {
            var trNewsSwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                // 如果需要分页器
                pagination: '.swiper-pagination'
            });
        }

        // TR社区页的导航
        if (DOM.oClubMenu) {
            Util.toggleMenu(DOM.oClubMenu);
        }

        // 个人中心菜单切换
        if (DOM.oPersonalCenterMenu) {
            Util.toggleMenu(DOM.oPersonalCenterMenu);
        }

        // Exilimstore的导航切换
        if (DOM.oStoreAddressMenu) {
            Util.toggleMenu(DOM.oStoreAddressMenu);
        }

        // 上传头像的选择框
        if (DOM.oHeadImage) {
            DOM.oUpload.addEventListener('change', function () {
                DOM.oHeadImage.value = this.value;
            })
        }

        // 注册页面的生日选择器
        if (jQuery.mobiscroll) {
            var currYear = (new Date()).getFullYear();
            var opt = {
                preset : 'date',
                theme: 'android-ics light',         //皮肤样式
                display: 'modal',                   //显示方式
                mode: 'scroller',                   //日期选择模式
                dateFormat: 'yyyy-mm-dd',
                lang: 'zh',
                showNow: true,
                nowText: "今天",
                startYear: currYear - 80,           //开始年份
                endYear: currYear                   //结束年份
            };
            $("#birthday").mobiscroll(opt);
        }

        // 回到顶部
        if (DOM.oBackTop){
            DOM.oBackTop.addEventListener('click',function () {
                DOM.oWrap.animate({'scrollTop': '0'});
            });
        }

        // 给所有图片添加动画效果
        var animated = function () {
            var clientHeight = DOM.oWrap[0].clientHeight;
            var scrollTop = DOM.oWrap[0].scrollTop;
            var oAnimited = $(this).find('.animated');
            oAnimited.each(function () {
                var offsetTop = this.offsetTop;
                if(offsetTop - scrollTop + 80 < clientHeight){
                    $(this).addClass('fadeInUp');
                }
            });
        };
        DOM.oWrap.on('scroll', animated).trigger('scroll');
    };

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
        };

        // 编译生成绽放社区的html
        if (DOM.oClubItem) {
            Util.tpl({
                tplId: 'club-item',
                wrapId: 'club-activity-list',
                data: clubData
            });
        }

        // 搜索结果的数据，需要根据后台传值确定
        var searchData = {
            list: [
                {
                    src: 'images/search_img.jpg',
                    title: 'TRUE LOVE 一生一世',
                    text: '限量版礼盒(1314份)心动登场',
                    date: '2016/05/20',
                    time: '11:00',
                    href: '#'
                },
                {
                    src: 'images/search_img.jpg',
                    title: 'TRUE LOVE 一生一世',
                    text: '限量版礼盒(1314份)心动登场',
                    date: '2016/05/20',
                    time: '11:00',
                    href: '#'
                },
                {
                    src: 'images/search_img.jpg',
                    title: 'TRUE LOVE 一生一世',
                    text: '限量版礼盒(1314份)心动登场',
                    date: '2016/05/20',
                    time: '11:00',
                    href: '#'
                }
            ]
        };
        // 编译生成搜索结果的html
        if (DOM.oSearchItem) {
            Util.tpl({
                tplId: 'search-item',
                wrapId: 'search-menu',
                data: searchData
            });
        }

        // 搜索结果的数据，需要根据后台传值确定
        var personalData = {
            list: [
                {
                    src: 'images/center.jpg',
                    pro: '3,193',
                    msg: '1,193',
                    link: '936',
                    title: '我爱美丽'
                },
                {
                    src: 'images/center.jpg',
                    title: '我爱美丽',
                    pro: '3,193',
                    msg: '1,193',
                    link: '936'
                },
                {
                    src: 'images/center.jpg',
                    title: '我爱美丽',
                    pro: '3,193',
                    msg: '1,193',
                    link: '936'
                }
            ]
        };
        // 编译生成搜索结果的html
        if (DOM.oPersonalItem) {
            Util.tpl({
                tplId: 'personal-item',
                wrapId: 'personal-list',
                data: personalData
            });
        }
    };

    // 执行入口函数
    main();
}, false);
