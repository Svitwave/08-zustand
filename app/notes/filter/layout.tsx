import { Suspense } from "react";
import css from "./layout.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <Suspense fallback={<div>Loading sidebar...</div>}>{sidebar}</Suspense>
      </aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
