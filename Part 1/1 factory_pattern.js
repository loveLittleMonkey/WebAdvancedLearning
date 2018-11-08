function createBottle(name, price, isKeepWarm) {
    return {
        name: name,
        price: price,
        isKeepWarm: isKeepWarm
    }
}

var bottle = createBottle('太空杯', 49, false)

// 怎么证明 bottle 是一个 bottle ?
// 工程模式很难证明