import Image from "next/image";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo-placeholder">Logo</div>

      <div className="footer-text">&copy; 2025 Codealingo</div>

      <div className="logo-container">
        <Image src="/redditlogo.png" alt="Reddit Logo" width={40} height={20} />
        <Image src="/Xlogo.jpg" alt="X Logo" width={40} height={20} />
      </div>
    </footer>
  );
}
