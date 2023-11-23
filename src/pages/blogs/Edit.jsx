import React from "react";
// Material
import { Button, Input } from "@material-tailwind/react";
// Editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// RRD
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [title, setTitle] = React.useState("");
    const [excerpt, setExcerpt] = React.useState("");
    const [file, setFile] = React.useState("");
    const [content, setContent] = React.useState("");
    const navigate = useNavigate();
    let { id } = useParams();

    React.useEffect(() => {
        fetch(`http://localhost:9000/api/v1/single/${id}`).then(response => {
            response.json().then(post => {
                setTitle(post.data.title);
                setExcerpt(post.data.excerpt);
                setContent(post.data.content);
            })
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title == "") {
            alert("Enter your Title")
        } else if (content == "") {
            alert("Enter your Content")
        } else {
            let data = new FormData();
            data.append("title", title);
            data.append("excerpt", excerpt);
            data.append("file", file[0]);
            data.append("content", content);

            let response = await fetch(`http://localhost:9000/api/v1/edit/${id}`, {
                method: "PUT",
                body: data,
                credentials: "include"
            });

            if (response.status !== 200) {
                alert(response.message);
            } else {
                response.json().then(posts => {
                    alert(posts.message);
                })
                navigate(`/single/${id}`);
            }
        }
    }
    return (
        <section>
            <div className="py-[50px]">
                <div className="container">
                    <div className="md:w-[80%] m-auto shadow-lg p-5">
                        <h2 className="text-[30px] text-blue-gray-800 text-center font-bold leading-normal mb-5">
                            Edit A Post
                        </h2>
                        <form className="grid grid-cols-1 gap-5">
                            <Input
                                type="text"
                                name="title"
                                placeholder="Enter your Title"
                                className="!border-2 !border-blue-300 !py-0 !rounded-[5px]"
                                labelProps={{
                                    className: "!hidden"
                                }}
                                containerProps={{
                                    className: "h-[50px]"
                                }}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input
                                type="text"
                                name="excerpt"
                                placeholder="Enter your Excerpt"
                                className="!border-2 !border-blue-300 !py-0 !rounded-[5px]"
                                labelProps={{
                                    className: "!hidden"
                                }}
                                containerProps={{
                                    className: "h-[50px]"
                                }}
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                            />
                            <Input
                                type="file"
                                name="file"
                                placeholder="Choose your File"
                                className="!border-2 !border-blue-300 !p-1.5 !rounded-[5px]"
                                labelProps={{
                                    className: "!hidden"
                                }}
                                onChange={(e) => setFile(e.target.files)}
                            />
                            <div>
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                />
                            </div>
                            <Button className="rounded-[5px] text-[18px]" onClick={handleSubmit}>Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Edit;