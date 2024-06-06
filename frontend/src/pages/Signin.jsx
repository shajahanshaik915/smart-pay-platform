import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { WarningButton } from "../components/WarningButton"

export const Signin=()=>{
    return <div className="bg-slate-300 flex justify-center h-screen items-center">
        <div className="bg-white p-10 text-center">
            <Heading label={"Signin"}/>
            <SubHeading matter={"Enter you Credentials to Login"}/>
            <InputBox label={"Email"} placeholder={"johnDoe19@####.com"}></InputBox>
            <InputBox label={"Password"} placeholder={""}></InputBox>
            <Button label={"SignIn"}/>
            <WarningButton label={"Don't have account?"} buttonText={"signup"} to="/signup" />
        </div>
    </div>
}