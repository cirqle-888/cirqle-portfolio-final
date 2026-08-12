import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/918301839488";

/**
 * Subtle floating "Let's Talk" pill (bottom-right, every page except /contact,
 * where the form and WhatsApp button already live). Static — no animation.
 */
export function FloatingWhatsApp() {
  const location = useLocation();
  if (location.pathname === "/contact") return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Cirqle on WhatsApp"
      className="float-pill"
    >
      <span className="float-pill-dot">
        <MessageCircle style={{ width: 16, height: 16 }} />
      </span>
      Let&rsquo;s Talk
    </a>
  );
}
