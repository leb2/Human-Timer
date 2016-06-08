/*globals $:false, mojs:false, math:false */
/*jshint -W031 */

(function() {
    'use strict';

    var soFar = -1;
    var max = 30;
    var times = [];
    var startTime;
    var numBars = 21;
    var maxHeight = 400; // of Histogram bar

    function finish() {
        var timeDiffs = [];
        for (var t = 0; t < times.length - t; t++) {
            timeDiffs.push(times[t + 1] - times[t]);
        }

        $('.clock .text').removeClass('started').text('Well Done');
        setTimeout(function() {
            $('.clock').animate({'opacity': '0'}, 1000, function() {
                $('.clock').hide();
                $('.results').show().animate({'opacity': '1'});
                var counts = [];

                for (var i = 0; i < numBars; i++) {
                    var count = 0;
                    var min = 0.5 + i / 20; // 1 is for 1 range on x axis
                    max = 0.5 + (i + 1) * 1 / 20;
                    for (var j = 0; j < timeDiffs.length; j++) {
                        var diff = timeDiffs[j];
                        if (diff >= min && diff < max) {
                            count += 1;
                        }
                    }
                    counts.push(count);
                }
                var maxCount = Math.max(...counts);
                for (var c = 0; c < counts.length; c++) {
                    var bar = $('<div class="bar"><div class="bar-text"></div></div>').appendTo('.bars');
                    bar.animate({'height': (counts[c] * (maxHeight / maxCount)) + 'px'});
                    if (c % 5 === 0) {
                        bar.find('.bar-text').text(0.5 + c / 20);
                    }
                }

                function truncate(x) {
                    return Math.floor(x * 100) / 100;
                }

                $('.mean').text(truncate(math.mean(timeDiffs)));
                $('.std').text(truncate(math.std(timeDiffs)));
            });
        }, 1000);
    }

    function rotateClock() {
        soFar += 1;
        var angle = soFar / max * 360;
        if (angle >= 180) {
            $('.filler').show();
            $('.mask').hide();
        }

        $('.spinner').animateRotate(angle, angle - 360 / max);
        $('.background-border').animate({'background': 'blue'})
                               .animate({'background': 'none'});

        $('.text').text(soFar);
        if (soFar === 0) {
            $('.text').addClass('started');
            startTime = Date.now();
            times.push(0);
        } else {
            times.push((Date.now() - startTime) / 1000);
        }

        // When finished
        if (soFar === max) {
            finish();
        }

    }

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function Animocon(el, options) {
        this.el = el;
        this.options = extend( {}, this.options );
        extend( this.options, options );

        this.checked = false;

        this.timeline = new mojs.Timeline();

        for (var i = 0, len = this.options.tweens.length; i < len; ++i) {
            this.timeline.add(this.options.tweens[i]);
        }

        var self = this;
        $(window).keypress(function (e) {
            if (soFar >= max) {
                return;
            }
            // var charCode = e.which;
            if (e.which === 0 || e.which === 32) {
                e.preventDefault();
                self.timeline.start();
                rotateClock();
            }
        });
    }

    Animocon.prototype.options = {
        tweens: [
            new mojs.Burst({
                shape: 'circle',
                isRunLess: true
            })
        ],
        onCheck: function() { return false; },
        onUnCheck: function() { return false; }
    };

    var el6 = document.querySelector('.clock'), el6span = el6.querySelector('span');
    var scaleCurve6 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
    var animocon = new Animocon(el6, {
        tweens: [
            // burst animation
            new mojs.Burst({
                parent: el6,
                duration: 1500,
                shape: 'circle',
                fill: 'white',
                x: '50%',
                y: '50%',
                childOptions: {
                    radius: {40: 0},
                    type: 'line',
                    stroke: '#988ADE',
                    strokeWidth: 2
                },
                // radius: {40:110},
                angle: {0: 40},
                radius: {240: 340},
                count: 20,
                isRunLess: true,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
            }),
            // ring animation
            new mojs.Transit({
                parent: el6,
                duration: 500,
                type: 'circle',
                // radius: {150: 225},
                radius: {200: 250},
                fill: 'transparent',
                stroke: '#988ADE',
                strokeWidth: {30: 0},
                x: '50%',
                y: '50%',
                isRunLess: true,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
            }),
            // icon scale animation
            new mojs.Tween({
                duration: 800,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                onUpdate: function(progress) {
                    scaleCurve6(progress);
                    el6span.style.WebkitTransform = el6span.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
                }
            })
        ]
    });
    animocon.test = 4;
})();

// http://stackoverflow.com/questions/15191058
$.fn.animateRotate = function(angle, start, duration, easing, complete) {
    'use strict';
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) {
                return step.apply(e, arguments);
            }
        };
        $({deg: start}).animate({deg: angle}, args);
    });
};
