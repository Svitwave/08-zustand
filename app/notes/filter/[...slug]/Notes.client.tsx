"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

type NotesClientProps = {
  tag: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  const debouncedSearchQuery = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes(searchQuery, currentPage, tag === "All" ? "" : tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={debouncedSearchQuery} />
        <Toaster position="top-center" />
        {isSuccess && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      <NoteList notes={notes} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
