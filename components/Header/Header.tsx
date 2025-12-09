import css from "./Header.module.css";
import Link from "next/link";
// import TagsMenu from "../TagsMenu/TagsMenu";

export const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={css.navigationLink} href="/notes/filter/All">
              Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
