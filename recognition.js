var rec;
rec = new webkitSpeechRecognition();
rec.lang = 'fr-FR';
rec.continuous = true;
rec.interimResults = true;
rec.onresult = function (e) {
	for(n in e.results) {
		var result = e.results[n];
		for (m in result) {
			var alternative = result[m];

			if (alternative.transcript != undefined)
				document.getElementById('recInput').value = alternative.transcript;
		}
	}
};

function stopRecord() {
	FB.login(function() {
  		FB.api(
			"/me/conversations",
			function (response) {
				if (response && !response.error) {
					console.log(response);
				}
			}
		);
	}, {
		scope: 'publish_actions'
	});
}

//rec.onend = stopRecord;
