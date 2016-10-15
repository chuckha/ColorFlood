const COLORS = [0,1,2,3,4]; // TODO: tie this together with the COLORS from App.js

const randomIndexFromCollection = (collection) => {
  var index = 0;
  for (var i = 1, max = collection.length; i < max; i++) {
    if (Math.random() < 1/(i+1)) {
      index = i;
    }
  }
  return index;
}

class Node {
  constructor(id, color) {
    this.id = id;
    this.color = color;
  }
}

class Edge {
  constructor(sourceId, destId, weight) {
    this.sourceId = sourceId;
    this.destId = destId;
    this.weight = weight;
  }
}

class Graph {
  constructor(size=3) {
    this.size = size;
    this.nodes = {};
    this.edgesByNode = {};
    for (let i=0; i<size*size; i++) {
      this.nodes[i] = new Node(i, randomIndexFromCollection(COLORS));
    }
    this.setEdgeWeights();
  }

  setEdgeWeight(id) {
      let node = this.nodes[id];
      let nodeId = node.id;
      // if i subtract the width of my box and i'm < 0 i don't have a top
      // if i add one and mod myself with the width of my box and i am 0 i don't have a right
      // if i add the width of my box and i am > width * width - 1 i don't have a bottom
      // if i mod myself the width of my box and it is 0 i don't have a left
      let edges = [];

      let topIndex = nodeId - this.size;
      let rightIndex = nodeId + 1;
      let bottomIndex = nodeId + this.size;
      let leftIndex = nodeId - 1;

      if (topIndex >= 0) {
        let w = this.sameColor(nodeId, topIndex) ? 0 : 1;
        edges.push(new Edge(nodeId, topIndex, w));
      }

      if (rightIndex % this.size > 0) {
        let w = this.sameColor(nodeId, rightIndex) ? 0 : 1;
        edges.push(new Edge(nodeId, rightIndex, w));
      }

      if (bottomIndex < this.size * this.size) {
        let w = this.sameColor(nodeId, bottomIndex) ? 0 : 1;
        edges.push(new Edge(nodeId, bottomIndex, w));
      }

      if (nodeId % this.size !== 0) {
        let w = this.sameColor(nodeId, leftIndex) ? 0 : 1;
        edges.push(new Edge(nodeId, leftIndex, w));
      }

      this.edgesByNode[nodeId] = edges;
  }

  setEdgeWeights() {
    Object.keys(this.nodes).forEach((id) => {
      this.setEdgeWeight(id);
    });
  }

  updateColor(id, color) {
    this.nodes[id].color = color;
  }

  colorFill(color) {
    let seenIds = [];
    let processing = [0]; // starting at the top left corner (this is a stack)
    let updateEdgeWeights = [];
    while (processing.length > 0) {
      let currentNodeId = processing.pop();
      this.updateColor(currentNodeId, color);
      seenIds.push(currentNodeId);
      this.edgesByNode[currentNodeId].forEach((edge) => {
        if (seenIds.indexOf(edge.destId) > -1) {
          return; // bail if we've seen it
        }
        if (edge.weight === 0) {
          processing.push(edge.destId); // process it there is no weight cost
        }
        if (edge.weight === 1 && this.nodes[currentNodeId].color === color) {
          updateEdgeWeights.push(currentNodeId); // update the edge weghts after we finish color filling
        }
      });
    }
    updateEdgeWeights.forEach((nodeId) => this.setEdgeWeight(nodeId));
    // BUG: The graph is now in a state that works but not all edges are accurate.
  }

  sameColor(nodeAId, nodeBId) {
    return this.nodes[nodeAId].color === this.nodes[nodeBId].color;
  }
}

export { Graph };
// update a node's color
// which will update the weights of the nodes.
// i can update colors and *then* update the weights
