'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the type for the notification context
type NotificationContextType = {
  notification: string | null
  showNotification: (message: string) => void
  clearNotification: () => void
}

// Create the NotificationContext
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

type NotificationProviderProps = {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = (message: string) => {
    setNotification(message)
  }

  const clearNotification = () => {
    setNotification(null)
  }

  const contextValue: NotificationContextType = {
    notification,
    showNotification,
    clearNotification,
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
