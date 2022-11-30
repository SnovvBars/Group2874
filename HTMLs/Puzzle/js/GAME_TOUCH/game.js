
// namespace
game = {};

game.randomInteger = function(low, high) {
    return low + Math.round(Math.random() * (high - low));
}

game.between = function(num, low, high) {
    return (num >= low && num <= high);
}

// if "e" comes from mouse, we already have e.pageX/Y (do nothing)
// if event "e" comes from touch, "extract" the touch info, to get access to e.pageX/e.pageY
game.extactTouchPoint = function(e) {

	if (typeof e.pageX == 'undefined' ) {
	     game.touch_x = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
	} else {
		game.touch_x = e.pageX;
	}
	if (typeof e.pageY == 'undefined' ) {
	     game.touch_y = e.originalEvent.touches[0].pageY || e.originalEvent.changedTouches[0].pageY;
	} else {
		game.touch_y = e.pageY;
	}
    return true;
}


game.load = function(filename, rows, columns, return_url) {

	// global vars
	game.solved = false;
	game.pixelRatio = window.devicePixelRatio == 2 ? 2 : 1;
	game.rows = rows;
	game.columns = columns;
	game.images_left_to_download = game.rows * game.columns;
	game.filename = filename;
	game.return_url = return_url;
	game.size = game.columns + 'x' + game.rows;
	if (game.size=='16x10')
		{
		game.piece_inner_size = 70;
		game.piece_size = 110;
		}

	if (game.size=='11x7')
		{
		game.piece_inner_size = 70;
		game.piece_size = 110;
		}

	if (game.size=='8x5')
		{
		game.piece_inner_size = 87;
		game.piece_size = 143;
		}

	if (game.size=='4x3')
		{
		game.piece_inner_size = 212;
		game.piece_size = 390;
		}

	if (game.size=='3x2')
		{
		game.piece_inner_size = 174;
		game.piece_size = 286;
		}

	// adjust for Retina
	game.piece_inner_size = Math.round(game.piece_inner_size/game.pixelRatio);
	game.piece_size = Math.round(game.piece_size/game.pixelRatio);
	game.screen_width = $('#puzzle_table').width();
	game.screen_height = $(window).height()*0.9;
	game.proximity = 24;
	game.moving = false;
	game.moving_group_id = false;
	game.touch_x = 0;
	game.touch_y = 0;
	game.z_index = 2;
	game.seconds = 0;
	game.is_paused = false;
	game.timer_interval = false;
	game.puzzle_root = $('#puzzle_table').attr('data-dir');
    console.log(game.puzzle_root)
	// prepare random locations for pieces
	game.startLocations = [];
	tempStartLocationsStepX = Math.floor( game.screen_width / game.columns );
	tempStartLocationsStepY = Math.floor( game.screen_height / game.rows )+30;
	for (i=1; i <= game.rows; i++) {
		for (j=1; j <= game.columns; j++) {
			game.startLocations.push( {
//				x: 0,
//				y: 0,
				x: (tempStartLocationsStepX * j) - (tempStartLocationsStepX/2) - Math.round(game.piece_size/2),
				y: (tempStartLocationsStepY * i) - (tempStartLocationsStepY/2) - Math.round(game.piece_size/2),
			});
		}
	}

	// generate HTML for game
/*	$('body').prepend('<div id="game-menu"><div id="game-solved" class="hidden">Solved!</div><div id="game-timer">00:00</div><div id="game-pause" class="btn"><img src="icon-pause.png" alt="Pause" width="16" height="16" /></div><div id="game-close" class="btn"><img src="icon-close.png" alt="Pause" width="16" height="16" /></div></div><div id="game-paused"></div>'); */

	// detect if the device supports touch events
	is_touch_device = true;
	try
	{
		document.createEvent("TouchEvent");

		// cancel dragging when app resumes from background
		document.addEventListener("resumed", function(e){
			game.moving = false;
			game.moving_group_id = false;
		});
		document.addEventListener("touchmove", function(event){event.preventDefault();}, true);
	}
	catch(err) {is_touch_device = false;}

	game.touch_start_event = is_touch_device ? 'touchstart' : 'mousedown';
	game.touch_move_event = is_touch_device ? 'touchmove' : 'mousemove';
	game.touch_end_event = is_touch_device ? 'touchend' : 'mouseup';
	game.touch_start_x = 0;
	game.touch_start_y = 0;
	game.moving_group_start_x = 0;
	game.moving_group_start_y = 0;


    // create pieces, located randomly
	for (i=1; i <= game.rows; i++) {
		for (j=1; j <= game.columns; j++) {
			n = ((i-1)*game.columns + j);
			$('#body').append('<div class="group" id="group-'+n+'" />');
			$('#group-'+n).append('<div class="piece" id="piece-'+i+'-'+j+'"><img id="image-'+i+'-'+j+'" src="'+game.puzzle_root+i+'-'+j+'.png" width="'+game.piece_size+'" height="'+game.piece_size+'"></div>');
			$('#image-'+i+'-'+j).on('load', function(){
				if (--game.images_left_to_download == 0)
				{
					$('#loading').fadeOut();
				}

			});
			// pick random start location (extract into randomLocation[0])
			var randomLocation = game.startLocations.splice( Math.floor((Math.random() * game.startLocations.length)), 1);
			game.moveElement('piece-'+i+'-'+j, randomLocation[0].x, randomLocation[0].y);
			$('#piece-'+i+'-'+j).data('i', i).data('j', j);

		}
	}

	// set pieces width & height
	$('.piece').css({
		"width"  : game.piece_size+"px",
		"height" : game.piece_size+"px"
	});

	// on touch start - set game.moving variables
	$('.piece').on(game.touch_start_event, function(e) {

		e.stopPropagation();
		e.preventDefault();
		game.extactTouchPoint(e);
		game.moving = true;
		game.moving_group_id = $(this).parent().prop('id');
		game.touch_start_x = game.touch_x;
		game.touch_start_y = game.touch_y;
		game.moving_group_start_x = $(this).parent().offset().left;
		game.moving_group_start_y = $(this).parent().offset().top;
		$('#'+game.moving_group_id).css({'z-index': game.z_index++});

		// start timer if this is the first touch
		if (!game.timer_interval) {
			game.timer_interval = setInterval(function(){
				if (game.is_paused) {
					return false;
				}
				game.seconds++;
				$('#game-timer').html( String("0"+Math.floor(game.seconds/60)).slice(-2) + ':' + String("0"+game.seconds%60).slice(-2) );
			}, 1000);
		}
	});


	// on touch move - move group
	$('body').on(game.touch_move_event, function(e) {
		if (!game.moving) {
			return false;
		}
		e.stopPropagation();
		e.preventDefault();
		game.extactTouchPoint(e);
		game.moving = false;

		// move group
		var new_x = game.moving_group_start_x + (game.touch_x - game.touch_start_x);
		var new_y = game.moving_group_start_y + (game.touch_y - game.touch_start_y);
		game.moveElement(game.moving_group_id, new_x, new_y, function(){game.moving = true;});


	});


	// on touch end - unset game.moving vars, merge groups
	$('body').on(game.touch_end_event, function() {
		var group = $('#'+game.moving_group_id);
		// 'reset' group - set group's top/left to 0, adjust group's pieces top/left
		group.children('.piece').each(function(){
			game.moveElement( $(this).prop('id'), $(this).offset().left, $(this).offset().top );
		});
		game.moveElement(game.moving_group_id, 0, 0);

		if (!game.solved)
		{
			// for each piece in moved group, check for close neighbours
			group.children('.piece').each(function(){
				i=$(this).data('i');
				j=$(this).data('j');

				// top neighbour
				game.checkCouple( $(this), 'piece-'+(i-1)+'-'+(j), $(this).offset().left, $(this).offset().top - game.piece_inner_size);

				// bottom neighbour
				game.checkCouple( $(this), 'piece-'+(i+1)+'-'+(j), $(this).offset().left, $(this).offset().top + game.piece_inner_size);

				// left neighbour
				game.checkCouple( $(this), 'piece-'+(i)+'-'+(j-1), $(this).offset().left - game.piece_inner_size, $(this).offset().top);

				// right neighbour
				game.checkCouple( $(this), 'piece-'+(i)+'-'+(j+1), $(this).offset().left + game.piece_inner_size, $(this).offset().top);



				// if only one group left: puzzle solved!
				if ( $('.group').length == 1 ) {

                    function sound() {
                     	var audio = new Audio(); // Создаём новый элемент Audio
	                    audio.src = $('#puzzle_table').attr('data-sound'); // Указываем путь к звуку "клика"
    	                audio.autoplay = true; // Автоматически запускаем
                    }

                    sound();

					game.solved = true;
					$('.group:first').animate({left:0, top:0});
					// $('.piece').off(game.touch_start_event);
					// $('body').off(game.touch_move_event);
					// $('body').off(game.touch_end_event);
					clearInterval(game.timer_interval);

					$('#game-pause').hide();
					$('#game-solved').show();
                    var img_solved=$('#img_solved').attr('data-img');

                    setTimeout(function(){
                        $('.group .piece').fadeOut(300);

                        $('#arrow_dop_panel').css({"display":"none"});
                        $('#about_wrapper').addClass('active');
                        $('#header, #learn_more').removeClass('active');

//                        var _left = $('#piece-1-1').css('left');
//                        var _top = $('#piece-1-1').css('top');
//                            console.log(_left, _top);
//                        $('.group').append('<img id="img_solve_final" src="'+$('#img_solved').attr('data-img')+'" style="position:absolute;opacity:0">');
                    },500)

                    setTimeout(function(){
                        $('#img_solved').css({"display":"table"}).stop().animate({"opacity":1},300);
                    },1500)

                }



			});
		}

		// clean up
		game.moving = false;
		game.moving_group_id = false;
		game.touch_start_x = 0;
		game.touch_start_y = 0;
		game.moving_group_start_x = 0;
		game.moving_group_start_y = 0;

	});


	$('#game-pause').on(game.touch_start_event, function() {
		 game.pause();
		return false;
	});
	$('#game-paused').on(game.touch_start_event, function() {
		game.resume();
		return false;
	});
	$('#game-close').on(game.touch_start_event, function() {
		window.location = game.return_url;
		return false;
	});
}


// if source and target pieces are close enough, move target group's pieces into source group
game.checkCouple = function(source, target_id, x, y) {

	var target = $('.group[id!='+game.moving_group_id+'] > #' + target_id);
	if (
		target.length && 											// neighbour is not in the same group
		game.between(target.offset().left, x - game.proximity, x + game.proximity) &&
		game.between(target.offset().top, y - game.proximity, y + game.proximity)	// neightbour is close enough
		) {
			var offset_x = x - target.offset().left;
			var offset_y = y - target.offset().top;
			target_group = target.parent();
			target_group.children('.piece').each(function(){
				game.moveElement( $(this).prop('id'), $(this).offset().left + offset_x, $(this).offset().top + offset_y );
				$('#'+game.moving_group_id).append( $(this) );
		});
		// remove group if empty
		if (!target_group.children('.piece').length) {
			target_group.remove();
		}
	}
}


game.pause = function() {
	game.is_paused = true;
	$('#game-paused').fadeIn(300);
}

game.resume = function() {
	game.is_paused = false;
	$('#game-paused').fadeOut(300);
}


game.moveElement = function (id, x, y, callback)
{
	$('#'+id).css({left: x+'px', top: y+'px'});
	if (typeof callback != 'undefined')
		{
			callback();
		}
}
