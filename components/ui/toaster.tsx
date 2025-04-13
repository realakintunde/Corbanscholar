"use client"

import { useToast } from "@/components/ui/use-toast"
import { Toast, ToastProvider } from "@/components/ui/toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant }) => (
        <Toast key={id} variant={variant} title={title} description={description} onDismiss={() => dismiss(id)} />
      ))}
    </ToastProvider>
  )
}
