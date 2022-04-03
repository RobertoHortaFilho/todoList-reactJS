import styles from '../Home.module.css';
import { useState } from 'react';

interface Inotes {
    content?: string;
    title: string;
    userId: string;
    _id: string;
    update: Date;
    date: Date;

}

export function HomePage(){
    const [aparecer, setApareder] =  useState<boolean>(false)
    const [notes, setNotes] = useState<string[]>()
    
    function trocar(){
        setApareder(!aparecer)
        console.log(aparecer)
    }

    function saveNote(){
        event!.preventDefault();
        const titleObj = document.getElementById('title') as HTMLInputElement;
        const title:string = titleObj.value.trim()
        const contentObj = document.getElementById('content') as HTMLInputElement;
        const content:string = contentObj.value.trim();

        if(title == ''){
            console.log('sem titulo')
            const titleLabel = document.getElementById('titleLabel') as HTMLElement
            titleLabel.innerHTML = 'TITLE: adicione um titulo por favor'
            return
        }else{
            const titleLabel = document.getElementById('titleLabel') as HTMLElement
            titleLabel.innerHTML = 'TITLE:'
        }

        fetch('http://localhost:3030/notes/62469fa0a8760599b47be801' ).then(
            (response:Response) => response.json(),
        ).then(
            (data) => {
                setNotes(data)
                console.log(notes)
            }
        )
        
        setApareder(!aparecer)

        
    }

    return (
        <div >
            <div id="header" className={styles.header}>
                <h1 className={styles.headerTitulo}>ToDoList</h1>
                <div className={styles.headerNotes} onClick={trocar}></div>
                <div className={styles.headerButton}></div>
            </div>
            {aparecer ? 
                <aside className={styles.popup}>
                    <p className={styles.newNoteTitle}>ToDoNotes</p>
                    <form action="" method="get">
                        <label id='titleLabel'>TITLE:</label>
                        <br />
                        <textarea name="title" id="title" cols={30} rows={2} className={styles.formTitle}></textarea>
                        <br />
                        <label>CONTENT:</label>
                        <br />
                        <textarea name="content" id="content" cols={30} rows={10} className={styles.formContent}></textarea>
                        <br />
                        <input type="submit" value="adicionar" className={styles.formSubmit} 
                            onClick={saveNote}/>
                    </form>
                </aside>
            :
            <div></div>
        }
            

            <div id='notes-container' className={styles.notes}>
                <div className={styles.note}>
                    <h1 className={styles.title}>titulo</h1>
                    <p className={styles.content}>descriçao muito foda msm</p>
                </div>
                <div className={styles.note}>
                    <h1 className={styles.title}>titulo</h1>
                    <p className={styles.content}>descriçao muito foda msm</p>
                </div>
                <div className={styles.note}>
                    <h1 className={styles.title}>titulo</h1>
                    <p className={styles.content}>descriçao muito foda msm</p>
                </div>
                <div className={styles.note}>
                    <h1 className={styles.title}>titulo</h1>
                    <p className={styles.content}>descriçao muito foda msm</p>
                </div>
                <div className={styles.note}>
                    <h1 className={styles.title}>titulo</h1>
                    <p className={styles.content}>descriçao muito foda msm</p>
                </div>
                <div className={styles.note}>
                    <h1 className={styles.title}>titulo</h1>
                    <p className={styles.content}>descriçao muito foda msm</p>
                </div>
            </div> 
            
        </div>
    )
}


