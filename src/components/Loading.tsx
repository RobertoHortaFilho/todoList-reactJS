import style from './Loading.module.css'

export function Loading(){


    return (
        <>
            <div className={style.load}></div>
            <div className={`${style.load} ${style.load2}`}></div>

        </>
    )
}
