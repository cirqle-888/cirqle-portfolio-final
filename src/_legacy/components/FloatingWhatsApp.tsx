import { trackEvent } from '../lib/analytics';
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/918301839488";

/**
 * Subtle floating "Let's Talk" pill (bottom-right, every page except /contact,
 * where the form and WhatsApp button already live). Static — no animation.
 */
export function FloatingWhatsApp() {
  const location = useLocation();
  if (location.pathname === "/contact" || (location.pathname === "/portfolio" && !location.hash && new URLSearchParams(location.search).get("view") !== "gallery")) return null;

  return (
    <a
      href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hello Cirqle, I would like to discuss ${location.pathname.startsWith("/services/") ? location.pathname.split("/").pop()?.replace(/-/g, " ") : "a project"}.`)}`}
      onClick={() => trackEvent("whatsapp_click", { placement: "floating", page: location.pathname })}
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
