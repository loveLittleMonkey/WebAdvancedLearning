```
function Airliner(color) {
    this.color = color;
    this.passengers = [];
}
Airliner.prototype.fly = function() {
    console.log('flying');
}

function Fighter(color) {
    this.color = color;
    this.bullets = [];
}
Fighter.prototype.fly = function() {
    console.log('flying');
}
Fighter.prototype.shoot = function() {
    console.log('biu biu biu')
}
```
浪费内存，代码冗余 --> 继承(使子类具有夫类的属性和方法，而不需要重复编写相同的代码)

### 实现继承的方式 -- 原型

```
// 父类的构造函数
function Plane(color) {
    this.color = color;
}
Plane.prototype.fly = function() {
    console.log('flying');
}

// Fighter 的构造函数
function Fighter() {
    this.bullets = [];
}
Fighter.prototype = new Plane('blue')
// 特有方法(需要写在原型链继承父类之后)
Fighter.prototype.shoot = function() {
    console.log('biu biu biu')
}

var fighter1 = new Fighter();
console.log(fighter1.color);
```

原型连继承的不足：
* constructor 指向问题
* 属性共享问题(非基本数据类型的内存指向问题)
* 参数 

```
// 解决constructor的问题
Fighter.prototype = new Plane();
Fighter.prototype.constructor = Fighter;
```

### 借用构造函数继承
```
function Plane(color) {
    this.color = color;
    this.function = function() {
        console.log('func')
    }
}
Plane.prototype.func = function() {
    // 构造函数继承不能继承到原型链上的方法和属性
}
Plane.prototype.name = 'test'
function Fighter(color) {
    // 可以传递参数
    Plane.call(this, color);
    this.bullets = [];
}
var fighter = new Fighter()
```

```
// 一个好用的函数
console.time('timer')
// do somethings
console.timeEnd('timer')
```

### 组合继承
* 属性和方法都是从父类继承的(代码复用)
* 继承的属性都是私有的(互不影响)
* 继承的方法都在原型链里(函数复用)

+ 缺陷：重复调用父函数(2次)  属性冗余(原型链继承过来的属性在构造函数里其实已经使用了，比如color)
```
function Plane(color) {
    this.color = color;
}
Plane.prototype.fly = function() {
    console.log('flying');
}

function Fighter(color) {
    Plane.call(this, color);
    this.bullets = [];
}
Fighter.prototype = new Plane();
Fighter.prototype.construtor = Fighter;
Fighter.prototype.shoot = function() {
    console.log('biu biu biu')
}
```


### 最佳实践

```
Fighter.prototype = new Plane();
```
上述代码是为了继承父类的原型链上的函数，可以使用下面的函数来实现
```
inheritPrototype(Fighter, Plane);
function inheritPrototype(subType, superType) {
    var protoType = Object.create(superType.prototype); // 复制父类的原型
    prototype.constructor = subType; // 重置constructor
    subType.prototype = protoType;  // 修改子类原型
}
```
```
inheritPrototype(child, parent) {
    var Temp = function() {}; 
    Temp.prototype = parent.prototype;
    child.prototype = new Temp();
    child.prototype.constructor = child;
}

```
```
function Plane(color) {
    this.color = color;
}
Plane.prototype.fly = function() {
    console.log('flying')
}

function Fighter(color) {
    Plane.call(this, color);
    this.bullets = [];
}
inheritPrototype(Fighter, Plane);
Fighter.prototype.shoot = function() {
    console.log('biu biu biu')
}

function inheritPrototype(subType, superType) {
    var protoType = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = protoType;
}
```