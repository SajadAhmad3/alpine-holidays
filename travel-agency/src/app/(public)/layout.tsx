import Navbar from "@/components/Navbar";
import Chatbot from "@/components/chatbot/Chatbot";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Chatbot />
      <Footer />
    </div>
  );
}
