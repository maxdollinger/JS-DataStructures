class Heap {
    #heap = [];

    #validIndex = ( index ) => {
        return index >=0 && index < this.#heap.length ? index : undefined;
    }

    #parentIndex = ( childIndex ) => {
       const index = Math.floor( (childIndex-1)/2 );
       return this.#validIndex(index) ? index : 0;
    }

    #compareToParent = ( prio, parentIndex ) => {
        return prio < this.#heap[parentIndex].prio;
    }

    #swap = ( i, j, arr = this.#heap ) => [ arr[i], arr[j] ] = [ arr[j], arr[i] ];

    add( prio, value ) {
        if( this.#heap.length === 0 ) {
            this.#heap.push( {prio, value} );
            return this;
        }

        this.#heap.push( {prio, value} );
        let childIndex = this.#heap.length-1;
        let parentIndex = this.#parentIndex( childIndex );

        while( this.#compareToParent(prio, parentIndex) ) {

            this.#swap( parentIndex, childIndex );

            childIndex = parentIndex;
            parentIndex = this.#parentIndex( childIndex );
        }

        return this;
    }

    #children = ( parentIndex ) => {
        const left = this.#validIndex((2*parentIndex) + 1);
        const right = this.#validIndex((2*parentIndex) + 2);

        return {
            left: {
                index: left,
                prio: left ? this.#heap[left].prio : undefined
            },
            right: {
                index: right,
                prio: right ? this.#heap[right].prio : undefined
            }
        }
    }

    #compareToChildren = ( parent, children ) => {
        const left = children.left.prio;
        const right = children.right.prio;

        if( parent > left && parent > right ) {
            return left < right ? children.left.index : children.right.index;
        } else if( parent > left ) {
            return children.left.index;
        }  else if( parent > right ) {
            return children.right.index;
        } else {
            return null;
        }
    }

    dequeue() {
        if(this.isEmpty()) return undefined;

        this.#swap(0, this.#heap.length-1);

        const parent = this.#heap[0].prio;
        const extracted = this.#heap.pop().value;

        let parentIndex = 0;
        let children = this.#children( parentIndex );
        let childToSwap = this.#compareToChildren( parent, children );

        while( childToSwap ) {
            this.#swap( parentIndex, childToSwap );

            parentIndex = childToSwap;
            children = this.#children( parentIndex );
            childToSwap = this.#compareToChildren( parent, children );
        }

        return extracted !== undefined ? extracted : null;
    }

    isEmpty() {
        return this.#heap.length === 0;
    }

    toString() {
        return this.#heap;
    }
}

module.exports = Heap;