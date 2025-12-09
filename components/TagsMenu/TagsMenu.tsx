// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import css from "./TagsMenu.module.css";
// import { NoteTag } from "@/types/note";

// const tags: NoteTag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

// export default function TagsMenu() {
//   const [isOpen, setIsOpen] = useState(false);

//   const tagsMenu = () => setIsOpen(!isOpen);
//   const handleTagClick = () => setIsOpen(false);

//   return (
//     <div className={css.menuContainer}>
//       <button className={css.menuButton} onClick={tagsMenu}>
//         Notes ▾
//       </button>
//       {isOpen && (
//         <ul className={css.menuList}>
//           <li className={css.menuItem}>
//             <Link href={`/notes/filter/all`} onClick={handleTagClick} className={css.menuLink}>
//               All notes
//             </Link>
//           </li>

//           {tags.map((tag) => (
//             <li key={tag} className={css.menuItem}>
//               <Link href={`/notes/filter/${tag}`} onClick={handleTagClick} className={css.menuLink}>
//                 {tag}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
