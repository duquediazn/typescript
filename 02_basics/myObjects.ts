// const User = {
//     name: "Nazaret",
//     email: "naza@dev.com",
//     isActive: true
// }

// function createUser(user: { name: string, isPaid: boolean }) {
//     return `Hi: ${user.name}!`;
// }

// createUser({ name: "Nazaret", isPaid: false });

// let newUser = { name: "Nazaret", isPaid: false, email: "naza@dev.com" }

// createUser(newUser);

// function createCourse(): { name: string, price: number } {
//     return { name: "reactjs", price: 399 }
// }

// type User = {
//     name: string;
//     email: string;
//     isActive: boolean
// }

// function createUser(user: User): User {
//     return { name: "", email: "", isActive: false }
// }

// createUser({ name: "Nazaret", email: "naza@dev.com", isActive: false })

// const otherUser = { name: "Xuxa", email: "xuxa@xuxa.com" }

// createUser(otherUser)

type User = {
    readonly _id: string;
    name: string;
    email: string;
    isActive: boolean;
    creditcardDetails?: string
}

let myUser: User = {
    _id: "1234",
    name: "H",
    email: "h@h.com",
    isActive: false
}

// myUser._id = "5678";

type cardDate = {
    cardDate: string
}

type cardNumber = {
    cardNumber: string
}

type cardDetails = cardNumber & cardDate & {
    cvv: number
}


