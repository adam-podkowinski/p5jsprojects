class Graph {
   constructor() {
      this.nodes = [];
      this.graph = {};
      this.end = null;
      this.start = null;
   }

   reset() {
      this.nodes.forEach(node => {
         node.searched = false;
         node.parent = null;
      });
   }

   addNode(n) {
      this.nodes.push(n);
      const title = n.value;
      this.graph[title] = n;
   }

   getNode(actor) {
      const n = this.graph[actor];
      return n;
   }

   setStart(actor) {
      this.start = this.graph[actor];
      return this.start;
   }

   setEnd(actor) {
      this.end = this.graph[actor];
      return this.end;
   }
}