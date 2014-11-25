/*
* jQuery.fn.textLimit( limit, callback );
*
* Add a limit to your textarea and inputfields.
*
* $('.element').textLimit( 100 );
*
* Version 1.0.0
* www.labs.skengdon.com/textLimit
* www.labs.skengdon.com/textLimit/js/textLimit.min.js
*/
;(function($){
    $.fn.clearTextLimit = function() {
        return this.each(function() {
            this.onkeydown = this.onkeyup = null;
        });
    };
    $.fn.textLimit = function( limit , callback ) {
        if ( typeof callback !== 'function' ) var callback = function() {};
        return this.each(function() {
            var inputVal;
            this.limit = limit;
            this.callback = callback;
            this.onfocus = this.onfocusout;  // NEW LINE
            this.onfocusout = this.onchange; // NEW LINE
            this.onchange = this.onkeydown;  // NEW LINE
            this.onkeydown = this.onkeyup = function() {
                inputVal = this.value.substr(0,this.limit);
                this.reached = this.limit - inputVal.length;
                this.reached = ( this.reached == 0 ) ? true : false;
                // we've hit our limit
                if (this.reached) {
                    this.value = inputVal;
                }
                return this.callback( inputVal.length, this.limit, this.reached );                
            }
        });
    };
})(jQuery);
