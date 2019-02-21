$(document).ready(function(){
	var hash = window.location.hash.slice(1);
	if (hash > 0) {
		initSlide = hash;
	} else {
		initSlide = 1;
	}

	$.fn.category = function(){
		var spv = 'auto';
		var gnbTotalWid = 0;
		var gnbWidth = $(window).width();
		var gnbLeng =  $('#header .gnb li').length;

		$('#header .gnb li').each(function(i){
			gnbTotalWid += $(this).outerWidth();
		});

		function slideSpv(){
			if (gnbWidth < gnbTotalWid) {
				//console.log('gnb('+gnbWidth+')보다 total('+gnbTotalWid+') 값이 큼')
				$('#header .gnb li').width('auto');
				spv = 'auto';
			} else {
				//console.log('gnb('+gnbWidth+')보다 total('+gnbTotalWid+') 값이 작음')
				spv = gnbLeng;
			}	
		}slideSpv();

		if($('#header').length > 0){
			var $swipeMenu = $('#header li');
			var swipeMenu = new Swiper('#header', {
				slidesPerView: spv,
				freeMode: true,
				initialSlide:initSlide,
				noSwipingClass: 'stop-swiping',
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				on: {
					init: function () {
					},
					resize: function() {
						gnbWidth = $(window).width();
						slideSpv()
						swipeMenu.params.slidesPerView = spv;
					},
					click: function(){
						var offset = swipeMenu.clickedSlide.clientWidth + swipeMenu.clickedSlide.offsetLeft;
						var tabIndex = swipeMenu.clickedIndex;
						if(gnbWidth < offset){
							swipeMenu.slideTo(tabIndex);
						} else {
							swipeMenu.slideTo(tabIndex-1);
						}
						$('html').animate({scrollTop : 0}, 500);
					}
				}
			});
		}

		if($('#container').length > 0){
			var swipeCnt = new Swiper('#container', {
				slidesPerView :1 ,
				autoHeight: true,
				initialSlide:initSlide,
				noSwipingClass: 'stop-swiping',
				thumbs: {
					swiper: swipeMenu
				},
				on: {
					init: function () {
						tabCntNum = $('.content .tab_cnt').length;
						var secWid = $(window).outerWidth();
						$('#container .content').css({width : secWid * tabCntNum});
						var thisHig = $(window).height() - $('#header').height();
						$('.content').css({'min-height':thisHig});
						$('.home').css({'min-height':thisHig});
					},
					slideChange: function () {
						var $this = $('#header .swiper-slide-thumb-active');
						var offset = $this.width()+$this.offset().left;
						var tabIndex = $this.index();
						if(gnbWidth < offset){
							swipeMenu.slideTo(tabIndex);
						} else {
							swipeMenu.slideTo(tabIndex-1);
						}
					},
					slideChangeTransitionStart: function(){
						var $this = $('#header .swiper-slide-thumb-active');
						if ($this.hasClass('stop-swiping')) {
							swipeCnt.slideTo(1);
						}
					},
					click: function(){
						var clickHig = swipeCnt.clickedSlide.offsetHeight;
						if ($('#header .fixed')) {
							var clickHigFix = clickHig + $('#header').height();
							$('.content.swiper-wrapper').animate({'height':clickHigFix}, 500);
						} else {
							$('.content.swiper-wrapper').animate({'height':clickHig}, 500);
						}
					},
					resize: function(){
						var secWid = swipeCnt.el.parentElement.clientWidth;
						$('#container .tab_cnt').css({'width':secWid});
						$('#container .content').css({width : secWid * tabCntNum});
					}
				}
			});
		}
	}
	$.fn.category();

	// accordion
	if($('.cnt .accordion > dd').hasClass('on')){
		$('.cnt .accordion > dd.on').css({'display':'block'});
	}
	$(window).resize(function(){
		var winHei = $(document).height();
		$('.accordion > dt').on('click', function() {
			$this = $(this);
			$target =  $this.next('dd');
			$targetSilbTit = $this.siblings('dt')
			$targetSilbCnt = $this.siblings('dd')
			if(!$this.hasClass('on')){
				$targetSilbTit.removeClass('on');
				$targetSilbCnt.removeClass('on').slideUp();
				$this.addClass('on');
				$target.addClass('on').slideDown();
			}
		});
	}).resize();
	$(window).scroll(function(){
		var $scroll = $(window).scrollTop();
		var $gnbHei = $('#header').outerHeight();
		if ($scroll > $gnbHei) {
			$('#header').addClass('fixed')
			$('#container').css({'padding-top' : $gnbHei})
		}
	});

	//main height
	$(window).resize(function(){
		var w = $(window).outerWidth();
		var h = $(window).outerHeight();
		$('#wrap_idx').css({'height' : h, 'width' : w});
	}).resize();
});
