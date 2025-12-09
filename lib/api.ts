import axios from "axios";
import { type Note } from "../types/note";
import { type NoteTag } from "../types/note";

export interface NoteSearchResponse {
  page: number;
  notes: Note[];
  totalPages: number;
  tag: NoteTag | null;
}

export async function fetchNotes(
  searchText: string,
  page: number,
  tag?: string
) {
  const params: Record<string, string | number> = {
    search: searchText,
    page,
    perPage: 10,
  };

  if (tag) {
    params.tag = tag;
  }

  const response = await axios.get<NoteSearchResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}

export async function fetchNoteById(noteId: Note["id"]) {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}

export async function deleteNote(noteId: string) {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}
export async function createNote(newNote: NewNote) {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    newNote,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}
