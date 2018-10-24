window.onload = function() {

	//gnb 2depth height
	function gnb() {
		var dropAry = new Array();
		var gnbAry = new Array();
		$('.lst_gnb .nav_item').each(function(i){
			dropAry[i] =  $('.nav_item:eq('+i+') .dropdown ul').innerHeight();
			gnbAry[i] =  $('.nav_item:eq('+i+') .depth1 a').innerHeight();
		})
		var dropAryMax = Math.max.apply(null, dropAry);
		var gnbAryMax = Math.max.apply(null, gnbAry);
		$('.gnb').on({
			'mouseover' : function(){
				$('.gnb .dropdown').css({'height': dropAryMax});
			},
			'mouseout' : function(){
				$('.gnb .dropdown').css({'height': 0});
			}
		});
		sclHei = (dropAryMax*2) + (gnbAryMax*4);

	};
	gnb();

	$(window).resize(function(){
		// 브라우저 height가 gnb height 보다 작을 때
		var winHei = $(window).height();
		if (window.matchMedia('(max-height:' + sclHei + 'px)').matches) {
			$('.gnb').css({'max-height': winHei - $('.gnbbar').innerHeight()});
			$('.gnb').addClass('scroll');
		} else{
			$('.gnb').removeClass('scroll');
		}

		// GNB mediaquery 기능
		if (window.matchMedia('(max-width: 1200px)').matches) {
			//태블릿모드
			$('.gnb').addClass('gnb_fold').removeClass('gnb').removeClass('scroll').closest('.wrap_gnb').css({'height':'50','overflow':'hidden'});
			$('.gnb_fold').removeAttr('style');
			$('.gnb_fold .dropdown').removeAttr('style');
			$('.contents').removeAttr('style');
		} else {
			//pc모드
		    $('.gnb_fold').addClass('gnb').removeClass('gnb_fold');
		    $('.wrap_gnb').removeAttr('style');
			$('.gnb').css({'display':'block','height':'auto'});
			$('.gnb .dropdown').css({'height':0});
			$('.contents').css({'top': $('.gnb').innerHeight() + $('.gnbbar').innerHeight()});
		}
	}).resize();

	// GNB 미니모드 일 때 접기/펼침
	$('.btn_menu').on('click', function() {
		var wrapHei = $('.wrap_gnb').height();
		var gnbHei = $('.gnb_fold').height();
		if( wrapHei < 51 ){
			$('.wrap_gnb').animate({'height': gnbHei + 50 + 'px'}, 750, function(){
				$(this).removeAttr('style');
			});
		}else {
			$('.gnb_fold').animate({'height': 0}, 750, function(){
				$(this).removeAttr('style');
				$('.wrap_gnb').css({'height':'50','overflow':'hidden'});
			});
		}
	});
	// $(window).resize(function(){
	// 	if ( $(this).width() > 625) {
	// 		$('nav').removeAttr('style');
	// 	}
	// });

	// $(document).click(function(e){
	// 	var a = e.target;
	// 	if($(a).closest('.btn_menu').length === 1) {
	// 		if ($('.gnb_fold').css('display') == 'none') {
	// 			$('.gnb_fold').css({'display':'block'});
	// 		} else {
	// 			$('.gnb_fold').css({'display':'none'});
	// 		}
	// 	} else if ($(a).closest('.container').length === 1 || $(a).closest('.gnbbar').length === 1) {
	// 		$('.gnb_fold').css({'display':'none'});
	// 	}
	// });

	//gnb click UI
	var Dep1 = '.gnb .depth1, .gnb_fold .depth1';
	var Dep2 = '.gnb .depth2, .gnb_fold .depth2';
	var Dep3 = '.gnb .depth3, .gnb_fold .depth3';

	//gnb 1 depth 선택 시
	$(Dep1).on('click keydown', function(){
		var navItem = $(this).parent('.nav_item');
		navItem.addClass('active').siblings('.nav_item').removeClass('active');
		if (navItem.hasClass('active')) {
			//2 depth on,off
			navItem.siblings('.nav_item').find('ul li').removeClass('on');
			$(this).siblings('.dropdown').find('ul li:eq(0)').addClass('on');
			//3 depth on,off
			$(this).siblings('.dropdown').find('ul li .bx_dpth .depth3').removeClass('on');
			$(this).siblings('.dropdown').find('ul li:eq(0) .bx_dpth .depth3:eq(0)').addClass('on');
		}
	});

	//gnb 2 depth 선택 시
	$(Dep2).on('click keydown', function(){
		var navItemlI = $(this).parent('li');
		navItemlI.addClass('on').siblings('li').removeClass('on');
		if (navItemlI.hasClass('on')) {
			//1 depth on,off
			navItemlI.parents('.nav_item').addClass('active').siblings('.nav_item').removeClass('active');
			//2 depth on,off
			navItemlI.parents('.nav_item').siblings('.nav_item').find('ul li').removeClass('on');
			//3 depth on,off
			$(this).siblings('.bx_dpth').find('.depth3:eq(0)').addClass('on');
			navItemlI.siblings('li').find('.depth3').removeClass('on');
		}
	});

	//gnb 3 depth 선택 시
	$(Dep3).on('click keydown', function(){
		$(this).parents('.dropdown').find('.depth3').removeClass('on');
		$(this).addClass('on').siblings('.depth3').removeClass('on');
		//2 depth on
		$(this).parents('.dropdown').find('ul li').removeClass('on');
		$(this).parent('.bx_dpth').parent('li').addClass('on');
	});

	//lnb click UI
	$('.lnb .nav_item dd').on('click keydown', function(){
		$(this).addClass('on');
		if ($(this).hasClass('on')) {
			$(this).siblings('dd').removeClass();
			$(this).parent('dl').siblings('dl').children().removeClass();
			$(this).siblings('dt').addClass('on');
		}
	});
	$('.lnb .nav_item .depth1').on('click keydown', function(){
		var navItem = $(this).parent('.nav_item');
		navItem.addClass('active');
		if (navItem.hasClass('active')) {
			navItem.siblings('.nav_item').removeClass('active');
			// navItem.siblings('.nav_item').siblings('dl').children().removeClass();
			// navItem.children('dt:eq(0)').addClass('on');
		}
	});
	$('.lnb .nav_item dt').on('click keydown', function(){
		$(this).addClass('on');
		if ($(this).hasClass('on')) {
			$(this).parent('dl').siblings('dl').children('dt').removeClass();
			$(this).next('dd').addClass('on').parent('dl').siblings('dl').children().removeClass();
		}
	});

	// textarea 높이 자동 변경
	if ($('body').has('textarea').length > 0) {
		setTimeout(function() {
			$("textarea").each(function() {
				var $this = $(this)
				$this.css({'height': $this[0].scrollHeight + 8});
			});
		}, 1);
	};
}
//tab type1
jQuery(function($){
  // List Tab Navigation
  var $tab_list = $('.tab.list');
  $tab_list.find('li:first').addClass('active').show();
  $tab_list.removeClass('jx').find('ul ul').hide();
  $tab_list.find('li li.active').parents('li').addClass('active');
  $tab_list.find('li.active>ul').show();
  $tab_list.each(function(){
    var $this = $(this);
    $this.height($this.find('li.active>ul').height()+85);
  });
  function listTabMenuToggle(event){
    var $this = $(this);
    $this.next('ul').show().parent('li').addClass('active').siblings('li').removeClass('active').find('>ul').hide();
    $this.closest('.tab.list').height($this.next('ul').height()+85);
    if($this.attr('href') === '#'){
      return false;
    }
  }
  $tab_list.find('>ul>li>a').click(listTabMenuToggle).focus(listTabMenuToggle);
});

//tab type2
$(function() {
	$('ul.tabmenu li').click(function() {
		var activeTab = $(this).attr('data-tab');
		$('ul.tabmenu li').removeClass('current');
		$('.tabcontent').removeClass('current');
		$(this).addClass('current');
		$('#' + activeTab).addClass('current');
	})
	$('ul.subtabmenu li').click(function() {
		var activeTab = $(this).attr('data-tab');
		$('ul.subtabmenu li').removeClass('current');
		$('.subtabcontent').removeClass('current');
		$(this).addClass('current');
		$('#' + activeTab).addClass('current');
	})
});
$("#textboxId").keydown(function(){ 
  var inputTextVal = $("#textboxId").val(); 
  if(inputTextVal < 1 || inputTextVal > 6) 
  { 
    return false; 
  } 
  else 
  { 
    return true; 
  } 
}); 

//메뉴권한
$(document).ready(function(){

	$(".depth_01").siblings("a").addClass("on");

    $(".depth_01").children("a").click(function(){
        var submenu = $(this).siblings(".depth_02");

        // submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
        if( submenu.is(":visible") ){
            submenu.slideUp();
            submenu.siblings("a").removeClass("on");
        }else{
            submenu.slideDown();
            submenu.siblings("a").addClass("on");
        }
    });

	$(".depth_02").children("a").click(function(){
        var submenu = $(this).siblings(".depth_03");

        // submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
        if( submenu.is(":visible") ){
            submenu.slideUp();
            submenu.siblings("a").removeClass("on");
        }else{
            submenu.slideDown();
            submenu.siblings("a").addClass("on");
        }
    });

});