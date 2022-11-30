<body><canvas class=" canvallax bg-canvas" width="1920" height="290"></canvas>
<script>console.clear();</script>
<script>
"use strict";"object"!=typeof window.CP&&(window.CP={}),window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,exitedLoop:function(o){this._loopExits[o]=!0},shouldStopLoop:function(o){if(this.programKilledSoStopMonitoring)return!0;if(this.programNoLongerBeingMonitored)return!1;if(this._loopExits[o])return!1;var t=this._getTime();if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=t,!1;var i=t-this.timeOfFirstCallToShouldStopLoop;if(i<this.START_MONITORING_AFTER)return!1;if(i>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;try{this._checkOnInfiniteLoop(o,t)}catch(n){return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var o={action:"infinite-loop",line:this._findAroundLineNumber()};parent.postMessage(JSON.stringify(o),"*")}else this._throwAnErrorToStopPen()}catch(t){this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomerang/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@codepen.io."},_findAroundLineNumber:function(){var o=new Error,t=0;if(o.stack){var i=o.stack.match(/boomerang\S+:(\d+):\d+/);i&&(t=i[1])}return t},_checkOnInfiniteLoop:function(o,t){if(!this._loopTimers[o])return this._loopTimers[o]=t,!1;var i=t-this._loopTimers[o];if(i>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+o},_getTime:function(){return+new Date}},window.CP.shouldStopExecution=function(o){var t=window.CP.PenTimer.shouldStopLoop(o);return t===!0&&console.warn("An infinite loop (or loop taking too long) was detected, so we stopped its execution. Sorry!"),t},window.CP.exitedLoop=function(o){window.CP.PenTimer.exitedLoop(o)};

</script>
<script>;(function(){

  // bracket [≠] square [⠝]
  var svgIcon = '<svg class="shaw__icon" width="222" height="284" viewBox="0 0 2223 2846"><path fill="#f4d198" d="M1040 436c46-.8 71.4 17.4 103 31l82 35 441 189c-3 6.2-3.7 9-2 16 28.7 21.2 64 26.6 102 41 32 12.2 62.6 27.5 89 46 70 49.6 122 125.5 156 211 16.7 42.4 23 95.4 40 136 21.3 52.2 85.3 136.6 72 214-9 50.5-31.4 75-57 107-19 23.4-52 45.2-43 95 14.7 82.3 57.8 139 89 205 10.8 23.4 22 46.7 32.8 70l10 32c17.8 28 85.5 81.5 64 130-15 34.3-48.4 58.2-84 72-17 4.4-34 8.8-51 13 5 15.5 9 29.5 16 42-5.6 6.8-11.3 13.4-17 20 1.4 58 36.5 119.5 4 164-14 19.4-35 26.6-54 41 9.7 12.6 21.5 23.3 28 39 30 72.4-52.2 154.4-82 196-17.7 25-36.7 64.3-64 79-52.3-6.2-104.6-12.6-157-19-130.8-26-259.5-41.8-381-76-82.6-23-166-43.7-243-74l-143-59c-.2-50-.5-100-1-150h-1c-23.5 1.4-47.2 2.8-71 4l-15 15c-13.7 10.2-32 17.4-52 21-90.8 17.2-202.2-74.8-249.8-112l-42-38c-11.4-1.6-22.7-3.2-34-5-33.6-7.2-99.3-17.8-115-41l-67-167-142-339 166-20c1.4-27.2 26.6-95.5 51-97l181 49 2-1c-.7-51.7 2-106.3 10-154 8.6-51.6 8-103.5 17-152l18-124c29.5-135.3 55.3-266.4 104-381 41.2-97.2 85.7-194 164-254 22.4-17.2 48.8-32.8 79-42l47-8z"/><path fill="#bf3d27" d="M1008 59v-8c14.8 4.4 23.6 20.4 35 29l65 43c8.4 6.3 26.4 24.8 40 21 9.7-5 8.2-22.2 8-34 15 7.2 32.2 21.3 49 24v-5c-4.4-15.4-4.7-33-7-51h6c88.8 27.2 209.3 5.2 297 22l52-2c32.2 7.3 66.3 35.3 97 47l52 17c3.5 5.7 7.2 11.3 11 17 8.2 6.3 16.5 12.7 25 19 58.6 30.8 113.8 60 168 93l24 10c10.6 7.4 11 22.2 20 31 13.2 9.3 26.5 18.7 40 28 31.5 25.4 72.8 84 89 124 14 35.8 12.7 100 3 139-23.3 92-85 195.2-150 244-3.5-3.3-6.8-6.6-10-10l-51-46-213 57-196 85c-41.2 18-84.3 36-122 58-26 15-49.5 34-83 41-54 11.2-111-6.6-161-7 8.6 61.2 25 132 52 179 8 14.2 41.8 81.8 39 101-12.7 85.2-70.4 125.8-122 172l7 137 7 101c12.5 77.8 10 156.3 24 229 9 48 13 94 25 137l8 34c8.6 16 90.4 62.3 111 75 79.6 49.7 164.7 96.8 254 136 38.3 17 84 48.6 126 58 18.4-23 38-43 54-70 6.2-14.6 12.5-29.2 19-44 6.3-10.5 67.2-41 82-50 61.3-37.3 124.7-70.7 196-99 34.2-13.5 75.3-29.6 121-23 4.5 10.4 9.2 20.8 14 31 10.6 34.2.8 70.2-12 94-31.2 1-63 14.8-89 23-82.7 26.3-167.3 58-214 120-23.7 31.4-44 88.3-13 128 18.2 23.8 53.3 24 83 11 21.6-9.4 40-30.8 59-39 18.4-7.8 80.2-5.5 99 0-2.6 28.8-3.4 61.8-3 94v47c-14 83.2-40 137-95 177-94.4 68.6-214.8 41.3-315 2-60.8-21.5-121.4-43.2-182-65-120.6-58-243.3-122.3-355-190-72.2-43.5-139.8-77-182-150-17.7-30.3-20-87-12-132l28-184 6-76c5.3-33.3 2.7-117-9-139l-62-67c-57-57-198.2-164.5-324-138-42.3 9-87.2 26.4-109 56-32 43.3-40.3 141.8-16 201 27.5 67.4 69.7 136 112 191l80 84 4 40c11.4 71.7-24.4 176.2-59 205-10.4-11.6-20.7-23.2-31-35-22.4-28-47.7-53.4-70-82-60.6-77-115.6-155-167-243-18-31-29.4-66-44-100l-83-196C88.7 1670 27.3 1539.8 0 1406v-138c0-155.8 32.6-292.3 91-391 16.3-27.6 37-57 62-76l29-17 52-44 22-17 62-96 14-46 35-86c29.3-66.6 70.2-123.8 113-177 23.6-29.4 57-46.7 87-70C627.8 201 717.3 93.4 730 0h4c30 13 74.3 15.3 109 21h27c19.6 5.2 33.4 22.5 56 28l1-13h8l-1-8 26 11 3-4c10.6 9.8 27 22.4 45 24zm917 68h2-2zm2 1h2-2zm58 47c1.5 1.7 3.2 3.3 5 5l-3-2c-3.2-2-1.2-.3-2-3z"/></svg>';

  document.head.insertAdjacentHTML('beforeend','<style>.shaw { display: block; position: absolute; position: fixed; z-index: 9999; bottom: 5px; right: 5px; font-size: 10px; color: #c03b27; text-decoration: none; padding: 10px; border-radius: 50%; opacity: 0.4; transform-origin: 100% 100%; transition: all 300ms ease-in-out; } .shaw > * { transition: inherit; } .shaw:hover { opacity: 1; background: rgba(255,255,255,0.9); } .shaw__icon, .shaw__title { display: inline-block; vertical-align: middle; } .shaw__icon { width: 24px; height: 24px; position: relative; z-index: 1; } .shaw__title {  white-space: nowrap; opacity: 0; padding-right: 10px; transform: translateX(100%); } .shaw:hover .shaw__title { transform: scale(1); opacity: 1; } .shaw:hover .shaw__icon { transform: scale(1.4); } </style>'); // .shaw__title { position: absolute; right: 100%; top: 50%; margin-top: -0.5em;width: fit-content; position: absolute; right: 100%; margin-right: 10px; }

  var a = document.createElement('a');
  a.setAttribute('href','http://codepen.io/shshaw');
  a.setAttribute('target','_blank');
  a.className = 'shaw';
  a.innerHTML = svgIcon;
  a.onclick = function(){
    if ( ga ) {
      var url = this.getAttribute('href');
      ga('send', 'event', 'shawhead', 'click', url, {
        'transport': 'beacon',
        'hitCallback': function(){ console.log('callback!');window.open(url); }
      });
      return false;
    }
  };

  document.body.appendChild(a);

  //document.body.insertAdjacentHTML('beforeend','<a href="http://codepen.io/shshaw" target="_blank" class="shaw">'+svgIcon+'</a>');

})();


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-6412794-6', 'auto');
ga('send', 'pageview');</script><a href="http://codepen.io/shshaw" target="_blank" class="shaw"><svg class="shaw__icon" width="222" height="284" viewBox="0 0 2223 2846"><path fill="#f4d198" d="M1040 436c46-.8 71.4 17.4 103 31l82 35 441 189c-3 6.2-3.7 9-2 16 28.7 21.2 64 26.6 102 41 32 12.2 62.6 27.5 89 46 70 49.6 122 125.5 156 211 16.7 42.4 23 95.4 40 136 21.3 52.2 85.3 136.6 72 214-9 50.5-31.4 75-57 107-19 23.4-52 45.2-43 95 14.7 82.3 57.8 139 89 205 10.8 23.4 22 46.7 32.8 70l10 32c17.8 28 85.5 81.5 64 130-15 34.3-48.4 58.2-84 72-17 4.4-34 8.8-51 13 5 15.5 9 29.5 16 42-5.6 6.8-11.3 13.4-17 20 1.4 58 36.5 119.5 4 164-14 19.4-35 26.6-54 41 9.7 12.6 21.5 23.3 28 39 30 72.4-52.2 154.4-82 196-17.7 25-36.7 64.3-64 79-52.3-6.2-104.6-12.6-157-19-130.8-26-259.5-41.8-381-76-82.6-23-166-43.7-243-74l-143-59c-.2-50-.5-100-1-150h-1c-23.5 1.4-47.2 2.8-71 4l-15 15c-13.7 10.2-32 17.4-52 21-90.8 17.2-202.2-74.8-249.8-112l-42-38c-11.4-1.6-22.7-3.2-34-5-33.6-7.2-99.3-17.8-115-41l-67-167-142-339 166-20c1.4-27.2 26.6-95.5 51-97l181 49 2-1c-.7-51.7 2-106.3 10-154 8.6-51.6 8-103.5 17-152l18-124c29.5-135.3 55.3-266.4 104-381 41.2-97.2 85.7-194 164-254 22.4-17.2 48.8-32.8 79-42l47-8z"></path><path fill="#bf3d27" d="M1008 59v-8c14.8 4.4 23.6 20.4 35 29l65 43c8.4 6.3 26.4 24.8 40 21 9.7-5 8.2-22.2 8-34 15 7.2 32.2 21.3 49 24v-5c-4.4-15.4-4.7-33-7-51h6c88.8 27.2 209.3 5.2 297 22l52-2c32.2 7.3 66.3 35.3 97 47l52 17c3.5 5.7 7.2 11.3 11 17 8.2 6.3 16.5 12.7 25 19 58.6 30.8 113.8 60 168 93l24 10c10.6 7.4 11 22.2 20 31 13.2 9.3 26.5 18.7 40 28 31.5 25.4 72.8 84 89 124 14 35.8 12.7 100 3 139-23.3 92-85 195.2-150 244-3.5-3.3-6.8-6.6-10-10l-51-46-213 57-196 85c-41.2 18-84.3 36-122 58-26 15-49.5 34-83 41-54 11.2-111-6.6-161-7 8.6 61.2 25 132 52 179 8 14.2 41.8 81.8 39 101-12.7 85.2-70.4 125.8-122 172l7 137 7 101c12.5 77.8 10 156.3 24 229 9 48 13 94 25 137l8 34c8.6 16 90.4 62.3 111 75 79.6 49.7 164.7 96.8 254 136 38.3 17 84 48.6 126 58 18.4-23 38-43 54-70 6.2-14.6 12.5-29.2 19-44 6.3-10.5 67.2-41 82-50 61.3-37.3 124.7-70.7 196-99 34.2-13.5 75.3-29.6 121-23 4.5 10.4 9.2 20.8 14 31 10.6 34.2.8 70.2-12 94-31.2 1-63 14.8-89 23-82.7 26.3-167.3 58-214 120-23.7 31.4-44 88.3-13 128 18.2 23.8 53.3 24 83 11 21.6-9.4 40-30.8 59-39 18.4-7.8 80.2-5.5 99 0-2.6 28.8-3.4 61.8-3 94v47c-14 83.2-40 137-95 177-94.4 68.6-214.8 41.3-315 2-60.8-21.5-121.4-43.2-182-65-120.6-58-243.3-122.3-355-190-72.2-43.5-139.8-77-182-150-17.7-30.3-20-87-12-132l28-184 6-76c5.3-33.3 2.7-117-9-139l-62-67c-57-57-198.2-164.5-324-138-42.3 9-87.2 26.4-109 56-32 43.3-40.3 141.8-16 201 27.5 67.4 69.7 136 112 191l80 84 4 40c11.4 71.7-24.4 176.2-59 205-10.4-11.6-20.7-23.2-31-35-22.4-28-47.7-53.4-70-82-60.6-77-115.6-155-167-243-18-31-29.4-66-44-100l-83-196C88.7 1670 27.3 1539.8 0 1406v-138c0-155.8 32.6-292.3 91-391 16.3-27.6 37-57 62-76l29-17 52-44 22-17 62-96 14-46 35-86c29.3-66.6 70.2-123.8 113-177 23.6-29.4 57-46.7 87-70C627.8 201 717.3 93.4 730 0h4c30 13 74.3 15.3 109 21h27c19.6 5.2 33.4 22.5 56 28l1-13h8l-1-8 26 11 3-4c10.6 9.8 27 22.4 45 24zm917 68h2-2zm2 1h2-2zm58 47c1.5 1.7 3.2 3.3 5 5l-3-2c-3.2-2-1.2-.3-2-3z"></path></svg></a><script src="http://brokensquare.com/Code/Canvallax.js/dist/Canvallax.min.js"></script>
<script>var can = Canvallax({
    className: 'bg-canvas',
    damping: 40
});
(function () {
    var origWidth = width = document.body.clientWidth, origHeight = height = document.body.clientHeight;
    var gradient = Canvallax.Rectangle({
        width: width * 1.5,
        height: height * 1.1,
        zIndex: 1,
        fill: function () {
            var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#07588A');
            gradient.addColorStop(1, '#E1F6F4');
            return gradient;
        }()
    });
    can.add(gradient);
    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    var stars = [], number = 300, i = 0, distance;
    for (; i < number; i++) {
        if (window.CP.shouldStopExecution(1)) {
            break;
        }
        distance = randomRange(0.1, 0.3);
        stars.push(Canvallax.Circle({
            x: Math.random() * width,
            y: Math.random() * height * 0.9,
            distance: distance,
            size: 4,
            fill: '#FFF'
        }));
    }
    window.CP.exitedLoop(1);
    can.add(stars);
    window.addEventListener('resize', function () {
        height = document.body.clientHeight;
        var i = can.elements.length, max = document.body.clientWidth, heightScale = height / origHeight;
        console.log(height, origHeight, heightScale);
        while (i--) {
            if (window.CP.shouldStopExecution(2)) {
                break;
            }
            can.elements[i].maxX = max;
            can.elements[i].origY = can.elements[i].origY || can.elements[i].y;
            can.elements[i].y = can.elements[i].origY * heightScale;
        }
        window.CP.exitedLoop(2);
    });
    function bestCandidateSampler(width, height, numCandidates) {
        var samples = [];
        function findDistance(a, b) {
            var dx = a[0] - b[0], dy = a[1] - b[1];
            return dx * dx + dy * dy;
        }
        function findClosest(c) {
            var i = samples.length, sample, closest, distance, closestDistance;
            while (i--) {
                if (window.CP.shouldStopExecution(3)) {
                    break;
                }
                sample = samples[i];
                distance = findDistance(sample, c);
                if (!closestDistance || distance < closestDistance) {
                    closest = sample;
                    closestDistance = distance;
                }
            }
            window.CP.exitedLoop(3);
            return closest;
        }
        function getSample() {
            var bestCandidate, bestDistance = 0, i = 0, c, d;
            c = [
                Math.random() * width,
                Math.random() * height
            ];
            if (samples.length < 1) {
                bestCandidate = c;
            } else {
                for (; i < numCandidates; i++) {
                    if (window.CP.shouldStopExecution(4)) {
                        break;
                    }
                    c = [
                        Math.random() * width,
                        Math.random() * height
                    ];
                    d = findDistance(findClosest(c), c);
                    if (d > bestDistance) {
                        bestDistance = d;
                        bestCandidate = c;
                    }
                }
                window.CP.exitedLoop(4);
            }
            samples.push(bestCandidate);
            return bestCandidate;
        }
        getSample.all = function () {
            return samples;
        };
        getSample.samples = samples;
        return getSample;
    }
    var getCandidate = bestCandidateSampler(width, height, 10);
    var CLOUD_COUNT = 40, CLOUD_WIDTH = 510, CLOUD_HEIGHT = 260;
    CLOUD_COUNT = Math.floor(width * height / (CLOUD_WIDTH * CLOUD_HEIGHT));
    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    function randomizedCloud(image) {
        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), width = canvas.width = randomRange(400, 700), height = canvas.height = randomRange(200, 260), w = image.width, h = image.height, halfw = w / 2, halfh = h / 2, i = Math.ceil(randomRange(20, 90)), flip, randScale, randTex, maxScale = 2.5, fullPi = Math.PI / 2;
        while (i--) {
            if (window.CP.shouldStopExecution(5)) {
                break;
            }
            randScale = randomRange(0.4, maxScale);
            ctx.globalAlpha = Math.random() - 0.2;
            ctx.translate(randomRange(halfw, width - w * maxScale * 1.3), randomRange(halfh + halfh / 4, height - h * maxScale));
            ctx.scale(randScale, randomRange(randScale - 0.3, randScale));
            ctx.translate(halfw, halfh);
            ctx.rotate(randomRange(0, fullPi));
            ctx.drawImage(image, -halfw, -halfh);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        window.CP.exitedLoop(5);
        return canvas;
    }
    var cloudImg = new Image();
    cloudImg.addEventListener('load', function () {
        var i = CLOUD_COUNT, el, rand, pos, tex;
        while (i--) {
            if (window.CP.shouldStopExecution(6)) {
                break;
            }
            rand = randomRange(0.4, 1.2);
            pos = getCandidate();
            tex = randomizedCloud(cloudImg);
            cloud = Canvallax.Image({
                image: tex,
                width: tex.width,
                height: tex.height,
                zIndex: rand * 13,
                x: pos[0],
                y: pos[1],
                opacity: rand < 0.8 ? 0.8 : rand,
                distance: rand,
                maxX: width,
                speed: rand * randomRange(0.2, 0.4),
                postRender: function () {
                    this.x = this.x * this.distance > -this.width ? this.x - this.speed : this.maxX + this.width * 2;
                }
            });
            can.add(cloud);
        }
        window.CP.exitedLoop(6);
        can.render();
    });
    cloudImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAAYFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GYpHzAAAAIHRSTlMAAwcLDxIWGh8kKzI5QEhPVl9qc3uEi5Sdpa64wcrV4c6KdP8AAAOeSURBVHgBndQJkvM8DoNhS+nv/ieONBH8FIs1nb83ZLfF1wBFZ17vNMZ8fPz79/GY46Xre8F85kRzzhdk/A2TOpSARpF/g0mdaI8XZjg47leA32Jo3wbEooNE/SFGrPOAiPxC+xaDAxBTxQqFoW8wGGof89E4j8nQUceo621h/KY8GuXx4Mg10vRZlPd55JCEnXlIQX7cE8pNp8Dob4oY8LjZTny8QEMo2o2hSqT5YImxchVNbpgZ3oVR4xVUgOlGS5fFKCPSWDY4Yu1xIKyEEqLfE0UUKcoJ9MFVsAhnaOpEGW4gyxFyLitOeRhZO8NJur1hKpWWCV03oaG9yYcYXvD7UPbetVOMNwqlWH6/b7sp29G1Z5g6LFGaY9uYB2A6M7evtVco3U3M1CCopOlNY8Q7cdZahxIMTpv7meR2NghWDqdu8MTZzwMqN+RaBkmdUgf7wMfN1d1cNSAFMdhQ3tLXu2STuclylwYL5QYhsGyLz499bcgxK1F5SmumvaoRrIwSjYutaGbVZIgze6wegLO6i8MD2kJ1N1cYKAUXTLnRWxtnYrMONWRRD+EsA3utw4mnKxNCZRgplK5T05ycvaaZCmtAOEKl+p4ge70k06mcdrQoPgGpbY1EboNyY7/ZHVsfK1BLhBAdCA5MGd719b0gUOJmg9vc5hf3E+K2y1EQDnCjxoGs3t84WiA6zI253rVy6MRnSKNxJtQcRY3xL90MkN6DYGZHI3zBMaF1NcoUQ3Oll+9RBqHb1uIzSTmv9LtQOJbC7Ci/fRsivh0+sBrYwix3GKe8No5yHJTDaZqhqOp8KC6BdmXrFKFaXUUWk7uCLsRPbuAZrmsPjCANBKChIZj/97IBzSJq3pgpymiYRmnxMLG9YbinUGCk5rxbUhJDy/yH+C5U3wP1FQWDL5AtWpNQm0IRz/ys+psCTSKuCObTjY3KhLoCrbUY7ZgIqHRXrTSFHxwfFjcM1fWF8devtJPK2XtM6nAOpcrCXDlVR967qRi6XOY78NJsi95gcsJynMXF2k6gAFFhVFGLz0loz5u0HGoEGF6qOoVgC6cOB6iBb0Ixue66p+p8F+v17VkhUTqGXP6pVptC8JU07z0Ga5VqjmUpvBvuC8wpej4bJiXK+ZHnazfXyfUSipxPVJQvMTjppUKlFUVvv8PIVftrSIRD+Q6DQ7a47wzE9xjaYJk1Fty1v8CYauOLm+fv3Cikjv4lBqVCAP6n/gfZhdXQlm1mfwAAAABJRU5ErkJggg==';
}());
//# sourceURL=pen.js
</script>
</body>