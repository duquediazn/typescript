# Typescript
TypeScript (TS) is a high-level programming language that adds **static typing** with optional type annotations to JavaScript. It is designed for **developing large applications and transpiles to JavaScript**. It is developed by Microsoft as free and open-source software released under an _Apache License 2.0_.

TypeScript may be used to develop JavaScript applications for both client-side and server-side execution (as with React.js, Node.js, Deno or Bun). Multiple options are available for transpiling. The default TypeScript Compiler can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.

To summerize this a little:
- The only purpose of TS is to add **static checking**, that is, analyze the code as we type. 
- You work on a TS file and **transpile** it into a JS file. 
- **TS is a dev tool**, your project still runs on JS. 

---

## Main resources
- [Official TS Doc](https://www.typescriptlang.org/docs/)
- [Learn TypeScript – Full Tutorial (freeCodeCamp)](https://www.youtube.com/watch?v=30LWjhZzg50)

---

## Table of contents
- [0. Installation](#0-installation-top-)
- [1. Intro](#1-intro-top-)
    - [TS everyday types](#ts-everyday-types-top-)
    - [Don`t use ANY](#dont-use-any-top-)
- [2. Basics](#2-basics-top-)
    - [Functions in TS](#functions-in-ts-top-)
    - [Arrow functions in TS](#arrow-functions-in-ts-top-)
    - [Callback functions in TS](#callback-functions-in-ts-top-)
    - [The keyword `never`](#the-keyword-never-top-)
    - [The difference between `void` and `never`](#difference-between-void-and-never-top-)
    - [Objects in TS](#objects-in-ts-top-)
    - [Type aliases](#type-aliases-top-)
    - [READONLY, optional and intersection type](#readonly-optional-and-intersection-type-top-)
    - [Arrays](#arrays-top-)
    - [Unions](#unions-top-)
    - [Tuples in TS](#tuples-in-ts-top-)
    - [Enums in TS](#enums-in-ts-top-)
    - [Interfaces](#interfaces-top-)
- [3. Pure TS](#3-pure-ts-top-)
    - [How to setup Typescript for real projects](#how-to-setup-typescript-for-real-projects-top-)
    - [Classes in TS](#classes-in-ts-top-)
    - [Why interface is important](#why-interface-is-important-top-)
    - [Abstract class](#abstract-class-top-)
    - [Generics](#generics-top-)
    - [Type Narrowing](#type-narrowing-top-)
    

--- 

## 0. Installation [top ↑](#)
You may need to install Node and NPM before, check if you have them in your system first: 
```bash
node -v 
npm -v
```

To install it globally in your system: 
```bash
npm install -g typescript
```

> See the official installation instructions → [download](https://www.typescriptlang.org/download/)

Once installed, chech it with: 
```bash
tsc -v 
```

---

## 1. Intro [top ↑](#)
Let´s try the following [script](/01_intro/intro.ts):
```ts
let user = { name: "Nazaret", age: 10 }
console.log("Nazaret");
console.log(user.name);
```

To compile the file `intro.ts`:
```bash
tsc intro.ts
```

Se generará un archivo de extensión `js`, `intro.js`:
```js
var user = { name: "Nazaret", age: 10 };
console.log("Nazaret");
console.log(user.name);
```

> You can use the `playground` tab in the Typescript official site to test your code → [playground](https://www.typescriptlang.org/play/)

### TS everyday types [top ↑](#)
#### strings 

> Check this out fisrt! → [everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

We're going to focud on the most common types in JS or TS.

**Declaring a variable:**
Syntax:
```ts
let variableName: type = value
```

Let's see the [following file](/01_intro/variableMe.ts):
```ts
let greetings: string = "Hello Nazaret";

console.log(greetings);
```
We can see now that if we use the dot notation on that variable the IDE is going to sugest all the string methods available.

After compile it: 
```js
var greetings = "Hello Nazaret";
console.log(greetings);
```

Now, if we try to reasign this variable to any other type value we get an error in our IDE. 
If we do:
```ts
greetings = 6;
```
We get _Type 'number' is not assignable to type 'string'_ in VS Code.

#### number & boolean [top ↑](#)
**Number:**
JavaScript does not have a special runtime value for integers, so there’s no equivalent to int or float - everything is simply number.

```ts
let userId: number = 334455.3;
```

We could declare this variable only doing this: 
```ts
let userId = 334455.3
```

TS will automatically inferred that is a type number. You might think that this is just as using plain JS, but it's not, if we try to asign any other type to this variable we'll get an error. 

**Boolean types:**
```ts
let isLoggedIn: boolean = false;
```

#### Don't use ANY [top ↑](#)
> Check this out fisrt! →  [any](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)

TypeScript also has a special type, any, that you can use whenever you don’t want a particular value to cause typechecking errors. 
When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`.

**You usually want to avoid this, though, because any isn’t type-checked.** Use the compiler flag `noImplicitAny` to flag any implicit any as an error.

---

## 2. Basics [top ↑](#)
We'll be working on the [following file](/02_basics/myFunctions.ts)

### Functions in TS [top ↑](#)
When defining a function in TS, the inferred types for the arguments and the returned value are automatically set to `any`. We want to avoid this, so we declare our functions like this:
```ts
function addTwo(num: number): number {
    return num + 2;
}

addTwo(5);
```

Multiple arguments:
```ts
function singUpUser(name: string, email: string, isPaid: boolean): void {

}

singUpUser("Nazaret", "duquediazn@duquediazn.dev", false);
```

Default values:
```ts
function loginUser(name: string, email: string, isPaid: boolean = false): void {

}
loginUser("Nazaret", "duquediazn@duquediazn.dev");
```

**Returning different types:**
Let's say we have a functions like this:
```ts
function getValue(myVal: number) {
    if (myVal > 5) {
        return true;
    }
    return "200 OK";
}
```

The IDE shows us the following: 
```ts
function getValue(myVal: number): true | "200 OK"
```

So the question is, how can we correctly declare the returned type for this sort of functions?
The example below already gives us a clue, but, in order to correctly answer this question, we need to gain a [deeper understanding of typescript first](#unions-top-).

### Arrow functions in TS [top ↑](#)
```ts 
const getHello = (s: string): string => {
    return `Hello ${s}`;
}

getHello("Nazaret");
```

### Callback functions in TS [top ↑](#)
Now, let's say we have the following array of hero names: 
```ts
const heros = ["Thor", "Spiderman", "Iron Man"];
```

And now we use the `map` method over this array like this:
```ts
heros.map(hero => {
    return `hero is ${hero}`;
})
```

TS is going to automatically inferred that:
```ts
(parameter) hero: string
```

So we don't need to explicitly declare the parameters type in our callback arrow function (`(hero: string) `).
But, what happends with the returned types? Well, in this case, we need to specify the returned type.
```ts
heros.map((hero: string): string => {
    return `hero is ${hero}`;
})

//or just:
heros.map((hero): string => {
    return `hero is ${hero}`;
})
```

### The keyword `never` [top ↑](#)
What happens when we have a functions that **never** return a value?
In TS there's a keyword for that, it's called `never`, directly from the doc: 
_"The never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program."_
```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

> Note that if we don't specify the returned value, TS will inferred `void`.

> Official doc → [never](https://www.typescriptlang.org/docs/handbook/2/functions.html#never)

### Difference between `void` and `never` [top ↑](#)
The void type is used for functions that do not return any meaningful value, meaning they implicitly return `undefined`.
This is appropriate for functions that perform an action, like logging a message or updating state, without needing to return a result.

In contrast, the `never` type represents a value that will never occur. It is used for functions that never return normally, such as those that throw an error or contain an infinite loop. 
A function with a never return type signifies that the function's execution will not complete, making it impossible to reach the end of the function.

> The key distinction is that: **void indicates a function returns nothing but completes its execution, while never indicates a function does not complete its execution at all.**

### Objects in TS [top ↑](#)

We'll be working on the [following file](/02_basics/myObjects.ts)

In JavaScript, the fundamental way that we group and pass around data is through objects. 

For example, let's see how we can work with anonymous objects as parameters in the following function:
```ts
function createUser(user: { name: string, isPaid: boolean }) {
    return `Hi: ${user.name}!`;
}

createUser({ name: "Nazaret", isPaid: false });
```

While the syntax for an anonymous returned object is: 
```ts
function createCourse(): { name: string, price: number } {
    return { name: "reactjs", price: 399 }
}
```

If we try to pass an object to `createUser()` from the previous example with an additional argument like this: 
```
{ name: "Nazaret", isPaid: false, email: "naza@dev.com" }
```

We will, as expected, get an error. But there is this strange behavior in TS, if we do this: 
```ts
let newUser = { name: "Nazaret", isPaid: false, email: "naza@dev.com" }

createUser(newUser);
```

We're not getting any errors!

### Type aliases [top ↑](#)
To prevent the strange behaviour seen before, we create a `type alias` using the `type` keyword:
```ts
type User = {
    name: string;
    email: string;
    isActive: boolean
}

function createUser(user: User) { }
```

Now we can invoke the function passing an object of the type User:
```ts
createUser({ name: "Nazaret", email: "naza@dev.com", isActive: false })
```

And if we try to do something like before and pass an object that doesn't match the type User, i.e.:
```ts
const otherUser = { name: "Xuxa", email: "xuxa@xuxa.com" }

createUser(otherUser)
```

This time we WILL get an error. 

The same logic will follow for the returned objects:
```ts
function createUser(user: User): User {
    return { name: "", email: "", isActive: false }
}

```

> See the official doc → [Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

### READONLY, optional and intersection type [top ↑](#)
#### readonly
Let's say we have a User that we want to store in a database such as MongoDB, and we have some property called `_id` (very common in MongoDB). 
```ts
type User = {
    _id: string;
    name: string;
    email: string;
    isActive: boolean
}
```

MongoDB will be the one creating that id, and we don't want anybody else messing around with this property, so we can mark it as `readonly`:
```ts
type User = {
    readonly _id: string;
    name: string;
    email: string;
    isActive: boolean
}
```

If we try to create an object of type User: 
```ts
let myUser: User = {
    _id: "1234",
    name: "H",
    email: "h@h.com",
    isActive: false
}
```

If we try to change the property `:id`:
```ts
myUser._id = "5678";
```

We'll get the following error en our IDE: _Cannot assign to '_id' because it is a read-only property.ts(2540)_

#### optional
If we want to have an **optional property**, like `creditcardDetails`, we can add a `?` to the end like this: 
```ts
type User = {
    readonly _id: string;
    name: string;
    email: string;
    isActive: boolean;
    creditcardDetails?: string
}
```

#### intersection type
To finish this section, let's see a way in which we can combine different object properties. Imagine we have two types: 
```ts
type cardDate = {
    cardDate: string
}

type cardNumber = {
    cardNumber: string
}
```

And now we want to combine this two types into another type, we can do this using the `&` operator: 
```ts
type cardDetails = cardNumber & cardDate 
```
Now `cardDetails` will be an **intersection type**, a combination of `cardDate` and `cardNumber`. 
We could also add new properties if we wanted to: 
```ts
type cardDetails = cardNumber & cardDate & {
    cvv: number
}
```

### Arrays [top ↑](#)
We'll be working on the [following file](/02_basics/myArrays.ts)

To define an empty array: 
```ts
const superHeros: string[] = [];
superHeros.push("spiderman");
```

Or we can use this other syntax instead: 
```ts
const heroPower: Array<number> = [];
```

With type aliases: 
```ts
type User = {
    name: string
    isActive: boolean
}

const allUsers: User[] = []
allUsers.push({ name: "", isActive: true })
```

Multidimensional arrays:
```ts
const allUsers: User[] = []

const MLModels: number[][] = [
    [255, 255, 255],
    []
]
```
> Official doc → [Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)

> Official doc → [The Array Type](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-array-type)


### Unions [top ↑](#)
We'll be working on the [following file](/02_basics/myUnions.ts)

There are cases in which we don't know for sure what is going to be the final value of a certain variable or function, `unions` will help us in those scenarios.
```ts
let score: number | string | boolean = 33
```
We use the `union operator ( | )` operator to create a **union type** between the different posible types.

Let's see some other usage examples: 
```ts
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
```

#### In functions
We can do something like this: 
```ts
function getDbId(id: number | string) {
    // Making some API calls
    console.log(`DB id is: ${id}`);
}

getDbId(3);
getDbId("3");
```

But as we can suspect, this practice could be problematic. Imagine the following situation: 
```ts
function getDbId(id: number | string) {
    id.toLowerCase();
}
```

This is going to give us an error:
_Property 'toLowerCase' does not exist on type 'string | number'._
_Property 'toLowerCase' does not exist on type 'number'._

We could, of course, make sure of what the variable type is before trying to apply any string methods to it, for example we could do: 
```ts
function getDbId(id: number | string) {
    if (typeof id === 'string') {
        id.toLowerCase();
    }
    console.log(`DB id is: ${id}`);
}
```

Now we won't have any complains from our IDE. 
So remember: **be careful when you're working with union types as parameters.**

#### In arrays
We use the folloring syntax: 
```ts
const data: (number | string)[] = [1, 2, 3, "4"]
```
We wrap the types into a parentheses and then the square brackets.
Be careful with this syntax, is very common to do something like this instead: 
```ts
const data: number[] | string[] = [1, 2, 3, 4]
```

This won't highlight any errors in our IDE, but we need to understand that this line is literally saying: 
_"The array type of this variable is either ALL number, or ALL strings."_
So if we were to push a string type of value to this array: 
```ts
data.push("5")
```

We will get the following complain: _Argument of type 'string' is not assignable to parameter of type 'number'_

**Another common use of the union operator:**
```ts
let seatAllotment: "aisle" | "middle" | "window";
```
This way we can restrict the variable to one of thouse values only. 


### Tuples in TS [top ↑](#)
We'll be working on the [following file](/02_basics/myTuples.ts)

A tuple type is another sort of Array type that **knows exactly how many elements it contains, and exactly which types it contains at specific positions.**
```ts
let tUser: [string, number, boolean];

tUser = ["nd", 131, true]; //The order matters
```

With type aliases: 
```ts
type User = [number, string]

const newUser: User = [112, "example@google.com"]
```

Notice that nothing prevents you from changing these values, provided their type is still valid: 
```ts
newUser[1] = "nazaret@dev.com";
```

What happens if we apply some array methods to our tuple?
Let's try the following example:
```ts
newUser.push(true);
```

In older versions of TypeScript, this might not throw an error, but in the current version it will.
However, if we try another array method:
```ts
newUser.pop();
console.log(newUser) // [112]
```

This can be confusing, since a tuple is essentially still an array type at runtime, we're allowed to use some its methods. But, _should_ we? 

The key takeaway is that tuples in TypeScript are a compile-time concept only, at runtime, they’re just arrays.
TypeScript prevents operations that clearly break the tuple’s structure (like `push(true)`), but methods like `pop()` are still allowed because they **don’t violate type safety in an obvious way.**

There is an interesting discussion about this in Stack Overflow → [stackoverflow.com](https://stackoverflow.com/questions/64069552/typescript-array-push-method-cant-catch-a-tuple-type-of-the-array)

> As of TypeScript v5.7.3, this behavior still exists: tuples remain mutable arrays at runtime. 

### Enums in TS [top ↑](#)
We'll be working on the [following file](/02_basics/myEnums.ts)

Enums are a feature added to JavaScript by TypeScript which allows for describing a value which could be one of a set of possible named constants. Unlike most TypeScript features, this is not a type-level addition to JavaScript but something added to the language and runtime. Because of this, it’s a feature which you should know exists, but maybe hold off on using unless you are sure.

> More on Enums → [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

Enums allow a developer to **define a set of named constants**. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

```ts
enum SeatChoice {
    AISLE,
    MIDDLE,
    WINDOW
}

const seatChoice = SeatChoice.AISLE;
```
By default, enums in TypeScript start from `0`: 
```
(enum member) SeatChoice.AISLE = 0
```

If we do something like this: 
```ts
enum SeatChoice {
    AISLE = 10,
    MIDDLE,
    WINDOW
}
```

TS will infer that `MIDDLE` is set `11` and `WINDOW` to `12`. When working with numeric enums, TS will automatically increment the following members by `1`. What happens with string type enums?

If we do thiS: 
```ts
enum SeatChoice {
    AISLE = "AISLE",
    MIDDLE,
    WINDOW,
    FORTH
}
```

We will automatically get an error. This make sense, how can TS infer the values for the rest of the constants?
String enums must assign a value to every member explicitly.

In TypeScript, **mixed enums (containing both string and numeric values) are valid.** 
```ts
enum SeatChoice {
    AISLE = "AISLE",
    MIDDLE = 4,
    WINDOW,
    FORTH
}

const seatChoice = SeatChoice.WINDOW;
```
This compiles with no erros, and we can check that:

```
(enum member) SeatChoice.WINDOW = 5
```

Once TypeScript encounters a numeric initializer, it can auto-increment subsequent numeric members.

#### Generating too much JS code
The TS code example above, generates the following JS code when compiled: 
```js
var SeatChoice;
(function (SeatChoice) {
    SeatChoice["AISLE"] = "AISLE";
    SeatChoice[SeatChoice["MIDDLE"] = 4] = "MIDDLE";
    SeatChoice[SeatChoice["WINDOW"] = 5] = "WINDOW";
    SeatChoice[SeatChoice["FORTH"] = 6] = "FORTH";
})(SeatChoice || (SeatChoice = {}));
var seatChoice = SeatChoice.WINDOW;
```
Regular enums emit an object and (for numeric members) a reverse map → more JS.

But if we define our enum with `const` like this: 
```ts
const enum SeatChoice {
    AISLE = "AISLE",
    MIDDLE = 4,
    WINDOW,
    FORTH
}

const seatChoice = SeatChoice.WINDOW;
```

We only get: 
```js
var seatChoice = 5 /* SeatChoice.WINDOW */;
```
A const enum is erased at runtime and its members are inlined where used, so the JS is tiny compared to a regular enum.

---

### Interfaces [top ↑](#)
We'll be working on the [following file](/02_basics/myInterface.ts)

An interface declaration is another way to name an object type:
```ts
interface User {
    readonly dbId: number,
    email: string,
    userId: number,
    googleId?: string
}
```

An interface is a way to define the shape of an object, what properties it must have, their types, and sometimes what methods it must implement. 

#### Adding methods
Interfaces can also describe functions or methods:
```ts
interface User {
    startTrail: () => string
}

const user: User = {
    dbId: 22,
    email: "ndd@dev.com",
    userId: 2211,
    startTrail: () => {
        return "trail started";
    }
}
```

We can define its methods like this as well: 
```ts
interface User {
    startTrail(): string
}
```

#### Extending interfaces
Interfaces can inherit from one another, letting you compose complex types easily:
```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

const dev: Employee = {
  name: "Jane",
  employeeId: 42,
};
```

We can also change the name or the parameters when implementing an interface: 
```ts
interface User {
    getCoupon(couponName: string, value: number): number
}

const user: User = {
    dbId: 22,
    email: "ndd@dev.com",
    userId: 2211,
    startTrail: () => {
        return "trail started";
    },
    getCoupon: (name: "hoishe", off: 10) => {
        return off;
    },
}
```

#### Differences Between Type Aliases and Interfaces
Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that **a type cannot be re-opened to add new properties vs an interface which is always extendable.**

> More in the docs → [Differences between type aliases and interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)


**Interfaces vs. Type aliases:**
| Feature                                 | `interface`                              | `type`                    |
| --------------------------------------- | ---------------------------------------- | ------------------------- |
| Can be **extended** (merged)            | ✅ yes (with `extends` or by redeclaring) | ⚠️ only via intersections |
| Can represent **unions**                | ❌ no                                     | ✅ yes                     |
| Exists only at compile-time             | ✅ yes                                    | ✅ yes                     |
| Better for **object shapes**            | ✅                                        | ✅                         |
| Preferred for **public APIs & classes** | ✅                                        | —                         |


## 3. Pure TS [top ↑](#)
We'll be working on the [following folder](/03_purets/)

### How to setup Typescript for real projects [top ↑](#)
With the following command:
```bash
tsc --init
```

We get the following prompt:
```bash
Created a new tsconfig.json with:                                                                                       
                                                                                                                     TS 
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true


You can learn more at https://aka.ms/tsconfig
```

This creates a simple typescript config file in our project's folder.

Let's say we want to start a `Node.js` project: 
```bash
npm init -y
```

And we're going to create a simplified folder structure similar to what we usually find in a node project:
```bash
touch index.html
mkdir src dist
touch src/index.ts
touch dist/index.js
```

Now, we're going to load our script in the index.html file: 
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script src="./dist/index.js"></script>
</body>

</html>
```
Next, we’ll work on our `tsconfig.json` file to specify the directory where TypeScript should generate the compiled JavaScript files.
We can do this by uncommenting the `outDir` line and providing the correct path.

```json
"outDir": "./dist", /* Specify an output folder for all emitted files. */
```

Let's check out if this is working. We're going add the following line to oir `src/index.ts` file:
```ts
console.log("Typescript is here!");
```

Now, for this to work, we're going to compile this file like this: 
```bash
tsc -w
```

Now we start the compilation in watch mode, so everytime that we add something new to our TS file, it will be automatically compiled for us in the `dist/index.js` file: 
```js
"use strict";
console.log("Typescript is here!");
```

Now we can serve our `index.html` using any method we like: `nodemon`, `lite-server`, or even use the `Live Server` in VSCode, etc.  
We're going to use lite-server: 
```bash
npm -i lite-server
```

To run it, we're going to add this line to the `package.json` file: 
```json
  "scripts": {
    "start": "lite-server"
  },
```

And now, we can serve the index.html file by typing: 
```bash
npm start
```

### Classes in TS [top ↑](#)
We'll be working on the [following file](/03_purets/src/index.ts)

#### Keyword `class`, properties and constructor basic syntax in TS
TypeScript offers full support for the class keyword introduced in ES2015.

As with other JavaScript language features, TypeScript adds type annotations and other syntax to allow you to express relationships between classes and other types.

With TS we need to declare in advance the class properties:
```ts
class User {
    email: string
    name: string
    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }
}
```

To create an instance of the class User:
```ts
const user1 = new User("h@h.com", "hitesh");
```

#### Private vs public visibility
We use the `private` keyword to make a property or method accessible only within the class itself, not from outside or through its instances.
In the example below, we’ll define a new property called `city`, which is both `private` and `readonly`.
```ts
class User {
    email: string;
    name: string;
    private readonly city: string = "Delhi";
    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }
}

const user1 = new User("h@h.com", "hitesh");
```
The other properties are implicitly marked as public, but we can also use the `public` keyword explicitly if we want to make it clear.

A more concise and professional way to define these properties is by using `parameter properties` in the constructor:
```ts
class User {
    private readonly city: string = "Delhi";
    constructor(
        public email: string,
        public name: string,
    ) { }
}
```
When we add access modifiers (such as public, private, or readonly) to the constructor parameters, TypeScript automatically:
1. Declares those parameters as class properties, and
2. Assigns the corresponding argument values to them.
This means we no longer need to write assignments like `this.email = email;` manually.

#### Getters and setters 
Let's see the usual syntax for getter and setter functions in TS.
We use the JS keywords `get` and `set`:
```ts
class User {

    private _courseCount = 1;
    private readonly city: string = "Delhi";
    
    constructor(
        public email: string,
        public name: string,
    ) { }

    get getAppleEmail(): string {
        return `apple${this.email}`;
    }

    get courseCount(): number {
        return this._courseCount;
    }

    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("Course count should be more than 1.")
        }
        this._courseCount = courseNum;
    }
}

```
- If get exists but no set, the property is **automatically readonly.**
- If **the type of the setter parameter** is not specified, it **is inferred from the return type of the getter**.

> ⚠️ Note that a setter cannot have a return type annotation, not even `void`.

#### Protected
We use the `extends` keyword to create a subclass and inherit from another class.
Syntax: 
```ts
class subUser extends User {
    // class definition
}
```
Private properties and methods from the parent class are not accessible within the child class.
However, if we mark those members as protected instead, they can be accessed by any subclass, while remaining inaccessible from outside the class hierarchy.

Example:
```ts
class User {
    protected _courseCount = 1;  // accessible in subclasses
    private readonly city: string = "Delhi"; // not accessible in subclasses

    constructor(public email: string, public name: string) {}
}

class SubUser extends User {
    isFamily: boolean = true;

    changeCourseCount() {
        this._courseCount = 4;  // allowed (protected)
        // this.city = "Mumbai"; // error (private)
    }
}
```

#### Static Properties and Methods
Static properties and methods belong to the class itself, not to its instances.
They are defined using the `static` keyword, and they can be accessed directly through the class name.

```ts
class User {
    static count = 0; // static property

    constructor(public name: string) {
        User.count++; // access via class name
    }

    static getCount() {
        return `Total users: ${User.count}`;
    }
}

const u1 = new User("Alice");
const u2 = new User("Bob");

console.log(User.count);       //  2
console.log(User.getCount());  // "Total users: 2"
console.log(u1.count);         // undefined
```

- **Static members belong to the class constructor**, not to the individual objects created with new.
- You cannot access a static property directly from an instance.
- They are typically used for shared data, counters, or utility methods.

##### Private Static Members
In TypeScript, static members can also be combined with modifiers like `private`, `protected`, or `readonly`.

```ts
class Config {
    private static readonly API_URL = "https://api.example.com";

    static getUrl() {
        return this.API_URL; // valid inside the class
    }
}

console.log(Config.getUrl()); // "https://api.example.com"
console.log(Config.API_URL);  // Error: property is private
```

##### Compiled JavaScript Output
After compiling, TypeScript generates standard JavaScript that attaches static members directly to the class (function) object. For the class User created before:
```js
class User {
    constructor(name) {
        this.name = name;
        User.count++; // access via class name
    }
    static getCount() {
        return `Total users: ${User.count}`;
    }
}
User.count = 0; // static property
const u1 = new User("Alice");
const u2 = new User("Bob");
console.log(User.count); //  2
console.log(User.getCount()); // "Total users: 2"
console.log(u1.count); // undefined
```

Remember that, in JavaScript, classes are just syntactic sugar over functions.
Static properties are stored on the constructor itself, not on the prototype.

> Note: Depending on your TypeScript configuration (target and useDefineForClassFields), the initialization of count may appear inside the class or as a separate assignment after the class declaration (like the example), but both behave exactly the same at runtime.


##### Accessing Static Members from an Instance
Although static properties and methods belong to the class itself (not its instances), it’s technically possible to access them indirectly through the instance’s constructor.

Every object instance in JavaScript holds an internal reference to the constructor function that created it.
That means we can follow this link and reach any static member defined on the class.

```ts
class User {
    static role = "admin";

    constructor(public name: string) {}
}

const u1 = new User("Alice");

console.log(User.role);              // ✅ "admin"
console.log(u1.role);                // ❌ undefined (not part of the instance)
console.log(u1.constructor.role);    // ⚙️ "admin" (accessible through the constructor)
```

Here, `u1.constructor` refers to the `User` class itself, so the last line works, even though `role` is not an instance property.

Why this works?

JavaScript’s prototype chain allows property lookups to traverse multiple levels:
- When you access `u1.role`, the engine looks for role on the object itself.
- If not found, it checks `u1.__proto__` (the class prototype).
- Static members are not stored there, so the search stops.
- However, you can still reach the constructor (`u1.constructor`) and access its static members manually

##### Static Access Comparison
| Language                    | Real static behavior                        | Accessible from instance                          | Notes                                   |
| --------------------------- | ------------------------------------------- | ------------------------------------------------- | --------------------------------------- |
| **JavaScript / TypeScript** | ✅ Yes — attached to the class (constructor) | ⚠️ Indirectly possible via `instance.constructor` | JS lacks strict encapsulation           |
| **Python**                  | ⚠️ Not truly static                         | ✅ Fully accessible via instance                   | Class attributes are shared but mutable |
| **Java / C#**               | ✅ Strictly static                           | ❌ Not accessible from instance                    | Fully separated at runtime              |

### Why interface is important [top ↑](#)
We'll be working on the [following file](/03_purets/src/second.ts)

Let’s start with a simple interface:
```ts
interface TakePhoto {
    cameraMode: string
    filter: string
    burst: number
}
```

Now, suppose we want to create a class that implements this interface:
```ts
class Instagram implements TakePhoto {

}
```
As soon as we finish typing, the IDE highlights this error: 
_Class 'Instagram' incorrectly implements interface 'TakePhoto'._
TypeScript is already warning us that the class must implement all the properties defined in the `TakePhot` interface.
In other words, any class that implements an interface is contractually required to provide the same structure, otherwise, TypeScript will raise a compile-time error.

```ts
class Instagram implements TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number
    ) {

    }
}
```

Now, let's see one more example. We're going to implement another class with an additional property: 
```ts
class Youtube implements TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number,
        public short: string
    ) {

    }
}
```

And let's say we want to implement another interface as well for this new class: 
```ts
interface Story {
    createStory(): void
}
```

Now, in our `Youtube` class:
```ts
class Youtube implements TakePhoto, Story {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number,
        public short: string
    ) {

    }

    createStory(): void {
        console.log("Story was created.");
    }
}
```

Interfaces are fundamental in TypeScript because they allow you to define contracts for your code.
When a class implements an interface, TypeScript ensures that the class conforms to a specific structure, which brings several key benefits:
- **Consistency**: Every class that implements the interface must have the same required properties and methods. This keeps your code predictable and easier to understand.
- **Type safety**: TypeScript checks that your objects follow the expected shape at compile time, so many bugs are caught before runtime.
- **Reusability**: Interfaces make it easy to define a single “blueprint” that can be shared across multiple classes or objects, reducing duplication.
- **Polymorphism**: You can write functions that work with any object implementing a given interface, regardless of the concrete class.


### Abstract class [top ↑](#)
We'll be working on the [following file](/03_purets/src/abstractClass.ts)

An abstract class in TypeScript is a class that cannot be instantiated directly.
It serves as a base or blueprint for other classes to extend, ensuring they follow a certain structure while still allowing shared functionality.
```ts
abstract class TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string
    ) { }
}
```
If we try to create an instance of this class directly:
```ts 
const user = new TakePhoto("test", "Test");
```
TypeScript throws an error:
_Cannot create an instance of an abstract class.ts_ 
That’s because abstract classes are not meant to create objects, they are designed to be inherited.

#### Extending an abstract class
To use an abstract class, we must create a subclass that extends it:
```ts
class Instagram extends TakePhoto {
    
}

const user = new Instagram("test", "Test");
```

Now it works, because Instagram provides a concrete implementation of TakePhoto.

However, the base class itself still cannot be instantiated.

#### Abstract methods
Abstract classes can also define abstract methods, which are methods declared but not implemented.
Any subclass extending the abstract class must implement these methods.
```ts
abstract class TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string
    ) { }

    abstract getSepia(): void
}
```
This means that any class extending `TakePhoto` must provide its own definition of `getSepia()`.

#### Abstract and Regular Methods Together
An abstract class can contain both abstract methods (to be implemented by child classes) and regular methods (already implemented).
```ts
abstract class TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string
    ) { }

    abstract getSepia(): void
    getReelTime(): number {
        //some complex calculation
        return 8;
    }
}


class Instagram extends TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number
    ) {
        super(cameraMode, filter)
    }

    getSepia(): void {
        console.log("Sepia");
    }
}

const user = new Instagram("test", "Test", 3);
```

Here, the subclass Instagram must implement `getSepia()` but can optionally override the `getReelTime()` method if it needs a different behavior.
(We could implement or not the `getReelTime()` method, or even redefine it in the child class.)

#### Difference Between Abstract Classes and Interfaces

| Feature                          | **Abstract Class**                                                         | **Interface**                                         |
| -------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Purpose**                      | Acts as a *base blueprint* with both implemented and unimplemented methods | Defines a *contract* with no implementation           |
| **Instantiation**                | ❌ Cannot be instantiated directly                                          | ❌ Cannot be instantiated                              |
| **Method Implementation**        | Can contain both abstract and concrete methods                             | Can only declare methods, no implementation           |
| **Inheritance / Implementation** | A class can extend **only one** abstract class                             | A class can implement **multiple** interfaces         |
| **Use Case**                     | When classes share common logic or behavior                                | When different classes must follow the same structure |

> In short: Use interfaces to define what a class should do. Use abstract classes when you also need to share how part of it is done.

### Generics [top ↑](#)
> Check out the official docs → [Generics ](https://www.typescriptlang.org/docs/handbook/2/generics.html)
> We'll be working on the [following file](/03_purets/src/myGenerics.ts)

In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is `generics`, that is, being able to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types.

Let's see the following example: 
```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

We say that this version of the identity function is _generic_, as it works over a range of types. 

Once we’ve written the generic identity function, we can call it in one of two ways. The first way is to pass all of the arguments, including the type argument, to the function:
```ts
let output = identity<string>("myString");
```

Here we explicitly set Type to be string as one of the arguments to the function call, denoted using the <> around the arguments rather than ().

The second way is also perhaps the most common. Here we use type argument inference — that is, we want the compiler to set the value of Type for us automatically based on the type of the argument we pass in:

```ts
let output = identity("myString");
```

While type argument inference can be a helpful tool to keep code shorter and more readable, you may need to explicitly pass in the type arguments as we did in the previous example when the compiler fails to infer the type, as may happen in more complex examples.

#### Generic functions
Let’s expand on our previous example and explore why generics are such a powerful feature.

Without generics, we might try to make our functions flexible by using union types or any, as in:
```ts
function indentityOne(val: boolean | number): boolean | number {
  return val;
}

function identityTwo(val: any): any {
  return val;
}
```

Both of these approaches work, but they sacrifice type safety.
- The first one (boolean | number) restricts us to only two types.
- The second one (any) removes type checking completely — we lose all guarantees about what the function returns.

To solve this, we can use type parameters, represented between angle brackets <>.
Let’s define a generic identity function:
```ts
function identityThree<Type>(val: Type): Type {
  return val;
}
```

Now the function keeps track of the type of val and guarantees that the return type will be exactly the same.
```ts
identityThree(3)        // Type inferred as number
identityThree("Three")  // Type inferred as string
```

We can rename the type parameter to anything we like — by convention, single letters such as `T` are commonly used:
```ts
function identityFour<T>(val: T): T {
  return val;
}
```

The `<T>` here is a placeholder for a type that will be provided later (either explicitly or inferred).
When we call `identityFour(42)`, TypeScript knows that `T` is number.
When we call `identityFour("hello")`, it infers `T` as string.

#### Generics with interfaces
You can “feed” a generic function with **interfaces** to guarantee the shape of the object flowing through it. Starting point:
```ts
// Interface
interface Bottle {
    brand: string;
    type: number;
}
```

##### Passing the type parameter explicitly
If you supply the type parameter, TypeScript will check that the argument **conforms** to the interface:
```ts
// Error: missing Bottle properties
identityFour<Bottle>({});

// OK: object satisfies Bottle
identityFour<Bottle>({ brand: "Acme", type: 1 });
```
##### Letting the compiler **infer** the type
Often you don’t need to write `<Bottle>` at all; if the argument has the right shape, TS infers it and preserves the type downstream:
```ts
const result = identityFour({ brand: "Acme", type: 1 });
// Inferred: { brand: string; type: number }
```

When to **explicitly** annotate the type:
- When the argument is too “empty” (`{}`) and TS can’t infer.
- When you want to **enforce** a specific shape for clarity or API design.
- When multiple generics are involved and inference gets ambiguous.

##### Incremental construction (with a *type assertion*)
Sometimes you initialize “empty” and fill later. A type assertion tells TS the object will be a `Bottle` once you’re done:
```ts
const b = {} as Bottle;
b.brand = "Acme";
b.type = 1;

identityFour<Bottle>(b); 
```

> Don't use assertions: they bypass some compile-time checks.

#### Generics in Array and Arrow functions
So far we’ve seen how generics work with simple values and interfaces.  
Now let’s explore them in the context of **arrays** and **arrow functions**, two very common use cases.

##### Generic functions handling arrays
Generics are particularly useful when working with collections, since they let you express “an array of *something*” while keeping type information intact.
```ts
function getSearchProducts<T>(products: T[]): T {
    // ...some database operations
    const myIndex = 3;
    return products[myIndex];
    }
```
This function takes an array of any type `T` (e.g. `number[]`, `string[]`, `Product[]`)  
and returns an element of that same type.

- `T[]` and `Array<T>` are **equivalent notations**.  
- You can choose whichever feels clearer in your context — both mean “array of T”.

Example usage:
```ts
const ids = [1, 2, 3, 4, 5];
const id = getSearchProducts(ids);          // Type inferred as number

const names = ["Anna", "Ben", "Carla", "David", "Eva"];
const name = getSearchProducts(names);      // Type inferred as string
```

TypeScript keeps full type safety — `id` will always be a `number`,  
and `name` will always be a `string`.

##### Arrow function version
The same logic can be written as an arrow function.  
```ts
const getMoreSearchProducts = <T>(products: T[]): T => {
    // ...some database operations
    const myIndex = 4;
    return products[myIndex];
};
```

##### Generics in arrow functions and TSX files
When writing generic **arrow functions**, TypeScript uses angle brackets (`< >`) to declare the type parameter — the same brackets JSX uses for components.  

In `.tsx` files, this can lead to ambiguity:  
TypeScript might interpret `<T>` as the start of a JSX element instead of a generic.

To fix this, you can add a **trailing comma** after the type parameter to make the intent explicit:
```ts
const identityArrow = <T,>(value: T): T => value;
```

That comma (`<T,>`) clearly tells the compiler that this is **generic syntax**, not JSX.  
This pattern is very common in React + TypeScript projects, especially in hooks or higher-order components.

#### Constraining generics with `extends`
Sometimes we don’t want our generic type to be *completely free*.  
We want to make sure it satisfies **certain conditions** — for example, it should have specific properties or even extend another type or interface.  
That’s where `extends` comes in.

**Basic constraint:**
```ts
// Basic example with a simple constraint
function anotherFunction<T, U extends number>(valOne: T, valTwo: U): object {
    return {
        valOne,
        valTwo
    }
}

anotherFunction(3, 3.5);     // ✅ OK
// anotherFunction(3, "Four"); // ❌ Error: 'string' is not assignable to 'number'
```

Here we declare two generic types:  
- `T` can be **anything**  
- `U` must be a **number or subtype of number**

This ensures that TypeScript enforces the second argument’s type, while keeping the function flexible for the first.

##### Extending custom interfaces
You can also constrain a type parameter to a **custom interface**, ensuring that whatever is passed in satisfies that contract.
```ts
interface Database {
    connection: string;
    username: string;
    password: string;
}

function anotherFunction<T, U extends Database>(valOne: T, valTwo: U): object {
    return {
        valOne,
        valTwo
    }
}

// ✅ OK: valTwo implements Database
anotherFunction(3, { connection: "", username: "", password: "" });

// ❌ Error if any property is missing or of the wrong type
```
By constraining `U` to extend `Database`, TypeScript guarantees that `valTwo` includes  
at least the properties `connection`, `username`, and `password`.

##### Practical examples
Constraints are especially useful when working with objects that must contain certain fields.
```ts
function withBrand<T extends { brand: string }>(val: T): T {
    // val.brand exists and is a string
    return val;
}

withBrand({ brand: "Acme", type: 1 });        // ✅
withBrand({ brand: "Acme", extra: true });    // ✅
// withBrand({ type: 1 });                    // ❌ missing brand
```

#### Typed property access with `keyof`
The `keyof` operator works hand in hand with generic **constraints**, letting you write  
functions that are both **flexible** (work with any object) and **type-safe** (know exactly what keys exist).

**Let’s start with the goal:** 
we want a function that retrieves a property value from any object —  
but only if the property **actually exists** on that object.

If we tried to write this without generics, TypeScript wouldn’t know which properties are valid:
```ts
function getProp(obj: any, key: string) {
    return obj[key];
}
```

This works, but there’s no type checking — you could call `getProp(obj, "anything")`  
and get no compile-time error.

**Building a type-safe version:**
To make this type-safe, we can use two generic parameters:

- `T` → represents the type of the object we’re working with.  
- `K` → represents a specific key of that object, but **must** be one of the valid keys.

We enforce that using `extends keyof T`:
```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
```

**Explanation:**
- `keyof T` produces a **union of all property names** of `T`.  
  For example, if `T` is `{ brand: string; type: number }`, then  
  `keyof T` becomes `"brand" | "type"`.
- `K extends keyof T` means *K must be one of those valid keys*.
- The return type `T[K]` gives you the **type of that property**, e.g. `string` or `number`.

**Example:**
```ts
interface Bottle {
    brand: string;
    type: number;
}

const bottle: Bottle = { brand: "Acme", type: 1 };

const brand = getProp(bottle, "brand"); // ✅ type: string
const type  = getProp(bottle, "type");  // ✅ type: number
// getProp(bottle, "color");            // ❌ Error: 'color' is not a key of Bottle
```

**Here’s what’s happening:**

- When calling `getProp(bottle, "brand")`,  
  TypeScript infers `T = Bottle` and `K = "brand"`.  
  It knows that `bottle["brand"]` is a `string`,  
  so the return type of this call is `string`.

- If you try to access `"color"`, the compiler instantly complains,  
  because `"color"` is not part of `"brand" | "type"`.

You’ll often see this approach in libraries, utility functions, or frameworks  
that manipulate objects dynamically while preserving type safety.


#### Generic Classes
Just like functions, **classes** can be parameterized with generics,  
allowing them to store or operate on multiple types while staying type-safe.

Here’s a simple example:
```ts
interface Quiz {
    name: string;
    type: string;
}

interface Course {
    name: string;
    author: string;
    subject: string;
}

class Sellable<T> {
    public cart: T[] = [];

    addToCart(product: T) {
        this.cart.push(product);
    }
}
```

Now you can create specialized versions of `Sellable` for different entities:
```ts
const quizCart = new Sellable<Quiz>();
quizCart.addToCart({ name: "TS Basics", type: "MCQ" });

const courseCart = new Sellable<Course>();
courseCart.addToCart({ name: "TypeScript 101", author: "Moure", subject: "Programming" });
```

Each instance enforces the correct structure for the items it stores,  
without needing to duplicate logic or sacrifice type safety.

### Type Narrowing [top ↑](#)
> Check out the official docs → [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)  
> We'll be working on the [following file](/03_purets/src/detection.ts)

**Type narrowing** is how TypeScript refines a union type down to a more specific type based on control flow. Below are the most common techniques.

#### 1) `typeof` guards
```ts
function detectType(val: number | string) {
    if (typeof val === "string") {
        return val.toLowerCase();
    }
    return val + 3; // here val is number
}
```

`typeof` checks let TS narrow `val` to `string` in the `if` branch and `number` in the `else`.

#### 2) Truthiness checks (null/undefined)
```ts
function provideId(id: string | null) {
    if (!id) {
        console.log("Please provide ID");
        return;
    }
    id.toLowerCase(); // id is string here
}
```

A simple truthy/falsy check removes `null` (or `undefined`) from the union.

#### 3) Narrowing unions with arrays and strings
```ts
function printAll(strs: string | string[] | null) {
    // !!!!!!!!!!!!!!!!
    //  DON'T DO THIS!
    //   KEEP READING
    // !!!!!!!!!!!!!!!!
        if (strs) {
        if (typeof strs === "object") {
            for (const s of strs) {
                console.log(s);
            }
        } else if (typeof strs === "string") {
            console.log(strs);
        }
    }
}
```

⚠️ Be explicit rather than relying on loose truthiness:
```ts
function printAll(strs: string | string[] | null) {
    if (strs === null) return;

    if (Array.isArray(strs)) {
        for (const s of strs) {
            console.log(s);
        }
    } else {
        // here strs is string
        console.log(strs);
    }
}
```
Prefer `Array.isArray` and explicit `null` checks to avoid accidental mis-narrowing.

#### 4) The `in` operator
```ts
interface User {
    name: string;
    email: string;
}

interface Admin {
    name: string;
    email: string;
    isAdmin: boolean;
}

function isAdminAccount(account: User | Admin) {
    if ("isAdmin" in account) {
        return account.isAdmin; // account is Admin here
    }
}
```
`"prop" in obj` narrows to the branch where that property exists.

#### 5) `instanceof` and **type predicates**
```ts
function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toISOString());
    } else {
        console.log(x.toUpperCase());
    }
}
```

For your own unions, create **user-defined type guards** using a *type predicate* (`pet is Fish`):
```ts
type Fish = { swim: () => void };
type Bird = { flies: () => void };

function isFish(pet: Fish | Bird): pet is Fish { 
    return (pet as Fish).swim !== undefined;
} // true or false

function getFood(pet: Fish | Bird) {
    if (isFish(pet)) {
        // pet: Fish
        return "fish food";
    } else {
        // pet: Bird
        return "bird food";
    }
}
```

The return type `pet is Fish` tells TS that inside the `if` branch, `pet` is a `Fish`.

#### 6) Discriminated unions & exhaustiveness (`never`)
Give each variant a **discriminant** (a common literal property like `kind`) and narrow via `switch`:
```ts
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    side: number;
}

interface Rectangle {
    kind: "rectangle";
    length: number;
    width: number;
}

type Shape = Circle | Square | Rectangle;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side * shape.side;
        case "rectangle":
            return shape.length * shape.width;
        default:
            // Exhaustiveness check:
            const _defaultForShape: never = shape;
            return _defaultForShape;
    }
}
```

[Back to top ↑](#)
