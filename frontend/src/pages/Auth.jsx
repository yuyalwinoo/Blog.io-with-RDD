import React from 'react'
import AuthForm from '../components/AuthForm'
import { json, redirect } from 'react-router-dom'

const Auth = () => {
  return (
    <AuthForm/>
  )
}

export default Auth

export const action = async({request,params}) =>{

    const data = await request.formData();
    const authData = {
        email : data.get('email'),
        password : data.get('password'),
    }
    
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup')
    {
        throw json({message : 'File not found!'},{status:404})
    }

    const url = `${import.meta.env.VITE_APP_DOMAIN}/${mode}`;
    const response = await fetch(url, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData)
    });
    
    if(response.status === 422 || response.status === 401){
      return response;
    }
    
    if(!response.ok){
        throw json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }

    const resData = await response.json();
    const token = resData.token;
    localStorage.setItem('token',token);

    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    localStorage.setItem("exp", expDate.toISOString());
    
    return redirect("/");
}