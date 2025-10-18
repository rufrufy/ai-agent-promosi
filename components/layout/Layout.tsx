import React, { ReactNode } from 'react'
import Header from './Header'

interface LayoutProps {
  children: ReactNode
  showSearch?: boolean
  searchTerm?: string
  onSearchChange?: (term: string) => void
  searchPlaceholder?: string
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showSearch = false, 
  searchTerm, 
  onSearchChange,
  searchPlaceholder 
}) => {
  return (
    <div className="min-h-screen bg-gray-100" data-theme="light">
      <Header 
        showSearch={showSearch}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
      />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout