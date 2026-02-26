import React from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { Button } from '../components/Button';
import './Events.css';

export function Events() {
    const deathAnniversaries = [
        { name: 'Giỗ Cụ Nguyễn Văn A (Thủy Tổ)', lunar: '15/03 Âm lịch', daysLeft: 12 },
        { name: 'Giỗ Ông Nguyễn Văn B', lunar: '20/07 Âm lịch', daysLeft: 45 },
        { name: 'Giỗ Bà Nguyễn Thị I', lunar: '05/10 Âm lịch', daysLeft: 102 },
    ];

    const gatherings = [
        { name: 'Họp mặt đầu xuân Giáp Thìn', date: 'Mùng 4 Tết', location: 'Nhà thờ họ', daysLeft: 180 },
        { name: 'Tu bổ lăng mộ tổ tiên', date: 'Tiết Thanh Minh', location: 'Quê hương', daysLeft: 200 },
    ];

    const birthdays = [
        { name: 'Nguyễn Văn G', date: '15/05/2026', age: 66, daysLeft: 8 },
        { name: 'Nguyễn Thị H', date: '22/06/2026', age: 101, daysLeft: 30 },
    ];

    return (
        <div className="events-page animate-slide-up">
            <div className="events-header">
                <Button size="sm">+ Thêm sự kiện</Button>
            </div>

            <SectionHeader>Ngày giỗ sắp tới</SectionHeader>
            <Card>
                {deathAnniversaries.map((e, i) => (
                    <ListRow
                        key={i}
                        icon="🕯️"
                        iconColor="#FF3B30"
                        title={e.name}
                        subtitle={e.lunar}
                        trailing={<span className="countdown-pill">{e.daysLeft} ngày nữa</span>}
                        chevron
                    />
                ))}
            </Card>

            <SectionHeader>Sinh nhật</SectionHeader>
            <Card>
                {birthdays.map((b, i) => (
                    <ListRow
                        key={i}
                        icon="🎂"
                        iconColor="#FF9500"
                        title={b.name}
                        subtitle={`${b.date} · Tròn ${b.age} tuổi`}
                        trailing={<span className="countdown-pill accent">{b.daysLeft} ngày nữa</span>}
                        chevron
                    />
                ))}
            </Card>

            <SectionHeader>Sự kiện & Hội họp</SectionHeader>
            <Card>
                {gatherings.map((g, i) => (
                    <ListRow
                        key={i}
                        icon="🤝"
                        iconColor="#5856D6"
                        title={g.name}
                        subtitle={`${g.date} · ${g.location}`}
                        trailing={<span className="countdown-pill">{g.daysLeft} ngày</span>}
                        chevron
                    />
                ))}
            </Card>
        </div>
    );
}
