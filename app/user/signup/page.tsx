'use client'
import { getProviders, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import { HiAtSymbol, HiFingerPrint, HiOutlineUser  } from "react-icons/hi";
import {  useFormik } from 'formik';
import { RegisterFormValues } from '@/types';
import { registerValidate } from '@/utils/validate';
import { toast } from 'react-hot-toast';


const Signup = () => {
    const { data:session } = useSession();
    const router = useRouter();

    // states
    const [show, setShow] = useState(false)
    const [providers, setProviders] = useState<any>(null);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    
    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setupProviders();
    }, []);

    console.log(providers)
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
      validate: registerValidate, 
      onSubmit
    });
    console.log(formik.errors)

    async function onSubmit(values: RegisterFormValues) {
          // console.log(values)
            // Perform any additional validation or data processing here  
            toast.promise((async () => {
                try {
                    const response = await fetch('/api/register-route', {
                        method: 'POST',
                        body: JSON.stringify(values),
                    });
                    if (response.ok) {
                      console.log("RESPONSE", response)
                        toast.success('User registered successfully & You can log in with your credentials.');
                        router.push('/user/login')
                    }
                } catch (error) {
                    console.error(error);
                    toast.error('User registration failed.');                
                  }
            })(), {
                loading: 'Registering user...',
                success: 'User registered successfully.',
                error: (err) => err.message,
            });
        };


    return (

    <form onSubmit={formik.handleSubmit} className="p-4 max-w-md mx-auto bg-white border-t-8 border-indigo-700 mt-10 rounded">
      <h1 className="font-medium text-3xl text-center py-4 text-gray-800">Sign up</h1>

      <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="password">Username </label>
      <div className="relative w-full ">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <span className=" hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 cursor-pointer " ><HiOutlineUser /></span>
        </div>
        <input 
          className="border-2 rounded w-full py-3 px-3 border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 " 
          type="text" 
          id="username"   
          {...formik.getFieldProps("username")}
          />
          {formik.errors.username && formik.touched.username && <div className='text-rose-500'>{formik.errors.username}</div>}
      </div>
      <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="password">Email</label>
      <div className="relative w-full ">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <span className=" hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 cursor-pointer " ><HiAtSymbol /></span>
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
    
      <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="password">Confirm Password</label>
      <div className="relative w-full ">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <span onClick={() => setShow(!show)} className=" hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 cursor-pointer " ><HiFingerPrint /></span>
        </div>
        <input 
          className="border-2 rounded w-full py-3 px-3 border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 " 
            type={`${show? "text": "password"}`} 
            id="confpassword"   
            {...formik.getFieldProps("confpassword")}
            />
        {formik.errors.confpassword && formik.touched.confpassword && <div className='text-rose-500'>{formik.errors.confpassword}</div>}
      </div>

      <button className="w-full bg-indigo-700 hover:bg-indigo-900 text-white font-medium py-2 px-4 mt-10 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign up
      </button>
      <p className='text-center mt-4'>
            Have an account ?
          <Link href='/user/login' className='text-blue-600'> Login </Link>
      </p>
    </form>
    )
}

export default Signup