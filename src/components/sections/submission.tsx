import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
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
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  workAddressLabel: string;
  workAddressPlaceholder: string;
  serviceTypeLabel: string;
  serviceTypePlaceholder: string;
  serviceTypeOptions: Record<string, string>;
  messageLabel: string;
  messagePlaceholder: string;
  attachmentsLabel: string;
  attachmentsHint: string;
  attachmentsAccepted: string;
  attachmentsRemove: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successMessage: string;
  errorTitle: string;
  errorMessage: string;
  validation: {
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    message: string;
    attachmentsType: string;
    attachmentsSize: string;
  };
}

interface Props {
  imageSrc: string;
  imageAlt: string;
  form: FormContent;
}

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  workAddress: string;
  serviceType: string;
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
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function FileTypeIcon({ mime }: { mime: string }) {
  if (mime.startsWith("image/")) return <PhotoIcon className="h-5 w-5 shrink-0 text-brand-400" />;
  return <DocumentIcon className="h-5 w-5 shrink-0 text-brand-400" />;
}

export default function SubmissionForm({ imageSrc, imageAlt, form }: Props) {
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
        setFileError(form.validation.attachmentsType);
        resetFileInput();
        return;
      }
      if (!next.find((f) => f.name === file.name && f.size === file.size)) {
        next.push(file);
      }
    }

    const totalSize = next.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_FILE_SIZE) {
      setFileError(form.validation.attachmentsSize);
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
      setFileError(form.validation.attachmentsSize);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("workAddress", data.workAddress ?? "");
      formData.append("serviceType", data.serviceType);
      formData.append("message", data.message);
      uploadedFiles.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/submission", {
        method: "POST",
        body: formData,
      });
      setSubmitStatus(res.ok ? "success" : "error");
    } catch {
      setSubmitStatus("error");
    }
  }

  const totalSize = uploadedFiles.reduce((sum, f) => sum + f.size, 0);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { amount: 0.35, once: false },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  const slideIn = (direction: "left" | "right", delay: number) => ({
    initial: { opacity: 0, x: direction === "left" ? -44 : 44 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { amount: 0.25, once: false },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <div className="bg-brand-50 dark:bg-brand-900 lg:grid lg:grid-cols-2">
      <motion.div {...slideIn("left", 0.05)} className="px-6 pt-8 pb-16 lg:px-6 lg:pt-8 lg:pb-16">
        <div className="mx-auto max-w-lg">
            {submitStatus === "success" ? (
              <motion.div {...fadeUp(0.05)} className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-green-50 p-10 text-center ring-1 ring-green-200 dark:bg-green-900/20 dark:ring-green-500/30">
                <CheckCircleIcon className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">{form.successTitle}</h3>
                <p className="text-green-700 dark:text-green-400">{form.successMessage}</p>
              </motion.div>
            ) : (
              <form
                name="submission"
                method="POST"
                data-netlify="true"
                aria-label={form.ariaLabel}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-16"
              >
                <input type="hidden" name="form-name" value="submission" />

                {submitStatus === "error" && (
                  <motion.div {...fadeUp(0)} className="mb-6 flex gap-x-3 rounded-lg bg-red-50 p-4 ring-1 ring-red-200 dark:bg-red-900/20 dark:ring-red-500/30">
                    <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-red-500" />
                    <div>
                      <p className="font-semibold text-red-800 dark:text-red-300">{form.errorTitle}</p>
                      <p className="text-sm text-red-700 dark:text-red-400">{form.errorMessage}</p>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                  <div className="sm:col-span-2">
                    <label htmlFor="full-name" className={labelClass}>{form.fullNameLabel}</label>
                    <div className="mt-2.5">
                      <input
                        id="full-name"
                        type="text"
                        autoComplete="name"
                        placeholder={form.fullNamePlaceholder}
                        className={errors.fullName ? inputErrorClass : inputClass}
                        {...register("fullName", { required: form.validation.fullName })}
                      />
                      {errors.fullName && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={labelClass}>{form.emailLabel}</label>
                    <div className="mt-2.5">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder={form.emailPlaceholder}
                        className={errors.email ? inputErrorClass : inputClass}
                        {...register("email", {
                          required: form.validation.email,
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: form.validation.email },
                        })}
                      />
                      {errors.email && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className={labelClass}>{form.phoneLabel}</label>
                    <div className="mt-2.5">
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder={form.phonePlaceholder}
                        className={errors.phone ? inputErrorClass : inputClass}
                        {...register("phone", { required: form.validation.phone })}
                      />
                      {errors.phone && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="work-address" className={labelClass}>{form.workAddressLabel}</label>
                    <div className="mt-2.5">
                      <input
                        id="work-address"
                        type="text"
                        autoComplete="street-address"
                        placeholder={form.workAddressPlaceholder}
                        className={inputClass}
                        {...register("workAddress")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="service-type" className={labelClass}>{form.serviceTypeLabel}</label>
                    <div className="mt-2.5">
                      <select
                        id="service-type"
                        defaultValue=""
                        className={`${errors.serviceType ? inputErrorClass : inputClass} cursor-pointer`}
                        {...register("serviceType", { required: form.validation.serviceType })}
                      >
                        <option value="" disabled>{form.serviceTypePlaceholder}</option>
                        {Object.entries(form.serviceTypeOptions).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                      {errors.serviceType && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.serviceType.message}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>{form.messageLabel}</label>
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

                  <div className="sm:col-span-2">
                    <div className="flex items-baseline justify-between">
                      <label className={labelClass}>{form.attachmentsLabel}</label>
                      <span className={`text-xs ${totalSize > MAX_FILE_SIZE ? "text-red-500" : "text-brand-400 dark:text-brand-500"}`}>
                        {uploadedFiles.length > 0 ? `${formatBytes(totalSize)} / 20 MB` : "Max 20 MB"}
                      </span>
                    </div>

                    {fileError && (
                      <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-500/30">
                        <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
                        {fileError}
                      </div>
                    )}

                    <div className="mt-2.5">
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label={form.attachmentsHint}
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
                        <p className="text-sm font-medium text-brand-700 dark:text-brand-200">{form.attachmentsHint}</p>
                        <p className="text-xs text-brand-400 dark:text-brand-500">{form.attachmentsAccepted}</p>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        className="sr-only"
                        onChange={(e) => addFiles(e.target.files)}
                      />

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
                                aria-label={`${form.attachmentsRemove} ${file.name}`}
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
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    disabled={isSubmitting}
                    className="rounded-md bg-brand-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60 dark:bg-brand-500 dark:hover:bg-brand-400 dark:focus-visible:outline-brand-500"
                  >
                    {isSubmitting ? form.submittingLabel : form.submitLabel}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>

      <motion.div {...slideIn("right", 0.12)} className="relative hidden lg:block">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
