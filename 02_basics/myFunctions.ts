// Functions
function addTwo(num: number): number {
    return num + 2;
}

function singUpUser(name: string, email: string, isPaid: boolean): void {

}

function loginUser(name: string, email: string, isPaid: boolean = false): void {

}

// function getValue(myVal: number) {
//     if (myVal > 5) {
//         return true;
//     }
//     return "200 OK";
// }

// Arrow functions
const getHello = (s: string): string => {
    return `Hello ${s}`;
}

// Callback functions
const heros = ["Thor", "Spiderman", "Iron Man"];

heros.map((hero): string => {
    return `hero is ${hero}`;
})


// never
function fail(msg: string): never {
    throw new Error(msg);
}


//Invocations
addTwo(5);

singUpUser("Nazaret", "ddn@ddn.dev", false);

loginUser("Nazaret", "ddn@ddn.dev");

getHello("Nazaret");

fail("Error message");
