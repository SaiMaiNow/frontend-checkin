import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingOverlayProps {
    isLoading: boolean
    text?: string
    children: React.ReactNode
    blur?: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    isLoading,
    text = 'กำลังโหลด...',
    children,
    blur = true
}) => {
    return (
        <div className="relative">
            {children}
            {isLoading && (
                <div className={`absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 rounded-lg ${blur ? 'backdrop-blur-sm' : ''}`}>
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-sm text-gray-700 font-medium">{text}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoadingOverlay
