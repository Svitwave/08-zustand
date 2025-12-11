import { Metadata } from "next";
import css from "./page.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create new note - NoteHub App",
  description:
    "Create a new note in NoteHub. Fill in the title, content, and tag to save your note.",
  openGraph: {
    title: "Create new note - NoteHub App",
    description:
      "Create a new note in NoteHub. Fill in the title, content, and tag to save your note.",
    url: "https://notehub.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create new note - NoteHub App",
      },
    ],
    type: "website",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
