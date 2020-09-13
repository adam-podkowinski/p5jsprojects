class Node {
   constructor(value) {
      this.value = value;
      this.edges = [];
      this.searched = false;
      this.parent = null;
   }

   addEdge(neighbor) {
      this.edges.push(neighbor);
      neighbor.edges.push(this);
   }
}