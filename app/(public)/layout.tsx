import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
