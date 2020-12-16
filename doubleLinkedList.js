class DoubleLinkedList {
    #head = null;
    #tail = null;
    #length = 0;
    #type;

    constructor( type ) {
        this.#type = type;
    }

    from( values ) {
        if( values instanceof Array ) {
            values.forEach( el => this.insert( el ) );
        } else if( values instanceof Object ) {
            Object.values( values ).forEach( el => this.insert( el ) )
        } else {
            this.insert( values )
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
        return (typeof index === 'number' &&
            index >= 0 &&
            index < this.#length);
    }

    #validValue = ( value ) => {
        if(this.#type === undefined) return true;
        if(this.#type instanceof Object) {
            return value instanceof this.#type;
        } else {
            return typeof value === this.#type;
        }
    }

    #getNode = ( index ) => {
        let item;

        if( index < this.#length/2 ) {
            item = this.#head;
            for( let i = 0; i < index; i++ ) {
                item = item.next;
            }
        } else {
            item = this.#tail;
            for( let i = this.#length-1; i > index; i-- ) {
                item = item.prev;
            }
        }

        return item;
    }

    #startList = ( newNode ) => {
        this.#head = newNode;
        this.#tail = newNode;
    }

    #insertHead = ( newNode ) => {
        newNode.next = this.#head;
        this.#head.prev = newNode;
        this.#head = newNode;
    }

    #insertTail = ( newNode ) => {
        this.#tail.next = newNode;
        newNode.prev = this.#tail;
        this.#tail = newNode;
    }

    #insertNode = ( newNode, index ) => {
        const currentNode = this.#getNode( index );

        newNode.prev = currentNode.prev;
        newNode.next = currentNode;
        currentNode.prev.next = newNode;
        currentNode.prev = newNode;
    }

    insert( value, index ) {
        if( !this.#validValue( value )) return this;
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
        this.#head.prev = null;

        return node;
    }

    #removeTail = () => {
        const node = this.#tail;

        this.#tail = node.prev;
        this.#tail.next = null;

        return node;
    }

    #removeNode = ( index ) => {
        const node = this.#getNode( index );

        node.next.prev = node.prev;
        node.prev.next = node.next;

        return node;
    }

    remove( index ) {
        if( !this.#validIndex( index ) )  index = this.#length-1;

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
        node.prev = node.next = null;
        return node.value;
    }

    get( index ) {
        if( !this.#validIndex( index ) ) return null;

        return this.#getNode( index ).value;
    }

    set( index, value ) {
        if( !this.#validValue( value )) return false;
        if( !this.#validIndex( index ) ) return false;

        this.#getNode( index ).value = value;
        return true
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
        return this.remove( 0 );
    }

    size() {
        return this.#length;
    }

    forEach( callback, order ) {
        let node, index;

        if( order === -1 ) {
            node = this.#tail;
            index = this.#length-1;
        } else {
            node = this.#head;
            index = 0;
        }

        while( node ) {
            let result = callback( node.value, index );
            if( !this.#validValue( result )) result = undefined;
            if( result !== undefined ) node.value = result;

            if( order === -1 ) {
                node = node.prev;
                index--;
            } else {
                node = node.next;
                index++;
            }
        }
    }

    toString() {
        let str = '';
        let node = this.#head;

        for(let i = 0; i < this.#length; i++) {
            if( node !== this.#head ) str = str + ` <-> `;
            str = str + node.value;

            node = node.next;
        }

        return str;
    }
}

module.exports = DoubleLinkedList;