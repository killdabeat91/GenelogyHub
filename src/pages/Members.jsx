import React, { useState } from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { Button, SegmentedControl } from '../components/Button';
import { Modal } from '../components/Modal';
import './Members.css';

const SAMPLE_MEMBERS = [
    { id: 1, name: 'Nguyễn Văn A', gen: 1, role: 'Thủy Tổ', dob: '1850', dod: '1920', status: 'deceased', gender: 'Nam', branch: 'Gốc' },
    { id: 2, name: 'Nguyễn Văn B', gen: 2, role: 'Trưởng nam', dob: '1880', dod: '1955', status: 'deceased', gender: 'Nam', branch: 'Chi 1' },
    { id: 3, name: 'Nguyễn Văn C', gen: 2, role: 'Thứ nam', dob: '1885', dod: '1960', status: 'deceased', gender: 'Nam', branch: 'Chi 2' },
    { id: 4, name: 'Nguyễn Thị I', gen: 2, role: 'Trưởng nữ', dob: '1888', dod: '1970', status: 'deceased', gender: 'Nữ', branch: 'Chi 1' },
    { id: 5, name: 'Nguyễn Văn D', gen: 3, role: 'Con trưởng', dob: '1910', dod: '1985', status: 'deceased', gender: 'Nam', branch: 'Chi 1' },
    { id: 6, name: 'Nguyễn Thị E', gen: 3, role: 'Con gái', dob: '1915', dod: null, status: 'deceased', gender: 'Nữ', branch: 'Chi 1' },
    { id: 7, name: 'Nguyễn Văn F', gen: 3, role: 'Con trai', dob: '1920', dod: null, status: 'alive', gender: 'Nam', branch: 'Chi 2' },
    { id: 8, name: 'Nguyễn Thị H', gen: 3, role: 'Con gái', dob: '1925', dod: null, status: 'alive', gender: 'Nữ', branch: 'Chi 2' },
    { id: 9, name: 'Nguyễn Văn G', gen: 4, role: 'Cháu trai', dob: '1960', dod: null, status: 'alive', gender: 'Nam', branch: 'Chi 2' },
];

export function Members() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const segments = [
        { value: 'all', label: 'Tất cả' },
        { value: 'alive', label: 'Còn sống' },
        { value: 'deceased', label: 'Đã mất' },
    ];

    const filtered = SAMPLE_MEMBERS
        .filter(m => filter === 'all' || m.status === filter)
        .filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="members-page animate-slide-up">
            <div className="members-toolbar">
                <SegmentedControl
                    segments={segments}
                    activeSegment={filter}
                    onSegmentChange={setFilter}
                />
                <div className="members-toolbar-right">
                    <input
                        type="text"
                        className="members-search"
                        placeholder="Tìm theo tên..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Button size="sm" onClick={() => setIsModalOpen(true)}>+ Thêm</Button>
                </div>
            </div>

            <div className="members-stats">
                <span>Hiển thị <strong>{filtered.length}</strong> / {SAMPLE_MEMBERS.length} thành viên</span>
            </div>

            <SectionHeader>Danh sách thành viên</SectionHeader>
            <Card>
                {filtered.map(member => (
                    <ListRow
                        key={member.id}
                        icon={member.gender === 'Nam' ? '👨' : '👩'}
                        iconColor={member.status === 'alive' ? 'var(--color-accent)' : 'var(--color-fill)'}
                        title={member.name}
                        subtitle={`Đời ${member.gen} · ${member.role} · ${member.branch}`}
                        trailing={
                            <div className="member-trailing">
                                <span className={`status-dot ${member.status}`} />
                                <span className="member-year">{member.dob}{member.dod ? ` — ${member.dod}` : ''}</span>
                            </div>
                        }
                        chevron
                    />
                ))}
                {filtered.length === 0 && (
                    <div className="empty-state">
                        <span>🔍</span>
                        <p>Không tìm thấy thành viên nào.</p>
                    </div>
                )}
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Thêm Thành Viên"
            >
                <form className="swift-form" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                    <div className="form-section">
                        <div className="form-section-title">Thông tin cơ bản</div>
                        <div className="form-fields">
                            <div className="form-field">
                                <label>Họ và tên</label>
                                <input type="text" placeholder="Nhập họ tên" required />
                            </div>
                            <div className="form-field">
                                <label>Giới tính</label>
                                <select><option>Nam</option><option>Nữ</option></select>
                            </div>
                            <div className="form-field">
                                <label>Năm sinh</label>
                                <input type="text" placeholder="VD: 1990" />
                            </div>
                            <div className="form-field">
                                <label>Năm mất</label>
                                <input type="text" placeholder="Để trống nếu còn sống" />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-title">Vị trí trong dòng họ</div>
                        <div className="form-fields">
                            <div className="form-field">
                                <label>Đời thứ</label>
                                <input type="number" min="1" placeholder="VD: 3" />
                            </div>
                            <div className="form-field">
                                <label>Quan hệ</label>
                                <select>
                                    <option>Con đẻ</option><option>Vợ/Chồng</option><option>Con nuôi</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Thuộc chi</label>
                                <select>
                                    <option>Chi 1</option><option>Chi 2</option><option>Chi 3</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-title">Thông tin thêm</div>
                        <div className="form-fields">
                            <div className="form-field">
                                <label>Nghề nghiệp</label>
                                <input type="text" placeholder="VD: Giáo viên" />
                            </div>
                            <div className="form-field">
                                <label>Quê quán</label>
                                <input type="text" placeholder="VD: Hà Tĩnh" />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Button type="submit">Lưu Thành Viên</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
