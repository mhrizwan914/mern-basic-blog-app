import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";


const BlogCard = ({ posts }) => {
    let { title, excerpt, content, file, author, createdAt, _id } = posts;
    return (
        <div className="shadow-lg rounded-lg">
            <div className="p-3">
                <img
                    src={`http://localhost:9000/${file}`}
                    alt="thumbnail"
                    width={400}
                    height={100}
                    className="w-full h-[200px]"
                />
            </div>
            <div className="flex items-center justify-between px-3 mb-3">
                <p className="text-[12px] text-white font-normal leading-normal bg-blue-500 px-2 py-1 rounded-full">
                    Written by {author.username.toUpperCase()}
                </p>
                <p className="text-[12px] text-blue-gray-800 font-semibold leading-normal">
                    NOV 20, 2023 8:23 AM
                </p>
            </div>
            <h2 className="text-[18px] xl:text-[20px] font-semibold text-blue-gray-800 px-3 leading-normal">
                {title}
            </h2>
            <p className="text-[14px] text-blue-gray-700 leading-relaxed px-3 mt-3">
                {excerpt}
            </p>
            <Link to={`single/${_id}`} className="bg-black mx-3 px-3 py-2 text-[14px] font-semibold inline-block rounded-[5px] text-white my-3 hover:opacity-75">
                Read More...
            </Link>
        </div>
    )
}

export default BlogCard;