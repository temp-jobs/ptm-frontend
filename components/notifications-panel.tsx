"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, BellOff, Briefcase, Users, CheckCircle, Info, X } from "lucide-react"
import { mockEmployerNotifications, type EmployerNotification } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

interface NotificationsPanelProps {
  onClose: () => void
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState<EmployerNotification[]>(mockEmployerNotifications)

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const handleDelete = (notificationId: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== notificationId))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: EmployerNotification["type"]) => {
    switch (type) {
      case "new_application":
        return <Users className="w-5 h-5 text-accent" />
      case "job_status":
        return <Briefcase className="w-5 h-5 text-primary" />
      case "applicant_action":
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      case "system":
        return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getNotificationBgColor = (type: EmployerNotification["type"]) => {
    switch (type) {
      case "new_application":
        return "bg-accent/10"
      case "job_status":
        return "bg-primary/10"
      case "applicant_action":
        return "bg-green-500/10"
      case "system":
        return "bg-blue-500/10"
      default:
        return "bg-muted"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[500px] p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SheetTitle className="text-2xl">{t("employer.notifications")}</SheetTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {unreadCount}
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                {t("employer.markAllRead")}
              </Button>
            )}
          </div>
          <SheetDescription>Stay updated with your job postings and applicants</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-140px)]">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "group p-4 hover:bg-muted/50 transition-colors cursor-pointer relative",
                    !notification.read && "bg-primary/5",
                  )}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                  )}

                  <div className="flex items-start gap-3 pl-3">
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        getNotificationBgColor(notification.type),
                      )}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={cn("font-semibold text-sm", !notification.read && "text-foreground")}>
                          {notification.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(notification.id)
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(notification.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center px-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <BellOff className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t("employer.noNotifications")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
