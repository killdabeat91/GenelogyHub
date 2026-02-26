import React, { useState } from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { Button } from '../components/Button';
import './AdvancedSearch.css';

const ALL_MEMBERS = [
    { id: 1, name: 'Nguyễn Văn A', gen: 1, branch: 'Gốc', hometown: 'Hà Tĩnh', job: 'Nông nghiệp', status: 'deceased', gender: 'Nam' },
    { id: 2, name: 'Nguyễn Văn B', gen: 2, branch: 'Chi 1', hometown: 'Hà Nội', job: 'Thương mại', status: 'deceased', gender: 'Nam' },
    { id: 3, name: 'Nguyễn Văn C', gen: 2, branch: 'Chi 2', hometown: 'Hà Tĩnh', job: 'Giáo viên', status: 'deceased', gender: 'Nam' },
    { id: 4, name: 'Nguyễn Thị I', gen: 2, branch: 'Chi 1', hometown: 'Hải Phòng', job: 'Nội trợ', status: 'deceased', gender: 'Nữ' },
    { id: 5, name: 'Nguyễn Văn D', gen: 3, branch: 'Chi 1', hometown: 'Hà Nội', job: 'Kỹ sư', status: 'deceased', gender: 'Nam' },
    { id: 6, name: 'Nguyễn Thị E', gen: 3, branch: 'Chi 1', hometown: 'Đà Nẵng', job: 'Bác sĩ', status: 'deceased', gender: 'Nữ' },
    { id: 7, name: 'Nguyễn Văn F', gen: 3, branch: 'Chi 2', hometown: 'TP.HCM', job: 'Kinh doanh', status: 'alive', gender: 'Nam' },
    { id: 8, name: 'Nguyễn Thị H', gen: 3, branch: 'Chi 2', hometown: 'TP.HCM', job: 'Kế toán', status: 'alive', gender: 'Nữ' },
    { id: 9, name: 'Nguyễn Văn G', gen: 4, branch: 'Chi 2', hometown: 'TP.HCM', job: 'Lập trình viên', status: 'alive', gender: 'Nam' },
];

export function AdvancedSearch() {
    const [filters, setFilters] = useState({ name: '', gen: '', branch: '', hometown: '', job: '' });
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    const doSearch = () => {
        const r = ALL_MEMBERS.filter(m => {
            if (filters.name && !m.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
            if (filters.gen && m.gen !== parseInt(filters.gen)) return false;
            if (filters.branch && m.branch !== filters.branch) return false;
            if (filters.hometown && !m.hometown.toLowerCase().includes(filters.hometown.toLowerCase())) return false;
            if (filters.job && !m.job.toLowerCase().includes(filters.job.toLowerCase())) return false;
            return true;
        });
        setResults(r);
        setSearched(true);
    };

    const clearSearch = () => {
        setFilters({ name: '', gen: '', branch: '', hometown: '', job: '' });
        setResults([]);
        setSearched(false);
    };

    return (
        <div className="search-page animate-slide-up">
            <SectionHeader>Tìm kiếm nâng cao</SectionHeader>
            <Card>
                <div className="search-filters">
                    <div className="search-field">
                        <label>Họ tên</label>
                        <input type="text" placeholder="VD: Nguyễn Văn" value={filters.name} onChange={e => updateFilter('name', e.target.value)} />
                    </div>
                    <div className="search-field">
                        <label>Đời thứ</label>
                        <input type="number" min="1" placeholder="VD: 3" value={filters.gen} onChange={e => updateFilter('gen', e.target.value)} />
                    </div>
                    <div className="search-field">
                        <label>Chi/Nhánh</label>
                        <select value={filters.branch} onChange={e => updateFilter('branch', e.target.value)}>
                            <option value="">Tất cả</option>
                            <option>Gốc</option>
                            <option>Chi 1</option>
                            <option>Chi 2</option>
                            <option>Chi 3</option>
                        </select>
                    </div>
                    <div className="search-field">
                        <label>Quê quán</label>
                        <input type="text" placeholder="VD: Hà Nội" value={filters.hometown} onChange={e => updateFilter('hometown', e.target.value)} />
                    </div>
                    <div className="search-field">
                        <label>Nghề nghiệp</label>
                        <input type="text" placeholder="VD: Kỹ sư" value={filters.job} onChange={e => updateFilter('job', e.target.value)} />
                    </div>
                </div>
                <div className="search-actions">
                    <Button variant="ghost" size="sm" onClick={clearSearch}>Xóa bộ lọc</Button>
                    <Button size="sm" onClick={doSearch}>🔍 Tìm kiếm</Button>
                </div>
            </Card>

            {searched && (
                <>
                    <SectionHeader>Kết quả ({results.length} thành viên)</SectionHeader>
                    <Card>
                        {results.length > 0 ? results.map(m => (
                            <ListRow
                                key={m.id}
                                icon={m.gender === 'Nam' ? '👨' : '👩'}
                                iconColor={m.status === 'alive' ? 'var(--color-accent)' : 'var(--color-fill)'}
                                title={m.name}
                                subtitle={`Đời ${m.gen} · ${m.branch} · ${m.hometown} · ${m.job}`}
                                chevron
                            />
                        )) : (
                            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-label-tertiary)' }}>
                                <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>🔍</span>
                                Không tìm thấy thành viên phù hợp.
                            </div>
                        )}
                    </Card>
                </>
            )}
        </div>
    );
}
