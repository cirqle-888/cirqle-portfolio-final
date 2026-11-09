import { useState } from "react";
import { Link2, Check, MessageCircle } from "lucide-react";
import { absoluteUrl } from "../../lib/work";

interface ShareRowProps {
  /** Site-relative path to share, e.g. "/portfolio/social-media/cell-world" */
  path: string;
  /** Message prefilled in WhatsApp */
  message: string;
}

/** "Copy link" + "Share on WhatsApp" — the client-ready handoff for a gallery. */
export function ShareRow({ path, message }: ShareRowProps) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(path);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  return (
    <>
      <div className="work-share">
        <button type="button" className="work-share-btn work-share-btn--primary" onClick={copy}>
          {copied ? <Check size={15} /> : <Link2 size={15} />}
          {copied ? "Link copied" : "Copy share link"}
        </button>
        <a
          className="work-share-btn work-share-btn--wa"
          href={`https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={15} />
          Share on WhatsApp
        </a>
      </div>
      {copied && <div className="work-toast">Link copied — ready to send</div>}
    </>
  );
}
