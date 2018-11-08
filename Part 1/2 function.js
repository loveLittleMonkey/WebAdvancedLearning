function createBottle() {}

// 函数内部有arguments，this
// 属性：name，length，prototype
// 方法：bind() call() apply()


// 1.arguments: 
/**
 * 对象，类数组，有length属性
 * 不要滥用，影响代码的可读性
 * 非常适合动态参数的场景 
 */ 
function createBottle(name, price, isKeepWarm) {
    return {
        name: name,
        price: price,
        isKeepWarm: isKeepWarm
    }
}
function createBottle() {
    console.info(arguments)
    return {
        name: arguments[0],
        price:  arguments[1],
        isKeepWarm:  arguments[2]
    }
}
var bottle = createBottle('太空杯', 49, false)

// 动态参数场景：
function superAdd() {
    var len = arguments.length;
    var result;
    if(len) {
        // 初始化值，undefined + 1 为 NaN
        result = 0;
        for(var i=0;i<len;i++) {
            result = result + arguments[i];
        }
    }
    return result;
}

// 2. this
/** 
 * 执行环境
 * 全局作用域 --> window
 * 对象的方法 --> 对象
 */
window.name = 'jero';
var o = {
    name: 'henry'
};
function sayName() {
    console.log(this.name);
}
sayName(); // 'jero'
o.sayName = sayName;
o.sayName(); // 'henry'

// 3.bind,call,apply 改变this指向
o.sayName = sayName.bind(window);
o.sayName() // 'jero'

// 让函数在某个指定的对象下执行，调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。
// bind() 方法会返回执行上下文被改变的函数而不会立即执行
sayName.bind(o)() // 'henry'
sayName.call(o) // 'henry'
sayName.apply(o) // 'henry'

// call 和 apply的区别，传参不一样，call可以一个参数一个参数罗列输入，apply需要传一个参数数组
sayName.call(o,1,2)
sayName.apply(o,1,2) // 报错
sayName.apply(o,[1,2])

// 4.name,length(arguments.length区别：形参和实参的数量),prototype

// 5.function is first class   函数是第一公民
/**
 *  first class 可以作为函数的参数和返回值，也可以赋给变量
 *  second class 可以作为函数的参数，但不能从函数返回，也不能赋给变量
 *  third class 不能作为函数的参数
 */

var add = function(a,b) {
    return a+b;
}
var add = new Function('a','b','return a + b;')


// 不可修改的变量,私有变量
// 闭包：有权访问另一个函数作用域中的变量的函数
function createScope(member) {
    return function() {
        return member;
    }
}
var getHenry = createScope('henry');
getHenry();

/**
 * 如果我们需要隐藏一些不应该被直接修改的数据，我们需要使用到私有变量和特权方法。
 * 对于私有变量，我们需要理解下面的两句话：
 * 1.任何在函数中定义的变量，都可以认为是私有变量。因为不能在函数外部访问这些变量。
 * 2.私有变量包括函数参数，局部变量以及在函数内部定义的其他函数。
 * 
 * 如下面的代码,在这个函数内部，有三个私有变量 param、privateVariable、 privateFunction。在函数内部可以访问到这几个变量，但在函数外部则不能访问他们。
 *  function MyObject(param) {
        var privateVariable = 20;
        function privateFunction(){
            return true;
        }
    }
 * 如果需要访问私有变量时，可以怎么做? 
 * 可以在函数的内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量。而利用这一点，就可以创建用于访问私有变量的公有方法。
 * 把有权访问私有变量和私有函数的公有方法称为特权方法。
 * 如下面的代码，publicMethod 就是特权方法。在创建 MyObject 的实例后，除了使用特权方法 publicMethod 这一途径外，没有其他的办法可以直接访问来访问私有变量 privateVariable 以及私有函数 privateFunction。
 * 
 *  function MyObject(param) {
        var privateVariable = 20;
        function privateFunction(){
            return 10;
        }
        // 特权方法
        this.publicMethod = function(){
            privateVariable ++;
            return privateFunction();
        }
    }
 */

 /*
* 题目:
* 完善工厂函数 createPerson，需要完成以下要求：
* 1.保存传入参数 name 到一个私有变量中
* 2.函数返回一个对象，且对象带有一个方法 getName，用于返回对象的私有变量 name 的值
*/

function createPerson(name) {
    // 保存参数name
    var privateName = name;
    return{
        // 创建一个 getter 方法来获取私有变量 name 的值
        getName: function() {
            return privateName;
        }
    }
}
var person = createPerson('Jero');
console.log(person.name);  // undefined
console.log(person.getName()); // Jero


// 构造函数，怎么证明 bottle 是 bottle ？
// instanceof 实例
// 构造函数约定俗称首字母大写
function Bottle(name, price, isKeepWarm) {
    this.name = name;
    this.price = price;
    this.isKeepWarm = isKeepWarm;

    this.common = function() {
        console.log('func')
    }
}
var bottle = new Bottle('杯子', 59, true);
console.info(bottle instanceof Bottle)

// 没有显示创建的对象
// 将属性和方法赋值给this
// 没有return 语句
// 通过new 新建实例 
// 不足：功能相同的函数，重复声明消耗空间

// 原型：是函数的一个属性，是一个对象
// constructor
// 读写： 
function Bottle() {
    this.sayName = function() {}
}
Bottle.prototype.name = '瓶子'
Bottle.prototype.sayHello = function () {
    console.log('hello');
}
var bottle = new Bottle();
console.log(bottle.name);
bottle.sayHello();
var bottle2 = new Bottle();
console.log(bottle.sayHello === bottle2.sayHello)
console.log(bottle.sayName === bottle2.sayName)

// isPrototypeof

/*
* 题目:
* 使用 Prototype 来创建一个 Person 类， 需要完成以下要求：
* 1、在构造函数 Person 的 prototype(原型) 上增加下面的共享属性：
*   1.1、在原型上增加属性 `name` 值为 'Jonny'
*   1.2、在原型上增加属性 `friends` 值为 ['Cover', 'Kevin']
* 2、在构造函数 Person 的原型上增加共享方法 sayHello
*/

function Person(name){
}
// 设置原型
Person.prototype = {
    constructor: Person,
    name: 'Jonny',
    friends: ['Cover', 'Kevin'],
    sayHello: function() {
        //...
    }
};
// 需注意的是在上面的代码中，我们将 Person.prototype 设置为一个新创建的对象。会导致 Person.prototype 对象原来的 constructor 属性不再指向 Person, 这里可以像上面那样，特意的把 constructor 设置为 Person 。

function Person() {}
Person.prototype.name = 'Jonny';
Person.prototype.friends = ['Cover','Kevin'];
Person.prototype.sayHello = function() {}

// 原型链的缺陷，共享存在污染数据的问题
function Bottle() {}
Bottle.prototype.color = ['红','蓝']
var bottle1 = new Bottle();
var bottle2 = new Bottle();
bottle.color.push('白')
console.log('b1',bottle1.color)
console.log('b2',bottle2.color)


// 构造函数独享属性  原型共享方法
function Bottle(name, price) {
    this.name = name;
    this.price = price;
}
// 实例上的属性会覆盖原型链上的属性
Bottle.prototype.name = 'default'
Bottle.prototype.sayName = function() {
    console.log(this.name)
}
var bottle1 = new Bottle('保温瓶', 49)
bottle1.sayName()
// 属性的判断
console.log('name' in bottle1)
// 判断在实例上还是原型上
console.log(bottle1.hasOwnProperty('name'))
