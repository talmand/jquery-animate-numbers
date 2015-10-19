/***********
	Animates element's number to new number with commas
	Parameters:
		stop (number): number to stop on
        commas (boolean): turn commas on/off (default is true)
		duration (number): how long in ms (default is 1000)
		ease (string): type of easing (default is "swing", others are avaiable from jQuery's easing plugin
	Examples:
        $("#div").animateNumbers(1234, false, 500, "linear"); // half second linear without commas
		$("#div").animateNumbers(1234, true, 2000); // two second swing with commas
		$("#div").animateNumbers(4321); // one second swing with commas
	This fully expects an element containing an integer
	If the number is within copy then separate it with a span and target the span
    Will work in appropriate inputs
	Inserts and accounts for commas during animation by default
    
    https://github.com/talmand/jquery-animate-numbers
***********/

!function(e){e.fn.animateNumbers=function(t,a,n,l){return this.each(function(){var i=e(this),r=i.is("input"),v=parseInt(r?i.val().replace(/,/g,""):i.text().replace(/,/g,"")),u=/(\d)(?=(\d\d\d)+(?!\d))/g;a=void 0===a?!0:a,r&&"number"===i[0].type&&(a=!1),e({value:v}).animate({value:t},{duration:void 0===n?1e3:n,easing:void 0===l?"swing":l,step:function(){r?i.val(Math.floor(this.value)):i.text(Math.floor(this.value)),a&&(r?i.val(i.val().replace(u,"$1,")):i.text(i.text().replace(u,"$1,")))},complete:function(){(parseInt(i.text())!==t||parseInt(i.val())!==t)&&(r?i.val(t):i.text(t),a&&(r?i.val(i.val().replace(u,"$1,")):i.text(i.text().replace(u,"$1,"))))}})})}}(jQuery);