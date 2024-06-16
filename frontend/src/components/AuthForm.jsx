import React from 'react'
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom'

const AuthForm = () => {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <section className='w-1/2 mx-auto'>
            <div>
                <p className='text-xl font-bold'>{isLogin ? "Please Login your account." : 'Create your new account now.'}</p>
                {
                    actionData && actionData.errors &&
                    <ul>
                        {
                            Object.values(actionData.errors).map(err=>(
                                <li key={err} className='text-red-500'>{err}</li>
                            ))
                        }
                        
                    </ul>
                }
                {
                    actionData && actionData.message && <p className='text-red-500'>{actionData.message}</p>
                }
                <Form method='POST'>
                    <div className='my-4'>
                        <label className='block mb-2 font-medium text-gray-900 dark:text-white text-xl text-left'>Email</label>
                        <input 
                            type='email' 
                            name='email' 
                            autoComplete='email'
                            className='block w-full p-3 border border-1 border-black outline-none ring-0 rounded-lg'/>
                    </div>

                    <div className='my-4'>
                        <label className='block mb-2 font-medium text-gray-900 dark:text-white text-xl text-left'>Password</label>
                        <input 
                            type='password' 
                            name='password' 
                            autoComplete='password'
                            className='block w-full p-3 border border-1 border-black outline-none ring-0 rounded-lg'/>
                    </div>

                    <div className='my-4 w-1/3 mx-auto'>
                        <button className='bg-black text-white w-full p-3 rounded-lg'>{isSubmitting ? 'Submitting' : isLogin ? 'Login' : 'Register'}</button>
                    </div>
                    {
                        isLogin ? 
                        <p>
                            Don't have an account? <Link to={`/auth?mode=signup`}><span className='font-bold italic'>Create new account.</span></Link>
                        </p> :
                        <p>
                        Already have an account? <Link to={`/auth?mode=login`} className='font-bold italic underline'><span>Login your account.</span></Link>
                    </p>
                        
                    }
                </Form>
            </div>
        </section>
    )
}

export default AuthForm