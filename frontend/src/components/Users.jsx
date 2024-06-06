import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button } from './Button';
import {useNavigate} from 'react-router-dom'

export const Users=()=>{
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");
    
    useEffect( ()=>{
        axios.get('http://localhost:3000/api/vi/user/bulk?filter='+filter)
        .then((response)=>{
            setUsers(response.data.user)
        })
        
    },[filter]);
    return <div>
        <div className='font-bold mt-6 text-lg'>
            Users
        </div>

        <div>
            <input placeholder='Searching Users.....' type='text' className='w-full border-rounded border-black p-4' onChange={(e)=>{
                setFilter(e.target.value);
            }}></input>
        </div>

        <div>
            {users.map(user=><User user={user}/>)}
        </div>
    </div>
}
const User=({user})=>{
    const navigate=useNavigate();
    

    return <div className='flex justify-between'>
        <div className="flex p-2">
            <div className="p-3 rounded-full h-12 w-12 bg-green-200 flex justify-center">
                <div className="flex flex-col justify-center h-full ">
                    {user.firstName[0]}
                </div>       
            </div>
            <div className="p-3 flex flex-col justify-center h-full mr-4">
                {user.firstName+' '+user.lastName}
            </div>  
        </div>
        <div className='flex'>
            <Button label={"SendMoney"} onClick={()=>{
                navigate('/send?id='+user._id+'&name='+user.firstName);
            }}/>
        </div>
    </div>
}