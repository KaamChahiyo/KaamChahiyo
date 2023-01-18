import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <AppHeader />
      <div className="">
        <div>HeroSection</div>
        <div>Recent Job posting</div>
        <div>Top categories</div>
        <div>Top Services</div>
        <div>Top Employees</div>
        <div>Working procedure</div>
        <div>We have Served</div>
      </div>
      <Footer />
    </>
  );
}
