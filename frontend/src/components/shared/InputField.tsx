
export default function InputField({ label, type, value, onChange, placeholder }: any) {
    return (
        <div className="mb-5">
            <label className="flex flex-col w-full">
                <p className="text-white font-medium pb-2">{label}</p>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className="form-input w-full rounded-lg text-white border border-[#2c3a46] 
            bg-[#111a22] focus:border-[#1e90ff] h-14 p-[15px] placeholder:text-[#8fa7ba]"
                />
            </label>
        </div>
    )
}
