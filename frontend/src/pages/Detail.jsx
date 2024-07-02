import React from 'react'
import { json, redirect, useLoaderData, useRouteLoaderData } from 'react-router-dom'
import PostDetailItem from '../components/PostDetailItem';
import { getToken } from '../util/auth';

const Detail = () => {
    const post = useRouteLoaderData('post-detail');
  return (
    <div className='w-3/4 mx-auto'>
        <PostDetailItem post={post}/>
    </div>
  )
}

export default Detail

export const loader = async({request,params})=>{
    const respone = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/posts/${params.id}`);
    if(!respone.ok){
        throw json({message:'Cannot get posts.'},{status : 500})
    } else {
        const data = await respone.json();
        return data.post;
    }
}

export const action = async({request,params}) =>{
    const token = getToken();
    const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/posts/${params.id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+token,
        },
    });
    if(!response.ok){
        throw json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
    return redirect("/");
}
