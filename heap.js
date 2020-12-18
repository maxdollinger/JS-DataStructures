class Heap {
    #heap = [];

    #parentIndex = ( childIndex ) => {
       return Math.floor( (childIndex-1)/2 );
    }

    #compareToParent = ( value, parentIndex ) => value > this.#heap[parentIndex];

    #swap = ( i, j, arr = this.#heap ) => [ arr[i], arr[j] ] = [ arr[j], arr[i] ];

    add( value ) {
        if( this.#heap.length === 0 ) {
            this.#heap.push( value );
            return this;
        }

        this.#heap.push( value );
        let childIndex = this.#heap.length-1;
        let parentIndex = this.#parentIndex( childIndex );

        while( this.#compareToParent(value, parentIndex) ) {

            this.#swap( parentIndex, childIndex );

            childIndex = parentIndex;
            parentIndex = this.#parentIndex( childIndex );
        }

        return this;
    }

    #children = ( parentIndex ) => {
        const left = (2*parentIndex) + 1;
        const right = (2*parentIndex) + 2;

        return {
            left : {
                index: left,
                value: this.#heap[left],
            },
            right : {
                index: right,
                value: this.#heap[right],
            }
        };
    }

    #compareToChildren = ( parent, children ) => {
        const left = children.left.value;
        const right = children.right.value;

        if( parent < left && parent < right ) {
            return left > right ? children.left.index : children.right.index;
        } else if( parent < left && parent > right ) {
            return children.left.index;
        }  else if( parent < right && parent > left ) {
            return children.right.index;
        } else {
            return null;
        }
    }

    dequeue() {
        this.#swap(0, this.#heap.length-1);

        const extracted = this.#heap.pop();
        const parent = this.#heap[0];

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

    toString() {
        return this.#heap.toString();
    }
}

module.exports = Heap;