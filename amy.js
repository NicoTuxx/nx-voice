var amy = {};

amy.listen = new webkitSpeechRecognition();
amy.listen.lang = 'fr-FR';
amy.listen.continuous = true;
amy.listen.interimResults = true;

amy.order = false;

amy.talk = new SpeechSynthesisUtterance('');
amy.talk.lang = 'fr-FR';
amy.talk.pitch = 1.6;

amy.talk.start = function (text) {
	amy.talk.text = text;
	window.speechSynthesis.speak(amy.talk);
};

amy.listen.onresult = function (e) {
	var n = 0, amyStop = false;
	while(n < e.results.length && !amyStop) {
		var result = e.results[n], m = 0;
		while (m < result.length && !amyStop) {
			var alternative = result[m];
			if (alternative.transcript != undefined) {
				var msg = alternative.transcript;

				msg = msg.replace('Emmi', 'Amy');
				msg = msg.replace('Emy', 'Amy');

				amyResult.innerText = msg;

                                if (msg.trim().includes('repos') && result.isFinal == true && !amyStop && amy.order) {
                                        amy.order = false;
					amyStop = true;
                                        amy.talk.start('Merci, aurevoir !');
                                        amyResult.innerText = 'Merci, aurevoir !';
					amy.talk.onend = function () {
						amy.listen.stop();
					};
					break;
                                }


				if (msg.trim().includes('Amy') && result.isFinal == true && !amyStop) {
					amyStop = true;
					amy.listen.stop();
					amy.talk.start('Que puis-je faire pour vous ?');
					amyResult.innerText = 'Que puis-je faire pour vous ?';
					amy.order = true;
					amy.talk.onend = function () {
						amy.listen.start();
					};
					break;
				}


                                if (msg.trim().startsWith('dis bonjour à') && result.isFinal == true && !amyStop && amy.order) {
                                        amy.order = false;
                                        amyStop = true;
					amy.listen.stop();
					name = msg.trim().split(" ").splice(-1)[0];
                                        amy.talk.start('Bonjour, '+name+' !');
                                        amyResult.innerText = 'Bonjour, '+name+' !';
                                        amy.talk.onend = function () {
                                                amy.listen.start();
                                        };
                                        break;
                                }

				if (msg.trim().startsWith('cherche-moi') && result.isFinal == true && !amyStop && amy.order) {
					amy.order = false;
					amyStop = true;
					search = msg.trim().replace('cherche-moi des', '').replace('cherche-moi un', '').replace('cherche-moi le', '').replace('cherche-moi la', '');
					search = search.replace('cherche-moi les', '').replace('cherche-moi une', '').trim();				
					
					$.ajax({
						type: 'GET',
						url: 'https://www.googleapis.com/customsearch/v1?safeSearch=off&hl=fr-FR&cr=countryFR&key=AIzaSyBKh_Ow00kzEqF076wXpqkoGnCSU11G-58&cx=013607609062797787879:jyesd0yc0j4&q='+search,
						success: function (e) {
							console.log(e);
							amy.talk.start('Voici ce que j\'ai trouvé pour vous :');
							amyResult.innerText = 'Voici ce que j\'ai trouvé pour vous :';
							amy.talk.onend = function () {
								amy.listen.stop();
							};
						}
					});

					break;
				}

                                if (msg.trim().startsWith('montre-moi') && result.isFinal == true && !amyStop && amy.order) {
                                        amy.order = false;
                                        amyStop = true;
					amy.listen.stop();

                                        search = msg.trim().replace('montre-moi des', '').replace('montre-moi un', '').replace('montre-moi le', '').replace('montre-moi la', '');
                                        search = search.replace('montre-moi les', '').replace('montre-moi une', '').trim();

                                        $.ajax({
                                                type: 'GET',
                                                url: 'https://www.googleapis.com/customsearch/v1?searchtype=image&safeSearch=off&enableImageSearch=true&hl=fr-FR&cr=countryFR&key=AIzaSyBKh_Ow00kzEqF076wXpqkoGnCSU11G-58&cx=013607609062797787879:jyesd0yc0j4&q='+search,
                                                success: function (e) {
                                                        amy.talk.start('Voici ce que j\'ai trouvé pour vous :');
                                                        amyResult.innerText = 'Voici ce que j\'ai trouvé pour vous :';
                                                        amy.talk.onend = function () {
                                                                amy.listen.start();
                                                        };
							for (i in e.items) {
								var item = e.items[i];
								if (item.pagemap != undefined && item.pagemap.cse_image != undefined && item.pagemap.cse_image[0] != undefined) {
									var item = e.items[i];
									var dItem = document.createElement('img');
									dItem.className = 'imgSearch';
									dItem.title = item.title;
									dItem.src = 'image.php?url='+item.pagemap.cse_image[0].src;
									dItem.dataUrl = item.link;
									dItem.onclick = function () {
										window.open(this.dataUrl);
									};
									document.getElementById('searchResult').appendChild(dItem);
								}
							}
                                                }
                                        });

                                        break;
                                }
			}
			m++;
		}
		n++;
	}
};

amy.listen.start();

document.onload = function () {
	var amyResult = document.getElementById('amyResult');
};
