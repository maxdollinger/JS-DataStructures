class LinkedList {
    #head = null;
    #tail = null;
    #length = 0;

    constructor( value ) {
        if( value instanceof Array ) {
            value.forEach( el => this.insert( el ) );
        } else if( value instanceof Object ) {
            Object.values( value ).forEach( el => this.insert( el ) )
        } else {
            this.insert( value );
        }

        return this;
    }

    #node = ( value ) => {
        return {
            prev: null,
            value,
            next: null
        }
    }

    #validIndex = ( index ) => {
        return !(typeof index !== 'number' ||
            index < 0 ||
            index >= this.#length);
    }

    #getNode = ( index ) => {
        let item = this.#head;

        for( let i = 0; i < index; i++ ) {
            item = item.next;
        }

        return item;
    }

    #startList = ( newNode ) => {
        this.#head = newNode;
        this.#tail = newNode;
    }

    #insertHead = ( newNode ) => {
        newNode.next = this.#head;
        this.#head = newNode;
    }

    #insertTail = ( newNode ) => {
        this.#tail.next = newNode;
        this.#tail = newNode;
    }

    #insertNode = ( newNode, index ) => {
        const currentNode = this.#getNode( index );
        const prevNode = this.#getNode( index-1 );

        newNode.next = currentNode;
        prevNode.next = newNode;
    }

    insert( value, index ) {
        if( !this.#validIndex( index ) )  index = this.#length;
        const newNode = this.#node( value );

        if( this.#length === 0 ) {
            this.#startList( newNode );
        } else if( index === 0 ) {
            this.#insertHead( newNode );
        } else if( index === this.#length ) {
            this.#insertTail( newNode );
        } else {
            this.#insertNode( newNode, index );
        }

        this.#length++;
        return this;
    }

    #endList = () => {
        const node = this.#head;

        this.#head = null;
        this.#tail = null;

        return node;
    }

    #removeHead = () => {
        const node = this.#head;

        this.#head = node.next;

        return node;
    }

    #removeTail = () => {
        const node = this.#tail;

        this.#tail = this.#getNode(this.#length - 2);
        this.#tail.next = null;

        return node;
    }

    #removeNode = ( index ) => {
        const node = this.#getNode( index );
        const prevNode = this.#getNode( index-1 );


        prevNode.next = node.next;

        return node;
    }

    remove( index ) {
        if( !this.#validIndex( index ) ) index = this.#length - 1;
        if( this.#length === 0 ) return null;

        let node;

        if( this.#length === 1 ) {
            node = this.#endList();
        } else if( index === 0 ) {
            node = this.#removeHead();
        } else if( index === this.#length-1 ) {
            node = this.#removeTail();
        } else {
            node = this.#removeNode( index );
        }

        this.#length--;
        node.next = null;
        return node.value;
    }

    get( index ) {
        if( !this.#validIndex( index ) ) return null;

        return this.#getNode( index ).value;
    }

    set( index, value ) {
        if( !this.#validIndex( index ) ) return false;

        this.#getNode( index ).value = value;

        return this;
    }

    push( value ) {
        return this.insert( value );
    }

    pop() {
        return this.remove();
    }

    unshift( value ) {
        return this.insert( value, 0 );
    }

    shift() {
        return this.remove(0);
    }

    size() {
        return this.#length;
    }

    from( value ) {

        return this;
    }

    forEach( callback ) {
        let node = this.#head;
        let index = 0;

        while( node ) {
            let result = callback( node.value, index );
            if( result !== undefined ) node.value = result;

            node = node.next;
            index++;
        }
    }

    toString() {
        let str = '';
        let node = this.#head;

        for(let i = 0; i < this.#length; i++) {
            if( node !== this.#head ) str = str + ` -> `;
            str = str + node.value;

            node = node.next;
        }

        return str;
    }
}

module.exports = LinkedList;