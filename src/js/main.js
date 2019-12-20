

var getaudio = $('#player')[0];
   /* Get the audio from the player (using the player's ID), the [0] is necessary */
   var mouseovertimer;
   /* Global variable for a timer. When the mouse is hovered over the speaker it will start playing after hovering for 1 second, if less than 1 second it won't play (incase you accidentally hover over the speaker) */
   var audiostatus = 'off';
   /* Global variable for the audio's status (off or on). It's a bit crude but it works for determining the status. */

   $(document).on('mouseenter', '.speaker', function() {
     /* Bonus feature, if the mouse hovers over the speaker image for more than 1 second the audio will start playing */
     if (!mouseovertimer) {
       mouseovertimer = window.setTimeout(function() {
         mouseovertimer = null;
         if (!$('.speaker').hasClass("speakerplay")) {
           getaudio.load();
           /* Loads the audio */
           getaudio.play();
           /* Play the audio (starting at the beginning of the track) */
           $('.speaker').addClass('speakerplay');
           return false;
         }
       }, 1000);
     }
   });

   $(document).ready(function() {
	var audioElement = document.getElementById('audio1');
	$('#stop').hide();

	$('#play').click(function() {
		$('#play').hide();
		$('#stop').show();
		audioElement.play();
	});


	$('#stop').click(function() {
		$('#play').show();
		$('#stop').hide();
		audioElement.pause();
	});
});

   $(document).on('mouseleave', '.speaker', function() {
     /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
     if (mouseovertimer) {
       window.clearTimeout(mouseovertimer);
       mouseovertimer = null;
     }
   });

   $(document).on('click touchend', '.speaker', function() {
     /* Touchend is necessary for mobile devices, click alone won't work */
     if (!$('.speaker').hasClass("speakerplay")) {
       if (audiostatus == 'off') {
         $('.speaker').addClass('speakerplay');
         getaudio.load();
         getaudio.play();
         window.clearTimeout(mouseovertimer);
         audiostatus = 'on';
         return false;
       } else if (audiostatus == 'on') {
         $('.speaker').addClass('speakerplay');
         getaudio.play()
       }
     } else if ($('.speaker').hasClass("speakerplay")) {
       getaudio.pause();
       $('.speaker').removeClass('speakerplay');
       window.clearTimeout(mouseovertimer);
       audiostatus = 'on';
     }
   });

   $('#player').on('ended', function() {
     $('.speaker').removeClass('speakerplay');
     /*When the audio has finished playing, remove the class speakerplay*/
     audiostatus = 'off';
     /*Set the status back to off*/
   });

$(function() {

	// Vars.
		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Disable animations/transitions until everything's loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			$body.removeClass('is-loading');
		});

	// Poptrox.
		$window.on('load', function() {

			$('.thumbnails').poptrox({
				onPopupClose: function() { $body.removeClass('is-covered'); },
				onPopupOpen: function() { $body.addClass('is-covered'); },
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: true,
				overlayColor: '#000000',
				overlayOpacity: 0.75,
				popupLoaderText: '',
				fadeSpeed: 500,
				usePopupDefaultStyling: false,
				windowMargin: (skel.breakpoint('small').active ? 5 : 50)
			});

		});

});

var music = document.getElementById("music");
var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var playhead = document.getElementById("elapsed");
var timeline = document.getElementById("slider");
var timer = document.getElementById("timer");
var duration;
pauseButton.style.visibility = "hidden";

var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
music.addEventListener("timeupdate", timeUpdate, false);

function timeUpdate() {
	var playPercent = timelineWidth * (music.currentTime / duration);
	playhead.style.width = playPercent + "px";

	var secondsIn = Math.floor(((music.currentTime / duration) / 3.5) * 100);
	if (secondsIn <= 9) {
		timer.innerHTML = "0:0" + secondsIn;
	} else {
		timer.innerHTML = "0:" + secondsIn;
	}
}

playButton.onclick = function() {
	music.play();
	playButton.style.visibility = "hidden";
	pause.style.visibility = "visible";
}

pauseButton.onclick = function() {
	music.pause();
	playButton.style.visibility = "visible";
	pause.style.visibility = "hidden";
}

music.addEventListener("canplaythrough", function () {
	duration = music.duration;
}, false);