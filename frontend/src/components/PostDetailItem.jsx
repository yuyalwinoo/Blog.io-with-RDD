import { FaCalendarDay,FaArrowCircleLeft } from "react-icons/fa";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

const PostDetailItem = ({post}) => {
    const {id,title,image,description,date} = post;
    const submit = useSubmit();
    const isToken = useRouteLoaderData('root');

    const postDeleteHandler=()=>{
        const confirmStatus = window.confirm('Are you sure want to delete?');
        
        if(confirmStatus){
            submit(null,{method:'DELETE'});
        }else{

        }
    }
    return (
        <section>
            <div className='space-y-3 text-left p-5'>
                <div className="flex justify-between">
                    <div>
                        <p className='font-bold text-2xl uppercase'>{title}</p>
                        <p className='text-slate-400  flex gap-x-3 items-center py-3'>
                            <span className="text-sm"><FaCalendarDay /></span> 
                            <span>{date}</span>
                        </p>
                    </div>
                    <Link to='/'><FaArrowCircleLeft className="w-8 h-8 m-0"/></Link>
                </div>
                <img src={image} alt={title} className='w-full h-3/4 bg-cover'/>
                <p className='text-slate-500 text-justify py-4'>{description}</p>
            </div>
            {
                isToken &&
                <div className="flex gap-x-4 justify-end px-5 mb-10">
                    <Link to={`edit-post`} className="btn-primary">
                        <p className="text-sm">Edit</p>
                    </Link>
                    <p className="text-sm btn-primary cursor-pointer" onClick={postDeleteHandler}>Delete</p>
                </div>
            }
        </section>
    )
}

export default PostDetailItem