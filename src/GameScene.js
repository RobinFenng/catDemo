/**
 * Created by Robin on 2014/10/8.
 */

var GameLayer =  cc.Layer.extend({
    blocks : null,
    batch : null,
    block_tex : null,
    moving_action:null,
    trapped_action:null,
    active_blocks:null,
    active_nodes:null,
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
        this.initBlocks();
        this.initPlayer();


    },
    initBlocks:function () {

        this.active_nodes = [];
        this.active_blocks = [];
        for(var i=0;i<ROW;i++){
            this.active_blocks.push([]);
            for(var j = 0;j<COL;j++){
                this.active_blocks[i][j] = false;
            }
        }
        //初始背景方块
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

        this.randomBlocks();

    },
    initPlayer : function(){

        var texp = cc.textureCache.addImage(res.player);
        var frame;
        var rect = cc.rect(0, 0, PLAYER_W, PLAYER_H);
        var moving_frames = [];
        var trapped_frames = [];
        for(var i=0;i<6;i++){
            rect.x = PLAYER_OX + i * PLAYER_W;
            frame = new cc.SpriteFrame(texp, rect);
            trapped_frames.push(frame);
        }

        rect.y = MOVING_OY;
        for(var i= 0;i<4;i++){
            rect.x = PLAYER_OX + i * PLAYER_W;
            frame = new cc.SpriteFrame(texp, rect);
            moving_frames.push(frame);
        }

        var moving_animation = new cc.Animation(moving_frames, 0.2);
        this.moving_action = cc.animate(moving_animation).repeatForever();
        var trapped_animation = new cc.Animation(trapped_frames, 0.2);
        this.trapped_action = cc.animate(trapped_animation).repeatForever();
        this.player = new cc.Sprite(moving_frames[0]);
        this.addChild(this.player, 10);
        this.player_c = this.player_r = 4;
        this.player.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : OFFSET_X + BLOCK_XREGION * this.player_c + BLOCK_W/2,
            y : OFFSET_Y + BLOCK_YREGION * this.player_r - 5
        });
        this.player.stopAllActions();
        this.player.runAction(this.moving_action);

    },
    randomBlocks : function(){
        var nb = Math.round(cc.random0To1() * 13) + 7, r, c;
        for (var i = 0; i < nb; i++) {
            r = Math.floor(cc.random0To1() * 9);
            c = Math.floor(cc.random0To1() * 9);
            this.activateBlock(r,c);
        }


    },
    activateBlock : function(r,c){
        if(!this.active_blocks[r][c]){
            var block = new cc.Sprite(this.block_tex, BLOCK1_RECT);
            block.attr({
                anchorX : 0,
                anchorY : 0,
                x : OFFSET_X + (r%2==1) * OFFSET_ODD + BLOCK_XREGION * c,
                y : OFFSET_Y + BLOCK_YREGION * r,
                width : BLOCK_W,
                height : BLOCK_H
            });
            this.active_nodes.push(block);
            this.addChild(block, 2);
            this.active_blocks[r][c] = true;
            return true;
        }
        return false;

    }

});


var GameScene = cc.Scene.extend({

    ctor:function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }

});