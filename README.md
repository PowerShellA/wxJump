# wxJump
微信跳一跳脚本辅助，这是autojs的脚本。2017年年底制作的，当时微信跳一跳很流行。
我的autojs主页https://www.autojs.org/user/powershella 此代码的早些版本在autojs的网站可以搜索到。搜索“PowerShellA”。

# 权限
悬浮窗、储存、屏幕录像。

# 原理
先获取一个屏幕截图，通过autojs内置的图像处理函数，在屏幕截图中找棋子位置，拖动屏幕上的悬浮窗瞄准目标位置，棋子位置和目标位置都有了，通过函数计算出按压屏幕的时长，执行按压屏幕函数。
 
# 战绩 几乎不会出错 (为2022中国冬奥会加油！)
![Image text](https://raw.githubusercontent.com/PowerShellA/wxJump/master/image/22.png)
