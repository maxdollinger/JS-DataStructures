class binarySearchTree {
    #root = null;
    #size = 0;

    #node = ( value ) => {
        return {
            value,
            left: null,
            right: null
        }
    }

    constructor( value ) {
        if( value !== undefined ) {
            if( value instanceof Array ) {
                value.forEach( el => this.insert( el ) )
            } else {
                this.insert( value );
            }
        }
    }

    insert( value ) {
        const newNode = this.#node( value );

        if( !this.#root ) {
            this.#root = newNode;
            this.#size++;
            return this;
        }

        let node = this.#root;

        while( node ) {
            if( value < node.value ) {
                if( node.left ) {
                    node = node.left;
                } else {
                    node.left = newNode;
                    this.#size++;
                }
            } else if ( value > node.value ) {
                if( node.right ) {
                    node = node.right;
                } else {
                    node.right = newNode;
                    this.#size++;
                }
            } else {
                break;
            }
        }
        return this;
    }

    find( value ) {
        if(this.#size === 0) return null;

        let node = this.#root;

        while( node ) {
            if( node.value === value ) return true;
            if( value < node.value ) {
                node = node.left;
            } else if ( value > node.value ) {
                node = node.right;
            }
        }

        return false;
    }

    #preOrder = ( node, data ) => {
        data.push( node.value );

        node.left && this.#preOrder( node.left, data );
        node.right && this.#preOrder( node.right, data );

        return data;
    }

    #postOrder = ( node, data ) => {
        node.left && this.#postOrder( node.left, data );
        node.right && this.#postOrder( node.right, data );

        data.push( node.value );
        return data;
    }

    #inOrder = ( node, data ) => {
        node.left && this.#inOrder( node.left, data );

        data.push( node.value );

        node.right && this.#inOrder( node.right, data );

        return data;
    }

    //Array as queue not ideal because of shift, but the fastest Way.
    //Linked list would be better.
    #bfs = () => {
        let node;
        const data = [];
        const queue = [ this.#root ];

        while( queue.length ) {
            node = queue.shift();
            data.push( node.value );
            node.left && ( queue.push( node.left ) );
            node.right && ( queue.push( node.right ) );
        }

        return data;
    }

    search( type ) {
        if(this.#size === 0) return null;

        switch ( type ) {
            case 'bsf':
                return this.#bfs();
            case 'pre':
                return this.#preOrder( this.#root, [] );
            default:
            case 'in':
                return this.#inOrder( this.#root, [] );
            case 'post':
                return this.#postOrder( this.#root, [] );
        }

    }

    size() {
        return this.#size;
    }
}

module.exports = binarySearchTree;