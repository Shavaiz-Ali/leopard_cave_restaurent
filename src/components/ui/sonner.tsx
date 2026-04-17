"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster"
      toastOptions={{
        classNames: {
          toast:
            "bg-card text-foreground border-border shadow-lg rounded-xl",
          title: "text-sm font-medium text-foreground",
          description: "text-xs text-muted-foreground mt-1",
          actionButton:
            "bg-primary text-primary-foreground text-xs font-medium",
          cancelButton:
            "bg-muted text-muted-foreground text-xs font-medium",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
