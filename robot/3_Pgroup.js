class PGroup {
    constructor(members) {
      this.members = members;
    }
  
    add(value) {
      if (!this.members.includes(value)) {
        return new PGroup(this.members.concat(value));
      }else{
        return this;
      }
    }
  
    delete(value) {
        if(this.members.includes(value)){
            return new PGroup(this.members.filter(v => v !== value));
        }else{
            return this;
        }
    }
  
    has(value) {
      return this.members.includes(value);
    }
  
  }

PGroup.empty = new PGroup([]);

const new1 = PGroup.empty.add(1);
const new2 = PGroup.empty.add(2);
const new3 = new1.add(2);
const new4 = new2.add(3);
const new5 = new1.delete(1);

// console.log(new1.has(1));
// console.log(new5.has(2));
// console.log(new2.has(2));

document.getElementById("new1").innerHTML = new1.has(1);
document.getElementById("new5").innerHTML = new5.has(1);
document.getElementById("new2").innerHTML = new2.has(2);
