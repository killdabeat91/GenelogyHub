import React from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import './AuditLog.css';

export function AuditLog() {
    const logs = [
        { id: 1, user: 'Admin', action: 'Thêm thành viên Nguyễn Văn G', type: 'create', time: '26/02/2026 10:30', module: 'Thành viên' },
        { id: 2, user: 'Admin', action: 'Cập nhật ngày mất Nguyễn Văn B', type: 'update', time: '26/02/2026 09:15', module: 'Thành viên' },
        { id: 3, user: 'Nguyễn Văn F', action: 'Ghi nhận thu quỹ 500.000đ', type: 'create', time: '25/02/2026 14:20', module: 'Quỹ' },
        { id: 4, user: 'Admin', action: 'Tải lên 5 ảnh — Album Lễ giỗ 2025', type: 'create', time: '25/02/2026 11:00', module: 'Thư viện' },
        { id: 5, user: 'Admin', action: 'Xóa thành viên trùng lặp', type: 'delete', time: '24/02/2026 16:45', module: 'Thành viên' },
        { id: 6, user: 'Admin', action: 'Thêm sự kiện Giỗ Cụ Tổ', type: 'create', time: '24/02/2026 10:00', module: 'Sự kiện' },
        { id: 7, user: 'Nguyễn Thị H', action: 'Cập nhật thông tin cá nhân', type: 'update', time: '23/02/2026 08:30', module: 'Thành viên' },
        { id: 8, user: 'Admin', action: 'Ghi nhận chi quỹ 2.000.000đ', type: 'create', time: '22/02/2026 15:10', module: 'Quỹ' },
    ];

    const getActionIcon = (type) => {
        switch (type) {
            case 'create': return { icon: '+', color: 'var(--color-green)' };
            case 'update': return { icon: '✎', color: 'var(--color-accent)' };
            case 'delete': return { icon: '✕', color: 'var(--color-red)' };
            default: return { icon: '•', color: 'var(--color-fill)' };
        }
    };

    return (
        <div className="audit-page animate-slide-up">
            <SectionHeader>Hôm nay</SectionHeader>
            <Card>
                {logs.filter(l => l.time.startsWith('26')).map(log => {
                    const { icon, color } = getActionIcon(log.type);
                    return (
                        <ListRow
                            key={log.id}
                            icon={icon}
                            iconColor={color}
                            title={log.action}
                            subtitle={`${log.user} · ${log.time} · ${log.module}`}
                        />
                    );
                })}
            </Card>

            <SectionHeader>Trước đó</SectionHeader>
            <Card>
                {logs.filter(l => !l.time.startsWith('26')).map(log => {
                    const { icon, color } = getActionIcon(log.type);
                    return (
                        <ListRow
                            key={log.id}
                            icon={icon}
                            iconColor={color}
                            title={log.action}
                            subtitle={`${log.user} · ${log.time} · ${log.module}`}
                        />
                    );
                })}
            </Card>
        </div>
    );
}
