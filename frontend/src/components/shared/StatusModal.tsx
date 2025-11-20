import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StatusModalProps {
    open: boolean;
    onClose: () => void;
    currentStatus: string | null;
    onChangeStatus: (status: string) => void;
}

export default function StatusModal({
    open,
    onClose,
    currentStatus,
    onChangeStatus
}: StatusModalProps) {

    const statuses = ["sin resolver", "en proceso", "resuelto"];

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'SIN RESOLVER': 'bg-red-700 hover:bg-red-800',
            'EN PROCESO': 'bg-yellow-700 hover:bg-yellow-800',
            'RESUELTO': 'bg-green-700 hover:bg-green-800'
        };
        return colors[status.toUpperCase()] || 'bg-gray-600';
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-gray-900 text-gray-100 rounded-2xl shadow-xl p-6 w-full max-w-md"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}

                    >
                        <h2 className="text-xl font-semibold mb-4">
                            Cambiar estado
                        </h2>

                        <p className="text-gray-300 mb-4">
                            Estado actual: <strong className="capitalize">{currentStatus}</strong>
                        </p>

                        <div className="space-y-2">
                            {statuses.map((s) => (
                                <Button
                                    key={s}
                                    onClick={() => onChangeStatus(s)}
                                    className={`w-full capitalize text-white ${getStatusColor(s)} cursor-pointer`}
                                >
                                    {s}
                                </Button>
                            ))}
                        </div>

                        <Button
                            className="w-full mt-4 bg-[#233648] hover:bg-[#233648ca] text-white cursor-pointer"
                            onClick={onClose}
                        >
                            Cerrar
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
