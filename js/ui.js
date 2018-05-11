$(document).ready(function(){

	$(window).resize(function(){
        var cnt_hig = $(window).height();
        var cnt_wid = $('.cnt').innerWidth();
		$(".cnt").css({"min-height" : cnt_hig});
        $(".container .cnt_about:after").css({"border-left": cnt_wid+"px solid transparent", "border-top": cnt_wid+"px solid green","bottom":-cnt_wid});
	}).resize();


	$(window).scroll(function(){
		$(".lst_nav li").each(function(idx){

			if ( parseInt($(window).scrollTop()) >= parseInt($(".cnt").eq(idx).offset().top) ) {
				$(this).addClass("on").siblings().removeClass();
			}
		// $(".cnt").eq(idx).text(parseInt($(".cnt").eq(idx).offset().top));
		// $(".view").html(parseInt($(window).scrollTop()));
		});
	});
		
	$(".nav ul li a").click(function(){
		event.preventDefault();
		$("html").animate({scrollTop:$(this.hash).offset().top},300,"linear",function(){
			$(this).parent().addClass("on").siblings().removeClass();
		});		
	});



// $(".movetab li a").click(function(event){
// event.preventDefault();
// $('html,body').animate({scrollTop:$(this.hash).offset().top}, "slow");
// });

});