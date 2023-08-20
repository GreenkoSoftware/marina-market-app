'use client'
import { Button, Input } from '@nextui-org/react'
import useAuthStore from '@/stores/user'
import { useEffect, useMemo, useState } from 'react'
import { ErrorLogin } from './Error'
import { validateEmail } from '@/utils/email'

export default function LoginForm () {
  const { signIn, loading } = useAuthStore()
  const [ validateValues, setValidateValues ] = useState(false)
  const [ sendDisabled, setSendDisabled ] = useState(false)
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ emailError, setEmailError ] = useState()
  const [ passwordError, setPasswordError ] = useState()

  const validationStateEmail = useMemo(() => {
    
    if (validateValues) {
      if (!email || email === "") {
        setEmailError("Este campo es requerido")
        return
      }
      
      const valid = validateEmail(email);
      
      if(!valid) {
        setEmailError("Ingresa un email válido.")
      } else {
        setEmailError(null)
      }
      
    }

  }, [email]);

  useEffect(() => {
    if(validateValues && (!email || !password || emailError || passwordError)) {
      setSendDisabled(true)
    } else {
      setSendDisabled(false)
    }
  }, [email, password, emailError, passwordError, validateValues])

  const validationStatePassword = useMemo(() => {
    if (validateValues && (!password || password === "")) {
        setPasswordError("Este campo es requerido")
        return
    } else {
      setPasswordError(null)
    }
  }, [password]);

  const onSubmitHandler = async () => {
    if (!emailError && !passwordError){
      signIn(
        {
          email: email,
          password: password,
        }
      )
    }
  }

  return (
    <section className="max-w-md w-full mx-auto overflow-hidden  space-y-5 rounded-2xl">
         <form
        onSubmit={onSubmitHandler}
        className="max-w-md w-full overflow-hidden space-y-5"
      >
        <Input
            autoFocus
            radius="full"
            endContent={
                <div></div>
            }
            label="Usuario"
            variant="bordered"
            value={email}
            onValueChange={setEmail}
            validationState={validationStateEmail}
            color={emailError ? "danger" : "default"}
            errorMessage={emailError}
            onBlur={() => setValidateValues(true)}
            isRequired
            />
        <Input
            radius="full"
            endContent={
              <div></div>
            }
            autoComplete=''
            label="Contraseña"
            type="password"
            variant="bordered"
            value={password}
            onValueChange={setPassword}
            validationState={validationStatePassword}
            color={passwordError ? "danger" : "default"}
            errorMessage={passwordError}
            onBlur={() => setValidateValues(true)}
            //isRequired
        />
      </form>
      <div className="flex w-full py-2 px-1 justify-between">
        <Button
          radius="full"
          className="flex w-full justify-center"
          isLoading={loading}
          isDisabled={sendDisabled}
          onClick = {() => onSubmitHandler()}>
            Ingresar
        </Button>
      </div>
      <ErrorLogin/>
    </section>
  )
}
