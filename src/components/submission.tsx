import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowUpTrayIcon,
  CheckCircleIcon,
  DocumentIcon,
  ExclamationTriangleIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface FormContent {
  ariaLabel: string;
  nom: string;
  nomPlaceholder: string;
  courriel: string;
  courrielPlaceholder: string;
  telephone: string;
  telephonePlaceholder: string;
  adresse: string;
  adressePlaceholder: string;
  typeService: string;
  typeServicePlaceholder: string;
  typeServiceOptions: Record<string, string>;
  message: string;
  messagePlaceholder: string;
  fichiers: string;
  fichiersHint: string;
  fichiersAccepted: string;
  fichiersRemove: string;
  envoyer: string;
  sending: string;
  successTitle: string;
  successMessage: string;
  errorTitle: string;
  errorMessage: string;
  validation: {
    nom: string;
    courriel: string;
    telephone: string;
    typeService: string;
    message: string;
    fichiersType: string;
    fichiersSize: string;
  };
}

interface Props {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  form: FormContent;
}

interface FormFields {
  nom: string;
  courriel: string;
  telephone: string;
  adresse: string;
  typeService: string;
  message: string;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const ACCEPTED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const inputBase =
  "block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-dark outline-1 -outline-offset-1 placeholder:text-brand-400 focus:outline-2 focus:-outline-offset-2 dark:bg-white/5 dark:text-white dark:placeholder:text-brand-400";

const inputClass = `${inputBase} outline-brand-200 focus:outline-brand-600 dark:outline-white/10 dark:focus:outline-brand-500`;
const inputErrorClass = `${inputBase} outline-red-400 focus:outline-red-500 dark:outline-red-500/50`;
const labelClass = "block text-sm/6 font-semibold text-brand-dark dark:text-white";

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

function FileTypeIcon({ mime }: { mime: string }) {
  if (mime.startsWith("image/")) return <PhotoIcon className="h-5 w-5 shrink-0 text-brand-400" />;
  return <DocumentIcon className="h-5 w-5 shrink-0 text-brand-400" />;
}

export default function SubmissionForm({ imageSrc, imageAlt, title, subtitle, form }: Props) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ mode: "onTouched" });

  function resetFileInput() {
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const next = [...uploadedFiles];

    for (const file of Array.from(incoming)) {
      if (!ACCEPTED_MIME.has(file.type)) {
        setFileError(form.validation.fichiersType);
        resetFileInput();
        return;
      }
      if (!next.find((f) => f.name === file.name && f.size === file.size)) {
        next.push(file);
      }
    }

    const totalSize = next.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_FILE_SIZE) {
      setFileError(form.validation.fichiersSize);
      resetFileInput();
      return;
    }

    setFileError("");
    setUploadedFiles(next);
    resetFileInput();
  }

  function removeFile(index: number) {
    const next = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(next);
    const newTotal = next.reduce((sum, f) => sum + f.size, 0);
    if (newTotal <= MAX_FILE_SIZE) setFileError("");
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  async function onSubmit(data: FormFields) {
    const totalSize = uploadedFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_FILE_SIZE) {
      setFileError(form.validation.fichiersSize);
      return;
    }
    try {
      const payload = new FormData();
      payload.append("form-name", "soumission");
      (Object.entries(data) as [string, string][]).forEach(([k, v]) => payload.append(k, v));
      uploadedFiles.forEach((f) => payload.append("fichiers", f));
      const res = await fetch("/", { method: "POST", body: payload });
      setSubmitStatus(res.ok ? "success" : "error");
    } catch {
      setSubmitStatus("error");
    }
  }

  const totalSize = uploadedFiles.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="relative flex flex-col bg-brand-50 dark:bg-brand-900">
      <div className="order-2 lg:absolute lg:inset-0 lg:left-1/2">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-64 w-full bg-brand-50 object-cover sm:h-80 lg:absolute lg:h-full dark:bg-brand-900"
        />
      </div>
      <div className="order-1 pt-8 pb-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            {submitStatus === "success" ? (
              <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-green-50 p-10 text-center ring-1 ring-green-200 dark:bg-green-900/20 dark:ring-green-500/30">
                <CheckCircleIcon className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">{form.successTitle}</h3>
                <p className="text-green-700 dark:text-green-400">{form.successMessage}</p>
              </div>
            ) : (
              <form
                name="soumission"
                method="POST"
                data-netlify="true"
                aria-label={form.ariaLabel}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-16"
              >
                <input type="hidden" name="form-name" value="soumission" />

                {submitStatus === "error" && (
                  <div className="mb-6 flex gap-x-3 rounded-lg bg-red-50 p-4 ring-1 ring-red-200 dark:bg-red-900/20 dark:ring-red-500/30">
                    <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-red-500" />
                    <div>
                      <p className="font-semibold text-red-800 dark:text-red-300">{form.errorTitle}</p>
                      <p className="text-sm text-red-700 dark:text-red-400">{form.errorMessage}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                  {/* Nom */}
                  <div className="sm:col-span-2">
                    <label htmlFor="nom" className={labelClass}>{form.nom}</label>
                    <div className="mt-2.5">
                      <input
                        id="nom"
                        type="text"
                        autoComplete="name"
                        placeholder={form.nomPlaceholder}
                        className={errors.nom ? inputErrorClass : inputClass}
                        {...register("nom", { required: form.validation.nom })}
                      />
                      {errors.nom && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.nom.message}</p>}
                    </div>
                  </div>

                  {/* Courriel */}
                  <div className="sm:col-span-2">
                    <label htmlFor="courriel" className={labelClass}>{form.courriel}</label>
                    <div className="mt-2.5">
                      <input
                        id="courriel"
                        type="email"
                        autoComplete="email"
                        placeholder={form.courrielPlaceholder}
                        className={errors.courriel ? inputErrorClass : inputClass}
                        {...register("courriel", {
                          required: form.validation.courriel,
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: form.validation.courriel },
                        })}
                      />
                      {errors.courriel && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.courriel.message}</p>}
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="sm:col-span-2">
                    <label htmlFor="telephone" className={labelClass}>{form.telephone}</label>
                    <div className="mt-2.5">
                      <input
                        id="telephone"
                        type="tel"
                        autoComplete="tel"
                        placeholder={form.telephonePlaceholder}
                        className={errors.telephone ? inputErrorClass : inputClass}
                        {...register("telephone", { required: form.validation.telephone })}
                      />
                      {errors.telephone && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.telephone.message}</p>}
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="sm:col-span-2">
                    <label htmlFor="adresse" className={labelClass}>{form.adresse}</label>
                    <div className="mt-2.5">
                      <input
                        id="adresse"
                        type="text"
                        autoComplete="street-address"
                        placeholder={form.adressePlaceholder}
                        className={inputClass}
                        {...register("adresse")}
                      />
                    </div>
                  </div>

                  {/* Type de service */}
                  <div className="sm:col-span-2">
                    <label htmlFor="typeService" className={labelClass}>{form.typeService}</label>
                    <div className="mt-2.5">
                      <select
                        id="typeService"
                        defaultValue=""
                        className={`${errors.typeService ? inputErrorClass : inputClass} cursor-pointer`}
                        {...register("typeService", { required: form.validation.typeService })}
                      >
                        <option value="" disabled>{form.typeServicePlaceholder}</option>
                        {Object.entries(form.typeServiceOptions).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                      {errors.typeService && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.typeService.message}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>{form.message}</label>
                    <div className="mt-2.5">
                      <textarea
                        id="message"
                        rows={4}
                        placeholder={form.messagePlaceholder}
                        className={errors.message ? inputErrorClass : inputClass}
                        {...register("message", { required: form.validation.message })}
                      />
                      {errors.message && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>}
                    </div>
                  </div>

                  {/* File upload */}
                  <div className="sm:col-span-2">
                    <div className="flex items-baseline justify-between">
                      <label className={labelClass}>{form.fichiers}</label>
                      <span className={`text-xs ${totalSize > MAX_FILE_SIZE ? "text-red-500" : "text-brand-400 dark:text-brand-500"}`}>
                        {uploadedFiles.length > 0 ? `${formatBytes(totalSize)} / 20 Mo` : "Max 20 Mo"}
                      </span>
                    </div>

                    {/* Error banner — always above the dropzone so it's never buried */}
                    {fileError && (
                      <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-500/30">
                        <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
                        {fileError}
                      </div>
                    )}

                    <div className="mt-2.5">
                      {/* Dropzone */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label={form.fichiersHint}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                        className={[
                          "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors",
                          isDragging
                            ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-900/40"
                            : fileError
                            ? "border-red-400 bg-red-50/50 dark:border-red-500/50 dark:bg-red-900/10"
                            : "border-brand-200 hover:border-brand-400 hover:bg-brand-50/50 dark:border-brand-700 dark:hover:border-brand-500 dark:hover:bg-brand-900/20",
                        ].join(" ")}
                      >
                        <ArrowUpTrayIcon className="h-8 w-8 text-brand-300 dark:text-brand-600" />
                        <p className="text-sm font-medium text-brand-700 dark:text-brand-200">{form.fichiersHint}</p>
                        <p className="text-xs text-brand-400 dark:text-brand-500">{form.fichiersAccepted}</p>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        className="sr-only"
                        onChange={(e) => addFiles(e.target.files)}
                      />

                      {/* File list */}
                      {uploadedFiles.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {uploadedFiles.map((file, i) => (
                            <li
                              key={`${file.name}-${file.size}`}
                              className="flex items-center justify-between gap-3 rounded-md bg-brand-50 px-3 py-2 text-sm dark:bg-brand-900/40"
                            >
                              <div className="flex min-w-0 items-center gap-2">
                                <FileTypeIcon mime={file.type} />
                                <span className="truncate text-brand-700 dark:text-brand-200">{file.name}</span>
                                <span className="shrink-0 text-xs text-brand-400">{formatBytes(file.size)}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                aria-label={`${form.fichiersRemove} ${file.name}`}
                                className="shrink-0 rounded p-0.5 text-brand-300 hover:text-red-500 dark:text-brand-500 dark:hover:text-red-400"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                </div>

                <div className="mt-10 flex justify-end border-t border-brand-900/10 pt-8 dark:border-white/10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-brand-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60 dark:bg-brand-500 dark:hover:bg-brand-400 dark:focus-visible:outline-brand-500"
                  >
                    {isSubmitting ? form.sending : form.envoyer}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
