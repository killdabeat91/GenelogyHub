import React, { useState } from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { Button } from '../components/Button';
import './NotificationCenter.css';

export function NotificationCenter({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'event', title: 'Giỗ Cụ Nguyễn Văn A trong 12 ngày', time: '2 giờ trước', read: false },
        { id: 2, type: 'birthday', title: 'Sinh nhật Nguyễn Văn G — 15/05', time: '5 giờ trước', read: false },
        { id: 3, type: 'update', title: 'Nguyễn Thị H đã cập nhật thông tin cá nhân', time: 'Hôm qua', read: false },
        { id: 4, type: 'fund', title: 'Ghi nhận thu quỹ 500.000đ từ Nguyễn Văn G', time: 'Hôm qua', read: true },
        { id: 5, type: 'system', title: 'Hệ thống đã sao lưu dữ liệu thành công', time: '2 ngày trước', read: true },
    ]);

    if (!isOpen) return null;

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'event': return { icon: '🕯️', color: 'var(--color-red)' };
            case 'birthday': return { icon: '🎂', color: 'var(--color-orange)' };
            case 'update': return { icon: '✏️', color: 'var(--color-accent)' };
            case 'fund': return { icon: '💰', color: 'var(--color-green)' };
            case 'system': return { icon: '⚙️', color: 'var(--color-label-tertiary)' };
            default: return { icon: '📌', color: 'var(--color-fill)' };
        }
    };

    return (
        <div className="notif-overlay" onClick={onClose}>
            <div className="notif-panel" onClick={e => e.stopPropagation()}>
                <div className="notif-header">
                    <h3>Thông báo {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}</h3>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllRead}>Đánh dấu đã đọc</Button>
                    )}
                </div>
                <div className="notif-list">
                    {notifications.map(notif => {
                        const { icon, color } = getIcon(notif.type);
                        return (
                            <div key={notif.id} className={`notif-item ${notif.read ? 'read' : 'unread'}`}>
                                <div className="notif-icon" style={{ background: color }}>{icon}</div>
                                <div className="notif-content">
                                    <div className="notif-text">{notif.title}</div>
                                    <div className="notif-time">{notif.time}</div>
                                </div>
                                {!notif.read && <div className="notif-dot" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
