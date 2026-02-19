
export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <main>Header
                {children}
                footer
            </main>
        </>
    )
}
