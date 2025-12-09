import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage(props: Props) {
  const params = await props.params;
  const id = params.id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: async () => fetchNoteById(id),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview id={id} />
      </HydrationBoundary>
    </div>
  );
}
