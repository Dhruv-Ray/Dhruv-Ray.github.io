function runRobot(state, robot, memory) {
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
        steps1 += runRobot(state, robot1, memory1);
        steps2 += runRobot(state, robot2, memory2);
    }
    console.log("Robot1 =" + steps1);
    console.log("Robot2 =" + steps2);
  }
  
  compareRobots(routeRobot, [], goalOrientedRobot, []);