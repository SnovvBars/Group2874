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

	});


	$(window).load(function(){

    	img_background($('.img_background').not('#about_wrapper.img_background'));
        font_resizble(0, $('.font_resizble'));
		resize_sq($('.resize_sq'))
// Пагинатор
        for (var i=0;i<$('.hidden_pics').length;i++){
            $('#paginator_wrapper').append('<div class="page"></div>');
        }




        setTimeout(function(){
            $('#header, #quest, #puzzle_table').addClass('active');
        },1500)

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

        $('#learn_more').hammer().on('tap', function(){
            $('#quest, #puzzle_table, #learn_more, #about_wrapper').removeClass('active');
            if(current_slide == $('.hidden_pics').length){   // Достигли конца
                setTimeout(function(){
                    $('body').append('<div class="load_overfow" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; background-repeat: no-repeat; background-position: center; opacity: 0"; display: table> </div>');
                    add_att();
                    $('.load_overfow').animate({"opacity":1},500);
                },1000)
            }else{
                setTimeout(function(){
                    place_pics(current_slide);
                    place_answer(current_slide);
                    place_quest(current_slide);
                    $('#quest, #puzzle_table').addClass('active');
                },1000)
            }
        })


        current_slide = 0; // номер текущего вопроса
        place_pics(current_slide);
        place_answer(current_slide);
        place_quest(current_slide);

        function add_att(){
            var common_qwest = $('.page').length,
                false_answer = $('.page.true').length;
                procent_false = false_answer/common_qwest*100;

                if (procent_false <= 20 ){
                    var star_count = 1;
                    var frase='Наверное, ты не очень внимательно прочел описания храмов. Попробуй еще раз и ты убедишься, что справишься.'
                }

                if (procent_false > 20 && procent_false <= 40){
                    var star_count = 2;
                    var frase='Неплохо, но гордиться пока нечем. Ответ на каждый вопрос есть в описании храма. Читай внимательней и запоминай.'
                }

                if (procent_false > 40 && procent_false <= 60){
                    var star_count = 3;
                    var frase='Хороший результат, но память тебя немного подвела. Вернись к описаниям храмов и проверь себя еще раз.'
                }

                if (procent_false > 60 && procent_false <= 980){
                    var star_count = 4;
                    var frase='Отлично! Но зачем останавливаться на достигнутом? Попробуй еще раз и наверняка ты ответишь на все вопросы.'
                }
                if (procent_false == 100){
                    var star_count = 5;
                    var frase='Блестяще! Сразу видно, что ты увлечен историей России. Твои  знания обязательно тебе пригодятся. '
                }

                var stars='<div class="stars">';

                for (var i=0;i<star_count;i++){
                     stars = stars + '<img src="./img/gold_star.png">';
                     if (i == star_count - 1)
                        stars = stars + '</div">';
                }

            $('.load_overfow').append(''

                    +'<div class="congrat">'
                    +'<p>'+frase+'</p>'
                    +stars
                    +'<a href="check_youself.htm">'
                       +'<div class="next_sign">еще разок</div>'
                    +'</a>'
                    +'<a href="index.htm">'
                      +'<div class="next_sign next">закончить</div>'
                   +'</a>'
                   +'</div>'
                    +'</div>'
                   )

        $('.load_overfow a').on('click', function(){
            return false;
        })

        $('.load_overfow a').hammer().on('click', function(){
            if ($(this).attr('href') != undefined){   // если есть a href=""
                var href = $(this).attr('href');
                $('body').fadeOut(500,function(){
                    location.href = href;
                })
            }
            return false;
        })


        }


        function choice_answer(){
            $('#puzzle_table .item_click_wrapper').on('click', function(e){
            	console.log(e);
                choice_object =  $(e.currentTarget);
                if (choice_object.attr('data-true') == 'true'){
                    $('#puzzle_table .item_click_wrapper').find('.item_click_img_wrapper').removeClass('true');
                    $('#puzzle_table .item_click_wrapper').find('.item_click_img_wrapper').removeClass('false');
                    choice_object.find('.item_click_img_wrapper').addClass('true');

                    if(!$('.page').eq(current_slide).hasClass('true') || !$('.page').eq(current_slide).hasClass('false')){
                        $('.page').eq(current_slide).addClass('true');
                    }

                    setTimeout(function(){
                        $('#about_wrapper').addClass('active');
                    }, 1600);

                    setTimeout(function(){
                        $('#learn_more').addClass('active');
                    }, 1600);

                    console.log('Верно!');
                }else{
                    $('#puzzle_table .item_click_wrapper').find('.item_click_img_wrapper').removeClass('false');
                    $('#puzzle_table .item_click_wrapper').find('.item_click_img_wrapper').removeClass('true');
                    choice_object.find('.item_click_img_wrapper').addClass('false');

                    if(!$('.page').eq(current_slide).hasClass('true') || !$('.page').eq(current_slide).hasClass('false')){
                        $('.page').eq(current_slide).addClass('false');
                    }

                    setTimeout(function(){
                        $('#about_wrapper').addClass('active');
                    }, 1600);

                    setTimeout(function(){
                        $('#learn_more').addClass('active');
                    }, 5000);

                    console.log('Не верно!');
                }

                current_slide++;
                if(current_slide == $('.hidden_pics').length){   // Достигли конца
                    $('#learn_more').html('оценить результат');
                }
            }).on('release', function(){
                $('#puzzle_table .item_click_wrapper').hammer().off('tap');
            })

        }

        function place_pics(number){
            $('.hidden_pics').each(function(e){
                if($(this).attr('data-quest') == current_slide+1){
                    var pics_content = $(this).html();
                    $('#puzzle_table').html(pics_content);
                    if(current_slide == 0)
                        img_background($('#puzzle_table .img_background'));
                    choice_answer();
                    return false;
                }
            })
        }
        function place_answer(number){
            $('.hidden_answer').each(function(e){
                if($(this).attr('data-quest') == current_slide+1){
                   var answer_content = $(this).html();
                   if(current_slide != 0)
                       $('#about').getNiceScroll().remove();
                   $('#about_wrapper').html(answer_content);
                    add_NiceScroll();
//                    img_background($('#about_wrapper .img_background'));
                    return false;
                }
            })
        }
        function place_quest(number){
            $('.hidden_quest').each(function(e){
                if($(this).attr('data-quest') == current_slide+1){
                    var quest_content = $(this).html();
                    $('#quest').html(quest_content);
                    return false;
                }
            })
        }
/*        $('#learn_more').hammer().on('click', function(){
            $('#about_wrapper').addClass('active');
            $('#header, #learn_more').removeClass('active');
        })

        $('#arrow_dop_panel, #com_bg, #about_wrapper, #home').hammer().on('tap', function(){
            $('#about_wrapper').removeClass('active');
            $('#header, #learn_more').addClass('active');
        })*/

        function add_NiceScroll(){
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
        };


        $(window).on('resize', function(){

        })
	})