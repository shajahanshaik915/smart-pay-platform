import {Link} from "react-router-dom"


export function WarningButton({label,buttonText,to}){
    return <div className="py-2 flex justify-center">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1" to={to}>{buttonText}</Link>
    </div>
}