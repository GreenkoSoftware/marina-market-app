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
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@nextui-org/react'

export default function LoginForm () {
  const router = useRouter()

  /* async function LoginUserFunction (credentials) {
    store.setRequestLoading(true)
    try {
      // await apiLoginUser(JSON.stringify(credentials));

      toast.success('Logged in successfully')
      return router.push('/home')
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        handleApiError(error)
      } else {
        toast.error(error.message)
        console.log('Error message:', error.message)
      }
    } finally {
      store.setRequestLoading(false)
    }
  } */

  const onSubmitHandler = async (values) => {
    // LoginUserFunction(values)
    // router.push('/application/inventory')
    // router.replace('/')
    const res = await signIn('credentials',
      {
        email: 'Aaa@gmail.com',
        password: '123456',
        redirect: true
      }
    )
    console.log({ res })
    // alert('submit')
  }

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
    <section className="max-w-md w-full mx-auto overflow-hidden rounded-2xl">
         <form
        onSubmit={onSubmitHandler}
        className="max-w-md w-full overflow-hidden p-8 space-y-5"
      >
        <Input
            autoFocus
            radius="full"
            endContent={
                <div></div>
            }
            label="Usuario"
            // placeholder="Enter your email"
            variant="bordered"
            className='dark'
        />
        <Input
            radius="full"
            endContent={
            <div></div>
            }
            autoComplete=''
            label="Contraseña"
            // placeholder="Enter your password"
            type="password"
            variant="bordered"
        />
        <div className="flex w-full py-2 px-1 justify-between">
          <Button
            radius="full"
            className="flex w-full justify-center"
            onClick = {() => onSubmitHandler()}>
              Ingresar
          </Button>
        </div>
      </form>
    </section>
  )
}
