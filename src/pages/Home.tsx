import styles from './Home.module.css'


export function HomePage(){



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
                        <input className={`${styles.submit}`} type="submit" value="Confirmar" />
                    </form>
                
                </div>


                <div className={`${styles.sign} ${styles.contentAccount}`}> 
                    <h1 className={styles.title}> Entrar </h1>
                    <form action="">
                        <p className={`${styles.labels}`} >Email: </p>
                        <input className={`${styles.inputs}`} type="email" name="email" id="emailLabelLogin" />
                        <p className={`${styles.labels}`} >Password:</p>
                        <input className={`${styles.inputs}`} type="password" name="" id="passwordlogin" />
                        <input className={`${styles.submit}`} type="submit" value="Confirmar" />
                    </form>
                </div>


            </div>
        </div>
    )
}