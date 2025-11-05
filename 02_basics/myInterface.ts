interface User {
    readonly dbId: number,
    email: string,
    userId: number,
    googleId?: string
}

interface User {
    // startTrail: () => string
    startTrail(): string
}

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


// Extending interfaces
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