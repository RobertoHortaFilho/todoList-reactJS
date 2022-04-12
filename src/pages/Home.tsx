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
        alert('escolha um email valido')
        return false
    }

    function verifyPassword(){
        const passwordInput = document.getElementById('passwordSignin') as HTMLInputElement
        const password = passwordInput.value.trim()
        let week = false
        if (password == ''){
            week = true
        }
        if (password.length < 8){
            week = true
        }
        if(week){
            alert('senha deve conter 8 characters e nao pode ser vazia')
            return false
        }
        return true
    }

    function verifyUserName(){
        const userNameInput = document.getElementById('usernameSignin') as HTMLInputElement
        const userName = userNameInput.value.trim()
        if(userName == ''){
            alert('selecione um nome de usuário valido')
            return false
        }
        return true
    }
    

    function login (){
        event!.preventDefault()
        if(!verifyEmail('emailLabelLogin')){
            return
        }
        setInLogin(true)
        const emailInput = document.getElementById('emailLabelLogin') as HTMLInputElement
        const email = emailInput.value.trim()
        const passwordInput = document.getElementById('passwordLogin') as HTMLInputElement
        const password = passwordInput.value.trim()
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

    function createAccount(){
        event!.preventDefault()
        if(!verifyEmail('emailSignin')){
            return
        }
        if(!verifyPassword()){
            return
        }
        if(!verifyUserName()){
            return
        }
        const inputEmail = document.getElementById('emailSignin') as HTMLInputElement
        const inputpassword = document.getElementById('passwordSignin') as HTMLInputElement
        const inputUserName = document.getElementById('usernameSignin') as HTMLInputElement
        const email = inputEmail.value.trim()
        const password = inputpassword.value.trim()
        const userName = inputUserName.value.trim()

        const body = {
            email,
            password,
            userName,
        }
        req.createAccount(body)


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
                        <input className={`${styles.inputs}`} type="email" name="email" 
                        id="emailSignin" onBlur={()=>{verifyEmail('emailSignin')}}/>
                       
                        <p className={`${styles.labels}`} >Password:</p>
                        <input className={`${styles.inputs}`} type="password" name="" 
                        id="passwordSignin" 
                        onBlur={verifyPassword}/>
                        
                        <p className={`${styles.labels}`} >Username:</p>
                        <input className={`${styles.inputs}`} type="text" name="" id="usernameSignin" 
                        onBlur={verifyUserName}/>


                        {inLogin && <Loading></Loading>}
                        <input className={`${styles.submit}`} type="submit" value="Confirmar" onClick={createAccount}/>
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