export function Card({ children, className = '', ...props }) {
    return (
        <div className={`section-group ${className}`} {...props}>
            {children}
        </div>
    )
}

export function SectionHeader({ children }) {
    return <div className="section-header">{children}</div>
}

export function ListRow({
    icon,
    iconColor,
    title,
    subtitle,
    trailing,
    chevron = false,
    onClick,
    className = '',
    children
}) {
    return (
        <div className={`list-row ${className}`} onClick={onClick}>
            {icon && (
                <div className="row-leading">
                    <div
                        className="row-icon"
                        style={{
                            background: iconColor || 'var(--color-fill)',
                            width: 30,
                            height: 30,
                            borderRadius: 7,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            color: '#fff'
                        }}
                    >
                        {icon}
                    </div>
                </div>
            )}
            <div className="row-content">
                <div style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-label)' }}>{title}</div>
                {subtitle && (
                    <div style={{ fontSize: 'var(--font-size-caption1)', color: 'var(--color-label-tertiary)', marginTop: 2 }}>
                        {subtitle}
                    </div>
                )}
                {children}
            </div>
            {(trailing || chevron) && (
                <div className="row-trailing">
                    {trailing && <span style={{ fontSize: 'var(--font-size-body)' }}>{trailing}</span>}
                    {chevron && <span className="chevron" />}
                </div>
            )}
        </div>
    )
}
