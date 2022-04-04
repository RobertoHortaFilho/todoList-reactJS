import noteStyle from './Note.module.css'

interface noteProps {
    title?:string;
    content?:string;
    key:number;
}


function Note(props:noteProps){
    const texto = 'dsdsd'
    return (
        <div  className={noteStyle.note}>
            <p className={noteStyle.title}> {props.title || 'ti'} </p>
            <p className={noteStyle.content}> {props.content || 'con'} </p>
        </div>
    )
}





export { Note }