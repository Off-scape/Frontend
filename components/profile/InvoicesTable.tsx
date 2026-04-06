import { payments } from "@/data/Profile"

const InvoicesTable = () => {
  return (
    <div>
        <table className="w-full border-collapse">
                <thead className="text-left border-b h-10 border-[#000000] ">
                    <tr className="pb-2.5">
                        <th className="w-40">  Tur / Fəaliyyət</th>
                        <th className="text-center">  Ödəniş</th>
                        <th className="text-center">   Tarix</th>
                        <th className="text-center">   Tip</th>
                        <th className="text-center">   Kart</th>
                        <th className="text-center"> Faktura</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        payments.map((payment, index) => (
                            <tr key={index} className="text-left border-b h-20 border-[#D4D4D4]">
                                <td className="text-base font-medium leading-6 w-35 ">{payment.tur}</td>
                                <td className="text-base font-medium leading-6  text-center">{payment.odenis}</td>
                                <td className="text-base font-medium leading-6  text-center">{payment.tarix}</td>
                                <td className="text-base font-medium leading-6  text-center">{payment.tip}</td>
                                <td className="text-base font-medium leading-6  text-center">{payment.kart}</td>
                                <td className="text-base font-medium leading-6  text-center"><a href="#">{payment.faktura}</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </div>
  )
}

export default InvoicesTable
