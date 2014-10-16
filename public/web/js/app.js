(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function( $ ){

  var PageSlider = function(options){

    this.container = options.container;
    this.beforeSlide = options.beforeSlide;
    this.afterSlide = options.afterSlide;
    this.currentPage = undefined;
    this.currentView = undefined;
    this.stateHistory = [];

  };

  PageSlider.prototype = {
    back : function(){
      if (this.stateHistory[this.stateHistory.length - 2] != null) {
        location.hash = this.stateHistory[this.stateHistory.length - 2];
      } else {
        location.hash = '#';
      } },

    home: function(){
      this.stateHistory = ["", ""];
      location.hash = '#';
    }, 

    overWriteLastHistoryKeyDate: function(yyyymmdd) {
      var lastIndex, lastState;
      lastIndex = this.stateHistory.length - 1;
      lastState = this.stateHistory[lastIndex];
      return this.stateHistory[lastIndex] = lastState.replace(/\d{8}/, yyyymmdd);
    },

    overWriteLastHistory : function(locationHash) {
      var lastIndex;
      lastIndex = this.stateHistory.length - 1;
      return this.stateHistory[lastIndex] = locationHash;
    },

    slidePage : function(renderedView) {
      var l, state;
      l = this.stateHistory.length;
      state = window.location.hash;
      if (l === 0) {
        this.stateHistory.push(state);
        this.slidePageFrom(renderedView);
        return;
      }
      if (state === this.stateHistory[l - 2]) {
        this.stateHistory.pop();
        return this.slidePageFrom(renderedView, "page-left");
      } else {
        this.stateHistory.push(state);
        return this.slidePageFrom(renderedView, "page-right");
      }
    },

    slidePageFrom : function(renderedView, from) {
      var page;
      if (this.beforeSlide) {
        this.beforeSlide();
      }
      page = renderedView.$el;
      this.container.append(page);
      if (!this.currentPage || !from) {
        page.attr("class", "page page-center");
        this.currentPage = page;
        this.currentView = renderedView;
        if (this.afterSlide) {
          this.afterSlide();
        }
        return;
      }
      page.attr("class", "page " + from);
      this.currentPage.one("webkitTransitionEnd", (function(_this) {
        return function(e) {
          $(e.target).remove();
          _this.currentView.destroy();
          _this.currentView = renderedView;
          _this.toTop();
          if (_this.afterSlide) {
            return _this.afterSlide();
          }
        };
      })(this));
      this.container[0].offsetWidth;
      page.attr("class", "page transition page-center");
      this.currentPage.attr("class", "page transition " + (from === "page-left" ? "page-right" : "page-left"));
      return this.currentPage = page;
    },

    toTop : function() {
      return setTimeout(function() {
        return window.scrollTo(0, 0);
      }, 100);
    },


  };

  return PageSlider;

});




},{}],2:[function(require,module,exports){
// application
window.globalConf = {
  //"rootUri":"http://localhost:4000/",
  "rootUri" : "http://tv-highlighter-rails.herokuapp.com/",
  "users" : {
    "user0": {
      "imageFileName" : "men0.jpg", 
    },
    "user1": {
      "imageFileName" : "men1.png", 
    },
    "user2": {
      "imageFileName" : "men2.png", 
    },
    "user3": {
      "imageFileName" : "men3.png", 
    },
    "user4": {
      "imageFileName" : "men4.png", 
    },
    "user5": {
      "imageFileName" : "men5.png", 
    },
  }
  
};

window.getUserPhotoById = function(userId){
  console.log( userId );
  var user = window.globalConf.users[userId];
  if( !user ) return "men0.jpg";
  return user.imageFileName;
};
window.getUserPhoto = function(data){
  return getUserPhotoById( data.userId );
};

require('./example/main');

},{"./example/main":5}],3:[function(require,module,exports){
var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('./router');
var QRRouter = require('./qrcode/qr_router.js');
var MainLayout = require('./main_layout.js');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

module.exports = (function () {
  var mainApp = new Backbone.Marionette.Application();
  mainApp.tvInfo = {
    movieTitle: "タイトル",
    movieId: "mov0"
  };

  mainApp.onStart = function(){

    this.mainLayout = new MainLayout( {el: $('#main-layout')} );
    this.mainLayout.render();
    this.pageSlider = new PageSlider({
      container: $('#master-container')
    });

    var router = new Router();
    var qRRouter = new QRRouter();
    Backbone.history.start();

    require('./highlighter.js');
  };
  
  return mainApp;

})();

},{"../../../lib/components/pageslider/pageslider":1,"./highlighter.js":4,"./main_layout.js":7,"./qrcode/qr_router.js":12,"./router":18,"backbone":"5kFNoY","jquery":"HlZQrA"}],4:[function(require,module,exports){
//$.getJSON('http://tv-highlighter-rails.herokuapp.com/channels.json')
//	.done( function(data){ console.log(data)})
//	.fail( function(data){ console.log(data)});

module.exports = (function(){

// ################################################
// Socket IO
// ################################################
var SERVER_URL = "http://tv-highlighter-node.herokuapp.com";
var socket;
connect();
function connect(){
    console.log('connecting to ' + SERVER_URL);
    socket = io( SERVER_URL);
    socket.on('connect', function(){
        console.log("connected");
    });
    socket.on('disconnect', function(){
        console.log('disconnected');
    });

    // フリフリをレシーブしたらこのイベント発火します
    socket.on('furifuri rcv', function(data){
        console.log( "#### !!!フリフリされました" );
        console.log( data.userName + "がフリフリしました。(ユーザID:" +  data.userId + ")" );

        if (player.getPlayerState() != YT.PlayerState.PLAYING) {
            // 再生中じゃないのでフリフリを無視する。
            return;
        }

        App.vent.trigger( "furifuri-rcv" ,data );

        // TODO: 移せ
        //uri
        var uri = window.globalConf.rootUri + "/furefures";
        // でーた
        var data = {
            furefure:{
                channel_uuid: App.tvInfo.movieId,
                user_uuid: data.userId,
                at_time_sec: player.getCurrentTime()
            }
        };
        // 送る
        $.post(uri,data).done(function(data){
        }).fail(function(data){
            console.log(data);
        });
    });

    // クライアントから「情報くれ」と言われたので情報あげましょう
    socket.on('info requested', function(data){
      console.log( "#### !!!情報リクエストされた" );
      sendInfo();
    });

    socket.on("go to end command rcv", function(){
      window.toEndOfTheMovie();
    });
  }

  // ################################################
  // イベントキック
  // ################################################

  /**
   * チャンネル変わったときはこれを。
   */
  function channelChanged( movieId, movieTitle ){
    tvInfo.movieId = movieId;
    tvInfo.movieTitle = movieTitle;
    sendInfo();
  }

  /**
   * 番組見終わりましたのときにキックしてね
   */
  window.finishWatching = function(){
    console.log("send finishWatching");
    socket.emit("finish watching send",{});
  }

  /**
   * テレビの情報送ってください
   */
  function sendInfo(){
    socket.emit("info send", App.tvInfo );

  }
})();

},{}],5:[function(require,module,exports){
$ = require('jquery');
window.App = {};


$(document).on('ready', onDeviceReady );
function onDeviceReady(){
  
  App = require('./app.js');
  App.start();

};


},{"./app.js":3,"jquery":"HlZQrA"}],6:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<header class="APP-HEADER app-header">\n</header>\n<div id="master-container-wrapper">\n  <div id="master-container">\n    <div id="player"></div>\n    <div id="footer"></div>\n    <div id="right"></div>\n  </div>\n</div>\n<footer></footer>\n';
}
return __p;
};

},{}],7:[function(require,module,exports){
var Backbone = require('backbone');

var WaveView = require('./wave/wave_view.js');
var RightBoxView = require('./right/right_box_view.js');
module.exports = (function () {

  var MainLayout = Backbone.Marionette.LayoutView.extend({

    template: require('./main_layout.html'),
    regions: {
      "waveRegion": "#footer",
      "rightRegion": "#right"
    },

    initialize: function(){
    },
    onRender: function(){
      // todo: $BJQ99(B
      var playerWrapper = require('./player.js');
      playerWrapper.start();

      this.waveRegion.show( new WaveView() );
      this.rightRegion.show( new RightBoxView() );

    }

  });

  return MainLayout;
})();

},{"./main_layout.html":6,"./player.js":9,"./right/right_box_view.js":17,"./wave/wave_view.js":25,"backbone":"5kFNoY"}],8:[function(require,module,exports){

var Backbone = require('backbone');
module.exports = (function () {
  var UserModel = Backbone.Model.extend({
    urlRoot: globalConf.rootUri + "users.json",
  });
  return UserModel;
})();

},{"backbone":"5kFNoY"}],9:[function(require,module,exports){
// 2. This code loads the IFrame Player API code asynchronously.

module.exports = (function(){

  var PlayerWrapper = {};

  PlayerWrapper.start = function(){
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };
  return PlayerWrapper; 

})();

},{}],10:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="#QR_READER" class="BACKBONE-PAGE">\n\n<button type="button" class="qrButton">QRコードを読み込む</button>\n<span class="display"></span>\n\n</div>\n';
}
return __p;
};

},{}],11:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function () {
  var Page1View = Backbone.Marionette.ItemView.extend({
    template: require('./qr_main.html'),
    headerConf: {
      title: "QR",
      showBackButton: true,
    },
    ui: {
      "qrButton" : ".qrButton",
      "display" : ".display"
    },
    events: {
      "click @ui.qrButton": "read"
    },
    initialize: function(){
    },
    read: function(){
      _this = this;
      var s = function(res){ 
        _this.ui.display.html( res.codeData );
      };
      var f = function(){ alert("no"); };
      applican.barcode.captureBarcode(s, f);
    }
  });

  return Page1View;
})();

},{"./qr_main.html":10,"backbone":"5kFNoY"}],12:[function(require,module,exports){
var Backbone = require('backbone');
var QRMainView = require('./qr_main_view');

module.exports = (function () {

  var QRController = Backbone.Marionette.Controller.extend({
    showQRpage: function(){
      var qrView = new QRMainView();
      qrView.render();
      App.pageSlider.slidePage( qrView );
      App.headerModel.applyViewHeaderConf( qrView.headerConf );
    },
  });

  var qRController = new QRController();
  var QRRouter = Backbone.Marionette.AppRouter.extend({
    controller: qRController,
    appRoutes: {
      "qr_reader" : "showQRpage",
    }
  });

  return QRRouter;

})();

},{"./qr_main_view":11,"backbone":"5kFNoY"}],13:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

  var FuriFuriUserModel = Backbone.Model.extend({
  });
  return FuriFuriUserModel;
})();

},{"backbone":"5kFNoY"}],14:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="HIGHLIGHTER-ITEM">\n  <img src="'+
((__t=( photo ))==null?'':__t)+
'" class="PHOTO">\n  '+
((__t=( userName  ))==null?'':__t)+
'\n</div>\n';
}
return __p;
};

},{}],15:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function () {
  var RightBoxItemView = Backbone.Marionette.ItemView.extend({
    template: require('./right_box_item_view.html'),
    className: "RIGHT-BOX-FURIFURI-ITEM",
    regions: {
    },
    initialize: function(){
    },
    onRender: function(){
      var _this = this;
      setTimeout( function(){
        _this.$el.addClass('SHOW');
        setTimeout( function(){
          _this.$el.wrap('<div class="DUMMY-HEIGHT"></div>');
          setTimeout( function(){
            _this.hide();
          },2000);
        },1000);
      }, 500);
    },
    hide: function(){
      this.$el.addClass('INVISIBLE');
      this.$el.removeClass('SHOW');
      App.vent.trigger('hide-furifuri-user');
    },
  });

  return RightBoxItemView;
})();

},{"./right_box_item_view.html":14,"backbone":"5kFNoY"}],16:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="RIGHT-HEADER">\n  Other HighLighters\n</div>\n<div class="HIGHLIGHTER-LIST">\n</div>\n';
}
return __p;
};

},{}],17:[function(require,module,exports){
var Backbone = require('backbone');
var FuriFuriUserModel = require('./furifuri_user_model.js');
var RightBoxItemView = require('./right_box_item_view.js');
var UserModel = require('../models/user_model.js');

module.exports = (function () {
  var RightBoxView = Backbone.Marionette.LayoutView.extend({
    template: require('./right_box_view.html'),
    regions: {
    },
    initialize: function(){
      this.offset = 0;
      this.listenTo( App.vent, 'furifuri-rcv', this.onFurifuriRcv );
      this.listenTo( App.vent, 'hide-furifuri-user', this.hideFuriFuriUser );
      this.furifuriItemViews = [];
    },
    onRender: function(){
    },
    alreadyAdded: function(data){
      return this.furifuriItemViews.filter( function(item){
        return item.model.get("userId") === data.userId;
      }).length > 0;
    }
    ,onFurifuriRcv: function(data){
      if( this.alreadyAdded( data )) return false;
      data.photo = "./image/users/" + window.getUserPhoto(data);
      var f = new FuriFuriUserModel( data );
      var view = new RightBoxItemView({ model: f });
      this.furifuriItemViews.push( view );
      view.render();
      this.$('.HIGHLIGHTER-LIST').append( view.el );
    },
    hideFuriFuriUser: function(){
      var _this = this;
      var target = this.furifuriItemViews.shift();
      if( target ){
        setTimeout( function(){
          _this.offset++;
          var offset = _this.offset; 
          _this.$('.HIGHLIGHTER-LIST').css({
            "-webkit-transform": "translate3d(0px, " + (-140 * offset) + "px,0px)",
            "transform": "translate3d(0px, " + (-140 * offset) + "px,0px)"
          });
          setTimeout( function(){
            target.destroy();
          }, 500);
        }, 500);
      }
    },
  });

  return RightBoxView;
})();

},{"../models/user_model.js":8,"./furifuri_user_model.js":13,"./right_box_item_view.js":15,"./right_box_view.html":16,"backbone":"5kFNoY"}],18:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function(){

  var Router = Backbone.Router.extend({

    routes:{
      "" : "title",
      "notification" : "showNotificationView",
    },

    showMenue: function(){
    },

  });

  return Router;


})();

},{"backbone":"5kFNoY"}],19:[function(require,module,exports){

var Backbone = require('backbone');
var WaveModel = require('./wave_model');

module.exports = (function () {
  var WaveCollection = Backbone.Collection.extend({
    model: WaveModel,
    url: window.globalConf.rootUri + "furefures/index_for_tv.json",

    fetch_for_tv: function( channel_uuid ){
      return this.fetch( { data: { channel_uuid: channel_uuid } } );
    },

  });
  return WaveCollection;
})();

},{"./wave_model":23,"backbone":"5kFNoY"}],20:[function(require,module,exports){
var Backbone = require('backbone');
var WaveItemView = require('./wave_item_view.js');

module.exports = (function () {
  var WaveCollectionView = Backbone.Marionette.CollectionView.extend({
    tagName: "ol",
    className: "WAVE-OL",
    childView: WaveItemView,
  });
  return WaveCollectionView;
})();

},{"./wave_item_view.js":22,"backbone":"5kFNoY"}],21:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="inner-wrapper">\n  <div class="inner">\n  </div>\n</div>\n<div class="ICON"><img class="ICON-PHOTO"></div>\n';
}
return __p;
};

},{}],22:[function(require,module,exports){

var Backbone = require('backbone');

module.exports = (function () {

  var WaveItemView = Backbone.Marionette.ItemView.extend({
    tagName: "li",
    className: "item",
    template: require('./wave_item_view.html'),
    initialize: function(){
      this.listenTo( this.model, 'change', this.onModelChange );
    },
    onModelChange: function(){
      this.reflectHeight();
      if( this.model.get("vote") > 130 && !this.$el.hasClass('SHOW-ICON')  ){
        this.showIcon( "./image/users/" + window.getUserPhotoById( this.model.get("furifuriUser") ) );
      }
    },
    showIcon: function( photoUrl ){
      console.log(photoUrl);
      this.$('.ICON-PHOTO').prop("src", photoUrl );
      this.$el.addClass('SHOW-ICON');
    },
    onRender: function(){
      var _this = this;
      setTimeout(function(){
        _this.reflectHeight();
      }, 25 * Number(this.model.get("segment")) / 5  );

      if( this.model.get("vote") > 120 && Math.floor(Math.random() * 10) % 2 == 0){
        var fileName = {
          0: "men5.png",
          1: "men4.png"
        }[ Math.floor(Math.random() * 10) %2 ];
        this.showIcon( "./image/users/" + fileName );
      }
    },
    reflectHeight: function(){
      var y = 153 - ( Number(this.model.get("vote")) * 1 );
      if(y < 0 ) y = 0;
      var css = { 
        "-webkit-transform" : "translate3d(0px, " + y + "px , 0px)",
        "transform" : "translate3d(0px, " + y + "px , 0px)"
      };
      this.$('.inner').css(css);
    },


  });

  return WaveItemView;
})();

},{"./wave_item_view.html":21,"backbone":"5kFNoY"}],23:[function(require,module,exports){

var Backbone = require('backbone');
module.exports = (function () {
  var WaveModel = Backbone.Model.extend({
  });
  return WaveModel;
})();

},{"backbone":"5kFNoY"}],24:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="wave-wrapper">\n  <div id="wave-header"></div>\n  <div id="wave-main"></div>\n</div>\n<div class="CURRENT-NAV"></div>\n';
}
return __p;
};

},{}],25:[function(require,module,exports){
var Backbone = require('backbone');
var WaveCollection = require('./wave_collection.js');
var WaveCollectionView = require('./wave_collection_view.js');

module.exports = (function () {
  var Page1View = Backbone.Marionette.LayoutView.extend({
    template: require('./wave_view.html'),
    className: "OVERFLOW-WRAPPER",
    regions: {
      "waveMainRegion" : "#wave-main"
    },
    initialize: function(){
      this.collection = new WaveCollection();
      this.collection.fetch_for_tv( "mov0" );

      this.listenTo( App.vent, 'furifuri-rcv', this.onFurifuriRcv );
      this.listenTo( this.collection, 'sync' , this.renderChildViews);
    },
    onRender: function(){
    },
    renderChildViews: function(){
      this.waveMainRegion.show( new WaveCollectionView( { collection: this.collection }) ); 
      this.watch();
    },
    onFurifuriRcv: function( data ){
      var currentTime = player.getCurrentTime();
      var segment = Math.floor(  currentTime  / 5) * 5;
      var target = this.collection.where({ segment: segment})[0];
      target.set( { "vote": target.get("vote") + 1, "furifuriUser": data.userId } );
    },

    watch: function(){
      var _this = this;
      setTimeout( function(){
        if( player && player.getCurrentTime ){
          var px = ( player.getCurrentTime() /  5) * -1 * 30;
          var css = { 
            "-webkit-transform" : "translate3d(" +  px + "px, 0px , 0px)",
            "transform" : "translate3d(" + px + "px, 0px , 0px)"
          };
          _this.$('#wave-wrapper').css(css);
        }
        _this.watch();
      }, 1000);

    },
  });

  return Page1View;
})();

},{"./wave_collection.js":19,"./wave_collection_view.js":20,"./wave_view.html":24,"backbone":"5kFNoY"}]},{},[2]);