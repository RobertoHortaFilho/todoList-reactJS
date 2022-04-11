import { useState, useEffect } from 'react';
import noteStyle from './Note.module.css'
import {Request} from '../Requests/HttpRequest'
const req = new Request();

interface noteProps {
    title?:string;
    content?:string;
    _id:string;
    userId?:string;
    key:number;
    reload():void;
}


export function Note(props:noteProps){

    const [popUp,setPopUp] = useState<boolean>(false)
    const [changeTitle, setChangeTitle] = useState<boolean>(false)
    const [changeContent, setChangeContent] = useState<boolean>(false)

    function Salvar(){          //salvar o note
        if(!changeTitle && !changeContent){
            return
        }
        setChangeContent(false)
        setChangeTitle(false)
    }


    return (
        <div  className={noteStyle.note} onClick={()=>{
            if(popUp === true){
                setPopUp(false)
            }
            
            
            }}>
            {popUp && 
                <div className={noteStyle.popUpdelete}>
                    <div className={noteStyle.popUpMsg} id='message'> Deseja excluir a nota? </div>
                    <button className={noteStyle.popUpButton} onClick={()=>{
                        setPopUp(false)
                        
                    }} id='cancel'>Cancel</button>
                    <button className={noteStyle.popUpButton} onClick={()=>{
                        req.MethodDeleteNotes(props['_id']).then(data =>{
                            if (!data.response){
                                console.log('error ao apagar')
                            }else{
                                console.log('apagado')
                            }
                            props.reload()
                        })

                    }} id='confirm'>Confirm</button>   
                </div>
            }
            {changeTitle ? 
                <textarea name="title" id="formTitle" className={`${noteStyle.title} ${noteStyle.titleInput}`}/>
            :
                <p className={noteStyle.title} onClick={()=>{setChangeTitle(true)}}> {props.title || 'titulo'} </p>
            }
            {changeContent?
                <textarea name="title" id="formConetent" className={`${noteStyle.content} ${noteStyle.contentInput}`}/>
            :
                <div className={noteStyle.content} 
                onClick={()=>{setChangeContent(true)}}> {props.content || 'content'} </div>
            }
            <button className={noteStyle.delete} onClick={()=>{setPopUp(!popUp)}}></button>
            <button type='submit' className={noteStyle.confirm} onClick={()=>{Salvar()}}></button>
            
        </div>
    )
}







