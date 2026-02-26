import './Button.css'

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export function SegmentedControl({ segments, activeSegment, onSegmentChange }) {
    return (
        <div className="segmented-control">
            {segments.map(segment => (
                <button
                    key={segment.value}
                    className={`segment ${activeSegment === segment.value ? 'active' : ''}`}
                    onClick={() => onSegmentChange(segment.value)}
                >
                    {segment.label}
                </button>
            ))}
        </div>
    )
}
