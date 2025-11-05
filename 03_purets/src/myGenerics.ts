// Generics
// Generics with functions
function indentityOne(val: boolean | number): boolean | number {
    return val;
}

function identityTwo(val: any): any {
    return val;
}

identityTwo(2) // function identityTwo(val: any): any

function identityThree<Type>(val: Type): Type {
    return val;
}

identityThree(3) // function identityThree<3>(val: 3): 3
identityThree("Three") // function identityThree<"Three">(val: "Three"): "Three"

// Most common:
function identityFour<T>(val: T): T {
    return val;
}


// With interfaces
interface Bottle {
    brand: string,
    type: number
}

identityFour<Bottle>({ brand: "Acme", type: 1 })


// Generics in Array 
function getSearchProducts<T>(products: T[]): T { // We can use T[] or Array<T> 
    // do some database operations
    const myIndex = 3;
    return products[myIndex];
}

// Arrow functions
const getMoreSearchProducts = <T>(products: T[]): T => {
    //do some database operations
    const myIndex = 4;
    return products[myIndex];
}

// Generic Classes
// function anotherFunction<T, U>(valOne: T, valTwo: U): object {
//     return {
//         valOne,
//         valTwo
//     }
// }


//  generics with `extends`
// function anotherFunction<T, U extends number>(valOne: T, valTwo: U): object {
//     return {
//         valOne,
//         valTwo
//     }
// }

// anotherFunction(3, "Four"); // Argument of type 'string' is not assignable to parameter of type 'number'
// anotherFunction(3, 3.5); // OK


interface Database {
    connection: string,
    username: string,
    password: string
}

function anotherFunction<T, U extends Database>(valOne: T, valTwo: U): object {
    return {
        valOne,
        valTwo
    }
}

anotherFunction(3, { connection: "", username: "", password: "" });


// more examples
function withBrand<T extends { brand: string }>(val: T): T {
    // val.brand exists and is a string
    return val;
}

withBrand({ brand: "Acme", type: 1 });
withBrand({ brand: "Acme", extra: true });
//withBrand({ type: 1 });                   // missing brand

// Typed property access with `keyof`
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const bottle: Bottle = { brand: "Acme", type: 1 };

const brand = getProp(bottle, "brand"); // string
const type = getProp(bottle, "type");  // number
// getProp(Bottle, "color");            // 'color' is not a key of Bottle

// class types in generics
interface Quiz {
    name: string,
    type: string
}

interface Course {
    name: string,
    author: string,
    subject: string
}

class Sellable<T> {
    public cart: T[] = []

    addToCart(products: T) {
        this.cart.push(products)
    }
}

const quizCart = new Sellable<Quiz>();
quizCart.addToCart({ name: "TS Basics", type: "MCQ" });

const courseCart = new Sellable<Course>();
courseCart.addToCart({ name: "TypeScript 101", author: "Moure", subject: "Programming" });