window.dzAsyncInit = function() {
  DZ.init({
    appId  : '216184',
    channelUrl : 'http://dev.watdafuq.fr/nx-voice/channel.html',
		player : {
			onload : function(){
        console.log('player is ready !');
      }
		}
  });
};
(function() {
  var e = document.createElement('script');
  e.src = 'http://e-cdn-files.deezer.com/js/min/dz.js';
  e.async = true;
  document.getElementById('dz-root').appendChild(e);

  document.getElementById('dz-login').onclick = () => {
    DZ.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        DZ.api('/user/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {perms: 'basic_access,email'});
  }
}());
