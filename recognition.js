document.onload = function () {
	var recObject = new webkitSpeechRecognition();
	console.log(recObject);
	rec.lang = 'fr-FR';
	rec.continuous = true;
	rec.interimResults = true;

	var recInput = document.getElementById('recInput');

	recInput.onfocus = function () {
		rec.start();
	};

	recInput.onblur = function () {
		rec.stop();
	};

	rec.onresult = function (event) {
		console.log(event);
	  //recInput.innerText += event;
	};
}