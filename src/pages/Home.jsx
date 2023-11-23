// Components
import React from "react";
import BlogCard from "../components/BlogCard";

const Home = () => {
    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:9000/api/v1/blogs").then(response => {
            response.json().then(posts => {
                setPosts(posts.data);
            })
        })
    }, [])
    return (
        <section>
            <div className="py-[50px]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            posts && posts.map((e, i) => (
                                <BlogCard key={i} posts={e} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;