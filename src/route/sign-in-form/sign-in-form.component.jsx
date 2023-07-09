import FormInput from "../../components/form-input/form-input.component"
import { auth, signInWithGooglePopup , createUserDocumentFromAuth, signAutInWithEmailAndPassword} from "../../utils/firebase.utils"
import { useState } from "react"
import Button, {BUTTON_TYPE_CLASSES} from "../../components/button/button.component"
import './sign-in-form.styles.scss'

const SignInForm = () => {
    const defautFormfield = {
        email: '',
        password: '',
    }

  

    const handleChange = (event) => {
        const {name,value} = event.target
        setFormField({...formFields, [name]:value})
    
    }

    const resetFormFields = () => {
        setFormField(defautFormfield)
       }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }

    const SignInWithEmailAndPassword = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signAutInWithEmailAndPassword(email, password);

            resetFormFields()
        } catch(error) {
            switch(error.code) {
                case error.code === 'auth/wrong-password':
                  alert('Incorrect password for email')
                  break
                case error.code === 'auth/user-not-found':
                    alert('No user associated with this user')
                    break
                default:    
                    console.log(error)
            }
        }
    }
    
    const [formFields,setFormField]=useState(defautFormfield)
    const { email, password} = formFields

    return (
        <div className="sign-up-container">
        <h1>Sign In</h1>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={SignInWithEmailAndPassword}>
            <FormInput label="Email" type="text" required onChange={handleChange} name="email" value={email}/>
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
            <div className="buttons-container">
                <Button type="submit">SIGN IN</Button>
                <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
            </div>
        </form>
        </div>

    )
}

export default SignInForm