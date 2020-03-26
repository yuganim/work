$(function(){

	// 해더고정
	$(window).on("scroll",function(ev){
		if($(window).scrollTop() > 100) {
			$('.sticky_header').css({'top':'0'});
		} else {
			$('.sticky_header').css({'top':-100});
		}
	});
	
	// GNB
	if ($('.top_banner_wrap').has('on')) {
		var top_banner = $('.top_banner_wrap.on').height(); 
		$('#main_header').css({'top': top_banner});
		$('.main .header .gnb .dep2').css({'top': top_banner + 117});
	}
	$('#main_header').on('mouseover', function(){
		if($(window).scrollTop() < 300) {
			$(this).removeClass('main');		
			$('#main_header .header').addClass('on');        	
		}
	});

	$('#main_header').on('mouseleave', function(){
		if($(window).scrollTop() < 300) {
			$(this).addClass('main');
			$('#main_header .header').removeClass('on');	        	
		}
	});

	/* 예약 Tab */
	/*
	$('.sel_section .btn_tab li:first').addClass('on');
	$('.main_booking .tab_booking_cont').hide();
	$('.main_booking').find('.tab_booking_cont:first').show();
	$('.sel_section .btn_tab li a').click(function() {
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		var currentTab = $(this).attr('href');
		$(this).parents('.main_booking').find('.tab_booking_cont').hide();
		$(currentTab).show();
		return false;
	});
	*/

	// 선택지 클릭시 이벤트
	$('.selected_area').on('click', function() {
		$(this).removeClass('on');
		$(this).parents('.input_wrap').find('input').focus();
	});

	// 예약 레이어
	$('.btn_tab li a, .booking_wrap input, .booking_wrap .btn_pin, div.selected_area, .booking_wrap .btn_date').on('click', function() {
		$('.dim').fadeIn(200);
		$('.main_visual').addClass('fixed');
		$('.btn_layer_close').fadeIn(200);
	});
	$('.btn_layer_close').on('click', function() {
		$('.btn_layer_close').fadeOut(200);
		$('.main_visual').removeClass('fixed');
		$('.btn_tab li').removeClass('on');
		$('.btn_tab li:first').addClass('on');
		$('#main_reser01').show();
		$('#main_reser02,#main_reser03').hide();
	});

	//메인 공지사항 팝업
	$('.wrap_bbs').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		dots: true,
		useTransform : false
	});

});