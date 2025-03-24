////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	DLib Numerical JavaScript functions - copyright davidviner.com 2009-2017 except where stated.
//
//	11.06.2017	6.3.1	DJV		Minor tweaks.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//C/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Numerical functions.
// @DLibNumerical
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var DLibNumerical = function () {
    var _public =
	{
	    //F/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Round to the specified number of decimal places.
	    // @dec	double	The formatted value.
	    // @num	double	The number to format.
	    // @dp	int		The number of decimal places.
	    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	    dec: function (num, dp) {
	        var p = Math.pow(10, dp);
	        var n = Math.round(num * p) / p;
	        return n.toFixed(dp);
	    },

	    //F/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Round to specified dec places but add thousands separators. Based on code found at:
	    // http://snipplr.com/view/3516/mootools--numberformat/
	    // @tDec	string	The formatted number.
	    // @num		double	The number to format.
	    // @dp		int		The number of decimal places.
	    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	    tDec: function (num, dp) {
	        // Returns matches[1] as sign, matches[2] as numbers and matches[3] as decimals

	        var matches = /(-)?(\d+)(\.\d+)?/.exec((isNaN(num) ? 0 : num) + '');
	        var remainder = matches[2].length > 3 ? matches[2].length % 3 : 0;

	        return (matches[1] ? matches[1] : '') + (remainder ? matches[2].substr(0, remainder) + ',' : '') +
				matches[2].substr(remainder).replace(/(\d{3})(?=\d)/g, "$1" + ',') +
				(dp ? '.' + (+matches[3] || 0).toFixed(dp).substr(2) : '');
	    },

	    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Used by formfields.php numberInput function.
	    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	    numberInput: function (fld, dp, md) {
	        var fs = fld.style;

	        if (md == 1) // Focus
	        {
	            fs.textAlign = 'center';
	        }
	        else
	            if (md == 2) // Blur
	            {
	                fs.textAlign = 'right';

	                if (dp > 0)
	                    fld.value = _public.dec(fld.value, dp);
	            }
	    },

	    //F/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Format a file size value (converts to Kb, Mb, Gb etc depending upon size specified in $sz).
	    // @formatFileSize	string	Formatted size.
	    // @sz		int		Size in bytes.
	    // @[dp]	int		Number of decimal places to show (default = 0, maximum = 3).
	    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	    formatFileSize: function (sz, dp) {
	        dp = setUD(dp, 0);
	        var suffixes = [" bytes", "Kb", "Mb", "Gb", "Tb", "Eb"];

	        if (dp > 3) dp = 3;

	        var sz1 = 0,
				n = 0,
				suff = suffixes[n];

	        while (sz > 1024) {
	            n++;
	            sz1 = sz / 1024;
	            sz = Math.round(sz1);
	            suff = suffixes[n];
	        }

	        if (dp == 0) return sz + suff;

	        var sz2 = "" + sz1;

	        var p = sz2.indexOf(".");

	        if (p > -1)
	            sz = sz2.substr(0, p + dp + 1);

	        return sz + suff;
	    },

	    //F/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Return the number of decimal places of the supplied number.
	    // @decPlaces	int		Number of decimal places.
	    // @num			float	The number.
	    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	    decPlaces: function (num) {
	        var n = num - Math.floor(num);
	        var ns = n.toString();
	        return (ns.length > 2 ? ns.length - 2 : 0);
	    },

	    //F/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Convert the supplied text into a string of hex.
	    // @toHex	string	The 'hexed' string.
	    // @str		string	The string to be converted.
	    // @[gap]	boolean	Add a space between each hex pair.
	    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	    toHex: function (str, gap) {
	        gap = setUD(gap, false);
	        var s = "";

	        for (var i = 0; i < str.length; i++)
	            s += '' + str.charCodeAt(i).toString(16) + (gap ? " " : "");

	        return s;
	    },

	    //F/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Convert the 'hexed' string back into normal text.
	    // @deHex	string	The original string.
	    // @str		string	The 'hexed' string to be converted.
	    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	    deHex: function (str) {
	        s = "";
	        str = str.replace(/ /g, "");

	        for (var i = 0; i < str.length; i += 2)
	            s += String.fromCharCode(parseInt(str.substr(i, 2), 16));

	        return s;
	    }
	};

    return _public;
}();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Short cuts
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dec(n, dp) {
    return DLibNumerical.dec(n, dp);
}

function tDec(n, dp) {
    return DLibNumerical.tDec(n, dp);
}
