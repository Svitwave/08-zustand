"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <span className={css.tag}>{data.tag}</span>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>
            {new Date(data.createdAt).toLocaleString()}
          </p>
          <button className={css.backBtn} onClick={() => router.back()}>
            ← Back
          </button>
        </div>
      </div>
    </Modal>
  );
}
