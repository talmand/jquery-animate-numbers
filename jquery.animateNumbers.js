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

(function($) {
    $.fn.animateNumbers = function(stop, commas, duration, ease) {
        return this.each(function() {
            var $this = $(this);
            var isInput = $this.is('input');
            var start = parseInt(isInput ? $this.val().replace(/,/g, "") : $this.text().replace(/,/g, ""));
            var regex = /(\d)(?=(\d\d\d)+(?!\d))/g;
            commas = commas === undefined ? true : commas;
            
            // number inputs can't have commas or it blanks out
            if (isInput && $this[0].type === 'number') {
                commas = false;
            }
            
            $({value: start}).animate({value: stop}, {
                duration: duration === undefined ? 1000 : duration,
                easing: ease === undefined ? "swing" : ease,
                step: function() {
                    isInput ? $this.val(Math.floor(this.value)) : $this.text(Math.floor(this.value));
                    if (commas) {
                        isInput ? $this.val($this.val().replace(regex, "$1,")) : $this.text($this.text().replace(regex, "$1,"));
                    }
                },
                complete: function() {
                    if (parseInt($this.text()) !== stop || parseInt($this.val()) !== stop) {
                        isInput ? $this.val(stop) : $this.text(stop);
                        if (commas) {
                            isInput ? $this.val($this.val().replace(regex, "$1,")) : $this.text($this.text().replace(regex, "$1,"));
                        }
                    }
                }
            });
        });
    };
})(jQuery);