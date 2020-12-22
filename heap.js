class Heap {
    #arr = [];
    #pointer = 0
    #comp = (a, b) => a - b;

    constructor(comp) {
        Object.defineProperty(this, 'size', {
            get: () => this.#arr.length,
        });

        if (comp instanceof Function) this.#comp = comp;
    }

    #node = (priority, value) => ({priority, value});

    #prio = (idx) => this.#arr[idx].priority;

    #value = (node) => node ? node.value : undefined;

    #swap = (i, j) => [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];

    #bubbleUp = (idx) => {
        let parentIdx;

        while ((parentIdx = (idx - 1) >> 1) >= 0) {
            if (this.#comp(this.#prio(idx), this.#prio(parentIdx)) < 0) {
                this.#swap(idx, parentIdx);
                idx = parentIdx;
                continue;
            }

            break;
        }
    }

    #insert = (priority, value) => {
        const node = this.#node(priority, value);
        this.#arr.push(node);
        this.#bubbleUp(this.size - 1);
        return this;
    }

    #sinkDown = (idx) => {
        let leftChild = 2 * idx + 1;
        let idxToSwap, rightChild;

        while (leftChild < this.size) {
            if (this.#comp(this.#prio(leftChild), this.#prio(idx)) < 0) {
                idxToSwap = leftChild;
                rightChild = leftChild + 1;

                if (rightChild < this.size &&
                    this.#comp(this.#prio(rightChild), this.#prio(leftChild)) < 0) {
                    idxToSwap = rightChild;
                }

                this.#swap(idx, idxToSwap);
                idx = idxToSwap;
                leftChild = 2 * idx + 1;

                continue;
            }

            break;
        }
    }

    #remove = () => {
        this.#swap(0, this.size - 1);

        const rmNode = this.#arr.pop();
        this.#sinkDown(0);

        return this.#value(rmNode);
    }

    add(priority, value) {
        return this.#insert(priority, value);
    }

    pop() {
        return this.#remove();
    }

    peek() {
        return this.#value(this.#arr[0]);
    }

    next() {
        this.#pointer <= this.size && this.#pointer++;
        return this.#value(this.#arr[this.#pointer]);
    }

    prev() {
        this.#pointer >= -1 && this.#pointer--;
        return this.#value(this.#arr[this.#pointer]);
    }

    get(idx) {
        return this.#value(this.#arr[idx]);
    }

    from(obj) {
        if (obj instanceof Array || obj instanceof Function) {
            console.log("only objects with structure { value : priority } allowed")
        } else if (obj instanceof Object) {
            Object.keys(obj).forEach(el => this.add(obj[el], el ))
        }

        return this;
    }

    toString() {
        let str = '';

        this.#arr.forEach(el => {
            str += el.priority + ':' + el.value + ' | ';
        })
        return str;
    }

}

module.exports = Heap;