import { Loading } from '../components/Loading'
import styles from './Home.module.css'
import { RequestsUsers } from '../Requests/HttpRequestUsers'
import { useState } from 'react'
const req = new RequestsUsers()

export function HomePage(){
    const [inLogin, setInLogin] = useState<Boolean>(false)

    function verifyEmail(id:string){
        const emailInput = document.getElementById(id) as HTMLInputElement
        const email = emailInput.value.trim()
        if(email.includes('@') && email.includes('.')){
            return true
        }
        return false
    }
    

    function login (){
        event!.preventDefault()
        if(!verifyEmail('emailLabelLogin')){
            return
        }
        setInLogin(true)
        const emailInput = document.getElementById('emailLabelLogin') as HTMLInputElement
        const email = emailInput.value
        const passwordInput = document.getElementById('passwordLogin') as HTMLInputElement
        const password = passwordInput.value
        passwordInput.value = ''
        
        req.login({
            email:email,
            password:password
        }).then( data =>{
            if(data.response){
                console.log('usuario aceito')
            }else{
                console.log('usuario recusado')
                
            }
            setInLogin(false)
        })
        
    }


    return(
        <div>
            <div id="header" className={styles.header}>
                <div style={{width:'100%',height:'100%',paddingTop:'2em'}}> 
                <h1 className={styles.headerTitulo}>ToDoList</h1>
                </div>
            </div>

            <div className={styles.contentBody}>
                <div className={`${styles.create} ${styles.contentAccount}`}>
                    <h1 className={styles.title}> Criar conta </h1> 
                    <form action="">
                        <p className={`${styles.labels}`} >Email: </p>
                        <input className={`${styles.inputs}`} type="email" name="email" id="emailLabelSignin" />
                       
                        <p className={`${styles.labels}`} >Password:</p>
                        <input className={`${styles.inputs}`} type="password" name="" id="passwordSignin" />
                        
                        <p className={`${styles.labels}`} >Username:</p>
                        <input className={`${styles.inputs}`} type="text" name="" id="usernameSignin" />
                        {inLogin && <Loading></Loading>}
                        <input className={`${styles.submit}`} type="submit" value="Confirmar" onClick={login}/>
                    </form>
                
                </div>


                <div className={`${styles.sign} ${styles.contentAccount}`}> 
                    <h1 className={styles.title}> Entrar </h1>
                    <form>
                        <p className={`${styles.labels}`} >Email: </p>
                        <input className={`${styles.inputs}`} type="email" name="email" id="emailLabelLogin" 
                        onBlur={()=>{ verifyEmail('emailLabelLogin')}}/>
                       
                        <p className={`${styles.labels}`} >Password:</p>
                        <input className={`${styles.inputs}`} type="password" name="" id="passwordLogin" />
                        {inLogin && <Loading></Loading>}
                        <input className={`${styles.submit}`} type="submit" value="Confirmar" onClick={login}/>
                    </form>
                </div>


            </div>
        </div>
    )
}