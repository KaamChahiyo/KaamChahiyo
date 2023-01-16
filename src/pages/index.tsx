import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <AppHeader />
      <div className="flex min-h-screen w-full justify-center items-center font-sans text-lg font-bold text-blue-700">
        KaamChahiyo App
      </div>
      <Footer />
    </>
  );
}
