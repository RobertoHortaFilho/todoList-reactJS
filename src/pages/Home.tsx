import { ReactNode, useEffect, useState } from 'react';
import { Note } from '../components/Note';
import { NewNote, Inotes } from '../components/NewNote';
import styles from '../Home.module.css';
import popUp from '../components/NewNote.module.css'
import { Request } from '../Requests/HttpRequest'
import { notDeepEqual } from 'assert';

const req = new Request()


export function HomePage(){
    const [aparecer, setAparecer] =  useState<boolean>(false)
    const [notes, setNotes] = useState<Inotes[]>([])
    const [popUpElement, setPopUpElement] = useState<HTMLElement>()


    async function getNotes(){
        const id = '62469fa0a8760599b47be801'
        const data = await req.MethodgetNotesUsers(id)
        if(data.response == true){
            setNotes(data.notes!)
        }
    }

    function setPopup(setElement:HTMLElement){
        setPopUpElement(setElement)
    }
    
    function switchPopup(){
        if(aparecer === true){  
            popUpElement?.classList.add(popUp.fadeOut)
            console.log('vai aparecer')
        }
        setTimeout(()=>{setAparecer(!aparecer)},500) 
    }

    useEffect(()=>{
        getNotes()


    },[])

    return (
        <div >
            <div id="header" className={styles.header}>
                <h1 className={styles.headerTitulo}>ToDoList</h1>
                <div className={styles.headerNotes} onClick={() => switchPopup()}></div>
                <div className={styles.headerButton}></div>
            </div>
            {aparecer &&
                <NewNote closeWindow={switchPopup} setPopup={setPopup} reload={getNotes}></NewNote>
            }
            
            <div id='notes-container' className={styles.notesContent}>
                {notes.map((note:Inotes, index) =>{                   
                    return <Note 
                    _id={note['_id']} 
                    userId={note.userId} 
                    keyIndex={index}
                    key={note['_id']}
                    title={note.title} 
                    content={note.content}
                    reload={getNotes}/>    
                })as ReactNode}
                


            </div> 
            
        </div>
    )
}


