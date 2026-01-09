import React from 'react'

interface SkeletonProps {
    className?: string
    variant?: 'text' | 'circular' | 'rectangular'
    width?: string
    height?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'rectangular',
    width,
    height
}) => {
    const baseClasses = 'animate-pulse bg-gray-200'

    const variantClasses = {
        text: 'rounded h-4',
        circular: 'rounded-full',
        rectangular: 'rounded-lg'
    }

    const style = {
        width: width || (variant === 'circular' ? '40px' : '100%'),
        height: height || (variant === 'text' ? '16px' : variant === 'circular' ? '40px' : '100px')
    }

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
        />
    )
}

// Preset skeleton components for common use cases
export const CardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rectangular" height="200px" />
        <div className="flex gap-3">
            <Skeleton variant="rectangular" width="100px" height="40px" />
            <Skeleton variant="rectangular" width="100px" height="40px" />
        </div>
    </div>
)

export const ListItemSkeleton = () => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
        <Skeleton variant="circular" width="48px" height="48px" />
        <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="60%" />
        </div>
    </div>
)

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
    <div className="space-y-2">
        {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="flex gap-4 p-3 bg-white rounded border">
                <Skeleton variant="text" width="20%" />
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="25%" />
                <Skeleton variant="text" width="25%" />
            </div>
        ))}
    </div>
)

export default Skeleton
