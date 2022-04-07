import { Inotes } from '../components/NewNote';


export interface INotebody{
    title?: string;
    content?: string;
    userId?: string;
}

export interface Iresponse{
    response:boolean;
    notes?: Inotes[]
}

export class Request{
    
    private readonly baseLink:string = encodeURI('https://todo-list-api-six.vercel.app')


    public async MethodgetNotesUsers(id:String):Promise<Iresponse>{
        console.log('iniciando metodo')
        const request = await fetch(`${this.baseLink}/notes/${id}`)
        const data:Iresponse = await request.json();
        return data;
    }

    public async MethodpostNotes(body:INotebody):Promise<Iresponse>{
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        }

        const request = await fetch(`${this.baseLink}/notes`,requestOptions)
        const data:Iresponse = await request.json();
        return data;
    }

    public async MethodDeleteNotes(noteId:string):Promise<Iresponse>{
        const request = await fetch(`${this.baseLink}/notes/${noteId}`,
        {method:'DELETE'})
        const data:Iresponse = await request.json();
        return data
    }
}


