// eslint-disable-next-line react/prop-types
export function InputBox({label,placeholder,onChange}){
    return <div>
        <div className="text-sm py-2 text-left font-medium">{label}</div>
        <input onChange={onChange} placeholder={placeholder} type="text" className="p-1 w-full border border-black-300"></input>
    </div>
}