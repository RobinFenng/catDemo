/**
 * Created by Robin on 2014/10/8.
 */
var  StartUI = cc.Layer.extend({

    ctor:function(){
        this._super();
        var start = new cc.Sprite(res.start);
        start.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2+20
        });
        this.addChild(start);
    },
    onEnter:function(){
        this._super();
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded:function(touches, event){
                var touch = touches[0];
                var pos =  touch.getLocation();
                if (pos.y < cc.winSize.height/3) {
                    cc.director.runScene(new GameScene());
                }
            }

        },this);

    }

});