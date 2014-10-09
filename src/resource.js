var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    bg : "res/background.jpg",
    block : "res/block.png",
    player : "res/player.png",
    succeed : "res/succeed.png",
    failed : "res/failed.png",
    again : "res/replay.png",
    notify : "res/notify.png",
    start : "res/title.png",
    more : "res/more.png",
    arrow : "res/arrow.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}