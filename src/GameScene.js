/**
 * Created by Robin on 2014/10/8.
 */

var GameLayer =  cc.Layer.extend({
    onEnter:function(){
        this._super();
        var bg =  new cc.Sprite(res.bg);
        bg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
        });
        this.addChild(bg);
        this.init();


    },
    init:function () {


    }

});


var GameScene = cc.Scene.extend({

    ctor:function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }

});