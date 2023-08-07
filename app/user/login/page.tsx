'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { HiAtSymbol, HiFingerPrint  } from "react-icons/hi";
import { useFormik } from 'formik';
import { LoginFormValues } from '@/types';
import { loginValide } from '@/utils/validate';
import { toast } from 'react-hot-toast';


const Login = () => {
    const { data:session } = useSession();
    const router = useRouter();
    
    // states
    const [show, setShow] = useState(false)
    const [providers, setProviders] = useState<any>(null);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const signInWithGoogle = () => {
        signIn('google', {callbackUrl: 'http://localhost:3000/'})
    }
    const signInWithGithub = () => {
        signIn('github', {callbackUrl: 'http://localhost:3000/'})
    }
        
    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setupProviders();
    }, []);

    // console.log('Providers are',providers)
    // console.log(session?.user)
    useEffect(()=>{
        if(session?.user?.id){
            router.push('/');
        } 
    },[session?.user?.id]);


    //Formik
    const formik = useFormik({
      initialValues: {
        username: '',
        email: '',
        password: '',
        confpassword: '',
      },
      validate: loginValide,
         
      onSubmit
    });

    async function onSubmit(values: LoginFormValues) {
      // submit form values
          // console.log(values)
          const status = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
          })
          if(status?.error) {
            toast.error(status?.error)
          } 
          if(status?.error === null) {
            return router.push('/profile')
          }
          
      }

    return (
        <form onSubmit={formik.handleSubmit} className="p-4 max-w-md mx-auto bg-white border-t-8 border-indigo-700 mt-10 rounded">
        <h1 className="font-medium text-3xl text-center py-4 text-gray-800">Log in</h1>

        <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="password">Email</label>
        <div className="relative w-full ">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <span className=" hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 cursor-pointer" ><HiAtSymbol /></span>
          </div>
          <input 
            className="border-2 rounded w-full py-3 px-3 border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 " 
            type="text" 
            id="email"  
            {...formik.getFieldProps("email")}
            />
           {formik.errors.email && formik.touched.email && <div className='text-rose-500'>{formik.errors.email}</div>}
        </div>
        
        <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="password">Password</label>
        <div className="relative w-full ">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <span onClick={() => setShow(!show)} className=" hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 cursor-pointer " ><HiFingerPrint /></span>
          </div>
          <input 
            className="border-2 rounded w-full py-3 px-3 border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 " 
            type={`${show? "text": "password"}`} 
            id="password" 
           {...formik.getFieldProps("password")}
            />
           {formik.errors.password && formik.touched.password && <div className='text-rose-500'>{formik.errors.password}</div>}
        </div>
       
            {/* Social login buttons */}
                <div className='flex items-center gap-2 flex-col'>
                     <span>Or</span>
                     <div className='border-b-[1px] w-full dark:border-slate-700' />              
                        
                     <button onClick={signInWithGoogle} type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                     <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http:www.w3.org/2000/svg">
                         <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
                         </path>
                     </svg>
                     Log in with Google
                     </button>

                     <button onClick={signInWithGithub} type="button" className="py-2 px-4 flex justify-center items-center  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                     <svg xmlns="http:www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                         <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                         </path>
                     </svg>
                     Log in with GitHub
                     </button>
                 </div>
    
        <button className="w-full bg-indigo-700 hover:bg-indigo-900 text-white font-medium py-2 px-4 mt-10 rounded focus:outline-none focus:shadow-outline" type="submit">
          Log in
        </button>
        <p className='text-center mt-4'>
              Don't have an account ?
            <Link href='/user/signup' className='text-blue-600'> Sign up </Link>
        </p>
    </form>
    )
}

export default Login