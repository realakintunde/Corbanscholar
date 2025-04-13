"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className="fixed bottom-0 right-0 z-50 m-4 flex flex-col gap-2">{children}</div>
}

const toastVariants = cva("group relative w-full rounded-md border p-4 pr-8 shadow-lg sm:w-96", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "bg-destructive text-destructive-foreground border-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ToastActionElement = React.ReactNode

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  onDismiss?: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onDismiss, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        <button
          onClick={onDismiss}
          className="absolute right-2 top-2 rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
      </div>
    )
  },
)
Toast.displayName = "Toast"

export { Toast, ToastProvider }
