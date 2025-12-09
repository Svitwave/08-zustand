import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import type { NoteFormValues } from "../../types/note";
import toast from "react-hot-toast";

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Must be more than 3 characters!")
    .max(50, "Must be less than 50 characters!")
    .required("Required"),
  content: Yup.string().max(500, "Must be less than 500 characters!"),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
    .required("Required"),
});

interface NoteFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const initialFormValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully");
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    formikHelpers: FormikHelpers<NoteFormValues>
  ) => {
    mutate(values, {
      onSuccess: () => {
        formikHelpers.resetForm();
      },
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={NoteSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
