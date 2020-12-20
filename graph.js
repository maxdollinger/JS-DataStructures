const Heap = require('./heap');

class Graph {
    adjList = {};

    addVertex( vertex ) {
        this.adjList[vertex] = [];
    }

    addEdge( v1, v2, weight ) {
        this.adjList[v1].push( [v2, weight] );
        this.adjList[v2].push( [v1, weight] );
    }

    shortestPaths( start ) {
        const visited = {};
        const path = { [start]: null};
        const dist = { [start]: 0 };
        const queue = new Heap().add(0, start);
        let current;

        while( (current = queue.dequeue()) !== undefined ) {
            visited[current] = true;
            console.log(queue.toString())
            console.log(visited);

            this.adjList[current].forEach( el => {
                let vertex = el[0];
                let weight = el[1];


                if(dist[vertex] === undefined ) {
                    dist[vertex] = dist[current] + weight;
                    path[vertex] = current;
                } else if( dist[vertex] > dist[current] + weight) {
                    dist[vertex] = dist[current] + weight;
                    path[vertex] = current;
                }

                !visited[vertex] && (queue.add(weight, vertex));
            });
        }

        function pathToString( end ) {
            let current = end;
            let nodes =[];

            while (current !== null) {
                nodes.push(current)
                current = path[current];
            }
            nodes.reverse();

            let str = '';
            nodes.forEach( (el,index) => {
                index < nodes.length-1 ? str += `${el} -> ` : str += `${el} | `;
            })
            str += dist[end];

            return str;
        }

        function logPaths() {
            Object.keys(dist).forEach( vertex => console.log( pathToString(vertex) ) );
        }

        return {
            dist,
            logPaths
        };
    }
}

module.exports = Graph;