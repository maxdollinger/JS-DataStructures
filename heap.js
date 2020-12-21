class Heap {
    #heap = [];
    #comparator = ( a, b ) => a - b ;

    constructor( cmp ) {
        cmp && (this.#comparator = cmp);
    }

    #swap = ( i, j, arr = this.#heap ) => [ arr[i], arr[j] ] = [ arr[j], arr[i] ];

    #bubbleUp = ( item, heap = this.#heap, startIndex = heap.length-1 ) => {
        let parentIndex;

        while( (parentIndex = (startIndex-1) >> 1) >= 0 ) {
            if( this.#comparator( item.prio, heap[parentIndex].prio ) < 0 ) {
                this.#swap( startIndex, parentIndex );

                startIndex = parentIndex;
                continue;
            }

            break;
        }
    }

    add( prio, value ) {
        const newItem = {prio, value};
        this.#heap.push( newItem );
        this.#bubbleUp( newItem );

        return this;
    }

    #sinkDown = ( item, index = 0, heap = this.#heap ) => {
        let left, right, indexToSwap;

        while( ((2*index) + 2) < heap.length ) {
            const leftChild =  heap[(2*index) + 1].prio;
            const rightChild =  heap[(2*index) + 2].prio;

            left = this.#comparator( leftChild, item );
            right = this.#comparator( rightChild, item );

            if( left < 0 || right < 0 ) {
                indexToSwap = left > right ? (2*index) + 2 : (2*index) + 1;
                this.#swap( index, indexToSwap );
                index = indexToSwap;
                continue;
            }

            break;
        }

        this.#bubbleUp( heap[heap.length-1] )
    }

    pop() {
        if(this.isEmpty()) return undefined;

        this.#swap(0, this.#heap.length-1);

        const parent = this.#heap[0].prio;
        const extracted = this.#heap.pop().value;

        this.#sinkDown( parent );

        return extracted;
    }

    isEmpty() {
        return this.#heap.length === 0;
    }

    toString() {
        let str = '';

        this.#heap.forEach( el => {
            str += el.prio + ':' + el.value + ' | ';
        })
        return str;
    }
}

module.exports = Heap;