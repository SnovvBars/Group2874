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
	window_height;


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
                'height': Math.ceil($(this).attr('data-height')*koeff_g)+"px",
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

})(jQuery);


	$(document).ready(function() {
		$('body, html').hammer().on('drag', function(){
			return false;
		})
		$('body').css('opacity',0);
	    $('body').transition({
			opacity: 1,
			easing: 'easeOutSine',
			duration: 720,
        })

	});


	$(window).load(function(){

    	img_background($('.img_background'));
        font_resizble(0, $('.font_resizble'));
		resize_sq($('.resize_sq'))

        map_points_place();

/*		setTimeout(function(){

            $('#map_loop').css({
    			'-webkit-clip-path': 'none',
			    'clip-path': 'none',
            })
        	$('#svgPath circle').attr({'cx':300,'cy':1000});
			$('#map_loop').css({
    			'-webkit-clip-path': 'url(#svgPath)',
			    'clip-path': 'url(#svgPath)',
            })
		},5000)*/
        setTimeout(function(){
			$('#map_loop, #culture_content, #culture_description').addClass('active');
        },500)
        setTimeout(function(){
            var _count = 0;
            console.log($('#points .point').length);
            var _interval = setInterval(function(){
                $($('#points .point').eq(_count).addClass('active'));
                _count++;
                if(_count == $('#points .point').length )
                    clearInterval(_interval)
            },200)
//			$('.simple_point, .points_pictuare_big, .points_pictuare_little').addClass('active');
        }, 3500)


    	function close_wings(){
            var data_poster=$('#video_webm').attr("data-poster"),
                data_media=$('#video_webm').attr("data-media");
//		   $('#video_webm').attr("poster", data_poster);
//		   $('.mejs-poster img').attr("src", data_poster);
  		   $('#video_webm').attr('src', data_media);
		   $('source').attr('src', data_media);
 		   player = new MediaElementPlayer('#video_webm', {  	//  инициализация video
	         alwaysShowControls: false,
             startVolume: 0.8,
			 features: ['playpause','current','progress','duration','fullscreen'],

	        success: function(player, node) {
	            player.addEventListener('ended', function(e){
		            $('#card_object_video').removeClass('active');
		 		    player.stop();
	            });
	        }
/*			 ended: function(){
			 	alert('1253')
			 }*/
 		   });

		   setTimeout(function(){
               player.play();
           },500)
 	       $('.mejs-time-rail, .mejs-time-total, .mejs-time-loaded').css('width','90%');	// ИЗМЕНЕНИЕ ширины полосы прокрутки
	       $('#card_object_video').stop().fadeIn(300);

	}

        $('#video').hammer().on('click', function(){
            $('#card_object_video').addClass('active');
            close_wings();
        })

	    $('.zoom_close_video').hammer().on('click', function () {
            $('#card_object_video').removeClass('active');
 		    player.stop();
	   	})

        $('a').on('click', function(){
            return false;
        })

/*        $('a').hammer({prevent_default: false}).on('click', function(){
            var data_url = $(this).arrt('href');
    	    $('body').transition({
    			opacity: 0,
    			easing: 'easeOutSine',
    			duration: 5000,
                complete: function(){
	                location.href = data_url;
                }
            })
            return false;
        })*/

        $('a').hammer().on('click', function(){
            if ($(this).attr('href') != undefined){   // если есть a href=""
                var href = $(this).attr('href');
                $('#points, #culture_content, #map_loop').addClass('hidden');

                setTimeout(function(){
                    $('body').animate({'opacity':0},1000,function(){
                        location.href = href;
                    })
                },1500)

            }
            return false;
        })


        $(window).on('resize', function(){

        })
	})