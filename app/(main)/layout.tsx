import Header from "@/components/Header/Header";
export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <main><Header/>
                {children}
                footer
            </main>
        </>
    )
}
