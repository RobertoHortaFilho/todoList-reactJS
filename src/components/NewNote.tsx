import styles from './NewNote.module.css'
import { useEffect} from 'react'
import { Request, INotebody } from '../Requests/HttpRequest'
const req = new Request()

interface InewNote {
    closeWindow(): void;
    setPopup(element:HTMLElement):void;
    reload():void
}

export interface Inotes {
    content?: string;
    title: string;
    userId: string;
    _id: string;


}

function NewNote(props:InewNote){

    useEffect(()=>{
        const conteiner = document.getElementById('popup') as HTMLElement;
        props.setPopup(conteiner)
    },[])


    function saveNote(){
        event!.preventDefault();
        const titleObj = document.getElementById('title') as HTMLInputElement;
        const title:string = titleObj.value.trim()
        const contentObj = document.getElementById('content') as HTMLInputElement;
        const content:string = contentObj.value.trim();

        if(title == ''){
            const titleLabel = document.getElementById('titleLabel') as HTMLElement
            titleLabel.innerHTML = 'TITLE: adicione um titulo por favor'
            return
        }
        const titleLabel = document.getElementById('titleLabel') as HTMLElement
        titleLabel.innerHTML = 'TITLE:'

        if(content == ''){
            const contentLable = document.getElementById('contentLabel') as HTMLElement;
            contentLable.innerHTML = 'CONTENT: adicione um conteudo'
            return
        }
        const contentLable = document.getElementById('contentLabel') as HTMLElement;
        contentLable.innerHTML = 'CONTENT:'


        const userId = '62469fa0a8760599b47be801'
        const body:INotebody = {
            title: title,
            content: content,
            userId: userId,
        }


         req.MethodpostNotes(body).then( data => {
            if(data.response){
                props.reload()
            }
        })



        props.closeWindow()
    }





    return(
        <>
            <aside className={styles.popup} id='popup'>
                <p className={styles.newNoteTitle}>ToDoNotes</p>
                <form action="" method="get">
                    <label id='titleLabel'>TITLE:</label>
                    <br />
                    <textarea name="title" id="title" cols={30} rows={2} className={styles.formTitle}></textarea>
                    <br />
                    <label id='contentLabel'>CONTENT:</label>
                    <br />
                    <textarea name="content" id="content" cols={30} rows={10} className={styles.formContent}></textarea>
                    <br />
                    <input type="submit" value="adicionar" className={styles.formSubmit} 
                        onClick={saveNote}/>
                </form>
            </aside>
        </>
    )



}

export { NewNote }