import React from 'react'
import { FaCalendarDay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostItem = ({post}) => {
    const {id,title,image,date} = post;
  return (
    <div className='w-2/3 mx-auto py-5 text-left'>
        <Link to={`${id}`}><img src={image} alt={title} className='w-full h-60 bg-cover bg-center'/></Link>
        <Link to={`${id}`}><p className='font-bold'>{title}</p></Link>
        <p className='text-slate-400  flex gap-x-3 items-center mb-5'>
          <span className="text-sm"><FaCalendarDay /></span> 
          <span>{date}</span>
        </p>
        <hr/>
    </div>
  )
}

export default PostItem