import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { WarningButton } from "../components/WarningButton"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const navigate=useNavigate();
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center"> {/* Added items-center here */}
            <div className="bg-white text-center rounded-lg p-10">
                <Heading label={"Signup"}/>
                <SubHeading matter={"Enter your Credentials to Login"}/>

                <InputBox onChange={e=>{
                    setFirstName(e.target.value);
                }} label={"FirstName"} placeholder={"John"}/>
                <InputBox onChange={e=>{
                    setLastName(e.target.value)
                }} label={"LastName"} placeholder={"Don"}/>

                <InputBox onChange={e=>{
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"johnDoe19@####.com"}/>

                <InputBox onChange={e=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"1234"}/>

                <Button label={"SignUp"} onClick={async ()=>{
                    const response=await axios.post('http://localhost:3000/api/vi/user/signup',{
                        firstName,
                        lastName,
                        username,
                        password
                    })
                    localStorage.setItem("token",response.data.token);
                    navigate('/dashboard');
                }}/>

                <WarningButton label={"Already have an account? "} buttonText={"signin"} to={"/signin"}/>
            </div>
        </div>
    );
}
