import { useState, useEffect } from 'react';
import noteStyle from './Note.module.css'
import {Request, INotebody} from '../Requests/HttpRequest'
const req = new Request();

interface noteProps {
    title?:string;
    content?:string;
    _id:string;
    userId:string;
    keyIndex:number;
    reload():void;
}


export function Note(props:noteProps){
    const [popUp,setPopUp] = useState<boolean>(false)
    const [changeTitle, setChangeTitle] = useState<boolean>(false)
    const [changeContent, setChangeContent] = useState<boolean>(false)
    const titleid = `titleForm${props.keyIndex}`
    const contentid = `contentForm${props.keyIndex}`
    const [saveAttempt, setSaveAttempt] = useState<boolean>(false) 

    useEffect(()=>{
        if(changeTitle){
            const titleInput = document.getElementById(titleid) as HTMLInputElement
            titleInput.value = props.title!
        }
    },[changeTitle])

    useEffect(()=>{
        if(changeContent){
            const contentInput = document.getElementById(contentid) as HTMLInputElement
            contentInput.value = props.content || ''
        }
    },[changeContent])


    function Salvar(){          //salvar o note
        if(!changeTitle && !changeContent){
            return
        }
        
        const updateBody:INotebody = {
            userId: props.userId,
            content: props.content,
            title: props.title
        }

        if(changeContent){
            const contentInput = document.getElementById(contentid) as HTMLInputElement
            updateBody.content = contentInput.value
        }
        if(changeTitle){
            const titleInput = document.getElementById(titleid) as HTMLInputElement
            updateBody.title = titleInput.value
        }

        req.MethodUpdateNotes(updateBody, props['_id']!).then((data)=>{
            if(data.response){
                //atualizado com sucesso
            }else{
                //error
            }
            props.reload()
            setChangeContent(false)
            setChangeTitle(false)
            setSaveAttempt(false)
        })


        
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
            {changeTitle ? // TITLE
                <textarea name="title" id={titleid}
                className={`${noteStyle.title} ${noteStyle.titleInput}`}
                /> 
            :
                <p className={noteStyle.title} onClick={()=>{
                    if (popUp){return}
                    setChangeTitle(true)
                }}
                > {props.title || 'titulo'} </p>
            }
            {changeContent? //CONTENT
                <textarea name="title" id={contentid} 
                className={`${noteStyle.content} ${noteStyle.contentInput}`}/>
            :
                <div className={noteStyle.content} 
                onClick={()=>{
                    if(popUp){return}
                    setChangeContent(true)
                    
                }}> {props.content || 'content'} </div>
            }
            
            
            {saveAttempt &&
            <p className={noteStyle.saveAttempt}>confirme as alterações</p>
            }
            <button className={noteStyle.delete} onClick={()=>{
                if(changeContent || changeTitle){
                    setSaveAttempt(true)
                    return
                }
                setPopUp(!popUp)}}></button>
            <button type='submit' className={noteStyle.confirm} onClick={()=>{Salvar()}}></button>
            
        </div>
    )
}







