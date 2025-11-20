interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className='flex flex-col gap-2 flex-1 min-w-[158px] p-6 rounded-lg bg-[#233648]'>
            <p className="text-white font-medium">{title}</p>
            <p className="text-white text-2xl font-bold">{value}</p>
        </div>
    );
}