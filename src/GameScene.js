/**
 * Created by Robin on 2014/10/8.
 */

var GameLayer =  cc.Layer.extend({
    blocks : null,
    batch : null,
    block_tex : null,
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

        this.blocks = new cc.Layer();
        this.blocks.x = OFFSET_X;
        this.blocks.y = OFFSET_Y;
        this.addChild(this.blocks);

        this.batch = new cc.SpriteBatchNode(res.block, 81);
        this.block_tex = this.batch.texture;
        var ox = x = y = 0, odd = false, block, tex = this.batch.texture;
         for (var r =0;r<ROW;r++){
             y = BLOCK_YREGION * r;
             ox = odd * OFFSET_ODD;
             for(var c = 0;c<COL;c++){
                 x = ox + BLOCK_XREGION * c;
                 block = new cc.Sprite(tex, BLOCK2_RECT);
                 block.attr({
                     anchorX : 0,
                     anchorY : 0,
                     x : x,
                     y : y,
                     width : BLOCK_W,
                     height : BLOCK_H
                 });
                 this.batch.addChild(block);
             }
             odd =!odd;
         }
        this.blocks.addChild(this.batch);
        this.blocks.bake();
    }

});


var GameScene = cc.Scene.extend({

    ctor:function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }

});