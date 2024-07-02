import React from 'react'
import { json, useLoaderData } from 'react-router-dom'
import PostItem from '../components/PostItem';

const Posts = () => {
    const posts = useLoaderData();
    return (
        <div>
            {
                posts.length > 0 &&
                posts.map(post=>(
                    <PostItem key={post.id} post={post}/>
                ))
            }
        </div>
    )
}

export default Posts

export const loader = async()=>{
    const respone = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/posts`);
    if(!respone.ok){
        throw json({message:'Cannot get posts.'},{status : 500})
    } else {
        const data = await respone.json();
        return data.posts;
    }
}