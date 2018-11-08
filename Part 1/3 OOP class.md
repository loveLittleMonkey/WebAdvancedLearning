# 经典的面向对象

这里所说的“经典的面向对象”，是有“类”这个概念的面向对象，比如 Java ，它就有“类”的概念。

面向对象这个概念，实在是太像我们的世界。

说道“人”，Person ，大家肯定是想到一个鼻子，两个眼睛，是一个宽泛的概念，可以让你想到任何人。

所以“人”，是一个抽象，它描述一个特定类别的东西，一类动物。

“动物”也是一类抽象，从字面意思理解，“动物”是能动的生物，和“植物”区分开来。

人是动物，你我是人，也是动物。

但是，“你我”又有区别，虽然都是人，但我叫 jero ，你叫刘德华，我很帅，你却更帅。在“人”这个大的类别下，你我是两个不同的实体，两个不同的对象，你我都是具象化的人，是一个具体的概念。

看到了吗，**类**这个字眼都加粗了，因为这是面向对象的一个重要概念。

```
class Animal {
    constructor(legs) {
        this.legs = 2;
    }
}

console.log(new Animal(2)); // { legs: 2 }
```
上面就是 Animal class 了，非常的简单，也很抽象，但是，我们 new 了一下之后，就具体化了，我们 new 了一个两条腿的动物。


```
class Person {
    constructor(name) {
        this.legs = 2;
       this.name = name;
    }
}
console.log(new Person('刘德华')); // { legs: 2 }
```

上面就是 Person class 咯，Person 只是抽象，对吧，但是我们给他一个名字“刘德华”，他就是活生生的人咯，这就是实例化。

“类”是抽象，其实这个“类”就是分门别“类”里的“类”。“对象”和“实例”，现在如果你们区分不了，可以混用，就是“类”实例化的产物。

好咯，再看代码：
```
function Person(name) { // 这个 Person 就是类
    this.name = name;
    this.legs = 2;
}
console.log(new Person('刘德华')); // 活生生的人，就是实例
```

虽然 JS 里面没有类的概念，但我们还是习惯叫“类”，而且不同的“类”有时候是有关系的，比如“人”是“动物”，这个时候，“人”就是子类，“动物”就是父类，也挺容易理解。

最后说一句，上面的 class Person 代码，也是 JS 代码，ES6 新增了类的语法，创建对象更容易了，大家可以看看。

[类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

[Class的基本语法](http://es6.ruanyifeng.com/#docs/class)