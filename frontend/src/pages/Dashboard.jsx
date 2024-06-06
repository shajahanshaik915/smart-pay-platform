import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard=()=>{
    // const [balance,setBalance]=useState(0);
    // useEffect(()=>{
    //     axios.get("http://localhost:3000/api/vi/account/balance")
    //     .then((res)=>{
    //         setBalance(res.balance);
    //     })
    // },[])
    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={1000}/>
            <Users/>
        </div>
    </div>
}