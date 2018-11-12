# 键盘事件处理

在制作 PC 端的游戏的时候，我们经常需要监听键盘的事件，以便响应用户的键盘操作。目前，对键盘事件的支持主要遵循的是 DOM0级。

## 按键相关事件

键盘操作涉及下面三种事件：

* keydown：当用户按下键盘上的任意键时触发，而且如果按住按住不放的话，会重复触发此事件。
* keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的，会重复触发此事件（按下Esc键也会触发这个事件）。
* keyup：当用户释放键盘上的键时触发。

## 按键过程

用户按下键盘上的字符键时

* 首先会触发 keydown 事件
* 然后紧接着触发 keypress 事件
* 最后触发 keyup事件。如果用户按下了一个字符键不放，就会重复触发 keydown 和 keypress 事件，直到用户松开该键为止。

## 键码（keyCode）对照表

在发送 keydown 和 keyup 事件时，event 对象的 keyCode 属性中会包含一个代码，与键盘上一个特定的键对应。如下图，为我们键盘键位的 keyCode 对照表

![键值表](./static/img/keycode.png)

## 例子：简单实现键盘控制物体移动

实现的基本原理如下：监听全局键盘操作事件，当用户按下某一按键时，返回对应的键值，然后再根据键值判断用户按下了哪一按键，来控制物体上下移动的操作，效果如下：

![键值表](./static/img/keyboard.gif)

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>物体移动</title>
</head>
<body>
    <canvas id="canvas" width="500" height="500"></canvas>
    <script>
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var rect = {
        x: 100, // 矩形的 x 坐标
        y: 400, // 矩形的 y 坐标
        width: 100, // 矩形的宽度
        height: 100, // 矩形的高度
        step: 30 // 矩形移动的步伐
      }
      // 全局监听键盘操作的 keydown 事件 
      document.onkeydown = function(e) {  
        // 获取被按下的键值 (兼容写法)
        var key = e.keyCode || e.which || e.charCode;
        switch(key) {
          // 点击左方向键
          case 37: 
            rect.x -= 20;
            drawRect();
            break;
          // 点击上方向键
          case 38: 
            rect.y -= 20;
            drawRect();
            break;
          // 点击右方向键
          case 39: 
            rect.x += 20;
            drawRect();
            break;
          // 点击下方向键
          case 40: 
            rect.y += 20;
            drawRect();
            break;
        } 
      };
      function drawRect() {
        // 清除画布
        context.clearRect(0, 0, canvas.width, canvas.height);
        // 绘制矩形
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
      }
      // 第一次绘制
      drawRect();
    </script>
</body>
</html>
```