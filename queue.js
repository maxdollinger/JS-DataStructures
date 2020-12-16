class Queue {
    #front = null;
    #rear = null;
    #length = 0;

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
            value,
            next: null
        }
    }

    #startQueue = ( newNode ) => {
        this.#front = newNode;
        this.#rear = newNode;
    }

    #enqueue = ( newNode ) => {
        this.#rear.next = newNode;
        this.#rear = newNode;
    }

    push( value ) {
        const newNode = this.#node( value );

        if( this.#length === 0 ) {
            this.#startQueue( newNode );
        } else {
            this.#enqueue( newNode );
        }

        this.#length++;
        return this;
    }

    #endQueue = () => {
        const node = this.#front;

        this.#front = null;
        this.#rear = null;

        return node;
    }

    #dequeue = () => {
        const node = this.#front;

        this.#front = node.next;

        return node;
    }

    shift() {
        if( this.#length === 0 ) return null;

        let node;

        if( this.#length === 1 ) {
            node = this.#endQueue();
        } else {
            node = this.#dequeue();
        }

        this.#length--;
        node.next = null;
        return node.value;
    }

    peek() {
        return this.#front ? this.#front.value : null;
    }

    toString() {
        let str = '';
        let node = this.#front;

        for(let i = 0; i < this.#length; i++) {
            if( node !== this.#front ) str = str + ` | `;
            str = str + node.value;

            node = node.next;
        }

        return str;
    }
}

module.exports = Queue;