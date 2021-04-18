import { User } from "../rest";

export class UserClass implements User { 
    user_id?: number;
    name: string;
    password: string;
    email: string;
    age: number;

    constructor(name: string,password: string,email: string,age: number)
    {
        this.name = name;
        this.password = password;
        this.email = email;
        this.age = age;
    }

}