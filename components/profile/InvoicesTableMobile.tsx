import { PaymentsType } from '@/types/Profile'

const InvoicesTableMobile = ({ item }: { item: PaymentsType }) => {
    return (
        <div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">

                {/* Title */}
                <h3 className="text-[15px] font-semibold text-[#142A12] mb-3">
                    {item.tur}
                </h3>

                {/* Divider */}
                <div className="h-px bg-gray-200 mb-3" />

                {/* Info */}
                <div className="space-y-1 text-sm text-gray-600">
                    <p>
                        <span className="text-gray-400">Ödəniş:</span>{" "}
                        <span className="font-medium text-black">{item.odenis}</span>
                    </p>

                    <p>
                        <span className="text-gray-400">Tarix:</span> {item.tarix}
                    </p>

                    <p>
                        <span className="text-gray-400">Tip:</span> {item.tip}
                    </p>

                    <p>
                        <span className="text-gray-400">Kart:</span> {item.kart}
                    </p>
                </div>

                {/* Button */}
                <div className="mt-4 flex justify-end">
                    <button className="text-sm font-medium text-blue-600 border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50 transition">
                        Fakturanı yüklə
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InvoicesTableMobile