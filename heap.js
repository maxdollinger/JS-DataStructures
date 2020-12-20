class Heap {
    #heap = [];
    #comparator = ( a, b ) => a - b ;

    constructor( cmp ) {
        cmp && (this.#comparator = cmp);
    }

    #parentIndex = ( childIndex ) => {
        if( childIndex <= 0 ) return 0;
        return childIndex % 2 === 0 ? (childIndex-2)/2 : (childIndex-1)/2;
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

        while( this.#comparator( prio, this.#heap[parentIndex].prio ) < 0 ) {
            this.#swap( parentIndex, childIndex );

            childIndex = parentIndex;
            parentIndex = this.#parentIndex( childIndex );
        }

        return this;
    }

    #children = ( parentIndex ) => {
        const left =  (2*parentIndex) + 1 < this.#heap.length ? (2*parentIndex) + 1 : undefined;
        const right =  (2*parentIndex) + 2 < this.#heap.length ? (2*parentIndex) + 2 : undefined;

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
        const left = this.#comparator( children.left.prio, parent );
        const right = this.#comparator( children.right.prio, parent  );

        if( left || right ) {
            return left > right ? children.right.index : children.left.index;
        } else {
            return null;
        }
    }

    pop() {
        if(this.isEmpty()) return undefined;

        this.#swap(0, this.#heap.length-1);

        const parent = this.#heap[0].prio;
        const extracted = this.#heap.pop().value;

        let parentIndex = 0;
        let children = this.#children( parentIndex );
        let childToSwap;

        while( childToSwap = this.#compareToChildren( parent, children ) ) {
            this.#swap( parentIndex, childToSwap );

            parentIndex = childToSwap;
            children = this.#children( parentIndex );
        }

        return extracted;
    }

    isEmpty() {
        return this.#heap.length === 0;
    }

    toString() {
        return this.#heap;
    }
}

module.exports = Heap;