/**
 * Created by Robin on 14-10-14.
 */
var ResultLayer = cc.Layer.extend({
    winPanel:null,
    losePanel:null,
    win : false,
    step:null,
    ctor:function(win,step){
        this._super();
        this.win = win;
        this.step = step;

        var bg =  new cc.Sprite(res.bg);
        bg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
        });
        this.addChild(bg);

        if(this.win){
            this.winPanel = new cc.Sprite(res.succeed);
            this.winPanel.x = cc.winSize.width/2;
            this.winPanel.anchorY = 0.2;
            this.winPanel.y = cc.winSize.height/2;
            this.addChild(this.winPanel);
        }else{
            this.losePanel = new cc.Sprite(res.failed);
            this.losePanel.x = cc.winSize.width/2;
            this.losePanel.anchorY = 0.2;
            this.losePanel.y = cc.winSize.height/2;
            this.addChild(this.losePanel);
        }

        var notify = new cc.Sprite(res.notify);
        notify.anchorX = notify.anchorY = 0;
        notify.x = cc.winSize.width/2 - FAIL_UI_SIZE.width / 2;
        notify.y = cc.winSize.height/2 - FAIL_UI_SIZE.height / 2;
        this.addChild(notify);

        var replay = new cc.Sprite(res.again);
        replay.anchorX = 1;
        replay.anchorY = 0;
        replay.x = cc.winSize.width/2 + FAIL_UI_SIZE.width / 2;
        replay.y = cc.winSize.height/2 - FAIL_UI_SIZE.height / 2;
        this.addChild(replay);





    },
    onEnter:function(){
        this._super();
        var miny = cc.winSize.height/2 - FAIL_UI_SIZE.height / 2;

        var step =this.step, percent;
        if (step < 4) percent = 99;
        else if (step < 10) percent = Math.round(95 + 4 * (10-step)/6);
        else if (step < 20) percent = Math.round(85 + 10 * (20-step)/10);
        else percent = 95 - step/2;

        if(this.win){

            this.winPanel.removeAllChildren();
            var w = this.winPanel.width;
            var h = this.winPanel.height;
            var label = new cc.LabelTTF("继续刷屏！\n"+step+"步推倒我的小羊驼\n打败"+percent+"%朋友圈的人！\n你能超过我吗？", "宋体", 20);
            label.x = w/2;
            label.y = h/4;
            label.textAlign = cc.LabelTTF.TEXT_ALIGNMENT_CENTER;
            //label.boundingWidth = w;
            label.width = w;
            label.color = cc.color(0, 0, 0);
            this.winPanel.addChild(label);

        }else{
            this.losePanel.removeAllChildren();
            var w = this.losePanel.width, h = this.losePanel.height;
            label = new cc.LabelTTF("我滴小羊驼呀它又跑掉了\nT_T 快帮我抓回来！", "宋体", 20);
            label.x = w/2;
            label.y = h/4+5;
            label.textAlign = cc.LabelTTF.TEXT_ALIGNMENT_CENTER;
            //label.boundingWidth = w;
            label.width = w;
            label.color = cc.color(0, 0, 0);
            this.losePanel.addChild(label, 10);

        }

        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan:function(touches,event){
                var touch = touches[0];
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
             //   var target = event.getCurrentTarget();
                if (pos.y > miny-20 && pos.y < miny + 100) {
                    if (pos.x > cc.winSize.width/2) {
                       cc.director.runScene(new GameScene());
                    }
                    else {
                        // Share
                        var scene = new cc.Scene();
                        var layer = new ShareLayer(target.win,this.step,percent);
                        scene.addChild(layer);
                        cc.director.runScene(scene);
                        target.win ? share(1, step, percent) : share(2);
                    }
                }

            }

        },this);
    }

});
