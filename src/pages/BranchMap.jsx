import React from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import './BranchMap.css';

export function BranchMap() {
    const branches = [
        { name: 'Chi 1 — Hà Nội', members: 42, head: 'Nguyễn Văn D', color: '#FF3B30' },
        { name: 'Chi 2 — TP. Hồ Chí Minh', members: 38, head: 'Nguyễn Văn F', color: '#007AFF' },
        { name: 'Chi 3 — Đà Nẵng', members: 28, head: 'Nguyễn Văn K', color: '#34C759' },
        { name: 'Chi 4 — Hải Phòng', members: 26, head: 'Nguyễn Văn L', color: '#FF9500' },
        { name: 'Chi 5 — Hà Tĩnh (Quê gốc)', members: 15, head: 'Nguyễn Văn M', color: '#AF52DE' },
        { name: 'Hải ngoại — Hoa Kỳ', members: 7, head: 'Nguyễn Thị N', color: '#5AC8FA' },
    ];

    const total = branches.reduce((s, b) => s + b.members, 0);

    return (
        <div className="map-page animate-slide-up">
            {/* Visual Bar Chart */}
            <div className="map-chart-card">
                <h3 className="map-chart-title">Phân bổ thành viên theo Chi / Nhánh</h3>
                <div className="map-bars">
                    {branches.map((b, i) => (
                        <div key={i} className="map-bar-row">
                            <div className="map-bar-label">{b.name}</div>
                            <div className="map-bar-track">
                                <div
                                    className="map-bar-fill"
                                    style={{ width: `${(b.members / total) * 100}%`, background: b.color }}
                                />
                            </div>
                            <div className="map-bar-value">{b.members}</div>
                        </div>
                    ))}
                </div>
                <div className="map-total">Tổng cộng: <strong>{total} thành viên</strong></div>
            </div>

            <SectionHeader>Chi tiết các Chi / Nhánh</SectionHeader>
            <Card>
                {branches.map((b, i) => (
                    <ListRow
                        key={i}
                        icon={<span style={{ fontSize: '0.8rem' }}>●</span>}
                        iconColor={b.color}
                        title={b.name}
                        subtitle={`Trưởng chi: ${b.head}`}
                        trailing={`${b.members} người`}
                        chevron
                    />
                ))}
            </Card>
        </div>
    );
}
