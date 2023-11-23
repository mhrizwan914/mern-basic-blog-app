import React from "react";
// RRD
import { Link, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Button } from "@material-tailwind/react";

const Single = () => {
    const { userInfo } = React.useContext(UserContext)
    let { id } = useParams();
    const [post, setPost] = React.useState([])
    React.useEffect(() => {
        fetch(`http://localhost:9000/api/v1/single/${id}`).then(response => {
            response.json().then(post => {
                setPost(post.data);
            })
        })
    }, [])

    if (!post) return '';
    return (
        <section>
            <div>
                <div className="container">
                    <div className="py-3 relative">
                        <img
                            src={`http://localhost:9000/${post.file}`}
                            alt="thumbnail"
                            className="w-full h-[300px]"
                        />
                        {
                            userInfo?.id === post.author?._id && (
                                <Link to={`/edit/${post._id}`} className="absolute top-[20px] right-[5px] bg-black px-3 py-2 text-white rounded-md font-medium">Edit</Link>
                            )
                        }
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[12px] text-white font-normal leading-normal bg-blue-500 px-2 py-1 rounded-full">
                            Written by {post.author?.username.toUpperCase()}
                        </p>
                        <p className="text-[12px] text-blue-gray-800 font-semibold leading-normal">
                            NOV 20, 2023 8:23 AM
                        </p>
                    </div>
                    <h2 className="text-[22px] xl:text-[28px] font-semibold text-blue-gray-800 leading-normal">
                        {post.title}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
        </section>
    )
}

export default Single;