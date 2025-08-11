import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <NavBar />

      <div className="header">
        <div className="logo-placeholder">Logo</div>
      </div>

      <main className="home-content">
        <h1>Codealingo</h1>
        <p>Information here</p>
      </main>

      <Footer />
    </div>
  );
}
