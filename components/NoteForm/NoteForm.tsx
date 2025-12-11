// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
// import * as Yup from "yup";
// import css from "./NoteForm.module.css";
// import { createNote } from "@/lib/api";
// import type { NoteFormValues } from "../../types/note";
// import toast from "react-hot-toast";

// const NoteSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Must be more than 3 characters!")
//     .max(50, "Must be less than 50 characters!")
//     .required("Required"),
//   content: Yup.string().max(500, "Must be less than 500 characters!"),
//   tag: Yup.string()
//     .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
//     .required("Required"),
// });

// interface NoteFormProps {
//   onCancel: () => void;
//   onSuccess: () => void;
// }

// const initialFormValues: NoteFormValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
//   const queryClient = useQueryClient();

//   const { mutate } = useMutation({
//     mutationFn: createNote,
//     onSuccess() {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       toast.success("Note created successfully");
//       onSuccess();
//     },
//     onError: () => {
//       toast.error("Failed to create note");
//     },
//   });

//   const handleSubmit = (
//     values: NoteFormValues,
//     formikHelpers: FormikHelpers<NoteFormValues>
//   ) => {
//     mutate(values, {
//       onSuccess: () => {
//         formikHelpers.resetForm();
//       },
//     });
//   };

//   const handleCancel = () => {
//     onCancel();
//   };

//   return (
//     <Formik
//       initialValues={initialFormValues}
//       onSubmit={handleSubmit}
//       validationSchema={NoteSchema}
//     >
//       <Form className={css.form}>
//         <div className={css.formGroup}>
//           <label htmlFor="title">Title</label>
//           <Field id="title" type="text" name="title" className={css.input} />
//           <ErrorMessage name="title" component="span" className={css.error} />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="content">Content</label>
//           <Field
//             as="textarea"
//             id="content"
//             name="content"
//             rows={8}
//             className={css.textarea}
//           />
//           <ErrorMessage name="content" component="span" className={css.error} />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="tag">Tag</label>
//           <Field as="select" id="tag" name="tag" className={css.select}>
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </Field>
//           <ErrorMessage name="tag" component="span" className={css.error} />
//         </div>

//         <div className={css.actions}>
//           <button
//             type="button"
//             className={css.cancelButton}
//             onClick={handleCancel}
//           >
//             Cancel
//           </button>
//           <button type="submit" className={css.submitButton} disabled={false}>
//             Create note
//           </button>
//         </div>
//       </Form>
//     </Formik>
//   );
// }

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { createNote } from "../../lib/api";
import toast from "react-hot-toast";
import { NoteTag } from "../../types/note";
import { useNoteStore } from "../../lib/store/noteStore";
import { useState } from "react";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully");
      router.push("/notes/filter/All");
      clearDraft();
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  const { draft, setDraft, clearDraft } = useNoteStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!draft.title || draft.title.length < 3)
      newErrors.title = "Must be more than 3 characters!";
    if (draft.title.length > 50)
      newErrors.title = "Must be less than 50 characters!";
    if (!draft.content || draft.content.length > 500)
      newErrors.content = "Must be less than 500 characters!";
    if (!draft.content) newErrors.content = "This field is required";
    if (!draft.tag) newErrors.tag = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    mutate(draft);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) =>
            setDraft({ ...draft, tag: e.target.value as NoteTag })
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
