import React, { useState } from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { Button } from '../components/Button';
import { getCanChi, getZodiac } from '../utils/lunarCalendar';
import './MemberProfile.css';

export function MemberProfile({ member, onBack }) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'Admin', text: 'Cụ là người có công lớn trong việc lập nên dòng họ tại vùng đất mới.', time: '25/02/2026 10:30' },
        { id: 2, user: 'Nguyễn Văn F', text: 'Theo lời kể của ông nội, Cụ rất giỏi về thơ văn và y thuật cổ truyền.', time: '24/02/2026 14:15' },
    ]);

    const defaultMember = member || {
        name: 'Nguyễn Văn A',
        gen: 1,
        role: 'Thủy Tổ',
        dob: '1850',
        dod: '1920',
        status: 'deceased',
        gender: 'Nam',
        branch: 'Gốc',
        hometown: 'Hà Tĩnh',
        job: 'Nông nghiệp',
        bio: 'Là Thủy Tổ khai cơ lập nghiệp tại vùng đất Hồng Lĩnh. Cụ có 3 người con, sau này phát triển thành 3 chi lớn trải rộng khắp các tỉnh thành.',
        spouse: 'Trần Thị X',
        children: ['Nguyễn Văn B', 'Nguyễn Văn C', 'Nguyễn Thị I'],
        father: null,
        mother: null,
    };

    const m = defaultMember;
    const birthYear = parseInt(m.dob) || 0;

    const addComment = () => {
        if (!commentText.trim()) return;
        setComments(prev => [{
            id: Date.now(),
            user: 'Admin',
            text: commentText,
            time: new Date().toLocaleString('vi-VN'),
        }, ...prev]);
        setCommentText('');
    };

    return (
        <div className="profile-page animate-slide-up">
            <div className="profile-back">
                <Button variant="ghost" size="sm" onClick={onBack}>← Quay lại</Button>
            </div>

            {/* Profile Header */}
            <div className="profile-header-card">
                <div className="profile-avatar">{m.gender === 'Nam' ? '👨' : '👩'}</div>
                <div className="profile-header-info">
                    <h2>{m.name}</h2>
                    <p className="profile-subtitle">Đời {m.gen} · {m.role} · {m.branch}</p>
                    <span className={`profile-status ${m.status}`}>
                        {m.status === 'alive' ? '● Còn sống' : '○ Đã mất'}
                    </span>
                </div>
            </div>

            <div className="profile-grid">
                <div className="profile-col">
                    <SectionHeader>Thông tin cá nhân</SectionHeader>
                    <Card>
                        <ListRow icon="👤" iconColor="var(--color-accent)" title="Họ và tên" trailing={m.name} />
                        <ListRow icon="🎂" iconColor="var(--color-orange)" title="Năm sinh" trailing={m.dob} />
                        {m.dod && <ListRow icon="🕯️" iconColor="var(--color-label-tertiary)" title="Năm mất" trailing={m.dod} />}
                        <ListRow icon="⚧" iconColor="var(--color-pink)" title="Giới tính" trailing={m.gender} />
                        <ListRow icon="📍" iconColor="var(--color-red)" title="Quê quán" trailing={m.hometown || '—'} />
                        <ListRow icon="💼" iconColor="var(--color-teal)" title="Nghề nghiệp" trailing={m.job || '—'} />
                    </Card>

                    {birthYear > 0 && (
                        <>
                            <SectionHeader>Âm lịch</SectionHeader>
                            <Card>
                                <ListRow icon="🐲" iconColor="var(--color-purple)" title="Năm Can Chi" trailing={getCanChi(birthYear)} />
                                <ListRow icon="🪧" iconColor="var(--color-yellow)" title="Con giáp" trailing={getZodiac(birthYear)} />
                            </Card>
                        </>
                    )}
                </div>

                <div className="profile-col">
                    <SectionHeader>Gia đình</SectionHeader>
                    <Card>
                        {m.father && <ListRow icon="👨" iconColor="var(--color-accent)" title="Cha" trailing={m.father} chevron />}
                        {m.mother && <ListRow icon="👩" iconColor="var(--color-pink)" title="Mẹ" trailing={m.mother} chevron />}
                        {m.spouse && <ListRow icon="💑" iconColor="var(--color-red)" title="Vợ/Chồng" trailing={m.spouse} />}
                        {m.children && m.children.map((child, i) => (
                            <ListRow key={i} icon="👶" iconColor="var(--color-green)" title={`Con ${i + 1}`} trailing={child} chevron />
                        ))}
                    </Card>

                    <SectionHeader>Tiểu sử</SectionHeader>
                    <Card>
                        <div style={{ padding: 'var(--spacing-lg)', fontSize: 'var(--font-size-subheadline)', lineHeight: 1.6, color: 'var(--color-label-secondary)' }}>
                            {m.bio || 'Chưa có thông tin tiểu sử.'}
                        </div>
                    </Card>

                    <SectionHeader>Ghi chú & Bình luận ({comments.length})</SectionHeader>
                    <Card>
                        <div className="comment-input-row">
                            <input
                                type="text"
                                placeholder="Thêm ghi chú..."
                                value={commentText}
                                onChange={e => setCommentText(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addComment()}
                            />
                            <Button size="sm" onClick={addComment}>Đăng</Button>
                        </div>
                        {comments.map(c => (
                            <div key={c.id} className="comment-item">
                                <div className="comment-header">
                                    <strong>{c.user}</strong>
                                    <span>{c.time}</span>
                                </div>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </div>
    );
}
