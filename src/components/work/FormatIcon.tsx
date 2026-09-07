import type { WorkFormat } from "../../lib/work";

/**
 * A mark for each kind of work, drawn rather than imported.
 *
 * Six shapes at one weight and one size is less code than pulling an icon set
 * in, and it keeps them consistent: same 16px box, same 1.6 stroke, same
 * rounded ends, so a row of chips reads as one set.
 */
export function FormatIcon({ format }: { format: WorkFormat }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: "false" as const,
  };

  switch (format) {
    // A framed square: the grid post.
    case "post":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="8.5" cy="8.5" r="1.4" />
          <path d="M21 15l-4.5-4.2L7 20" />
        </svg>
      );
    // Film frame with a play head.
    case "reel":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M3.4 8.5h17.2M8.6 3.2L11.4 8.5M14.4 3.2L17.2 8.5" />
          <path d="M11 12.4l3.6 2.1-3.6 2.1z" fill="currentColor" stroke="none" />
        </svg>
      );
    // Tall frame with the broken ring of a story.
    case "story":
      return (
        <svg {...common}>
          <rect x="6" y="2.6" width="12" height="18.8" rx="3.4" strokeDasharray="4 2.6" />
          <path d="M12 8.6v6.8M9.6 11l2.4-2.4L14.4 11" />
        </svg>
      );
    // A mark inside its clear space.
    case "logo":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M3.2 3.2h3.4M3.2 3.2v3.4M20.8 3.2h-3.4M20.8 3.2v3.4M3.2 20.8h3.4M3.2 20.8v-3.4M20.8 20.8h-3.4M20.8 20.8v-3.4" />
        </svg>
      );
    // A rules sheet.
    case "guidelines":
      return (
        <svg {...common}>
          <path d="M5.5 3.2h9.2L19 7.5v13.3H5.5z" />
          <path d="M14.4 3.4v4.2h4.3" />
          <path d="M8.4 12.4h7M8.4 16h4.6" />
        </svg>
      );
    // An open book.
    case "brandbook":
      return (
        <svg {...common}>
          <path d="M12 6.6C10.4 5.2 8.3 4.6 4.5 4.8v12.6c3.8-.2 5.9.4 7.5 1.8 1.6-1.4 3.7-2 7.5-1.8V4.8c-3.8-.2-5.9.4-7.5 1.8z" />
          <path d="M12 6.6v12.6" />
        </svg>
      );
    // Swatches on a chart.
    case "chart":
      return (
        <svg {...common}>
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3" />
          <path d="M3.2 9.4h17.6M9.4 9.4v11.4" />
          <circle cx="6.3" cy="6.3" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
