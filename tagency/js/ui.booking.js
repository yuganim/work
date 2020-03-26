$(function(){
	
	// 예약구간선택
	$('.sel_section li:first').addClass('on');
	$('.input_booking_wrap .tab_cont').hide();
	$('.input_booking_wrap').find('.tab_cont:first').show();
	$('.sel_section li a').click(function() {
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		var currentTab = $(this).attr('href');
		$(this).parents('.input_booking_wrap').find('.tab_cont').hide();
		$(currentTab).show();
		return false;
	});
	
	//단체 클릭
	$('.sel_group').on('click', function() {
		$(this).toggleClass('on');
	});

	/*
	// Input Focus & Blur 
	$('input.booking').on('focus', function() {
		$(this).parent().addClass('focus');
	});
	$('input.booking, .sel_passenger').on('blur', function() {
		$(this).parent().removeClass('focus');
	});
	// 인원선택시 Focus & Blur
	$('.sel_passenger .btn_minus, .sel_passenger .btn_plus, .sel_passenger input').on('focus', function() {
		$('.input_wrap.passenger').addClass('focus');
	});
	$('.sel_passenger .btn_minus, .sel_passenger .btn_plus, .sel_passenger input').on('blur', function() {
		$('.input_wrap.passenger').removeClass('focus');
	});
	*/
	// 선택지 클릭시 이벤트
	$('.selected_area').on('click', function() {
		$(this).removeClass('on');
		$(this).parents('.input_wrap').find('input').focus();
	});

	//입력값이 있을때 표시
	$('.input_wrap input.booking').on('keydown keyup change', function(){
		var Length = $(this).val().length;
		if(Length > 0){
			$(this).parents('.input_wrap').addClass('on');
		}else{
			$(this).parents('.input_wrap').removeClass('on');
		}
	});

	$('#start').on('click', function(){
		$('#start1').css({'top': 350, 'left': 35});
		$('#start1').slideToggle(200);
		$('#start2').slideUp(200);
	});

	$('#btn_start').on('click', function(){
		$('#start2').css({'top': 350, 'left': 35});
		$('#start2').slideToggle(200);
		$('#start1').slideUp(200);
	});


	$('#end').on('click', function(){
		$('#start1').css({'top': 350, 'left': 445});
		$('#start1').slideToggle(200);
		$('#start2').slideUp(200);
	});

	$('#btn_end').on('click', function(){
		$('#start2').css({'top': 350, 'left': 445});
		$('#start2').slideToggle(200);
		$('#start1').slideUp(200);
	});
	
	//STEP2 예약조회
	var $this = $(".route_wrap");	
	if($(".grid table").hasClass("tb_row fix")){
		$("body #container").addClass("wraping");
	}
	$this.on('click', function(){		
		$('#route_start').css({'top': 62, 'left': 0}).show();
		$("body #container").addClass("wraping");
		return false;
	});
	var $focus = $(".route_wrap .route");
	$focus.find(".route_inp").on("click", function(){
		var $this = $(this);
		$this.prev("input[type='text']").focus();
		$this.closest(".route").siblings().find("input[type='text']").blur();
	});
	$(".wraping").on("click", function(e){
		$('#route_start').hide();
		$("body #container").removeAttr("class").removeClass("wraping");
		e.preventDefault();
	});

	/*
	$('.btn_pin').on('click', function(){
		var $input = $(this);
		var $top = $input.offset().top;
		var $left = $input.offset().left;
		$('#start1').slideUp(200);
		$('#start2').slideToggle(200);
		$('#start2').css({'top': 350, 'left': $left - 355});
	});
	*/

	$('input#date1, input#date2, .btn_date').on('click', function(){
		$('#datepicker_layer').css({'top': 350});
		$('#datepicker_layer').slideToggle(200);
		$('#start1').slideUp(200);
		$('#start2').slideUp(200);
	});

	// 구간 리스트 아코디언
	$('.section_list').find('.detail_info').hide();
	//$('.section_list').find('.detail_info:first').show();
	$('.section_list li a').on('click', function(e) {
		e.preventDefault();
		function slideDown(target) {
			slideUp();
			$(target).addClass('on').next().slideDown(100);
		}
		function slideUp() {
			$('.section_list a').removeClass('on').next().slideUp(100);
		}
		$(this).hasClass('on') ? slideUp(100) : slideDown(this);
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
	});

	$('.btn_section_more').on('click', function(e) {
		$('.layer_section_list').slideDown(200);
	});
	
	$('.layer_section_list .btn_close').on('click', function(e) {
		$('.layer_section_list').slideUp(200);
	});

	/* 스와이퍼 */
	// 구간선택
	var swiper = new Swiper('.service_section_wrap .swiper-container', {
		loop: true,
		pagination: {
			el: '.service_section_wrap .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.service_section_wrap .btn_slide_next',
			prevEl: '.service_section_wrap .btn_slide_prev',
		},
	});

	//날짜선택
	var swiper = new Swiper('.sel_date_wrap .swiper-container', {
		loop: true,
		slidesPerView: 7,
		centeredSlides: true,
		slideToClickedSlide: true,
		navigation: {
			nextEl: '.sel_date_wrap .btn_slide_next',
			prevEl: '.sel_date_wrap .btn_slide_prev',
		},
	});

	// Summary 구간
	var swiper = new Swiper('.summary_top_cont .swiper-container', {
		loop: true,
		direction: 'vertical',
		navigation: {
			nextEl: '.section_slide .btn_slide_next',
			prevEl: '.section_slide .btn_slide_prev',
		},
	});

	// Summary
	var win_h = $(window).height() - sum_top_h,
		sum_h = $('.summary_wrap').height(),
		sum_top_h = $('.summary_top').height() + $('.btn_summary_open').height();
	$('.summary_wrap').css({'bottom':0,'height':win_h});
	$('.btn_summary_open').on('click', function(e) {
		$('html,body').css({'overflow-y':'hidden'});
		$('.summary_top').css({'bottom':'','top':'0'});
		$('.summary_wrap').css({'bottom':'','top':'0','overflow-y':'auto'});
		$('.btn_summary_open').hide();
		$('.btn_summary_close').show();
	});

	$('.btn_summary_close').on('click', function(e) {
		$('html,body').css({'overflow-y':''});
		$('.summary_top').css({'bottom':0,'top':'',});
		$('.summary_wrap').css({'bottom':0,'top':'','overflow-y':'hidden'});
		$('.btn_summary_close').hide();
		$('.btn_summary_open').show();
	});

});

/* 2019.02.08 추가 */
/*
$(window).load(function(){	
	//scroll Bar
	$('.layer_start1 .layer_cont, .sel_route_list .scroll, .layer_content').mCustomScrollbar("update");	
	$(".layer_content.fixed").mCustomScrollbar("disable");
});
*/