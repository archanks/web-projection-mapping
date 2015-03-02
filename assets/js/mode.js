Mode = (function (){

  var START_FULLSCREEN = 'start-fullscreen',
      EXIT_FULLSCREEN = 'exit-fullscreen';


  function bindClickEvents(){
    var fullScreenButton = document.querySelectorAll('.dialog-cta')[0],
        startFullScreenButton = document.querySelectorAll('.'+START_FULLSCREEN)[0],
        exitFullScreenButton = document.querySelectorAll('.'+EXIT_FULLSCREEN)[0];

    if(fullScreenButton){
      fullScreenButton.addEventListener("click", goFullScreen);
    }

    if(startFullScreenButton){
      startFullScreenButton.addEventListener("click", goFullScreen);
    }
    if(exitFullScreenButton){
      exitFullScreenButton.addEventListener("click", leaveFullScreen);
    }
  }

  function fullScreenManager(){
    if (!window.screenTop && !window.screenY) {
      removeFullScreenPrompt();
    }
  }

  function goFullScreen(button){

    var fullScreenButton;

    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
     (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }

    removeFullScreenPrompt();

    fullScreenButton = this.classList.contains(START_FULLSCREEN) ? this : document.querySelectorAll('.'+START_FULLSCREEN)[0];

    fullScreenButton.innerHTML = 'Exit Fullscreen';
    fullScreenButton.classList.remove('start-fullscreen');
    fullScreenButton.classList.add('exit-fullscreen');

    bindClickEvents();

  }

  function leaveFullScreen(button){

    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }

    if( this.classList.contains(EXIT_FULLSCREEN) ){
      this.innerHTML = 'Fullscreen';
      this.classList.remove('exit-fullscreen');
      this.classList.add('start-fullscreen');

      bindClickEvents();
    }

  }

  function removeFullScreenPrompt(){
    var fullScreenDialog = document.getElementById('fullscreenDialog');

    if(fullScreenDialog){
      fullScreenDialog.parentNode.removeChild(fullScreenDialog);
    }
  }


  // INIT
  function init(){

    bindClickEvents();
    fullScreenManager();

  }

  return{
    init : init
  };

}());
