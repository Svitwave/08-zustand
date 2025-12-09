import css from "./page.module.css";
import Link from "next/link";
import { NoteTag } from "@/types/note";

const tags: (NoteTag | "All")[] = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
