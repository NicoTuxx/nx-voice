function loadParams () {
	var matches = window.location.search.match(/[^?&]*=[^?&]*/g);
	matches.forEach(function (elt) {
		var obj = elt.split("=");
		params[obj[0]] = obj[1];
	});
}