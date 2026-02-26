import React, { useState } from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { Button, SegmentedControl } from '../components/Button';
import './Library.css';

export function Library() {
    const [view, setView] = useState('photos');

    const photos = [
        { id: 1, title: 'Lễ giỗ Cụ Tổ 2025', count: 24, thumbnail: '📷' },
        { id: 2, title: 'Họp mặt đầu xuân 2025', count: 18, thumbnail: '📷' },
        { id: 3, title: 'Nhà thờ họ Nguyễn', count: 8, thumbnail: '🏛️' },
        { id: 4, title: 'Lăng mộ Tổ tiên', count: 12, thumbnail: '⛩️' },
        { id: 5, title: 'Ảnh gia đình Chi 1', count: 32, thumbnail: '👨‍👩‍👧‍👦' },
        { id: 6, title: 'Ảnh gia đình Chi 2', count: 15, thumbnail: '👨‍👩‍👧‍👦' },
    ];

    const documents = [
        { id: 1, title: 'Gia phả bản gốc (chữ Hán)', type: 'PDF', size: '2.4 MB', icon: '📜' },
        { id: 2, title: 'Phiên bản dịch Quốc ngữ', type: 'DOCX', size: '1.1 MB', icon: '📄' },
        { id: 3, title: 'Sắc phong triều Nguyễn', type: 'IMG', size: '5.2 MB', icon: '📜' },
        { id: 4, title: 'Bản vẽ thiết kế nhà thờ', type: 'PDF', size: '3.8 MB', icon: '📐' },
        { id: 5, title: 'Giấy khen — Nguyễn Văn F', type: 'IMG', size: '0.8 MB', icon: '🏅' },
    ];

    return (
        <div className="library-page animate-slide-up">
            <div className="library-toolbar">
                <SegmentedControl
                    segments={[
                        { value: 'photos', label: 'Ảnh' },
                        { value: 'documents', label: 'Tài liệu' },
                    ]}
                    activeSegment={view}
                    onSegmentChange={setView}
                />
                <Button size="sm">+ Tải lên</Button>
            </div>

            {view === 'photos' && (
                <>
                    <SectionHeader>Album ảnh ({photos.reduce((s, p) => s + p.count, 0)} ảnh)</SectionHeader>
                    <div className="album-grid">
                        {photos.map(album => (
                            <div key={album.id} className="album-card">
                                <div className="album-thumb">{album.thumbnail}</div>
                                <div className="album-info">
                                    <div className="album-title">{album.title}</div>
                                    <div className="album-count">{album.count} ảnh</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {view === 'documents' && (
                <>
                    <SectionHeader>Tài liệu ({documents.length} tệp)</SectionHeader>
                    <Card>
                        {documents.map(doc => (
                            <ListRow
                                key={doc.id}
                                icon={doc.icon}
                                iconColor="var(--color-fill)"
                                title={doc.title}
                                subtitle={`${doc.type} · ${doc.size}`}
                                chevron
                            />
                        ))}
                    </Card>
                </>
            )}
        </div>
    );
}
