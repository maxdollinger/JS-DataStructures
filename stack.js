class Stack {
    #head = null;
    #tail = null;
    #length = 0;
    #pointer = null;

    constructor( value ) {
        if( value instanceof Array ) {
            value.forEach( el => this.push( el ) );
        } else if( value instanceof Object ) {
            Object.values( value ).forEach( el => this.push( el ) )
        } else {
            this.push( value );
        }
    }

    #node = ( value ) => {
        return {
            prev: null,
            value,
            next: null
        }
    }

    #startList = ( newNode ) => {
        this.#head = newNode;
        this.#tail = newNode;
        this.#pointer = this.#head;
    }

    #insertHead = ( newNode ) => {
        newNode.next = this.#head;
        this.#head.prev = newNode;
        if( this.#pointer === this.#head ) this.#pointer = newNode;
        this.#head = newNode;
    }

    push( value ) {
        const newNode = this.#node( value );

        if( this.#length === 0 ) {
            this.#startList( newNode );
        } else {
            this.#insertHead( newNode );
        }

        this.#length++;
        return this;
    }

    #endList = () => {
        const node = this.#head;

        this.#head = null;
        this.#tail = null;
        this.#pointer = null;

        return node;
    }

    #removeHead = () => {
        const node = this.#head;

        if( this.#pointer === this.#head ) this.#pointer = node.next;
        this.#head = node.next;
        this.#head.prev = null;

        return node;
    }

    pop() {
        if( this.#length === 0 ) return null;

        let node;

        if( this.#length === 1 ) {
            node = this.#endList();
        } else {
            node = this.#removeHead();
        }

        this.#length--;
        node.prev = node.next = null;
        return node.value;
    }

    get() {
        return this.#pointer.value;
    }

    back() {
        this.#pointer.next ? this.#pointer = this.#pointer.next : null;
        return this;
    }

    forth() {
        this.#pointer.prev ? this.#pointer = this.#pointer.prev : null;
        return this;
    }

    size() {
        return this.#length;
    }

    toString() {
        let str = '';
        let node = this.#head;

        for(let i = 0; i < this.#length; i++) {
            if( node !== this.#head ) str = str + ` <- `;
            if( node === this.#pointer ) {
                str = str + `( ${node.value} )`;
            } else {
                str = str + `${node.value}`;
            }
            node = node.next;
        }

        return str;
    }
}

module.exports = Stack;