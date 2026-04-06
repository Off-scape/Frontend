import InvoicesTable from "@/components/profile/InvoicesTable"
import InvoicesTableMobile from "@/components/profile/InvoicesTableMobile"
import { payments } from "@/data/Profile"

const Invoices = () => {
    return (
        <div className="pb-20">
            <div className="max-[700px]:hidden">
            <InvoicesTable />

            </div>
            <div className="hidden max-[700px]:flex  flex-col gap-5">
             {
                payments.map((payment, index) => (
                    <InvoicesTableMobile key={index} item={payment} />
                ))
             }

            </div>
        </div>
    )
}

export default Invoices
