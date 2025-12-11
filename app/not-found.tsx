import css from "./note-found.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not-Found - NoteHub App",
  description: "Not Found Page.",
  openGraph: {
    title: "Not-Found - NoteHub App",
    description: "Not Found Page.",
    url: "https://notehub.app",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2025/09/13/14/33/error-9832457_1280.jpg",
        width: 1200,
        height: 630,
        alt: "Not-Found - NoteHub App",
      },
    ],
    type: "website",
  },
};
export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
