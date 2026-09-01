import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
