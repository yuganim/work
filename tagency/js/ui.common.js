// $(document).ready(function(){	
// 	//조회 폼(.box_srch) layer 이벤트
// 	function layer(e){
// 		var datepicker = $('.box_srch #datepicker_layer_s');
// 		var btndate = $('.btn_date');
// 		var winWid = $(window).width();
// 		var datepickerWid = datepicker.outerWidth();
// 			var x = e.pageX;
// 			var y = e.pageY;
// 		if (!datepicker.is(e.target) && datepicker.has(e.target).length == 0 && !btndate.is(e.target)) {
// 			datepicker.css({'display':'none'})
// 		} else if(btndate.is(e.target)) {
// 			var bxSrchTop = $(e.target).closest('.box_srch').offset().top;
// 			var bxSrchLft = $(e.target).closest('.box_srch').offset().left;
// 			if (winWid <= x+datepickerWid) {
// 				$(e.target).closest('.ico_ipt').siblings('#datepicker_layer_s').css({'display':'block','top':y-bxSrchTop+30, 'left':x-bxSrchLft-datepickerWid-70}).addClass('rig');
// 			} else {
// 				$(e.target).closest('.ico_ipt').siblings('#datepicker_layer_s').css({'display':'block','top':y-bxSrchTop+30, 'left':x-bxSrchLft-70}).removeClass('rig');
// 			}
// 		}
// 	}
// 	$('body').on('click', layer);

// });

$(function(){
	selectBox();
	var $fileBox = null;
	fileLoad();

	// 인원선택시 Focus & Blur
	$('.sel_passenger .btn_minus, .sel_passenger .btn_plus, .sel_passenger input').on('focus', function() {
		$('.input_wrap.passenger').addClass('on');
	});
	$('.sel_passenger .btn_minus, .sel_passenger .btn_plus, .sel_passenger input').on('blur', function() {
		$('.input_wrap.passenger').removeClass('on');
	});	

	//기내이벤트 테이블 클릭 이벤트
	$('.tbl_calender td').on('click', function(){
		if (!$(this).hasClass('active')) {
			if ($(this).html()) {
				$(this).siblings('td').removeClass('active');
				$(this).parent('tr').siblings('tr').find('td').removeClass('active');
				$(this).addClass('active');
			}
		}
	});

	//조회 폼(.box_srch) input 포커스 이벤트
	$('.ico_ipt input').focus(function(){
		$(this).parent('.ico_ipt').addClass('on').siblings('.ico_ipt').removeClass('on');
	});
	
	// skip navigation
	$('#skipNav').on({
		focusin: function() {
			$('#skipNav').css('width', 0);
			$(this).css({
				'width': '100%',
				'font-size': 14
			});
		},
		focusout: function() {
			$('#skipNav').css({
				'display': 'none',
				'width': 0,
				'font-size': 0
			});
		}
	});

	//항공권 예매 탭 클릭 시 스트롤 최 상위 노출
	$(".input_booking_wrap .sel_section a").on('click', function (e) {
		e.preventDefault();
		$('html, body').scrollTop(0);
	});

	//2019.06.12 스크롤 적용
	var nameRevise = $(".name_revise");
    nameRevise.each(function(){
        if($(this).find(".tb_col tbody tr").length < 3){
          $(this).removeClass("height").addClass("no_height");
        }else if($(this).find(".tb_col tbody tr").length > 2){
            $(this).addClass("height").removeClass("no_height");
        }else{
        	
        }
    });

	// viewport 추가
	$('head').prepend('<meta name="viewport" content="width=1400">');
	$('body').append('<div class="dim02"></div>');
	
	$('.gnb > ul > li').on('mouseover', function(){
		$(this).addClass('on');
		$('.header .dep2').slideDown(150);
		//console.log('1111')
	});
	$('.gnb > ul > li').on('mouseleave', function(){
		$(this).removeClass('on');
	});
	$('.header .gnb').on('mouseleave', function(){
		$('.header .dep2').slideUp(150);
	});

	//2019.03.31 예외 타입 추가
	$(".tab_fixed_wrap").each(function(){
		$(this).find(".tab_fixed_cont").hide();

		$('.tab_fixed li a').click(function() {
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			var currentTab = $(this).attr('href');
			$(this).parents('.tab_fixed_wrap').children('.tab_fixed_cont').hide();
			$(currentTab).show();
			return false;
		});
	});

	// Tab
	$(".tab_wrap").each(function(){
		$(this).find(".tab>li").first().addClass("on");
		$(this).find(".tab_cont").hide();
		$(this).find(".tab_cont:first").show();

		$('.tab li a').click(function() {
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			var currentTab = $(this).attr('href');
			$(this).parents('.tab_wrap').children('.tab_cont').hide();
			$(currentTab).show();
			return false;
		});
	});

	$.fn.tabSummary = function(){
		var tabWrap = $(".tab_wrap");
		var tabNum = $(".tab_wrap .tab");
		tabNum.each(function(){
			var $this = $(this);
			if($this.find("li").length == 1){
				$this.addClass("added1");
			}else if($this.find("li").length == 2){
				$this.addClass("added2");
			}else if($this.find("li").length == 3){
				$this.addClass("added3");
			}else if($this.find("li").length == 4){
				$this.addClass("added4");
			}else if($this.find("li").length == 5){
				$this.addClass("added5");
			}else{}
		});
	}
	$.fn.tabSummary();

	$.fn.layerTab = function(){
		$(".tab_wrap").each(function(){
			$(this).find(".tab>li").first().addClass("on");
			$(this).find(".tab_cont").hide();
			$(this).find(".tab_cont:first").show();
		});
		$('.tab li a').click(function() {
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			var currentTab = $(this).attr('href');
			$(this).parents('.tab_wrap').children('.tab_cont').hide();
			$(currentTab).show();
			return false;
		});
	}

	// Tab
	$('.layer_tab_wrap li:first').addClass('on');
	$('.layer_tab_wrap .layer_tab_cont').hide();
	$('.layer_tab_wrap').find('.layer_tab_cont:first').show();
	$('.layer_tab_wrap li a').click(function() {
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		var currentTab = $(this).attr('href');
		$(this).parents('.layer_tab_wrap').find('.layer_tab_cont').hide();
		$(currentTab).show();
		return false;
	});

	// sTab
	$('.stab li:first-child').addClass('on');
	$('.stab_wrap>.stab_cont').css({'display':'none'});
	$('.stab_wrap').each(function(i){
		$('.stab_wrap').eq(i).children('.stab_cont:first').css({'display':'block'});
	});
	$('.stab li a').click(function() {
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		var currentTab = $(this).attr('href');
		$(this).parents('.stab_wrap').children('.stab_cont').hide();
		$(currentTab).show();
		return false;
	});

	// Text Tab
	$('.txtab li:first').addClass('on');
	$('.txtab_wrap .tab_cont').hide();
	$('.txtab_wrap').find('.tab_cont:first').show();
	$('.txtab li a').click(function() {
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		var currentTab = $(this).attr('href');
		$(this).parents('.txtab_wrap').find('.tab_cont').hide();
		$(currentTab).show();
		return false;
	});

	if(!$('.btn_tab li a').parent('li').parent('.btn_tab').hasClass('disabled')){
		$('.btn_tab li:first').addClass('on');
	}

	$('.btn_tab li a').click(function() {
		if ($(this).parent('li').parent('.btn_tab').hasClass('disabled')) {
			return false;
		}else {
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			return false;
		}
	});

	// 주소선택
	$('.addr_wrap .btn_tab li:first').addClass('on');
	$('.addr_wrap .tab_cont').hide();
	$('.addr_wrap').find('.tab_cont:first').show();
	$('.addr_wrap .btn_tab li a').click(function() {
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		var currentTab = $(this).attr('href');
		$(this).parents('.addr_wrap').find('.tab_cont').hide();
		$(currentTab).show();
		return false;
	});

	// 호텔선택
	$('.hotel_search_wrap .btn_tab li:first').addClass('on');
	$('.hotel_search_wrap .search_cont').hide();
	$('.hotel_search_wrap').find('.search_cont:first').show();
	$('.hotel_search_wrap .btn_tab li a').click(function() {
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		var currentTab = $(this).attr('href');
		$(this).parents('.hotel_search_wrap').find('.search_cont').hide();
		$(currentTab).show();
		return false;
	});

	// FAQ
	$('.faq_list').find('.answer:first').show();
	$('.faq_list a').on('click', function(e) {
		e.preventDefault();
		function slideDown(target) {
			slideUp();
			$(target).addClass('on').next().slideDown(100);
		}
		function slideUp() {
			$('.faq_list a').removeClass('on').next().slideUp(100);
		}
		$(this).hasClass('on') ? slideUp(100) : slideDown(this);
	});

	// 꼭알아두세요
	$('.notice_wrap').find('.notice_cont').show();
	$('.notice_wrap a').on('click', function(e) {
		e.preventDefault();
		function slideDown(target) {
			slideUp();
			$(target).addClass('on').next().slideDown(100);
		}
		function slideUp() {
			$('.notice_wrap a').removeClass('on').next().slideUp(100);
		}
		$(this).hasClass('on') ? slideUp(100) : slideDown(this);
	});

	// layer
	var layer = null;
	$('[date-type="layer"]').click(function(e) {
		e.preventDefault();
		$('html, body').css('overflow', 'hidden');
		$('a, button').siblings().removeClass('layer_focus');
		$(this).addClass('layer_focus');
		$('.layer_content').attr('tabindex','0');

		var thisId = $(this).attr('date-id'),
			res = thisId.split(" "),
			layerId = '#' + res[0];

			$(layerId).find('.btn_layer_close, .layer_close').blur();

			if ($(layerId).height() >= $(window).height()) {
				$(layerId).find('.layer_con').css({
					'height': $(window).height() - 160,
					'overflow-y': 'auto'
				});
			}
			else {
				$(layerId).find('.layer_con').css('height', 'inherit');
			}

		layer = function() {

			$(layerId).css({
				'top': ($(window).height() / 2) - ($(layerId).height() / 2),
				'left': ($(window).width() - $(layerId).width()) / 2,
			});

		}

		$('.dim').css({
			'width': $('html, body').width(),
			'height': $(document).height()
		})
		.show();

		layer();
		$(layerId).show().attr('tabindex', 0).focus();

		$(layerId).find('iframe').css({
			'width': '100%',
			'height': $(layerId).find('.layer_con').height() - 7
		});

		$(window).resize(function() {
			$(layerId).find('.layer_con').css({
				'height': $(window).height() - 160,
				'overflow-y': 'auto'
			});

			layer();
			$('.dim').css({
				'width': $('html, body').width(),
				'height': $(document).height()
			});
		});
		return false
	});
	
	$('.layer').on('focus', function() {
		var objThis = $(this);
		$(window).on('keydown', function(event) {
			var isShift = window.event.shiftKey ? true : false;
			if(!isShift && event.keyCode == 9){
				if($(event.target).is('#' + objThis.attr('id') + ' a[style!="display:none"]:last') || !$(event.target).parents().is('.layer')){
					$('#' + objThis.attr('id')).attr('tabindex', '0').focus();
				}
			}
		});
		$(window).on('keydown', function(event) {
			var isShift = window.event.shiftKey ? true : false;
			if((isShift && event.keyCode == 9)){
				if($(event.target).is('#' + objThis.attr('id') + ' a[style!="display:none"]:first') || $(event.target).is('#' + objThis.attr('id')) || !$(event.target).parents().is('.layer')){
					setTimeout(function() {
						$('#' + objThis.attr('id') + ' a[style!="display:none"]:last').focus();
					}, 100);
				}
			}
		});
	});

	$('a.btn_layer_close, a.layer_close').click(function(e) {
		e.preventDefault();
		$(this).parents('.layer').removeAttr('style');
		$(this).parents('.layer').find('.layer_con').removeAttr('style');
		$(this).parents('.layer').removeAttr('tabindex').hide();
		var dim = 0
		$('.layer').each(function(i) {
			if ($(this).attr('tabindex') == 0) {
				dim += 1;
			}
		})

		if (dim == 0) {
			$('.dim').hide();
			$('html, body').css('overflow', 'visible');
		}

		$(this).parents('.layer').hide();

		var $layerBtn = $('.' + $(this).parents('.layer').attr('id'));
		// $layerBtn.focus();
	});

	//전체메뉴
	$('.btn_allmenu').on('click', function() {
		$('html, body').css('overflow', 'hidden');
		$('.dim').fadeIn(150);
		$('.layer_allmenu_wrap').fadeIn(150);
	});

	$('.btn_allmenu_close').on('click', function() {
		$('html, body').css('overflow', '');
		$('.dim').fadeOut(150);
		$('.layer_allmenu_wrap').fadeOut(150);
	});

	//언어선택
	$('.sel_lang_wrap li a').on('click', function() {
		$(this).parents('.sel_lang_wrap').find('.layer_language').fadeIn(150);
	});
	$('.btn_language_close').on('click', function() {
		$(this).parents('.sel_lang_wrap').find('.layer_language').fadeOut(150);
	});

	//검색
	$('.btn_search').on('click', function() {
		$(this).parents('.util_menu').find('.layer_search').fadeIn(150);
	});
	$('.btn_search_close').on('click', function() {
		$(this).parents('.util_menu').find('.layer_search').fadeOut(150);
	});

	// Tooltip
	$('.tooltip_layer').hide();
	$('.btn_tooltip').on('mouseover', function() {
		$(this).addClass('on');
		$(this).find('.tooltip_layer').show();
	});
	$('.btn_tooltip').on('mouseleave', function() {
		$(this).removeClass('on');
		$(this).find('.tooltip_layer').hide();
	});
	$('.txt_tooltip').on('click', function() {
		//$(this).toggleClass('on');
		$(this).parents().find('.tooltip_layer.txt').fadeToggle(150);
	});
	
	$('.btn_salecode').on('click', function() {
		$(this).toggleClass('on');
		$('.layer_salecode').fadeToggle(150);
	});

	/*
	$('.txt_tooltip').on('mouseleave', function() {
		$(this).removeClass('on');
		$(this).find('.tooltip_layer').hide();
	});
	*/

	$('.path .menu').hide();
	$('.path .dep').on('mouseover', function() {
		$(this).addClass('on');
		$('.menu').fadeOut(150);
		$(this).parents('li').find('.menu').slideDown(150);
	});
	$('.path .menu').on('mouseleave', function() {
		$('.menu').slideUp(150);
		$(this).parents('li').find('.dep').removeClass('on');
	});

	$('.quick_flink a').click(function() {
		$(this).toggleClass('on');
		$('.list_link').slideToggle(150);
		//$('.list_link').show();
		//$('.list_link').animate({'top': -150}, 150);
	});

	//예매확인증 이메일 전송 2019.04.03
	$(".tab_radio li:first").addClass("on").show().find("input:radio").removeAttr("checked");
	$(".type_cont:first").addClass("on");
	$(".tab_radio li").click(function(e){
        $(this).addClass("on").find("input:radio").prop("checked","checked").siblings().removeClass("on").find("input:radio").removeAttr("checked");
        $(".type_cont").removeClass("on");
        var onType = $(this).find("input:radio").val();
        $('#' + onType).addClass("on");
        e.preventDefault();
    });

	// 고객센터 FAQ
	var sort1 = $(".sorting1>ul>li"),
		sort2 = $(".sorting2>ul>li");
	sort1.each(function(){
		sort1.on("click", function(e){
			var $this = $(this);
			$this.addClass("on").siblings().removeClass("on");
			e.preventDefault();
		});
	});
	sort2.each(function(){
		sort2.on("click", function(e){
			var $this = $(this);
			$this.addClass("on").siblings().removeClass("on");
			e.preventDefault();
		});
	});

	// 토글 리스트
	$(".toggle_list>ul>li").first().addClass("on"); 
	var toggleList = $(".toggle_list>ul>li");
	toggleList.find(">a").on("click", function(e){
		var $this = $(this);
		$this.parent().toggleClass("on");
		if($this.parent().siblings().hasClass("on")){
			$this.parent().siblings().removeClass("on");
		}
		e.preventDefault();
	});
	function listTitCheck(){
		$('.list_tit_check input[type="checkbox"]').change(function(){
			console.log($(this).prop('checked'))
			$(this).prop('checked') == true ? $(this).next('label').html('<span class="icon"></span>동의함') : $(this).next('label').html('<span class="icon"></span>미동의');
			$(this).parents('li').removeClass('on').next('li').addClass('on');
		})
	};listTitCheck();

	/*var bunDle = $(".bundle_list");
	var bunNum = $(".bundle_list ul li");	
	bunNum.each(function(){
		var $this = $(this);
		if(bunNum.length == 1){
			$this.parent().parent(".bundle_list").addClass("n1");
		}else if(bunNum.length == 2){
			$this.parent().parent(".bundle_list").addClass("n2");
		}else if(bunNum.length == 3){
			$this.parent().parent(".bundle_list").addClass("n3");
		}else if(bunNum.length == 4){
			$this.parent().parent(".bundle_list").addClass("n4");
		}else if(bunNum.length == 5){
			$this.parent().parent(".bundle_list").addClass("n5");
		}else if(bunNum.length == 6){
			$this.parent().parent(".bundle_list").addClass("n6");
		}else{}
	});*/
	//20190308 요청 삭제
	
	//2018.02.12
	var wid = 1000,
		wid2 = 720,
		hei = 910,
		winWidth = ($(window).width() - wid) / 2,
		winWidth2 = ($(window).width() - wid2) / 2,
		winHeight = ($(window).height() - hei) / 2,
		popPage = ".pop_print", // 나의 예약
		popPage2 = ".pop_print2", //나의 예약
		popPage3 = ".pop_print3", //나의 예약
		popPage4 = ".pop_print4", //항공권 예매
		link = "PRV04010601P.html",
		link2 = "PRV04010602P.html",
		link3 = "PRV04010603P.html",
		link4 = "POT01000000P.html";
	$(popPage).on("click",function(e){
		printClose = window.open(link,"window","width= "+ wid + ",height=" + hei + ",left=" + winWidth + ",top=" + winHeight + ", scrollbars = yes, location = no, toolbar = no, menubar = no, status = no");
		e.preventDefault();
	});

	$(popPage2).on("click",function(e){
		printClose = window.open(link2,"window","width= "+ wid + ",height=" + hei + ",left=" + winWidth + ",top=" + winHeight + ", scrollbars = yes, location = no, toolbar = no, menubar = no, status = no");
		e.preventDefault();
	});

	$(popPage3).on("click",function(e){
		printClose = window.open(link3,"window","width= "+ wid2 + ",height=" + hei + ",left=" + winWidth2 + ",top=" + winHeight + ", scrollbars = yes, location = no, toolbar = no, menubar = no, status = no");
		e.preventDefault();
	});

	$(popPage4).on("click",function(e){
		printClose = window.open(link4,"window","width= "+ wid2 + ",height=" + hei + ",left=" + winWidth2 + ",top=" + winHeight + ", scrollbars = yes, location = no, toolbar = no, menubar = no, status = no");
		e.preventDefault();
	});

	$(".btn_pass_closing").on("click", function(){
		window.close(); 
		self.close(); 
		window.opener = window.location.href; 
		self.close(); 
		window.open('about:blank','_self').close();
	});

	function tabScroll(){
		var rows = [],
			$eleTab= $('.history_tab'),
			$ele= $('.history_wrap'),
			$eleFind = $ele.find('.history_cont');
		$eleFind.each(function(e){
			rows[e] = $eleFind.eq(e).offset().top;
		});
		$eleTab.find('a').on('click',function(){
			var idx = $(this).closest('li').index();
			$ele.animate({'scrollTop':rows[idx]-$ele.eq(0).offset().top},500);
		});
		$ele.on('scroll',function(e){
			var scrollT = $ele.scrollTop();
			for (var i = 0; i <= $eleFind.length; i++) {
				if(scrollT <= rows[i]){
					$eleTab.find('li').eq(i).addClass('on').children('a').attr('title','선택됨').closest('li').siblings('li').removeClass('on').children('a').attr('title','선택안됨');

					return false;
				};
			};
		});
	};tabScroll()
	function toggleOnClass($ele, $closest, $parents){
		$ele.on('click',function(){
			var $this = $(this);
			function show(){
				hide();
				$this.parents($closest).addClass('on');
			};
			function hide(){
				$this.parents($parents).find($closest).removeClass('on');
			};
			$this.parents($closest).hasClass('on') ? hide() : show();
		});
	};
	toggleOnClass($('.packing_cons .btn_cont'),'.packing_wrap','.bundle_list');

	// Summary 탑승객
	$.fn.summaryPaxList = function(){
		$(".passenger_list").each(function(){
			$(".passenger_list li:first-child").find(".title").addClass('on')
			$(this).find('.passenger_summary:first').show();
			$(this).find(".title").on('click', function(e) {
				e.preventDefault();
				function slideDown(target) {
					slideUp();
					$(target).addClass('on').next().slideDown(100);
				}
				function slideUp() {
					$('.passenger_list .title').removeClass('on').next().slideUp(100);
				}
				$(this).hasClass('on') ? slideUp(100) : slideDown(this);
			});
		});
	}
	$.fn.summaryPaxList();

	//------- [ (구) 탭UI (삭제예정) ] -------//
	$.fn.tab = function() {
		var $tabWidget = $('.tab_section');
				$tabWidget.each(function() {
					var $this = $(this),
							$tab = $this.find('.tab_nav'),
							$tabListItems = $tab.find('li'),
							$tabListItemActive = $tab.find('li.active'),
							$tabListItemID = $tabListItemActive.attr("aria-controls");
				$tabPanels = $this.find('.panel');
				$tabPanelActive = $("#" + $tabListItemID);
				$tab.attr('role', 'tablist');
				$tabListItems.attr({
					'role': 'tab',
					'aria-selected': 'false',
					'tabindex': '0'
				});
				$tabListItemActive.attr({
					'aria-selected': 'true'
				});
				$tabPanels.attr({
					'role': 'tabpanel',
					'aria-hidden': 'true'
				});
				$tabPanelActive.attr('aria-hidden', 'false').addClass('active');
			});
			$("[role='tab']").on('click', function() {
				var $this = $(this);
				$("[role='tab']:not(this)").attr('aria-selected', 'false');
				$this.attr('aria-selected', 'true');
				$this.closest('.tab_nav').find('li').removeClass('active');
				$this.closest('li').addClass('active');
				var tabpanid = $this.attr("aria-controls");
				var tabpan = $("#" + tabpanid);
				$this.closest('.tab_nav').nextAll('.tab_contents').children("div[role='tabpanel']:not(tabpan)").attr('aria-hidden', 'true');
				$this.closest('.tab_nav').nextAll('.tab_contents').children("div[role='tabpanel']:not(tabpan)").removeClass('active');
				tabpan.addClass('active');
				tabpan.attr('aria-hidden', 'false');
			});
			$('[role="tab"]').keyup(function(e) {
				var keyCode = e.keyCode || e.which,
						lastPanel = $(this).closest('.tab_nav').find('li:last-child').attr('aria-controls'),
						firstPanel = $(this).closest('.tab_nav').find('li:first-child').attr('aria-controls'),
						firstTab = $(this).closest('.tab_nav').find('li:first-child').attr('id'),
						lastTab = $(this).closest('.tab_nav').find('li:last-child').attr('id');
				if (keyCode == 39 || keyCode == 40) { // 오른쪽방향키 이거나 아래 방향키
					e.preventDefault();
					$(this).removeClass('active').next().addClass('active').attr('aria-selected', true).siblings().attr('aria-selected', false);
					var selectedId = "#" + $(this).next().attr('aria-controls');
					$(selectedId).addClass('active').siblings().removeClass('active');
					$(this).next().focus();
					if ($(this).next().prevObject.attr('aria-controls') == lastPanel) {
						$('#' + firstTab).focus().addClass('active').attr('aria-selected', true).siblings().removeClass('active').attr('aria-selected', false);
						$('#' + firstPanel).addClass('active').siblings().removeClass('active');
					}
				}
				if (keyCode == 37 || keyCode == 38) { // 왼쪽방향키 이거나 위쪽 방향키
					e.preventDefault();
					$(this).removeClass('active').prev().addClass('active').attr('aria-selected', true).siblings().attr('aria-selected', false);
					var selectedId = "#" + $(this).prev().attr('aria-controls');
					$(selectedId).addClass('active').siblings().removeClass('active');
					$(this).prev().focus();
					if ($(this).prev().prevObject.attr('aria-controls') == firstPanel) {
						$('#' + lastTab).focus().addClass('active').attr('aria-selected', true).siblings().removeClass('active').attr('aria-selected', false);
						$('#' + lastPanel).addClass('active').siblings().removeClass('active');
					}
				}
				if (keyCode == 35) { //end 키를 눌렀을 때
					e.preventDefault();
					$('#' + lastTab).focus().addClass('active').attr('aria-selected', true).siblings().removeClass('active').attr('aria-selected', false);
					$('#' + lastPanel).addClass('active').siblings().removeClass('active');
				}
				if (keyCode == 36) { //home키를 눌렀을 때
					e.preventDefault();
					$('#' + firstTab).focus().addClass('active').attr('aria-selected', true).siblings().removeClass('active').attr('aria-selected', false);
					$('#' + firstPanel).addClass('active').siblings().removeClass('active');
				}
			});
		};
	$.fn.tab();

	//2019.03.26 기내식 선택 추가
	$.fn.foodSelect = function() {
		$(".sel_food_wrap .food_list .sel_food_info .img img").on("click", function(e){
			var $this = $(this);
			if( $this.parent().hasClass("on") == true){
				$this.parent().removeClass("on");
				$this.parent().next("dl").find('input:checkbox').removeProp("checked");
				return true;
			}else{
				$this.parent().addClass("on");
				$this.parent().next("dl").find('input:checkbox').prop('checked', 'checked');
			}
			e.preventDefault();
		});
		$(".sel_food_wrap .food_list").find('input:checkbox').on("focus", function(){
			var chked = $(this).is(":checked");
			if(chked == true){
				$(this).parent().parent().prev(".img").removeClass("on");
			}else{
				$(this).parent().parent().prev(".img").addClass("on");
			}
		});
	}
	$.fn.foodSelect();

}); //$(function(){});

// controlLayer
var controlLayer = function(layerId, val) {
	if (val == 1) {
		function init() {
			$('html, body').css('overflow','hidden');
			$(layerId).find('.btn_layer_close').blur();
			if ($(layerId).height() >= $(window).height()) {
				size();
			} else {
				$(layerId).find('.layer_con').css('height','inherit');
			}
		}
		init();
		
		function dim() {
			$('.dim').css({
				'width': $('html, body').width(),
				'height': $(document).height()
			}).show();
		}
		dim();
		
		function layer() {
			$(layerId).css({
				'top': ($(window).height() / 2) - ($(layerId).height() / 2),
				//'top': ($(window).height() / 2) + $(window).scrollTop() - ($(layerId).height() / 2),
				'left': ($(window).width() - $(layerId).width()) / 2
			});
		}
		layer();

		function show() {
			$(layerId).show().attr('tabindex', 0).focus();
		}
		show();

		function size() {
			$(layerId).find('.layer_con').css({
				'height': $(window).height() - 160,
				'overflow-y': 'auto'
			});
		}

		$(window).resize(function() {
			size();
			layer();
			$('.dim').css({
				'width': $('html, body').width(),
				'height': $(document).height()
			});
		});
	} else {
		$(layerId).removeAttr('style');
		$(layerId).find('.layer_con').removeAttr('style');
		$(layerId).removeAttr('tabindex').hide();

		var dim = 0
		
		if ($(layerId).attr('tabindex') == 0) {
			dim += 1;
		}

		if (dim == 0) {
			$('.dim').hide();
			$('html, body').css('overflow','visible');
		}

		$(layerId).hide();
	}
}

// 파일업로드
function fileLoad(){
	$fileBox = $(".filebox");
	$.each($fileBox, function(idx){
		var $this = $fileBox.eq(idx),
			$btnUpload = $this.find("[type='file']"),
			$label = $this.find(".file_label");
		$btnUpload.on("change", function(){
			var $target = $(this),
				fileName = $target.val(),
				$fileText = $target.siblings(".file_name");
			$fileText.val(fileName);
		});
		$btnUpload.on("focusin focusout", function(e){
			e.type == "focusin" ?
			$label.addClass("file_focus") : $label.removeClass("file_focus");
		});
	});
}

// select UI
function selectBox(){
	var selectArrow = $(".selectbox"),
		selectTarget = $(".selectbox .select_box");

	selectTarget.change(function(){
		var $this = $(this);
		var selectName = $this.children("option:selected").text();
		$this.siblings(".label").text(selectName);
		$this.parent().removeClass("focus");
	});

	selectTarget.on({"focus" : function(){
		var $this = $(this);
		$this.parent().addClass("focus");
	}, "blur" : function(){
		var $this = $(this);
		$this.parent().removeClass("focus");
	}});

	/*selectTarget.click(function(){
		var $this = $(this);
		var thisOption = $this.children("option").index($this.children("option:selected"));
		$this.parent().addClass("on");
	});*/		
}

//항공권예매 구간/부가서비스 이동 시 노출 문구
$.fn.targetMsg = function(time){
	$('.target_msg').css({'display':'flex'});
	$('body').append('<div class="dim_white"></div>');
	$('.target_msg .close').on('click', function() {
		$('.target_msg').fadeOut();
		$('.dim_white').remove();
		$('.dim').remove();
	});
	setTimeout(
		function(){
			$('.target_msg').fadeOut();
			$('.dim_white').remove();
			$('.dim').remove();
		}, time
	);
}