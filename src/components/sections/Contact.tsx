import type { ReactNode } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'
import { contactInfo } from '../../data/portfolioData'
import { contactSchema, type ContactFormData } from '../../types/contact'

const fieldClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 aria-[invalid=true]:border-red-400 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500'

interface FieldProps {
  name: keyof ContactFormData
  label: string
  error?: string
  children: ReactNode
}

function Field({ name, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${name}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

function ContactChannels() {
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-4">
        <li className="flex items-start gap-3">
          <Mail
            className="mt-0.5 size-5 shrink-0 text-sky-700 dark:text-brand-primary"
            aria-hidden="true"
          />
          <span className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Correo
            </span>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm text-slate-700 transition-colors hover:text-brand-primary dark:text-slate-300"
            >
              {contactInfo.email}
            </a>
          </span>
        </li>

        <li className="flex items-start gap-3">
          <Phone
            className="mt-0.5 size-5 shrink-0 text-sky-700 dark:text-brand-primary"
            aria-hidden="true"
          />
          <span className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Teléfono
            </span>
            <a
              href={`tel:${contactInfo.phoneHref}`}
              className="text-sm text-slate-700 transition-colors hover:text-brand-primary dark:text-slate-300"
            >
              {contactInfo.phone}
            </a>
          </span>
        </li>

        <li className="flex items-start gap-3">
          <MapPin
            className="mt-0.5 size-5 shrink-0 text-sky-700 dark:text-brand-primary"
            aria-hidden="true"
          />
          <span className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Ubicación
            </span>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {contactInfo.location}
            </span>
          </span>
        </li>

        <li className="flex items-start gap-3">
          <ExternalLink
            className="mt-0.5 size-5 shrink-0 text-sky-700 dark:text-brand-primary"
            aria-hidden="true"
          />
          <span className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              LinkedIn
            </span>
            <a
              href={contactInfo.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-slate-700 transition-colors hover:text-brand-primary dark:text-slate-300"
            >
              linkedin.com/in/mayckol-sanchez-a32624122
            </a>
          </span>
        </li>

        <li className="flex items-start gap-3">
          <ExternalLink
            className="mt-0.5 size-5 shrink-0 text-sky-700 dark:text-brand-primary"
            aria-hidden="true"
          />
          <span className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              GitHub
            </span>
            <a
              href={contactInfo.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-slate-700 transition-colors hover:text-brand-primary dark:text-slate-300"
            >
              github.com/WmikeeD
            </a>
          </span>
        </li>
      </ul>

      <p className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700 dark:text-brand-secondary">
        <BadgeCheck className="size-4 shrink-0" aria-hidden="true" />
        {contactInfo.availability}
      </p>
    </div>
  )
}

const GENERIC_SUBMIT_ERROR =
  'No se pudo enviar tu mensaje. Inténtalo de nuevo más tarde.'

function Contact() {
  const [submittedName, setSubmittedName] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        setSubmitError(GENERIC_SUBMIT_ERROR)
        return
      }

      setSubmittedName(data.name)
      reset()
    } catch {
      setSubmitError(GENERIC_SUBMIT_ERROR)
    }
  }

  return (
    <section id="contacto" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-brand-primary">
            Contacto
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Hablemos de tu próximo proyecto
          </h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            ¿Buscas un perfil Full-Stack o QA Lead? Escríbeme y te respondo lo
            antes posible.
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-2">
          <ContactChannels />

          <div>
            {submittedName ? (
              <div
                role="status"
                className="flex flex-col items-start gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6"
              >
                <CheckCircle2
                  className="size-8 text-emerald-600 dark:text-brand-secondary"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    ¡Gracias, {submittedName}!
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tu mensaje se envió correctamente. Te responderé lo antes
                    posible.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedName(null)}
                  className="text-sm font-semibold text-sky-700 transition-colors hover:text-brand-primary dark:text-brand-primary dark:hover:text-white"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-brand-card/90"
              >
                {submitError ? (
                  <p
                    role="alert"
                    className="flex items-center gap-1.5 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400"
                  >
                    <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                    {submitError}
                  </p>
                ) : null}

                <Field name="name" label="Nombre" error={errors.name?.message}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={fieldClass}
                    {...register('name')}
                  />
                </Field>

                <Field
                  name="email"
                  label="Correo electrónico"
                  error={errors.email?.message}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={fieldClass}
                    {...register('email')}
                  />
                </Field>

                <Field
                  name="subject"
                  label="Asunto"
                  error={errors.subject?.message}
                >
                  <input
                    id="subject"
                    type="text"
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={
                      errors.subject ? 'subject-error' : undefined
                    }
                    className={fieldClass}
                    {...register('subject')}
                  />
                </Field>

                <Field
                  name="message"
                  label="Mensaje"
                  error={errors.message?.message}
                >
                  <textarea
                    id="message"
                    rows={5}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                    className={`${fieldClass} resize-y`}
                    {...register('message')}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-dark transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden="true" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
