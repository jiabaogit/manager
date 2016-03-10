/**
 * Created by silver on 2016/1/4.
 */
define(['jquery','Touch','wxJs'], function ($,touch,wx) {
        var add =  {
            titleName : '鲜檬摄影',
            isFirst : true,
            imgArr : ['test-1.jpg','test-2.jpg','test-3.jpg','test-4.jpg'],
            appImgArr : ['app-1.png','app-2.png','app-3.png','app-4.png'],
            start : function(){
                $('body').css({'display':'block'});
                $(window).resize(function(){
                    add.main();
                })
                add.main();
            },
            //响应式布局
            main : function(){
                if($(window).width()>750&&add.isFirst){
                    add.init();
                    add.isFirst = false;
                }
            },
            //初始化函数
            init: function () {
                $.ajax({
                    type: "GET",
                    url: '../view/gobal/header.html',
                    success: function (data) {
                        $("head").prepend(data);
                        //document.title =  '鲜檬旅拍';
                    }
                });
                $('.nav .logo').click(function(){
                    add.goUrl('/view/main.html')
                })
            },
            //页面跳转
            goUrl : function(uri,type){
                var url = '/appweb'+uri;
                //console.log(url,location.pathname);
                if(url!=location.pathname&&uri!=null){
                    location.href = url;
                }
            },
            //导航栏数据
            navdata : function(){
                var data = ['首页','公司动态','关于我们','英才招聘','商务合作'],
                    array = '',
                    uriArr = ['/view/main.html','/view/dynamic.html','/view/aboutAs.html','/view/joinUs.html','/view/collaborate.html'];
                for(i in data){
                    var value = i==0?"li first":"li";
                    array += "<div class="+"'"+value+"'"+">"+data[i]+"</div>";
                }
                $('.logo').after(array);
                //导航栏跳转
                $('.nav .li').click(function(){
                    var index = $('.nav .li').index(this);
                    add.goUrl(uriArr[index]);
                });
                //底部数据
                $.ajax({
                    type: "GET",
                    url: '../view/gobal/footer.html',
                    success: function (data) {
                        $("body").append(data);
                        if(window.location.host == 'www.ipaai.com'){
                            $('.footer-icp').text("粤ICP备15087137号-1");
                        }
                        else{
                            $('.footer-icp').text("粤ICP备15087137号-2");
                        }
                    }
                });
            },
            //首页头部动画
            hAnimate : function(){
                var speed = 200;
                //初始化动画状态
                $('.animate .xmin,.animate .xmid,.animate .xbig,.animate .min').css({display : 'none'});
                $('.animate .cm').css({bottom:'-226px'});
                //执行动画效果
                $('.animate .big').css({left:'120px'}).animate({left:'68px'},speed*2,function(){
                    $('.animate .xmin').fadeIn(speed/2,function(){
                        $('.animate .xmid').fadeIn(speed/2,function(){
                            $('.animate .xbig').fadeIn(speed/2,function(){
                                $('.animate .cm').animate({bottom:0},speed*3,function(){
                                    $('.animate .min').fadeIn(speed);
                                });
                            });
                        })
                    })
                });
            },
            //中部滑动事件
            mMenu : function(){
                var speed = 500;
                $('.index-m .cont li').click(function(){
                    var index = $(this).index();
                    $(this).addClass('hover').siblings('.index-m .cont li').removeClass('hover');
                    //文字移动动画
                    $('.index-m .tit').eq(index).show().siblings('.index-m .tit').hide();
                    $('.index-m .tit').eq(index).find('.h').css({left:'500px',opacity:'0'}).animate({left:'0',opacity:'1'},speed);
                    //图片显示动画
                    $('.index-m .show img').attr('src','../img/test/'+add.imgArr[index]).css({display:'none'}).fadeIn(speed);
                })
            },
            //设置导航栏高亮
            setnavhover : function(index){
                $('.nav .li').eq(index).addClass('hover');
            },
            //判断版本
            browser : {
                versions: function() {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {//移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            },
            //点击跳转下载
            moreShip : function(){
                //$(".app-d .te .erweima").click(function() {
                //    window.location = 'http://www.simoo.cn/objective-c.html';
                //});
                $(".app-d .te-p .erweima").click(function() {
                    window.location = 'http://www.simoo.cn/objective-p.html';
                });
            },
            //app滑动事件
            appTouch : function(){
                var currnt = 0,speed = 500;
                function animate(){
                    $('.app-m .tit .img img').attr('src','../img/app/'+add.appImgArr[currnt]).css({opacity:0}).animate({opacity:1},speed);
                    $('.app-m .tit .info').hide();
                    $('.app-m .tit .info').eq(currnt).show();
                    $('.app-m .tit .info .con').css({opacity:0}).animate({opacity:1},speed);
                    $('.app-m .btn li').eq(currnt).addClass('active').siblings().removeClass('active');
                    $('.app-m .show .imgcont img').attr('src','../img/test/'+add.imgArr[currnt]).css({opacity:0}).animate({opacity:1},speed);
                }
                $('.app-m').swipe({
                    swipeRight : function(event, direction, distance, duration, fingerCount, fingerData){
                        if(currnt==add.appImgArr.length-1){
                            currnt = 0;
                        }else{
                            currnt++;
                        }
                        animate();
                    },
                    swipeLeft : function(event, direction, distance, duration, fingerCount, fingerData){
                        if(currnt==0){
                            currnt = add.appImgArr.length-1;
                        }else{
                            currnt--;
                        }
                        animate();
                    },
                    threshold:50,
                    preventDefaultEvents : false    //可以响应手机系统事件
                })

            },
            //微信分享
            wxShare : function(){
            var contTitle = '鲜檬全球旅拍平台';
            var contDesc = '记录最闪亮的瞬间';
            var contLink = 'http://www.ipaai.com/appweb';
            var contImgUrl = 'http://img.ipaai.com/2016-01-12//web/file//iMfl147561452600169027.jpg';
                $.ajax({
                    type: "GET",
                    url: '/server/weixin/jsapi/config?url='+window.location.href,
                    success: function (data) {
                        var payload = data.payload;
                        payload.debug = false;
                        payload.jsApiList = ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"];
                        wx.config(payload);
                        wx.ready(function(){
                            //分享到朋友圈
                            wx.onMenuShareTimeline({
                                title: contDesc, // 分享标题
                                link: contLink, // 分享链接
                                imgUrl: contImgUrl, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            //分享到朋友
                            wx.onMenuShareAppMessage({
                                title: contTitle, // 分享标题
                                desc: contDesc, // 分享描述
                                link: contLink, // 分享链接
                                imgUrl: contImgUrl, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            //分享到QQ
                            wx.onMenuShareQQ({
                                title: contTitle, // 分享标题
                                desc: contDesc, // 分享描述
                                link: contLink, // 分享链接
                                imgUrl: contImgUrl, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            //分享到腾讯微博
                            wx.onMenuShareWeibo({
                                title: contTitle, // 分享标题
                                desc: contDesc, // 分享描述
                                link: contLink, // 分享链接
                                imgUrl: contImgUrl, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        });
                    }
                });
            }
        }
        //开始
        add.start();
        return add;
})