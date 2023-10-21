'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the type for the notification context
type NotificationContextType = {
  notification: string | null
  type?: string
  showNotification: (message: string, type?: string) => void
  clearNotification: () => void
}

// Create the NotificationContext
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

type NotificationProviderProps = {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notification, setNotification] = useState<string | null>(null)
  const [type, setType] = useState<string | undefined>()

  const showNotification = (message: string, _type?: string) => {
    console.log('show notification', message, _type)
    setNotification(message)
    setType(_type)
  }

  const clearNotification = () => {
    setNotification(null)
    setType(undefined)
  }

  const contextValue: NotificationContextType = {
    notification,
    type,
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
