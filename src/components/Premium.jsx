import React, { useState, useEffect, useRef } from 'react';

/**
 * Animated counter that counts up from 0 to target value
 */
export function AnimatedCounter({ value, duration = 1200, prefix = '', suffix = '' }) {
    const [display, setDisplay] = useState(0);
    const startTime = useRef(null);
    const rafId = useRef(null);

    useEffect(() => {
        const target = typeof value === 'number' ? value : parseInt(value) || 0;

        const animate = (timestamp) => {
            if (!startTime.current) startTime.current = timestamp;
            const progress = Math.min((timestamp - startTime.current) / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * target));

            if (progress < 1) {
                rafId.current = requestAnimationFrame(animate);
            }
        };

        startTime.current = null;
        rafId.current = requestAnimationFrame(animate);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [value, duration]);

    return <>{prefix}{display.toLocaleString('vi-VN')}{suffix}</>;
}

/**
 * SVG Circular Progress Ring
 */
export function ProgressRing({ progress = 0, size = 80, strokeWidth = 6, color = 'var(--color-accent)', children }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--color-fill-tertiary)"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.33, 1, 0.68, 1)' }}
                />
            </svg>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {children}
            </div>
        </div>
    );
}

/**
 * Mini Sparkline Chart using SVG
 */
export function Sparkline({ data = [], width = 120, height = 32, color = 'var(--color-accent)' }) {
    if (data.length < 2) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * (height - 4) - 2;
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `0,${height} ${points} ${width},${height}`;

    return (
        <svg width={width} height={height} style={{ display: 'block' }}>
            <defs>
                <linearGradient id={`spark-${color.replace(/[^a-z]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon
                points={areaPoints}
                fill={`url(#spark-${color.replace(/[^a-z]/gi, '')})`}
            />
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 1px 2px ${color}40)` }}
            />
        </svg>
    );
}

/**
 * Skeleton Loading Placeholder
 */
export function Skeleton({ width = '100%', height = 16, borderRadius = 'var(--radius-sm)' }) {
    return (
        <div
            className="skeleton-pulse"
            style={{ width, height, borderRadius, background: 'var(--color-fill-tertiary)' }}
        />
    );
}

/**
 * Animated Pulse Dot (for status indicators)
 */
export function PulseDot({ color = 'var(--color-green)', size = 8 }) {
    return (
        <span className="pulse-dot-wrapper" style={{ width: size * 2.5, height: size * 2.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="pulse-ring" style={{ width: size * 2.5, height: size * 2.5, borderColor: color }} />
            <span className="pulse-core" style={{ width: size, height: size, background: color }} />
        </span>
    );
}
