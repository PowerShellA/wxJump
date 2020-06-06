//packageName:com.Tanguo.ttfz
//Version:1.0.0
//death=9
requestScreenCapture();
setInterval(() => {}, 1000);
setScreenMetrics(1080, 1920);
const press_coefficient = 1.392;
const press_x = 163;
const press_y = 1822;
const piece_body_width = 80;
const piece_dist_from_top_to_base = 188;
const piece_color = "#3d3752";
var xx = 0,
    yy = 0,
    boardX, boardY, sta = 0;
var windowX, windowY;
var downTime;
var window = floaty.window( < frame > < button id = "action"
    text = "X"
    w = "120"
    h = "60"
    bg = "#1f995566" / > < /frame>);

    const max=Math.max;
    const abs=Math.abs;
    window.action.setOnTouchListener(function(view,event){
        switch(event.getAction()){
        case event.ACTION_DOWN:xx=event.getRawX();
            yy=event.getRawY();windowX=window.getX();
            windowY=window.getY();
            downTime=new Date().getTime();
            sta=0;
            return true;
        case event.ACTION_MOVE:window.setPosition(windowX+(event.getRawX()-xx),windowY+(event.getRawY()-yy));
            sta=0;
            return true;
        case event.ACTION_UP:boardX=window.getX()+60;
            boardY=window.getY()+30;
            sta=1;
            return true
    }
    return true
});

alert("感谢您的支持~","感谢您的支持！");

ForTry();

function main() {
    toast("请打开游戏，并在5秒内点击开始按钮");
    waitForActivity("com.tencent.mm.plugin.appbrand.ui.AppBrandUI");
    sleep(5000);
    var template = images.load("http://wx1.sinaimg.cn/mw690/0060lm7Tly1fs31a4fo4uj302605ugm0.jpg");
    if (template != null) {
        log("已正确读取图片")
    } else {
        toast("未能正确读取图片.")
    }
    var deltaX, deltaY, img, piece;
    while (1) {
        if (currentActivity() != "com.tencent.mm.plugin.appbrand.ui.AppBrandUI") {
            log("Wait For WeChat");
            sleep(1000);
            continue
        }
        img = captureScreen();
        piece = find_piece(img, template);
        if (piece.x != 0 && piece.y != 0 && sta == 1) {
            deltaX = abs(boardX - piece.x);
            deltaY = abs(boardY - piece.y);
            toast("jump");
            log("BoardX=" + boardX + ",BoardY=" + boardY + ";piece.x=" + piece.x + ",piece.y=" + piece.y);
            log("Jump");
            jump(boardX, piece.x, Math.sqrt(deltaX * deltaX + deltaY * deltaY))
        } else {
            log("等待用户执行操作");
            continue
        }
        sta = 0;
        piece.x = 0;
        piece.y = 0;
        sleep(950)
    }
}

function jump(boardX, piecex, distance) {
    var fir = 1.15;
    if (boardX <= piecex) {
        fir = 0.79
    }
    if (distance <= 400 && boardX <= piecex) {
        fir *= 0.63
    }
    if (distance <= 400 && boardX > piecex) {
        fir *= 1.2
    }
    var press_time = Math.max(130, distance * press_coefficient);
    press(press_x, press_y, parseInt(press_time * fir));
    fir = 1.15
}

function find_piece(img, templa) {
    var pieceTemp = images.findImage(img, templa, {
        region: [0, 555, 1080, 899],
        threshold: 0.2
    });
    if (!pieceTemp) {
        pieceTemp = FindInColor(img);
        return {
            x: pieceTemp.x,
            y: pieceTemp.y
        }
    } else return {
        x: pieceTemp.x + 39,
        y: pieceTemp.y + 105
    }
}

function FindInColor(img) {
    var piece_top = findColor(img, piece_color, {
        region: [0, 300, 1080, 1580],
        threshold: 4
    });
    if (!piece_top) {
        log("Can't Spot Piece, Exit.");
        exit(0);
    }
    var piece_start_x = -1;
    var piece_end_x = -1;
    for (var x = 0; x < device.width; x++) {
        var is_piece = images.detectsColor(img, piece_color, x, piece_top.y);
        if (is_piece && piece_start_x < 0) {
            piece_start_x = x
        }
        if (!is_piece && piece_start_x >= 0) {
            piece_end_x = x;
            break;
        }
    }
    var piece_top_center_x = (piece_start_x + piece_end_x) / 2;
    var piece_x = piece_top_center_x;
    var piece_y = piece_top.y + piece_dist_from_top_to_base;
    return {
        x: piece_x,
        y: piece_y
    }
}

function ForTry() {
    try {
        main()
    } catch (err) {
        log(err);
        toast("请打开无障碍服务哦~");
        sleep(10000);
        ForTry();
    }
}