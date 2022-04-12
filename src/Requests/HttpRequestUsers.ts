

interface Iresponse{
    response: boolean
}

interface Ilogin{
    email:string,
    password:string
}

interface InewAccount{
    email:string,
    password:string,
    userName:string
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

    public async createAccount(body:InewAccount):Promise<Iresponse>{
        this.Emailexist(body.email).then(exist =>{
            console.log(exist)
            return {response: exist}
        })
        
        return {response: false}
        
    }

    private async Emailexist(email:string):Promise<boolean>{
        const router = `${this.baseLink}/users/email/${email}`
        const response = await fetch(router)
        const data:Iresponse = await response.json()
        return data.response
    }


    public async verifyToken(email:string){

    }

    public async sendEmail(email:string){

    }

}