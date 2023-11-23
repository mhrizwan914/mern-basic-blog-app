import React from "react";
// Material
import { Button, Input } from "@material-tailwind/react";
// RRD
import { useNavigate } from "react-router-dom";
// Context
import UserContext from "../context/UserContext";

const Register = () => {
    const [userData, setUserData] = React.useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    const { username } = React.useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.username == "") {
            alert("Enter your Username")
        } else if (userData.password == "") {
            alert("Enter your Password")
        } else {
            let response = await fetch("http://localhost:9000/api/v1/register", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" }
            });
            if (response.status !== 201) {
                alert("Please try again");
            } else {
                alert("Successfully Registered");
                navigate("/login");
            }
        }
    }
    if (username) {
        navigate("/");
    }
    return (
        <section>
            <div className="py-[50px]">
                <div className="container">
                    <div className="md:w-[80%] lg:w-[40%] m-auto shadow-lg p-5">
                        <h2 className="text-[30px] text-blue-gray-800 text-center font-bold leading-normal mb-5">
                            Register Here
                        </h2>
                        <form className="grid grid-cols-1 gap-5">
                            <Input
                                type="text"
                                name="username"
                                placeholder="Enter your Username"
                                className="!border-2 !border-blue-300 !py-0 !rounded-[5px]"
                                labelProps={{
                                    className: "!hidden"
                                }}
                                containerProps={{
                                    className: "h-[50px]"
                                }}
                                onChange={handleUserData}
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                                className="!border-2 !border-blue-300 !py-0 !rounded-[5px]"
                                labelProps={{
                                    className: "!hidden"
                                }}
                                containerProps={{
                                    className: "h-[50px]"
                                }}
                                onChange={handleUserData}
                            />
                            <Button className="rounded-[5px] text-[18px]" onClick={handleSubmit}>Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;