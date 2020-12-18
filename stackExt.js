class Stack {
    #top = null;
    #bottom = null;
    #size = 0;
    #pointer = null;

    constructor( value ) {
        if( value instanceof Array ) {
            value.forEach( el => this.push( el ) );
        } else if( value instanceof Object ) {
            Object.values( value ).forEach( el => this.push( el ) )
        } else if( value ) {
            this.push( value );
        }

        Object.defineProperty(this, 'size', {
            get: () => {
                return this.#size;
            }
        });
    }

    #node = ( value ) => {
        return {
            prev: null,
            value,
            next: null
        }
    }

    #startStack = ( newNode ) => {
        this.#top = newNode;
        this.#bottom = newNode;
        this.#pointer = this.#top;
    }

    #onTop = ( newNode ) => {
        newNode.next = this.#top;
        this.#top.prev = newNode;
        if( this.#pointer === this.#top ) this.#pointer = newNode;
        this.#top = newNode;
    }

    push( value ) {
        const newNode = this.#node( value );

        if( this.#size === 0 ) {
            this.#startStack( newNode );
        } else {
            this.#onTop( newNode );
        }

        this.#size++;
        return this;
    }

    #endStack = () => {
        const node = this.#top;

        this.#top = null;
        this.#bottom = null;
        this.#pointer = null;

        return node;
    }

    #removeTop = () => {
        const node = this.#top;

        if( this.#pointer === this.#top ) this.#pointer = node.next;
        this.#top = node.next;
        this.#top.prev = null;

        return node;
    }

    pop() {
        if( this.#size === 0 ) return null;

        let node;

        if( this.#size === 1 ) {
            node = this.#endStack();
        } else {
            node = this.#removeTop();
        }

        this.#size--;
        node.prev = node.next = null;
        return node.value;
    }

    #movePointer = ( direct ) => {
        if(this.#pointer && this.#pointer[direct] ) {
            this.#pointer = this.#pointer[direct];
            return { value: this.#pointer.value, done: false };
        }

        return { value: undefined, done: true };
    }

    up() {
        return this.#movePointer( 'prev' );
    }

    down() {
        return this.#movePointer( 'next' );
    }

    get() {
        return this.#pointer.value;
    }

    toString() {
        let str = '';
        let node = this.#top;

        for(let i = 0; i < this.#size; i++) {
            if( node !== this.#top ) str = str + ` <- `;
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