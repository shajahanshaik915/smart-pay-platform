import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export const SendMoney=()=>{
    const [searchParams] = useSearchParams();
    const [amount,setamount]=useState(0);
    const id=searchParams.get("id");
    const name=searchParams.get("name");
    return <div className="bg-slate-300 h-screen flex justify-center items-center">

        <div className="bg-white p-5">

            <div className="font-bold flex justify-center text-xl p-8">
                Send Money
            </div>

            <div>

                <div className="flex">
                    <div className="p-3 rounded-full h-12 w-12 bg-green-200 flex justify-center">
                        <div className="flex flex-col justify-center h-full ">
                            {name[0].toUpperCase()}
                        </div>       
                    </div>
                    <div className="p-3 flex flex-col justify-center h-full mr-4">
                        {name}
                    </div>  
                </div>

                <p className="p-3">Amount (In Rs)</p>
                <input  type="number" onChange={(e)=>{setamount(e.target.value)}} className="rounded-md p-3 border border-gray-300" placeholder="Enter amount"></input>
                <button onClick={async ()=>{
                    await axios.post("http://localhost:3000/api/vi/account/transfer",{
                        to:id,
                        amount
                    },{
                        headers:{
                            Authorization:"Bearer "+localStorage.getItem("token"),
                        }
                    })
                    
                }} type="button" className="m-3 flex text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-700 dark:border-green-700">Initiate Transfer</button>
            </div>

        </div>
    </div>
}