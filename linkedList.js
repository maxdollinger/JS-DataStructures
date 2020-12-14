/* A linked List implementation:
Example:
const LinkedList = require('LinkedList');
let list = new LinkedList();
list.add('fooBar');

built-in-Methods:

.from(values)
    -> adds the values of an arr or object to the list and returns the list-object;
.push(val)
    -> adds a value to the end of the list
.pop()
    -> removes the last element and returns it's value
.unshift(val)
    -> adds a value to the beginning of the list
.shift()
    -> removes the first element and returns it's value
.insert(val, index)
    -> inserts the value on the given index. If the index is smaller or equals 0 same as unshift.
    If the index is equal or greater then the number of elements same as push()
.remove(index)
    -> removes the element with the passed index. If index is smaller or equals zero same as shift().
    If index is greater or equals the max number of elements same as pop().
.get(index)
    -> returns the value of the element with the passed index
.set(val, index)
    -> sets the val of the listitem on index
.forEach(callBack)
    -> performs the callback function on each element if the callback has an return value alters the listitem value.
.toString()
    -> returns the whole list as a string

*/
class LinkedList {
    #head = null;
    #tail = null;
    length = 0;

    from(val) {
        if(val instanceof Array) {
            val.forEach(el => this.insert(el));
        } else if(val instanceof Object) {
            Object.values(val).forEach(el => this.insert(el))
        }
        return this;
    }

    #node = (val) => {
        return {
            val,
            next: null
        }
    }

    push(val) {
        return this.insert(val)
    }

    pop() {
        return this.remove(this.length);
    }

    unshift(val) {
        return this.insert(val, 0);
    }

    shift() {
        return this.remove();
    }

    get(index) {
        return this.getNode(index).val;
    }

    set(val, index) {
        if(!index) return false;
        let node = this.getNode(index);
        if(node) {
            node.val = val;
            return true;
        } else {
            return false;
        }
    }

    getNode(index) {
        if(index < 0 || index >= this.length) return null;
        let item = this.#head;
        for(let i = 0; i < index; i++) {
            item = item.next;
        }
        return item;
    }

    insert(val, index = this.length) {
        const newNode = this.#node(val);

        if(this.length === 0) {
            this.#head = newNode;
            this.#tail = this.#head;
        } else if(index >= this.length) {
            this.#tail.next = newNode;
            this.#tail = newNode;
        } else if(index <= 0) {
            newNode.next = this.#head;
            this.#head = newNode;
        } else {
            const prevNode = this.getNode(index-1);
            newNode.next = prevNode.next;
            prevNode.next = newNode;
        }

        this.length++;
        return newNode.val;
    }

    remove(index = 0) {
        let val;
        if(index < 0) index = 0;
        if(index >= this.length) index = this.length-1;

        if(this.length === 0) return null;

        if(this.length === 1) {
            val = this.#head.val;
            this.#head = null;
            this.#tail = null;
        } else if(index === 0) {
            val = this.#head.val;
            this.#head = this.#head.next;
        } else {
            const node = index === this.length-1 ? this.#tail : this.getNode(index);
            const prevNode = this.getNode(index-1);

            prevNode.next = node.next;
            val = node.val;
        }

        this.length--;
        return val;
    }

    reversList() {
        let prev = null;
        let current = this.#head;
        let next;

        this.#head = this.#tail;
        this.#tail = current;

        while(current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
    }

    forEach(callback) {
        let node = this.#head;

        while (node) {
            let result = callback(node.val);
            if(result !== undefined) node.val = result;
            node = node.next;
        }
    }

    toString() {
        if(this.length === 0) return '';

        let str = `${this.#head.val}`;
        let node = this.#head.next;
        while(node) {
            str = str + ' | ' + node.val;
            node = node.next;
        }

        return str;
    }
}

module.exports = LinkedList;
