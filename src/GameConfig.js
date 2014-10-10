/**
 * Created by Robin on 14-10-10.
 */
var OFFSET_X = 4;
var    OFFSET_Y = 32;
var    ROW = COL = 9;
var    BLOCK_W = 32;
var   BLOCK_H = 36;
var    BLOCK_XREGION = 33;
var    BLOCK_YREGION = 28;
var    OFFSET_ODD = 16;
var    BLOCK1_RECT = cc.rect(0, 0, BLOCK_W, BLOCK_H);
var    BLOCK2_RECT = cc.rect(BLOCK_W, 0, BLOCK_W, BLOCK_H);
var    PLAYER_W = 66;
var    PLAYER_H = 118;
var    PLAYER_OX = 0;
var    MOVING_OY = 118;
var    TRAPPED_OY = 0;
var    START_UI_SIZE = cc.size(256, 454);
var    FAIL_UI_SIZE = cc.size(292, 277);
var    WIN_UI_SIZE = cc.size(308, 276);