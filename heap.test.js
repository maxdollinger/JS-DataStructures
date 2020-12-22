const Heap = require('./heap');

function randomArr(length = 50) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        let rndNumber = Math.floor(Math.random() * (2*length+1)) * (Math.random() < 0.5 ? -1 : 1);
        arr.push(rndNumber);
    }

    return arr;
}

test('every returned element should be greater or equal then the last one', () => {
    const arr = randomArr();
    const heap = new Heap();

    for (let el of arr) {
        heap.add(el, el);
    }

    let prev = heap.pop(), current;
    while((current = heap.pop()) !== undefined) {
        if(prev <= current) {
            prev = current;
            continue;
        }

        throw 'Not smaller or equal';
    }
})