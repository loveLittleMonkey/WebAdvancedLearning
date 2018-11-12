// 判断是否有 requestAnimationFrame 方法，如果没有则模拟实现，浏览器兼容的考虑
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 30);
};

//获取怪兽数组中最小的minX和最大的maxX
function getMinXAndMaxX(monsters) {
  var tempMinX, tempMaxX;
  monsters.forEach(function(item) {
    if (!tempMinX && !tempMaxX) {
      tempMinX = item.x;
      tempMaxX = item.x
    } else {
      if (item.x < tempMinX) {
        tempMinX = item.x
      }
      if (item.x > tempMaxX) {
        tempMaxX = item.x
      }
    }
  });
  return {
    minX: tempMinX,
    maxX: tempMaxX
  }
}

// 全局监听键盘操作的 keydown 事件 
var KeyBoard = function () {
  // 将document 的上下文转移到游戏对象上
  document.onkeydown = this.keydown.bind(this);
  document.onkeyup = this.keyup.bind(this)
};
KeyBoard.prototype = {
  // 通过按键是否有被点击来更改状态
  left_arrow:false,
  spacebar:false,
  right_arrow:false,
  keydown: function (e) {
    // 浏览器兼容
    var key = e.keyCode || e.which || e.charCode;
    switch (key) {
    case 32:
      this.spacebar = true;
      break;
    case 37:
      this.left_arrow = true;
      break;
    case 39:
      this.right_arrow = true;
      break;
    }
  },
  keyup: function (e) {
    var key = e.keyCode || e.which || e.charCode;
    switch (key) {
    case 32:
      this.spacebar = false;
      break;
    case 37:
      this.left_arrow = false;
      break;
    case 39:
      this.right_arrow = false;
      break;
    }
  }
};

// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var score_display = document.querySelector('.score');
var game_next_level = document.querySelector('.game-next-level');

/**
 * 飞机对象
 */
var plane_image = new Image();
plane_image.src = './img/plane.png';
function Plane(x, y, width, height) {
  // 绘制飞机的坐标系和长宽
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  // 飞机的弹夹
  this.bullets = [];
  // 飞机移动的方向
  this.direction = '';
}
// 绘制飞机
Plane.prototype.draw = function() {
  context.drawImage(plane_image, this.x, this.y, this.width, this.height);
}
// 飞机左右移动。默认飞机移动的步伐长度为 5
// 飞机不可移动出指定移动区域,计算得到飞机的坐标范围是(30,470) --> (610,470)
Plane.prototype.move = function(direction) {
  if (direction === "left") {
    this.x = (this.x < 30) ? 30 : (this.x -5);
  } else {  
    this.x = (this.x > 610) ? 610 : (this.x +5);
  }
}
// 飞机发射子弹,shoot()增加一个子弹，drawBullets()将发射的子弹绘制
Plane.prototype.shoot = function() {
  var bullet = new Bullet(this.x + this.width / 2,this.y);
  this.bullets.push(bullet);
}
Plane.prototype.drawBullets = function() {
  for(var i=0; i<this.bullets.length; i++) {
    this.bullets[i].fly();
    if(this.bullets[i].y <= 0) {
      this.bullets.splice(i,1);
    }    
  }
  this.bullets.forEach(function(item){
    item.draw();
  });
}
// 子弹打中了怪兽,子弹数组里去掉该子弹
// 给了返回值，作为一个判断是否击中
Plane.prototype.hasHit = function (monster) {
  for (var i = this.bullets.length - 1; i >= 0; i--) {       
    if (monster.x < this.bullets[i].x 
          && this.bullets[i].x < (monster.x + monster.width) 
          && monster.y < this.bullets[i].y 
          && this.bullets[i].y < (monster.y + monster.height)) {
      this.bullets.splice(i, 1);
      return true;
    }
  }
  return false;
}

/**
 * 游戏元素飞机子弹对象
 */
function Bullet(x, y) {
  // 坐标位置
  this.x = x;
  this.y = y;
}
// 子弹飞行，子弹每帧移动距离为 10
Bullet.prototype.fly = function() {
  this.y -= 10;
}
Bullet.prototype.draw = function() {
  context.beginPath();
  context.strokeStyle = "#ffffff";
  context.moveTo(this.x, this.y);
  context.lineTo(this.x, this.y - 10);
  context.closePath();
  context.stroke();
}

/**
 * 游戏元素怪兽对象
 */
var monster_image1 = new Image();
monster_image1.src = './img/enemy.png';
var monster_image2 = new Image();
monster_image2.src = './img/boom.png';
function Monster(x, y, width, height) {
  // 坐标位置
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  // 移动方向
  this.direction = 'right';
  // 生存状态
  this.status = 'live'
}
Monster.prototype.draw = function() {
  switch(this.status){
    case 'live':
      context.drawImage(monster_image1, this.x, this.y, this.width, this.height);
      break;
    case 'dead':
      context.drawImage(monster_image2, this.x, this.y, this.width, this.height); 
      break;
    case 'none':
      context.fillStyle = 'rgba(0,0,0,0)'
      context.fillRect(this.x, this.y, this.width, this.height);
  }
}
// 怪兽左右移动
Monster.prototype.move = function(direction) {
  if (direction === "left") {
    this.x -= 2;
  } else {
    this.x += 2;
  }
}
// 怪兽向下移动
Monster.prototype.down = function(direction) {
  this.y += 50;
}
// 怪兽死亡
Monster.prototype.dead = function() {
  this.status = 'dead';
}
// 怪兽消失
Monster.prototype.none = function() {
  this.status = 'none';
}

/**
 * 游戏元素得分对象
 */
function Score() {
  // 初始化分数为0
  this.score = 0; 
}
Score.prototype.draw = function() {
  context.font = '18px Arial';
  context.fillStyle = 'white';
  context.fillText('分数：'+this.score, 20, 38);
}

/**
 * 整个游戏对象
 */
var GAME = {
  /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts 
   * @return {[type]}      [description]
   */
  tatolLevel: 7,
  init: function(opts) {
    this.status = 'start';
    this.bindEvent();
    this.keyBoard = new KeyBoard();
    // 创建分数对象
    this.score = new Score();
    this.current_level = 1;
  },
  bindEvent: function() {
    var self = this;
    var playBtn = document.querySelector('.js-play');
    // 开始游戏按钮绑定
    playBtn.onclick = function() {
      self.play();
    };
    // 重新玩按钮绑定
    var replayBtns = document.querySelectorAll('.js-replay');
    replayBtns.forEach(function (item, index) {
      item.onclick = function () {
        self.play();
      }
    });
    // 继续游戏按钮绑定
    var playNextBtn = document.querySelector('.js-next');
    playNextBtn.onclick = function() {
      self.play();
    };
  },
  /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * all-success 游戏通过
   * stop 游戏暂停（可选）
   */
  setStatus: function(status) {
    this.status = status;
    // 更改界面的<section>
    container.setAttribute("data-status", status);
  },
  play: function() {
    this.setStatus('playing');

    // 绘制canvas
    // 初始化飞机
    this.plane = new Plane(320, 470, 60, 100);
    this.plane.draw();

    // 初始化怪兽数组,绘制怪兽数组
    this.monsters = [];
    var monster_y = 30;
    for (var j=0; j<this.current_level; j++) {
      var monster_x = 30;     
      for (var i=0; i<7; i++) {
        var monster = new Monster(monster_x, monster_y, 50, 50);
        monster.draw();
        this.monsters.push(monster);
        //monsters 数组是一个一维的数组哦，不是直观上认为的是一个二维数组呢
        monster_x += 60;
      }
      monster_y += 50;
    }

    // 绘制分数
    this.score.draw();

    // 更新画面
    this.refresh();
  },

  // 更新怪兽数据  
  updateMonstersData: function() {

    var monsters = this.monsters;
    // 一开始没有把死去的怪兽从怪兽数组中清除，写死了minX和maxX，导致出现了之后会出现数据越界的情况
    // var minX = monsters[0].x;
    // var maxX = monsters[6].x;
    var minX = getMinXAndMaxX(monsters).minX;
    var maxX = getMinXAndMaxX(monsters).maxX;
    var plane = this.plane;
    var score = this.score;
    
    // 死亡状态dead --> none
    for(var i=0; i<monsters.length; i++) {   
      if(monsters[i].status == 'dead') {
        monsters[i].none();
        monsters.splice(i,1);
      }
    }

    // 被击中与否
    for(var i=0; i<monsters.length; i++){
      if(monsters[i].status === 'live') {
        if(plane.hasHit(monsters[i])){
          monsters[i].dead();
          score.score += 1;         
        }
      }     
    } 

    // 抵达了左右边界
    if (minX < 30 || maxX > 620) {
      for(var i=0; i<monsters.length; i++) {       
        monsters[i].direction = monsters[i].direction === 'right' ? 'left' : 'right';
        monsters[i].down();
      }
    }

    // 正常移动
    for(var i=0; i<monsters.length; i++){
      monsters[i].move(monsters[i].direction);      
    } 

    // 注意顺序，首先是是否死亡，死亡的话将由dead转为none
    // 非死亡的飞机，是够被击中
    // 非死亡且未被击中，才有机会进行正常的数据更新
  },

  // 更新飞机数据
  updatePlaneData: function() {
    var keyBoard = this.keyBoard;
    if(keyBoard.left_arrow){
      //为了用户体验好吧
      //keyBoard.left_arrow = false;
      this.plane.move('left');
    }else if (keyBoard.right_arrow){
      //keyBoard.right_arrow = false;
      this.plane.move('right');
    }else if(keyBoard.spacebar) {
      keyBoard.spacebar = false;
      this.plane.shoot();
    }
  },

  // 根据对象数据，更新画面
  refresh: function () {

    //为了在内部函数能使用外部函数的this对象，要给它赋值了一个名叫self的变量
    var self = this;
    var plane = self.plane;
    var monsters = self.monsters;
    var score = self.score;

    // 更新怪兽数据
    self.updateMonstersData();
    // 更新飞机数据
    self.updatePlaneData();

    // 判断数据是否在可继续更新的范围
    // 怪兽都抵达了下边界，失败啦你
    if (monsters[monsters.length-1].y > 470) {
      self.current_level = 1;
      score_display.innerHTML = score.score;
      self.score = new Score();
      self.end('failed');
      return;
    }

    //统计活着的怪兽的数量，如果怪兽都死了,就不需要更新
    var live = 0;
    for (var i=0; i<monsters.length; i++) {
      if(monsters[i].status === 'live'){
        live ++;
      }
    }
    if(live == 0) {
      if(self.current_level == self.tatolLevel) {
        self.current_level = 1;
        self.score = new Score();
        self.end('all-success');
      } else {
        self.current_level += 1;
        game_next_level.innerHTML = '下一Level: ' + self.current_level;
        self.end('success');
      }      
      return;
    }

    // 清除画布
    context.clearRect(0,0,canvas.width,canvas.height);
    // 绘制飞机和子弹
    plane.draw();
    plane.drawBullets();
    // 绘制怪兽
    for(var i=0; i<monsters.length; i++){
      monsters[i].draw();
    }
    // 绘制分数
    score.draw();

    // 调用requestAnimFrame函数重复动画，更新数据，判断是否游戏结束，绘制画面
    requestAnimFrame(function () {
      self.refresh()
    })
  },

  // 游戏结果，代码复用
  end: function(result) {
    context.clearRect(0,0,canvas.width,canvas.height);
    this.setStatus(result);
  }
};

// 初始化
GAME.init();
