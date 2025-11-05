let score: number | string | boolean = 33

type User = {
    id: number
    name: string
}

type Admin = {
    id: number
    username: string
}

let myName: User | Admin = { name: "Nazaret", id: 1234 }
let otherName: User | Admin = { username: "Other Name", id: 1234 }

//functions 

// function getDbId(id: number | string) {
//     // Making some API calls
//     console.log(`DB id is: ${id}`);
// }

// getDbId(3);
// getDbId("3");

function getDbId(id: number | string) {
    if (typeof id === 'string') {
        id.toLowerCase();
    }
    console.log(`DB id is: ${id}`);
}

//array

// const data: number[] | string[] = [1, 2, 3, 4]
// data.push("5")

const data: (number | string)[] = [1, 2, 3, "4"]

let seatAllotment: "aisle" | "middle" | "window";
