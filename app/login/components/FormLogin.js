'use client'
// import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { apiLoginUser } from "@/lib/api-requests";
// import FormInput from "@/components/FormInput";
// import { LoadingButton } from "@/components/LoadingButton";
// import useStore from "@/store";
// import { handleApiError } from "@/lib/helpers";
// import { toast } from "react-hot-toast";
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
    console.log(email)
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
    console.log(email, password, emailError, passwordError)
    console.log(!email, !password, emailError, passwordError)
    console.log(!email || !password || emailError || passwordError)
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

  const checkRequeredValues = () => {
    if ( email ) return false
  }


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

  useEffect(() => {},[])

  /*  const store = useStore();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   */

  /* return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
      >
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Password" name="password" type="password" />

        <div className="text-right">
          <Link href="#" className="">
            Forgot Password?
          </Link>
        </div>
        <LoadingButton
          loading={store.requestLoading}
          textColor="text-ct-blue-600"
        >
          Login
        </LoadingButton>
        <span className="block">
          Need an account?{" "}
          <Link href="/register" className="text-ct-blue-600">
            Sign Up Here
          </Link>
        </span>
      </form>
    </FormProvider>
  ); */

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
