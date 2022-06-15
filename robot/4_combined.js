var roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];
  
  function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
      if (graph[from] == null) {
        graph[from] = [to];
      } else {
        graph[from].push(to);
      }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  
  var roadGraph = buildGraph(roads);
  
  var VillageState = class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    move(destination) {
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else {
        let parcels = this.parcels.map(p => {
          if (p.place != this.place) return p;
          return {place: destination, address: p.address};
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
      }
    }
  }
  
  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
    }
  }
  
  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }
  
  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
  }
  
  VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  };
  
  var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];
  
  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }
  
  function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i];
      for (let place of graph[at]) {
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
  }
  
  function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return {direction: route[0], memory: route.slice(1)};
  }

  function runRobot1(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  
  function compareRobots(robot1, memory1, robot2, memory2) {
    // Your code here
    let steps1 = 0;
    let steps2 = 0;
    let currState;
    for(let i = 0;i<100;i++){
        currState = VillageState.random();
        steps1 += runRobot1(currState, robot1, memory1);
        steps2 += runRobot1(currState, robot2, memory2);
    }
    // console.log("Robot1 =" + steps1);
    // console.log("Robot2 =" + steps2);
    return {steps1, steps2};
  }

  function optimizedGORobot({place, parcels}, route){
    let shortest_route = route;
    if(route.length == 0){ 
        let routes = [];
        for(let parcel of parcels){
            if(parcel.place !=place){
                route = findRoute(roadGraph, place, parcel.place);
                routes.push({togo:route, pickup: true});
            }else{
                route = findRoute(roadGraph, place, parcel.address);
                routes.push({togo:route, pickup:false});
            }
        }

        if(routes.some((route) => route.pickup == true)){
            shortest_route = routes.filter(route =>{
                return route.pickup == true;
            }).reduce((min_route, next_route)=> {
                return next_route.togo.length < min_route.togo.length? next_route: min_route;
            }).togo;
        }else{
            shortest_route = routes.reduce((min_route, next_route)=> {
                return next_route.togo.length < min_route.togo.length? next_route: min_route;
            }).togo;
        }
    }

    return {direction: shortest_route[0], memory: shortest_route.slice(1)};
}

function showCompare() {
    let {steps1,steps2} = compareRobots(optimizedGORobot, [], goalOrientedRobot, []);
    console.log(steps1, steps2);
    document.getElementById("compare").innerHTML = (`Goal Oriented Robot: ${steps2} vs My Robot: ${steps1}`);
}

showCompare();

