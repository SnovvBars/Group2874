///////////////////////////////////
      function clickIE4(){
      if (event.button==2){
      return false;
      }
      }
function clickNS4(e){
      if (document.layers||document.getElementById&&!document.all){
      if (e.which==2||e.which==3){
      return false;
      }
      }
      }
if (document.layers){
      document.captureEvents(Event.MOUSEDOWN);
      document.onmousedown=clickNS4;
      }
      else if (document.all&&!document.getElementById){
      document.onmousedown=clickIE4;
      }
document.oncontextmenu=new Function("return false");
////////////////////////////////////////////
var font_resizble,
    img_background,
	resize_sq,
	koeff_v,
	koeff_g,
	window_width,
	window_height,
    add_swiper;


(function($) {
//01
		var
        window_height = $(window).height(), // Высота окна
        window_width = $(window).width();  // Ширина окна

	    koeff_v = Math.round((window_width/1920)*100)/100,
	    koeff_g = Math.round((window_height/1080)*100)/100;

		img_background = function(_target_bg){ // ф-я перевода изображения в задник
			_target_bg.each(function(){
			    var img = new Image(),
                    img_src = $(this).find('img:first').attr('src'),
                    _this = $(this);

                img.src = img_src;
                img.addEventListener("load", modimage, false);

                function modimage(){
    				_this.css({"background-image":"url("+img_src+")"});
       				_this.attr({'data-width':_this.find('img:first').outerWidth(),'data-height':_this.find('img:first').height(),'data-koeff':_this.find('img:first').outerWidth()/_this.find('img:first').height()});

                    if(!_this.hasClass('no_resize')){
                        _this.width(_this.height()*parseFloat(_this.attr('data-koeff')));
                    }
                    if(_this.hasClass('resize_sq')){
                        resize_sq(_this);
                    }
         		    _this.find('img:first').remove();
                }
			})
    	}

// 02
    font_resizble = function(count, _font){     // Изменение фонтов от размера и ширины
//        resize_sq();
        if (count == 0){
            _font.each(function(){
                $(this).attr('data-font-size',parseFloat($(this).css('font-size')));
            })
            $('.resize_sq').each(function(){
                $(this).attr({'data-width':$(this).width(),'data-height':$(this).height()});
            })
        }
        if(koeff_v <= koeff_g){
            _font.each(function(){
                $(this).css('font-size', Math.ceil($(this).attr('data-font-size')*koeff_v)+"px");
            })
        }else{
            _font.each(function(){
                $(this).css('font-size', Math.ceil($(this).attr('data-font-size')*koeff_g)+"px");
            })
        }
    }

// 02a
    resize_sq = function(_target){
        window_height = $(window).height(), // Высота окна
        window_width = $(window).width();  // Ширина окна

        _target.each(function(){
//			console.log($(this))
            $(this).css({
                'width': Math.ceil($(this).attr('data-width')*koeff_g)+"px",
                'height': Math.ceil($(this).attr('data-width')*koeff_g)+"px",
            });
        })
    }

// 03
	map_points_place = function(){
    	$('.point').each(function(){
    		if ($(this).attr('data-left').length != 0)
				$(this).css('margin-left',$(this).attr('data-left')+'px');
    		if ($(this).attr('data-top').length != 0)
				$(this).css('margin-top',$(this).attr('data-top')+'px');
    	})
	}
// 04
/*	add_swiper = function(_target){
	    Swiper (_target, {
	         slidesPerView: 4,
	         paginationClickable: true,
	         spaceBetween: 0,
	         mousewheelControl: false,
	         loop: true,
			 keyboardControl: true,
	         onInit: function(event){                                       // Кнопка след.

                $('.ar_left').on('click', function(){
  					event.container[0].swiper.slidePrev();
   				});
				event.container.find('.ar_right').on('click', function(){
					event.container[0].swiper.slideNext();
				});
	         },
	        pagination: '.swiper-pagination',
	        paginationType: 'progress',
	    })
	}*/

})(jQuery);


	$(document).ready(function() {
		$('body, html').hammer().on('drag', function(){
			return false;
		})
		$('body').css('opacity',0);
	    $('body').transition({
			opacity: 1,
			easing: 'easeOutSine',
			duration: 500,
        })

        setTimeout(function(){
            $('#header, #learn_more').addClass('active');
        },500)

	});


	$(window).load(function(){

    	img_background($('.img_background'));
        font_resizble(0, $('.font_resizble'));
		resize_sq($('.resize_sq'))

        $('a').on('click', function(){
            return false;
        })

        $('a').hammer().on('click', function(){
            if ($(this).attr('href') != undefined){   // если есть a href=""
                var href = $(this).attr('href');
/*                $('#map_bg_cicle_half, #object_content, .object_slider, #object_middle, #back, #full_scr, #zoom_wrapper').removeClass('active');*/
                $('body').fadeOut(500,function(){
                    location.href = href;
                })
            }
            return false;
        })

        $('#learn_more').hammer().on('click', function(){
            $('#about_wrapper').addClass('active');
            $('#header, #learn_more').removeClass('active');
        })

        $('#arrow_dop_panel, #com_bg, #about_wrapper, #home').hammer().on('tap', function(){
            $('#about_wrapper').removeClass('active');
            $('#header, #learn_more').addClass('active');
        })


       	$('#about').niceScroll({
            cursorcolor: "#938466",
    		scrollspeed: 60, // scrolling speed
    		mousescrollstep: 50, // scrolling speed with mouse wheel (pixel)
    		hwacceleration: true, // use hardware accelerated scroll when supported
    	    cursoropacitymin: 0.4,
    		cursoropacitymax: 0.7,
    		cursorwidth: "1px",
    		cursorborder: "1px solid #938466",
    		cursorborderradius: "1px",
    		touchbehavior: true,
    		horizrailenabled: true,
    	    cursordragontouch: true,
    		oneaxismousemode: "vertical-only",
    		directionlockdeadzone: 6,
    		preservenativescrolling: true,
    		enabletranslate3d: true,
//            railoffset: {"top":"10%","left":"-100%"},
            railpadding: {top:40,right:0,left:-50,bottom:20},
        });

        $(window).on('resize', function(){

        })
	})