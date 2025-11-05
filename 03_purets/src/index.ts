// console.log("Typescript is here!");
// console.log("Typescript is amazing!");

// Classes

// class User {
//     email: string;
//     name: string;
//     private readonly city: string = "Delhi";
//     constructor(email: string, name: string) {
//         this.email = email;
//         this.name = name;
//     }
// }

// const user1 = new User("h@h.com", "hitesh");

// Getter & setters

// class User {

//     private _courseCount = 1;
//     private readonly city: string = "Delhi";

//     constructor(
//         public email: string,
//         public name: string,
//     ) { }

//     private deleteToken() {
//         console.log("Token deleted");
//     }

//     get getAppleEmail(): string {
//         return `apple${this.email}`;
//     }

//     get courseCount(): number {
//         return this._courseCount;
//     }

//     set courseCount(courseNum) {
//         if (courseNum <= 1) {
//             throw new Error("Course count should be more than 1.")
//         }
//         this._courseCount = courseNum;
//     }


// }

// const user1 = new User("h@h.com", "hitesh");

// Protected

// class User {

//     protected _courseCount = 1;

//     constructor(
//         public email: string,
//         public name: string,
//     ) { }

//     get courseCount(): number {
//         return this._courseCount;
//     }

//     set courseCount(courseNum) {
//         if (courseNum <= 1) {
//             throw new Error("Course count should be more than 1.")
//         }
//         this._courseCount = courseNum;
//     }
// }

// class SubUser extends User {
//     isFamily: boolean = true;

//     changeCourseCount() {
//         this._courseCount = 4;  // allowed (protected)
//         // this.city = "Mumbai"; // error (private)
//     }
// }


// Static properties

// class User {
//     static count = 0; // static property

//     constructor(public name: string) {
//         User.count++; // access via class name
//     }

//     static getCount() {
//         return `Total users: ${User.count}`;
//     }
// }

// const u1 = new User("Alice");
// const u2 = new User("Bob");

// console.log(User.count);       //  2
// console.log(User.getCount());  // "Total users: 2"
// console.log(u1.count);         // undefined

// Private Static Members

// class Config {
//     private static readonly API_URL = "https://api.example.com";

//     static getUrl() {
//         return this.API_URL; // valid inside the class
//     }
// }

// console.log(Config.getUrl()); // "https://api.example.com"
// console.log(Config.API_URL);  // Error: property is private

// Accesing static members via instance

// class User {
//     static role = "admin";

//     constructor(public name: string) { }
// }

// const u1 = new User("Alice");

// console.log(User.role);              // "admin"
// console.log(u1.role);                // undefined (not part of the instance)
// console.log(u1.constructor.role);    // "admin" (accessible through the constructor)
