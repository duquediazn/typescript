// const user: (string | number)[] = ["nd", 1] //The order doesn't matter

// tuples

let tUser: [string, number, boolean];

tUser = ["nd", 131, true]; //The order matters

let rgb: [number, number, number] = [255, 123, 112];

type User = [number, string]

const newUser: User = [112, "example@google.com"]

newUser[1] = "nazaret@dev.com";
//newUser.push(true); // can't do this
newUser.pop(); // why are we allowed to do this?
console.log(newUser) // [112] 