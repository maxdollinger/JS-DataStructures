class LinkedList {
    #head = null;
    #tail = null;
    #length = 0;

    #node = ( val ) => {
        return {
            prev: null,
            val,
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

    insert( val, index ) {
        if( !this.#validIndex( index ) )  index = this.#length;
        const newNode = this.#node( val );

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
        return newNode.val;
    }

    #endList = () => {
        this.#head = null;
        this.#tail = null;

        return null;
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
        return node.val;
    }

    get( index ) {
        if( !this.#validIndex( index ) ) return null;

        return this.#getNode( index ).val;
    }

    set( index, val ) {
        if( !this.#validIndex( index ) ) return false;

        this.#getNode( index ).val = val;

        return true;
    }

    push( val ) {
        return this.insert( val );
    }

    pop() {
        return this.remove();
    }

    unshift( val ) {
        return this.insert( val, 0 );
    }

    shift() {
        return this.remove(0);
    }

    size() {
        return this.#length;
    }

    from( values ) {
        if( values instanceof Array ) {
            values.forEach( el => this.insert( el ) );
        } else if( values instanceof Object ) {
            Object.values( values ).forEach( el => this.insert( el ) )
        }
        return this;
    }

    forEach( callback ) {
        let node = this.#head;
        let index = 0;

        while( node ) {
            let result = callback( node.val, index );
            if( result !== undefined ) node.val = result;

            node = node.next;
            index++;
        }
    }

    toString() {
        if( this.#length === 0 ) return '';

        let str = `${this.#head.val}`;
        let node = this.#head.next;
        while( node ) {
            str = str + ' | ' + node.val;
            node = node.next;
        }

        return str;
    }
}

module.exports = LinkedList;