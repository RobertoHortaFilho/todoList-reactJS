import { stringify } from "querystring"
import { json } from "stream/consumers"


interface Iresponse{
    response: boolean
}

interface Ilogin{
    email:string,
    password:string
}


export class RequestsUsers{
    
    private readonly baseLink:string = encodeURI('https://todo-list-api-six.vercel.app')




    public async login(body:Ilogin) :Promise<Iresponse>{

        const requestOptions = {
            method : 'POST',
            headers : {'Content-Type':' application/json'},
            body : JSON.stringify(body),
        }

        const request = await fetch(`${this.baseLink}/users/login`,requestOptions)
        const data:Iresponse = await request.json()
        return data
    }

}