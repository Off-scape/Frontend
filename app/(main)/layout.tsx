import Footer from "../../components/footer/Footer";
import Header from "@/components/header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
