import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Form, Link, json, redirect, useActionData } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { getToken } from '../util/auth';

const PostForm = ({header,oldPostData,method}) => {
    const data = useActionData();
    return (
        <section className='w-1/2 mx-auto my-10 space-y-5'>
            <div className='flex justify-between'>
                <p className='text-xl font-bold'>{header}</p>
                <Link to='/'><FaArrowCircleLeft className="w-8 h-8 m-0"/></Link>
            </div>
            {
                data && data.errors && (
                    <ul className='list-none'>
                        {
                            Object.values(data.errors).map(err=>(
                                <li key={err} className='text-red-500 font-bold'>{err}</li>
                            ))
                        }
                    </ul>
                )
            }
            <Form method={method}>
                <div className='my-4'>
                    <label className='block mb-2 font-medium text-gray-900 dark:text-white text-xl text-left'>Title</label>
                    <input type='text' name='title' defaultValue={oldPostData ? oldPostData.title : ''} className='block w-full p-3 border border-1 border-black outline-none ring-0 rounded-lg'/>
                </div>

                <div className='my-4'>
                    <label className='block mb-2 font-medium text-gray-900 dark:text-white text-xl text-left'>Image URL</label>
                    <input type='text' name='image' defaultValue={oldPostData ? oldPostData.image : ''} className='block w-full p-3 border border-1 border-black outline-none ring-0 rounded-lg'/>
                </div>

                <div className='my-4'>
                    <label className='block mb-2 font-medium text-gray-900 dark:text-white text-xl text-left'>Date</label>
                    <input type='date' name='date' defaultValue={oldPostData ? oldPostData.date : ''} className='block w-full p-3 border border-1 border-black outline-none ring-0 rounded-lg'/>
                </div>

                <div className='my-4'>
                    <label className='block mb-2 font-medium text-gray-900 dark:text-white text-xl text-left'>Description</label>
                    <textarea type='text' rows={4} name='description' defaultValue={oldPostData ? oldPostData.description : ''} className='block w-full p-3 border border-1 border-black outline-none ring-0 rounded-lg'/>
                </div>

                <div className='my-4 w-1/3 mx-auto'>
                    <button className='bg-black text-white w-full p-3 rounded-lg'>Post</button>
                </div>
            </Form>
        </section>
    )
}

export default PostForm

export const action = async({request,params}) =>{

    const data = await request.formData();
    const postData = {
        id : uuidv4(),
        title : data.get('title'),
        image : data.get('image'),
        date : data.get('date'),
        description : data.get('description')
    }
    const method = request.method;
    let url = `${import.meta.env.VITE_APP_DOMAIN}/posts`;
    if(method === 'PATCH'){
        const id = params.id;
        url = `${import.meta.env.VITE_APP_DOMAIN}/posts/${id}`
    }
    const token = getToken();
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        body: JSON.stringify(postData)
    });

    if(response.status === 422){
      return response;
    }
    
    if(!response.ok){
      throw json(
        {message: "Something went wrong"},
        {status: 500}
    )
    }
    return redirect("/");
}