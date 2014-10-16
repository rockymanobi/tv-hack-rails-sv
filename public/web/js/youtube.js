
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('player', {
    height: '502',
    width: '894',
    videoId: '2uT5bMPbLuk',
    playerVars: {
      end: 690,
      rel: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

// 4. The API will call this function when the video player is ready.
window.onPlayerReady = function(event) {
  event.target.playVideo();
};

window.toEndOfTheMovie = function(){
  player.seekTo( 680 )
}


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  var s = "";
  switch(event.data){
    case YT.PlayerState.ENDED:
      /* 0 (再生終了（＝最後まで再生した）) */
    s+=" / YT.PlayerState.ENDED";
    window.finishWatching();

    break;
    case YT.PlayerState.PLAYING:
      /* 1 (再生中) */
    s+=" / YT.PlayerState.PLAYING";
    break;
    case YT.PlayerState.PAUSED:
      /* 2 (一時停止された) */
    s+=" / YT.PlayerState.PAUSED";
    break;
    case YT.PlayerState.BUFFERING:
      /* 3 (バッファリング中) */
    s+=" / YT.PlayerState.BUFFERING";
    break;
    case YT.PlayerState.CUED:
      /* 5 (頭出しされた) */
    s+=" / YT.PlayerState.CUED";
    break;
    case -1:
      /* -1 (未スタート、他の動画に切り替えた時など) */
    s+=" / YT.PlayerState.UNSTARTED"
    break;
  }
  console.log("status = " + s);
}

function onPlay() {
    player.loadVideoById("NxuE1U88InQ", 0, "small");
    player.playVideo();
}


