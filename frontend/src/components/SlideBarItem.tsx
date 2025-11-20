import React from 'react'

//La interfaz dice lo que se tiene que cumplir obligatoriamente
// Osea que todo lo que hay en la interface tiene que ser true
//Los booleanos pasan a ser opciones 

interface SlideBarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}
//Dentro de las llaves van las propiedades que tiene por
//defecto
export default function SlideBarItem({ icon, label, active }: SlideBarItemProps) {

    return (
        <div
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                ${active ? "bg-[#233648] text-while" : "text-white hover:bg-[#233648]/40 transition-colors"}`}
        >

            <div>
                {icon}
            </div>

            <p className='text-sm font-medium'>{label}</p>
            {/* Icon que se tra del componente padre*/}
        </div>
    )

}
