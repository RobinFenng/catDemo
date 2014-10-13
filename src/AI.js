/**
 * Created by Robin on 14-10-13.
 */
var l_choices = [
    [
        [0, -1],
        [1, -1],
        [-1, -1]
    ],
    [
        [0, -1],
        [1, 0],
        [-1, 0]
    ]
];

var r_choices = [
    [
        [0, 1],
        [1, 0],
        [-1, 0]
    ],
    [
        [0, 1],
        [1, 1],
        [-1, 1]
    ]
];

var t_choices = [
    [
        [1, -1],
        [1, 0]
    ],
    [
        [1, 0],
        [1, 1]
    ]
];

var b_choices = [
    [
        [-1, -1],
        [-1, 0]
    ],
    [
        [-1, 0],
        [-1, 1]
    ]
];

var  getMoveRes  = function(r,c,hori_passed,vert_passed,active_blocks){
    var moveTor ,moveToc;

    var gameState = GameState.ING;
    var result = -1, temp;
    temp = getDistance(r, c, l_choices, active_blocks, hori_passed, 0);
    console.log(temp[2]);
    if (result == -1 || (temp != -1 && temp[2] < result[2]))
        result = temp;
    temp = getDistance(r, c, t_choices, active_blocks, vert_passed, 0);
    //console.log(temp[2]);
    if (result == -1 || (temp != -1 && temp[2] < result[2]))
        result = temp;
    temp = getDistance(r, c, b_choices, active_blocks, vert_passed, 0);
    //console.log(temp[2]);
    if (result == -1 || (temp != -1 && temp[2] < result[2]))
        result = temp;
    temp = getDistance(r, c, r_choices, active_blocks, hori_passed, 0);
    //console.log(temp[2]);
    if (result == -1 || (temp != -1 && temp[2] < result[2]))
        result = temp;
    reinit_passed(hori_passed);
    reinit_passed(vert_passed);


    if (result == -1) {
//        if (!this.trapped) {
//            this.trapped = true;
//            this.player.stopAction(this.moving_action);
//            this.player.runAction(this.trapped_action);
//        }

        if (!active_blocks[r][c-1])
            moveToc = c-1;
        else if (!active_blocks[r][c+1])
            moveToc = c+1;
        else {
            var odd = (r % 2 == 1);
            var dr = r - 1, tr = r + 1, nc = c + (odd ? 0 : -1);

            if (!active_blocks[dr][nc]) {
                moveTor = dr;
                moveToc = nc;
            }
            else if (!active_blocks[dr][nc+1]) {
                moveTor = dr;
                moveToc = nc+1;
            }
            else if (!active_blocks[tr][nc]) {
                moveTor = tr;
                moveToc = nc;
            }
            else if (!active_blocks[tr][nc+1]) {
                moveTor = tr;
                moveToc = nc+1;
            }
            // WIN
            else {
                gameState =  GameState.WIN;
            }
        }
    }
    else if (result[2] == 0) {
        gameState =  GameState.LOSE;
    }
    else {
        moveTor = result[0];
        moveToc = result[1];
    }

    var moveRes = [];
    moveRes[0] = gameState;
    moveRes[1] = moveTor;
    moveRes[2] = moveToc;
    return moveRes;



};
var getDistance  = function(r,c,dir_choices, activate_blocs, passed, cost){

    passed[r][c] = true;
    if (r <= 0 || r >= ROW_MINUS_1 || c <= 0 || c >= COL_MINUS_1) {
        return [r, c, cost];
    }


    var odd = (r % 2 == 1) ? 1 : 0;
    var choices = dir_choices[odd];
    var nextr, nextc, result;
    for (var i = 0, l = choices.length; i < l; i++) {
        nextr = r + choices[i][0];
        nextc = c + choices[i][1];

        if (!activate_blocs[nextr][nextc] && !passed[nextr][nextc]) {
            cost ++;
            result = getDistance(nextr, nextc, dir_choices, activate_blocs, passed, cost);
            if (result != -1) {
                result[0] = nextr;
                result[1] = nextc;
                return result;
            }
        }
    }
    return -1;
}