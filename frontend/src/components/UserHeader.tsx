import type { ReactNode } from "react";
interface UserHeaderProps {
    name: string;
    picture: ReactNode;
}

export default function UserHeader({ name, picture }: UserHeaderProps) {





    return (
        <div className=" flex gap-3 items-center">
            <div
                className="bg-center bg-cover rounded-full size-10"
                style={{ backgroundImage: `url(${picture})` }}
            ></div>
            <h1 className="text-white font-medium">{name}</h1>
        </div>
    )
}


//Comillas simples '' → Son = a default
//Comillas de function `` → Se pueden colocar variables ${}
//Comillas default " " → Solo permiten texto plano
