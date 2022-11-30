var img_tap,
    font_resizble,
    img_background;
(function($) {
  $.fn.silverCarusel = function() {

// Карусель
    $('#carusel').wrapInner('<section id="container_wrapper"></section>');

    $('#container_wrapper').css({
        "width": "100%",
        "height": "80%",
        "position": "absolute",
        "top": "5px",
        "left": "0px",
        "box-sizing": "border-box",
    })
// Загрузчик
    var count_images = 0;
    for (i=0;i<$('#carusel img').length;i++){
        $('#carusel img').each(function(){
		    var img = new Image(),
                img_src = $(this).attr('src'),
                _this = $(this);

            img.src = img_src;
            img.addEventListener("load", check_load_image, false);
        })
    }
    function check_load_image(){
        count_images++;
        if (count_images == $('#carusel img').length){
            $('#carusel').animate({"opacity":1},500,'easeInQuint')
//            alert($('#carusel img').length + ' изо загружено!')
        }
    }
// Загрузчик конец
 	img_to_background = function(){ // ф-я перевода изображения в задник
		$('.img_to_background').each(function(){
		    var img = new Image(),
                img_src = $(this).find('img:first').attr('src'),
                _this = $(this);
            img.src = img_src;
            img.addEventListener("load", modimage_2, false);

            function modimage_2(){
   				_this.css({"background-image":"url("+img_src+")"});
   				_this.attr({'data-width':_this.find('img:first').outerWidth(),'data-height':_this.find('img:first').height(),'data-koeff':_this.find('img:first').outerWidth()/_this.find('img:first').height()});
       		    _this.find('img:first').remove();
                if(!_this.hasClass('no_resize')){
                    _this.width(_this.height()*parseFloat(_this.attr('data-koeff')));
                }

                if(_this.hasClass('reflect')){            // добавляем отражение
                    _this.width(_this.height()/0.77).clone().removeClass('img_wrapper','reflect').addClass('img_reflect').insertAfter(_this);
                }
                $('#seen').width($('.reflect').width());
            }
            $(window).on('resize', function(){
                if(!_this.hasClass('no_resize')){
                    _this.width(_this.height()*parseFloat(_this.attr('data-koeff')));
                }
                if(_this.hasClass('reflect')){            // добавляем отражение
                    _this.next('.img_reflect').remove();
                    _this.width(_this.height()/0.77).clone().removeClass('img_wrapper','reflect').addClass('img_reflect').insertAfter(_this);
                }
                $('#seen').width($('.reflect').width());
            })
    	})
	}
    img_to_background();
    $('#carusel #container_wrapper .container:nth-child(1)').addClass('active').addClass('display');
    $('#carusel #container_wrapper .container:nth-child(2)').addClass('display');
    $('#carusel #container_wrapper .container:nth-child(3)').addClass('display');
    $('#carusel #container_wrapper .container:nth-child(4)').addClass('display');
    $('#carusel #container_wrapper .container:nth-child(5)').addClass('display');

    function remove_seen_attr(_submenu, _href){
        $('#seen').removeAttr('data-submenu');
        $('#seen').removeAttr('data-href');
        if (_submenu != undefined)
            $('#seen').attr('data-submenu',_submenu);
        if (_href != undefined)
            $('#seen').attr('data-href',_href);
    };

    remove_seen_attr($('#carusel #container_wrapper .container:nth-child(1)').attr('data-submenu'),$('#carusel #container_wrapper .container:nth-child(1)').find('a').attr('href'));

// Определение переменных
    var begin_point = 0,
        length_elem = $('#carusel #container_wrapper .container').height()/0.77,                 // длина одного выпремленного элемента
        moveX_length = $('#container_wrapper').width() - length_elem,    // длина пробега до поворота
        begin_opacity = 0.1,
        end_opacity = 1,
        begin_angle = 14,
        end_angle = 0,
        begin_scale = 0.8,
        end_scale = 1,
//        time_continuum = 500,
        time_duration = 250,                                             // Время анимации
        time_koeff = ($('#container_wrapper').width())/1382,             // Поправка на ширину карусели
        begin_perspective = 500,
        count_items = $('#carusel #container_wrapper .container').length,                            // Количество элементов карусели
        number_of_show_item = 5,                                         // Количество показываемых элементов карусели
        time_show_hide_opacity = time_duration/5,                                     // Время проявления
        _easing = 'easeOutSine',
        signature = '',
        number_of = '';

        $(window).on('resize', function(){
            length_elem = $('#carusel #container_wrapper .container').height()/0.77;
            moveX_length = $('#container_wrapper').width() - length_elem;
            time_koeff = ($('#container_wrapper').width())/1382;
            var points_summ = 0;
            for (i=0;i<5;i++){
                points[i].distance = (moveX_length/15)*i*1.5 + points_summ;      // Забиваем координаты по Х точек(всего 5)
                points_summ = points[i].distance;                                // Положение
                points[i].opacity = ((end_opacity-begin_opacity)/moveX_length)*points[i].distance + begin_opacity; // opacity
                points[i].angle = begin_angle-Math.floor(((begin_angle-end_angle)/moveX_length)*points[i].distance); // угол
            }
            for (i=0;i<$('#carusel #container_wrapper .container').length;i++){
                items[i].points = points;                   // добавляем список точек с параметрами (прозрачность, расстояние и т.п)
            }
        })
// Создание массива точек с параметрами
    var points = new Array,
        points_summ = 0,
        items = new Array;

    for (i=0;i<5;i++){
        points[i] = {};
        points[i].distance = (moveX_length/15)*i*1.5 + points_summ;      // Забиваем координаты по Х точек(всего 5)
        points_summ = points[i].distance;                                // Положение

        points[i].opacity = ((end_opacity-begin_opacity)/moveX_length)*points[i].distance + begin_opacity; // opacity
        points[i].angle = begin_angle-Math.floor(((begin_angle-end_angle)/moveX_length)*points[i].distance); // угол

        if (i == (number_of_show_item-1)){
            points[i].scale = end_scale;                                                                    // масштаб
        }else{
            points[i].scale = begin_scale;
        }
//        points[i].time_interval = Math.floor(((points[i].distance/moveX_length)*time_continuum*time_koeff)*100)/100; // время движения от начала
        points[i].z_index = i + 10;                 // z-index
    }
// Создание массива точек с параметрами
// Создание массива объектов с параметрами
    for (i=0;i<$('#carusel #container_wrapper .container').length;i++){
        items[i] = {};                              // создаем объект
        items[i].image = $('#carusel #container_wrapper .container').eq(i);     // добавляем картинку
        items[i].points = points;                   // добавляем список точек с параметрами (прозрачность, расстояние и т.п)
        if(i < number_of_show_item){
            items[i].current_point = (number_of_show_item-1) - i;                 // начальное положение (номер нахождения в какой точке
        }else{
            items[i].current_point = ($('#carusel #container_wrapper .container').length -1) - (i-number_of_show_item);                 // начальное положение (номер нахождения в какой точке
        }
    }
// Создание массива объектов с параметрами

// Определение начальных положений с параметрами в точках
    for (i=0;i<$('#carusel #container_wrapper .container').length;i++){
        if (items[i].current_point > (number_of_show_item-1)){
            items[i].image.css({
                opacity: 0,
                x: '0px',
//                "z-index": items[i].points[0].z_index,
            })
            if (i > (number_of_show_item-1)){
                items[i].image.css({
                    "z-index": 1,
                })
            }else{
                items[i].image.css({
                    "z-index": items[i].points[0].z_index,
                })
            }
            items[i].image.find('.content').css({   // Начальное положение элемента
                perspective: begin_perspective,
                rotateY: items[i].points[0].angle + 'deg',
                scale: items[i].points[0].scale,
            });
        }else{
            items[i].image.css({
                opacity: items[i].points[items[i].current_point].opacity,
                x: items[i].points[items[i].current_point].distance +'px',
                "z-index": items[i].points[items[i].current_point].z_index,
            })
            items[i].image.find('.content').css({   // Начальное положение элемента
                perspective: begin_perspective,
                rotateY: items[i].points[items[i].current_point].angle + 'deg',
                scale: items[i].points[items[i].current_point].scale,
            });
        }
        items[i].image.attr({'data-point':items[i].current_point,'data-index': i+1});
    }
// Определение начальных положений с параметрами в точках

// Добавление подписи
    if ($('#carusel #container_wrapper .container:nth-child(1)').attr('data-caption') != undefined){
        signature = $('#carusel #container_wrapper .container:nth-child(1)').attr('data-caption');
    }else{
        signature = '';
    }
    change_caption(signature);
// Добавление номеров
    number_of = 1+'&nbsp;&frasl;&nbsp;'+count_items;
    change_numbers(number_of);

    var begin_TS = 0;
    $('#carusel').on('mousewheel', function(e) {
        var  current_TS = e.timeStamp;
        if ((current_TS - begin_TS) > time_duration + time_show_hide_opacity*2){
            mouse_wheel_action(e);
            begin_TS = e.timeStamp;
        }
/*        else{                                                                           //  очень быстрое вращение колесом
            (e.deltaY > 0)?move_acceleration('right'):move_acceleration('left');
            begin_TS = e.timeStamp;
        }*/
//        console.log(e);
//        console.log(current_TS - begin_TS);

    });

    function mouse_wheel_action(e){
        if (e.deltaY > 0){
            prev();
        }else{
            next();
        }
    }
    $('#next').on('click',function(){
        next();
    })
    $('#prev').on('click',function(){
        prev();
    })
    $('#carusel a').on('click', function(){
		return false;
	})

// DRAG
/*    var interval_next,
        interval_prev,
        count_next = 0,
        count_prev = 0,
        prev_delta = 0,
        count_acceleration = 0;

    function drag_right(){
        clearInterval(interval_next);
        clearInterval(interval_prev);
        interval_next = setInterval(function(){
            next();
        },time_duration + time_show_hide_opacity + 50);
    }
    function drag_left(){
        clearInterval(interval_next);
        clearInterval(interval_prev);
        interval_next = setInterval(function(){
            prev();
        },time_duration + time_show_hide_opacity + 50);
    }

    $('#container_wrapper').on('dragstart',function(e){

        $('#carusel #container_wrapper .container, #carusel, #container_wrapper').css('pointer-events','none');
        if (e.gesture.velocityX > 0.5 && count_acceleration == 0) {                                                     // если быстро провели пальцем по экрану
            if (e.gesture.direction == 'right'){
                move_acceleration('right');
            }
            if (e.gesture.direction == 'left'){
                move_acceleration('left');
            }
        }else{                                                                              // если нормально провели
            if (e.gesture.direction == 'right'){
                next();
                drag_right();
            }
            if (e.gesture.direction == 'left'){
                prev();
                drag_left()
            }
        }
    })
    .on('drag', function(e){
        if (e.gesture.deltaX - prev_delta > 0 && count_next == 0){
            drag_right();
            count_next = 1;
            count_prev = 0;
        }
        if (e.gesture.deltaX - prev_delta < 0 && count_prev == 0){
            drag_left();
            count_next = 0;
            count_prev = 1;
        }
        prev_delta = e.gesture.deltaX;
    })
    .on('dragend',function(){
        count_next = 0;
        count_prev = 0;
        clearInterval(interval_next);
        clearInterval(interval_prev);
        $('#carusel #container_wrapper .container, #carusel, #container_wrapper').css('pointer-events','auto');
    })*/
// DRAG

    function move_acceleration(direction){                                          // Вращение более чем один раз с ускорением
        count_acceleration = 1;
        if (count_items > number_of_show_item){
            var numbers_circle = number_of_show_item;
        }else{
            var numbers_circle = count_items;
        }
        if (direction == 'right'){
            move_more_one_step(numbers_circle, 'next', 'acceleration');                 // вызываем ф-ю вращения кол-во раз, тип вращения, ускорение (есть или нет)
        }
        if (direction == 'left'){
            move_more_one_step(numbers_circle, 'prev', 'acceleration');
        }
    }

    function move_more_one_step(move_delta, f_action, _acceleration){               // Вращение более чем один раз
        var old_time_duration = time_duration,                                      // Запоминаем время анимации
            old_time_show_hide_opacity = time_show_hide_opacity,                    // Запоминаем время проявления
            count_moves = 0,                                                        // Сколько раз сдвинули
            old_easing = _easing,                                                   // Запоминаем тип старой анимации
            _easing = 'linear';                                                     // Определяем новый тип анимации

        if (_acceleration != 'no_acceleration'){
            time_duration = (time_duration/move_delta)*1.8;   // Ускорение
            time_show_hide_opacity = time_duration/5;
        }
        (f_action == 'next')?next():prev();
        count_moves++;
        var interval_moves = setInterval(function(){
            if(count_moves >= move_delta){
                clearInterval(interval_moves);
                time_duration = old_time_duration;                                  // возвращаем старые значения
                time_show_hide_opacity = old_time_show_hide_opacity;
                _easing = old_easing;
                $('#carusel #container_wrapper .container').css('pointer-events','auto');
                count_acceleration = 0;
            }else{
                (f_action == 'next')?next():prev();
                count_moves++;
            }
        },time_duration + time_show_hide_opacity + 50);
    }

    $('#carusel #container_wrapper .container').hammer().on('tap', function(e){
        var current_point = parseFloat($(e.currentTarget).attr('data-point')),          // Определяем текущую точку элемента
            move_delta = (number_of_show_item -1) - current_point;                      // На сколько надо сдвинуть

        if (move_delta != 0){
            $('#carusel #container_wrapper .container').css('pointer-events','none');
            move_more_one_step(move_delta, 'next', 'no_acceleration');
        }else{
            img_tap_no_move($(this));
        }
    })
    function img_tap_no_move(_target){
        if (_target.find('a').attr('href') != undefined){   // если есть a href=""
            var href = _target.find('a').attr('href');
            $('body').fadeOut(300,function(){
                location.href = href;
            })
        }else{
            if (_target.attr('data-submenu') != undefined){
                img_tap(_target.attr('data-submenu'));
            }
        }
    }

// Кнопка смотреть
    function seen_bt(){
        $('#seen').on('click', function(){
            if ($(this).attr('data-href') != undefined){
                var href = $(this).attr('data-href');
                $('body').fadeOut(300,function(){
                    location.href = href;
                })
            }
            if ($(this).attr('data-submenu') != undefined){
                img_tap($(this).attr('data-submenu'));               }
        })
    }
    seen_bt();
// Движение вперед
    function next(){
        items.forEach(function(e){
// Определение переменных
            var old_point = e.current_point,                                // Старое положение
                current_point = e.current_point + 1;                        // Движение вперед - новое положение
            if (count_items >= number_of_show_item){
                if (current_point == count_items) {current_point = 0};      // Переводим в начальную точку
            }
//  Элементов больше 5
            if (count_items > number_of_show_item){
                if (old_point >=0 && old_point < (number_of_show_item-1)){  // Точки от нуля до крайней правой просто двигаем
                    item_move(e, current_point);
                }
                if (old_point == (number_of_show_item-1)){                  // Крайняя правая точка - скрываем, ставим в изначальное положение
                    item_to_default_right(e);
                }
                if (old_point == count_items -1){                           // Проявляем скрытую ждущую точку слева
                    setTimeout(function(){
                        appearance_right(e);
                    },time_duration*time_koeff/2)
                }
            }
//  Элементов 5
            if (count_items == number_of_show_item){
                if (current_point == 0 && old_point == (number_of_show_item-1)){                    // Скрываем крайнюю правую, переводим налево, проявляем
                    item_to_default_right(e, 1);
                }
                if (current_point < number_of_show_item && old_point != (number_of_show_item-1)){   // Просто двигаем
                    item_move(e, current_point);
                }
            }
//  Элементов меньше 5
            if (count_items < number_of_show_item){
                if (current_point == number_of_show_item) {current_point = number_of_show_item - count_items};      // Переводим в начальную точку

                if (current_point < number_of_show_item && old_point != (number_of_show_item-1)){                   // Просто двигаем
                    item_move(e, current_point);
                }
                if (current_point == (number_of_show_item - count_items) && old_point == (number_of_show_item-1)){  // Скрываем крайнюю правую, переводим налево, проявляем
                    item_to_default_right(e, 2);
                }
            }
            e.current_point = current_point;                                 // Записываем новое положение
            e.image.attr('data-point',e.current_point);                      // Записываем в разметку (Для контроля)
        });
        $('#carusel #container_wrapper .container').each(function(){
            if ($(this).attr('data-point') == 4 ||  $(this).attr('data-point') == 3 ||$(this).attr('data-point') == 2 || $(this).attr('data-point') == 1 || $(this).attr('data-point') == 0){
                $(this).addClass('display');
            }else{
                $(this).removeClass('display');
            }
            if ($(this).attr('data-point') == number_of_show_item - 1){
                $(this).addClass('active');

                remove_seen_attr($(this).attr('data-submenu'),$(this).find('a').attr('href'));
                close_sub_menu();

                if ($(this).attr('data-caption') != undefined){
                    signature = $(this).attr('data-caption');
                }else{
                    signature = '';
                }
                change_caption(signature);

                number_of = $(this).attr('data-index')+'&nbsp;&frasl;&nbsp;'+count_items;
                change_numbers(number_of);
            }else{
                $(this).removeClass('active');
            }
        })
    }
// Движение назад
    function prev(){
        items.forEach(function(e){
// Определение переменных
            var old_point = e.current_point,                                // Старое положение
                current_point = e.current_point - 1;                        // Движение вперед - новое положение

//  Элементов больше 5
            if (count_items > number_of_show_item){
                if (current_point < 0) {current_point = count_items - 1};      // Переводим в начальную точку

                if (old_point >0 && old_point <= (number_of_show_item-1)){  // Точки от нуля до крайней левой просто двигаем
                    item_move(e, current_point);
                }
                if (old_point == 0){                  // Крайняя левая точка - скрываем, ставим в изначальное положение
                    item_to_default_left(e);
                }
                if (old_point == number_of_show_item){                           // Проявляем скрытую ждущую точку справа
                    setTimeout(function(){
                        appearance_left(e);
                    },time_duration*time_koeff/2)
                }
            }
//  Элементов 5
            if (count_items == number_of_show_item){
                if (current_point < 0) {current_point = number_of_show_item - 1};      // Переводим в начальную точку

                if (old_point == 0){                    // Скрываем крайнюю правую, переводим налево, проявляем
                    item_to_default_left(e, 1);
                }
                if (current_point < number_of_show_item && old_point != 0){   // Просто двигаем
                    item_move(e, current_point);
                }
            }
//  Элементов меньше 5
            if (count_items < number_of_show_item){
                if (current_point == (number_of_show_item - count_items - 1)) {current_point = number_of_show_item-1};      // Переводим в начальную точку

                if (old_point != (number_of_show_item - count_items)){                   // Просто двигаем
                    item_move(e, current_point);
                }
                if (old_point == (number_of_show_item - count_items)){  // Скрываем крайнюю левую, переводим налево, проявляем
                    item_to_default_left(e, 2);
                }
            }
            e.current_point = current_point;                                 // Записываем новое положение
            e.image.attr('data-point',e.current_point);                      // Записываем в разметку (Для контроля)
        });
        $('#carusel #container_wrapper .container').each(function(){
            if ($(this).attr('data-point') == 4 ||  $(this).attr('data-point') == 3 ||$(this).attr('data-point') == 2 || $(this).attr('data-point') == 1 || $(this).attr('data-point') == 0){
                $(this).addClass('display');
            }else{
                $(this).removeClass('display');
            }
            if ($(this).attr('data-point') == number_of_show_item - 1){
                $(this).addClass('active');

                remove_seen_attr($(this).attr('data-submenu'),$(this).find('a').attr('href'));
                close_sub_menu();

                if ($(this).attr('data-caption') != undefined){
                    signature = $(this).attr('data-caption');
                }else{
                    signature = '';
                }
                change_caption(signature);

                number_of = $(this).attr('data-index')+'&nbsp;&frasl;&nbsp;'+count_items;
                change_numbers(number_of);
            }else{
                $(this).removeClass('active');
            }
        })

    }
// ФУНКЦИИ !!!!
//  Восстановление начального состояния (2 варианта для элементов меньше и больше 5) вправо
    function item_to_default_right(_target, _appearance){
        _target.image.transition({
            opacity: 0,
            duration: time_show_hide_opacity,
            easing: _easing,
            complete: function(){
                if(_appearance == 1){
                    appearance_right(_target);
                }
                if(_appearance == 2){
                    appearance_lite_right(_target);
                }
            }
        })
    }
//  Восстановление начального состояния (2 варианта для элементов меньше и больше 5) влево
    function item_to_default_left(_target, _appearance){
        _target.image.transition({
            opacity: 0,
            duration: time_show_hide_opacity,
            easing: _easing,
            complete: function(){
                if(_appearance == 1){
                    appearance_left(_target);
                }
                if(_appearance == 2){
                    appearance_lite_left(_target);
                }
            }
        })
    }
// Проявление слева, если элемньлв больше 4
    function appearance_right(_target){
        _target.image.css({
            x: '0px',
            "z-index": 1,
        })
        _target.image.find('.content').css({
            perspective: begin_perspective,
            rotateY: begin_angle + 'deg',
            scale: begin_scale,
            x: '0px',
        })
        _target.image.transition({
            opacity: begin_opacity,
            duration: time_show_hide_opacity,
            easing: _easing,
        })
    }
// Проявление справа, если элемньлв больше 4
    function appearance_left(_target){
        _target.image.css({
            x: _target.points[number_of_show_item - 1].distance+'px',
            "z-index": _target.points[number_of_show_item - 1].z_index,
        })
        _target.image.find('.content').css({
            perspective: begin_perspective,
            rotateY: _target.points[number_of_show_item - 1].angle + 'deg',
            scale: _target.points[number_of_show_item - 1].scale,
//            x: '0px',
        })
        _target.image.transition({
            opacity: end_opacity,
            duration: time_show_hide_opacity,
            easing: _easing,
        })
    }
// Проявление слева, если элемнтов меньше 5
    function appearance_lite_right(_target){
        _target.image.css({
            x: _target.points[number_of_show_item - count_items].distance + 'px',
            "z-index": _target.points[number_of_show_item - count_items].z_index,
        })
        _target.image.find('.content').css({
            perspective: begin_perspective,
            rotateY: _target.points[number_of_show_item - count_items].angle + 'deg',
            scale: _target.points[number_of_show_item - count_items].scale,
            x: '0px',
        })
        _target.image.transition({
            opacity: _target.points[number_of_show_item - count_items].opacity,
            duration: time_show_hide_opacity,
            easing: _easing,
        })
    }
// Проявление справа, если элемнтовв меньше 5
    function appearance_lite_left(_target){
        _target.image.css({
            x: _target.points[number_of_show_item - 1].distance + 'px',
            "z-index": _target.points[number_of_show_item - 1].z_index,
        })
        _target.image.find('.content').css({
            perspective: begin_perspective,
            rotateY: _target.points[number_of_show_item - 1].angle + 'deg',
            scale: _target.points[number_of_show_item - 1].scale,
            x: '0px',
        })
        _target.image.transition({
            opacity: _target.points[number_of_show_item - 1].opacity,
            duration: time_show_hide_opacity,
            easing: _easing,
        })
    }
// Просто движение по точкам
    function item_move(_target, current_point){
        _target.image.transition({
            opacity: _target.points[current_point].opacity,
            x: _target.points[current_point].distance +'px',
            "z-index": _target.points[current_point].z_index,
            easing: _easing,
            duration: time_duration*time_koeff,
        })
        _target.image.find('.content').transition({
            perspective: begin_perspective,
            rotateY: _target.points[current_point].angle + 'deg',
            scale: _target.points[current_point].scale,
            easing: _easing,
            duration: time_duration*time_koeff,
        })
    }
// Изменение подписи
    function change_caption(caption){
        $('#element_sign span:nth-child(2)').html(caption);
    }
// Изменение счетчика
    function change_numbers(number){
        $('#numbers span').html(number);
    }
// ФУНКЦИИ !!!!
// Карусель
// Авторотация



    var time_redirect = 300, // время в секундах
	    time_count = 0,
        var_Interval;



    	$('body').everyTime(1000, 'start_slide_show', function(i) {
            time_count++;
//			console.log(time_count);
      	    if( time_count == time_redirect ){
               var_Interval = setInterval(function(){
                   next();
               },5000)

          	}
          });

		$('body').hammer().on('touch', function(){
	        time_count = 0;
            clearInterval(var_Interval);
		})



  };
//01
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
                        resize_sq();
                    }
         		    _this.find('img:first').remove();
                }
			})
    	}

// 02
    font_resizble = function(count, _font){     // Изменение фонтов от размера и ширины
        resize_sq();
        if (count == 0){
            _font.each(function(){
                $(this).attr('data-font-size',parseFloat($(this).css('font-size')));
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
    resize_sq = function(){
        var window_height = $(window).height(), // Высота окна
        	window_width = $(window).width();  // Ширина окна

        koeff_v = Math.round((window_width/1920)*100)/100;
        koeff_g = Math.round((window_height/1080)*100)/100;

        $('.resize_sq').each(function(){
            $(this).css({
                'width': Math.ceil($(this).attr('data-width')*koeff_g)+"px",
                'height': Math.ceil($(this).attr('data-width')*koeff_g)+"px",
            });
        })
    }
// 03  Открытие левого сабменю
        img_tap = function(_target){
            var data_submenu = parseFloat(_target),
                _content = '';
            $('.hidden').each(function(){
                if (parseFloat($(this).attr('data-submenu')) == data_submenu){
                    _content = $(this).html();
//                    console.log(_content);
                }
            })
            $('#sub_item_wrapper').html(_content);
              img_background($('#sub_item_wrapper .img_background'));
//            resize_sq();
            $('#sub_menu').transition({
                x: '0%',
                easing: 'easeOutSine',
                duration: 300,
                complete: function(){
                    $('#sub_item_wrapper').scrollTop(0);
                    $('#sub_item_wrapper a').hammer().on('tap', function(){
                        if ($(this).attr('href') != undefined){   // если есть a href=""
                            var href = $(this).attr('href');
                           $('body').fadeOut(300,function(){
                                location.href = href;
                            })
                        }
                        return false;
                    })
                }
            })
    }
// 04 Закрытие подменю
    close_sub_menu = function(){
        $('#sub_menu').transition({
            x: '-110%',
            easing: 'easeOutSine',
            duration: 300,
            complete: function(){
                $('#sub_item_wrapper').scrollTop(0);
            }
        })
    }
})(jQuery);

$(window).load(function(){
    img_background($('.img_background').not($('.hidden .img_background')));
    font_resizble(0, $('.font_resizble'));

    $('#carusel').silverCarusel();

    $('#bt_close').on('click', function(){
        close_sub_menu();
    })

        $('a').on('click', function(){
            return false;
        })

        $('a').not('#carusel a').hammer().on('tap', function(){
            if ($(this).attr('href') != undefined){   // если есть a href=""
                var href = $(this).attr('href');
/*                $('#map_bg_cicle_half, #object_content, .object_slider, #object_middle, #back, #full_scr, #zoom_wrapper').removeClass('active');*/
                $('body').fadeOut(500,function(){
                    location.href = href;
                })
            }
            return false;
        })


   	$('#sub_item_wrapper').niceScroll({
        cursorcolor: "#414141",
		scrollspeed: 60, // scrolling speed
		mousescrollstep: 50, // scrolling speed with mouse wheel (pixel)
		hwacceleration: true, // use hardware accelerated scroll when supported
	    cursoropacitymin: 0.7,
		cursoropacitymax: 0.9,
		cursorwidth: "1px",
		cursorborder: "1px solid #555",
		cursorborderradius: "1px",
		touchbehavior: true,
		horizrailenabled: true,
	    cursordragontouch: true,
		oneaxismousemode: "vertical-only",
		directionlockdeadzone: 6,
		preservenativescrolling: true,
		enabletranslate3d: true,
        railoffset: {"top":10,"left":-(($(window).width()/2)*0.87+30)},
/*        railpadding: {top:0,right:50,left:20,bottom:0}*/
    });

    $('#ascrail2000-hr.nicescroll-rails.nicescroll-rails-hr').css('opacity',0);

	$(window).on('resize', function(){
        font_resizble(1, $('.font_resizble'));
       	$('#sub_item_wrapper').niceScroll({
            cursorcolor: "#414141",
    		scrollspeed: 60, // scrolling speed
    		mousescrollstep: 50, // scrolling speed with mouse wheel (pixel)
    		hwacceleration: true, // use hardware accelerated scroll when supported
    	    cursoropacitymin: 0.7,
    		cursoropacitymax: 0.9,
    		cursorwidth: "1px",
    		cursorborder: "1px solid #555",
    		cursorborderradius: "1px",
    		touchbehavior: true,
    		horizrailenabled: false,
    	    cursordragontouch: true,
    		oneaxismousemode: "vertical-only",
    		directionlockdeadzone: 6,
    		preservenativescrolling: true,
    		enabletranslate3d: true,
            railoffset: {"top":10,"left":-(($(window).width()/2)*0.87+30)},
    /*        railpadding: {top:0,right:50,left:20,bottom:0}*/
        });
        $('#ascrail2000-hr.nicescroll-rails.nicescroll-rails-hr').css('opacity',0);
    })

})

// Таймер
jQuery.fn.extend({
	everyTime: function(interval, label, fn, times, belay) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times, belay);
		});
	},
	oneTime: function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1);
		});
	},
	stopTime: function(label, fn) {
		return this.each(function() {
			jQuery.timer.remove(this, label, fn);
		});
	}
});

jQuery.extend({
	timer: {
		guid: 1,
		global: {},
		regex: /^([0-9]+)\s*(.*s)?$/,
		powers: {
			// Yeah this is major overkill...
			'ms': 1,
			'cs': 10,
			'ds': 100,
			's': 1000,
			'das': 10000,
			'hs': 100000,
			'ks': 1000000
		},
		timeParse: function(value) {
			if (value == undefined || value == null)
				return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseInt(result[1], 10);
				var mult = this.powers[result[2]] || 1;
				return num * mult;
			} else {
				return value;
			}
		},
		add: function(element, interval, label, fn, times, belay) {
			var counter = 0;

			if (jQuery.isFunction(label)) {
				if (!times)
					times = fn;
				fn = label;
				label = interval;
			}

			interval = jQuery.timer.timeParse(interval);

			if (typeof interval != 'number' || isNaN(interval) || interval <= 0)
				return;

			if (times && times.constructor != Number) {
				belay = !!times;
				times = 0;
			}

			times = times || 0;
			belay = belay || false;

			if (!element.$timers)
				element.$timers = {};

			if (!element.$timers[label])
				element.$timers[label] = {};

			fn.$timerID = fn.$timerID || this.guid++;

			var handler = function() {
				if (belay && this.inProgress)
					return;
				this.inProgress = true;
				if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
					jQuery.timer.remove(element, label, fn);
				this.inProgress = false;
			};

			handler.$timerID = fn.$timerID;

			if (!element.$timers[label][fn.$timerID])
				element.$timers[label][fn.$timerID] = window.setInterval(handler,interval);

			if ( !this.global[label] )
				this.global[label] = [];
			this.global[label].push( element );

		},
		remove: function(element, label, fn) {
			var timers = element.$timers, ret;

			if ( timers ) {

				if (!label) {
					for ( label in timers )
						this.remove(element, label, fn);
				} else if ( timers[label] ) {
					if ( fn ) {
						if ( fn.$timerID ) {
							window.clearInterval(timers[label][fn.$timerID]);
							delete timers[label][fn.$timerID];
						}
					} else {
						for ( var fn in timers[label] ) {
							window.clearInterval(timers[label][fn]);
							delete timers[label][fn];
						}
					}

					for ( ret in timers[label] ) break;
					if ( !ret ) {
						ret = null;
						delete timers[label];
					}
				}

				for ( ret in timers ) break;
				if ( !ret )
					element.$timers = null;
			}
		}
	}
});

if (jQuery.browser.msie)
	jQuery(window).one("unload", function() {
		var global = jQuery.timer.global;
		for ( var label in global ) {
			var els = global[label], i = els.length;
			while ( --i )
				jQuery.timer.remove(els[i], label);
		}
	});

// Таймер
