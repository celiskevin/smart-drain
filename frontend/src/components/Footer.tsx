
export default function Footer() {
    return (
        <footer className='flex justify-center border-t-[#233648] border-t'>
            <div className='flex max-w-[960px] flex-1 flex-col'>
                <footer className='flex flex-col gap-6 px-5 py-10 text-center @container'>
                    <div className='flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around'>
                        <a href="#" className='text-[#92adc9] text-base font-normal leading-normal min-w-40'>Términos de servicio</a>
                        <a href="#" className='text-[#92adc9] text-base font-normal leading-normal min-w-40'>Política de privacidad</a>
                    </div>
                    <p className='text-[#92adc9] text-base font-normal leading-normal'>© 2025 Smart Drain. Todos los derechos reservados.</p>
                </footer>
            </div>
        </footer>
    )
}
