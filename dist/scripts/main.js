"use strict";!function(){function e(){for(var e=[],t=0;t<r.length-t;t++)e.push(r[t+1]-r[t]);$(".clock .text").removeClass("started").text("Well Done"),setTimeout(function(){$(".clock").animate({opacity:"0"},1e3,function(){function t(e){return Math.floor(100*e)/100}$(".clock").hide(),$(".results").show().animate({opacity:"1"});for(var n=[],s=0;c>s;s++){var i=0,a=.5+s/20;o=.5+1*(s+1)/20;for(var r=0;r<e.length;r++){var h=e[r];h>=a&&o>h&&(i+=1)}n.push(i)}for(var l=Math.max.apply(Math,n),p=0;p<n.length;p++){var d=$('<div class="bar"><div class="bar-text"></div></div>').appendTo(".bars");d.animate({height:n[p]*(u/l)+"px"}),p%5===0&&d.find(".bar-text").text(.5+p/20)}$(".mean").text(t(math.mean(e))),$(".std").text(t(math.std(e)))})},1e3)}function t(){a+=1;var t=a/o*360;t>=180&&($(".filler").show(),$(".mask").hide()),$(".spinner").animateRotate(t,t-360/o),$(".background-border").animate({background:"blue"}).animate({background:"none"}),$(".text").text(a),0===a?($(".text").addClass("started"),i=Date.now(),r.push(0)):r.push((Date.now()-i)/1e3),a===o&&e()}function n(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function s(e,s){this.el=e,this.options=n({},this.options),n(this.options,s),this.checked=!1,this.timeline=new mojs.Timeline;for(var i=0,r=this.options.tweens.length;r>i;++i)this.timeline.add(this.options.tweens[i]);var c=this;$(window).keypress(function(e){a>=o||0!==e.which&&32!==e.which||(e.preventDefault(),c.timeline.start(),t())})}var i,a=-1,o=30,r=[],c=21,u=400;s.prototype.options={tweens:[new mojs.Burst({shape:"circle",isRunLess:!0})],onCheck:function(){return!1},onUnCheck:function(){return!1}};var h=document.querySelector(".clock"),l=h.querySelector("span"),p=mojs.easing.path("M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0"),d=new s(h,{tweens:[new mojs.Burst({parent:h,duration:1500,shape:"circle",fill:"white",x:"50%",y:"50%",childOptions:{radius:{40:0},type:"line",stroke:"#988ADE",strokeWidth:2},angle:{0:40},radius:{240:340},count:20,isRunLess:!0,easing:mojs.easing.bezier(.1,1,.3,1)}),new mojs.Transit({parent:h,duration:500,type:"circle",radius:{200:250},fill:"transparent",stroke:"#988ADE",strokeWidth:{30:0},x:"50%",y:"50%",isRunLess:!0,easing:mojs.easing.bezier(.1,1,.3,1)}),new mojs.Tween({duration:800,easing:mojs.easing.bezier(.1,1,.3,1),onUpdate:function(e){p(e),l.style.WebkitTransform=l.style.transform="scale3d("+e+","+e+",1)"}})]});d.test=4}(),$.fn.animateRotate=function(e,t,n,s,i){var a=$.speed(n,s,i),o=a.step;return this.each(function(n,s){a.complete=$.proxy(a.complete,s),a.step=function(e){return $.style(s,"transform","rotate("+e+"deg)"),o?o.apply(s,arguments):void 0},$({deg:t}).animate({deg:e},a)})};