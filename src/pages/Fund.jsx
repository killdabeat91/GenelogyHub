import React, { useState } from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { Button, SegmentedControl } from '../components/Button';
import './Fund.css';

export function Fund() {
    const [view, setView] = useState('all');

    const transactions = [
        { id: 1, type: 'income', desc: 'Đóng góp quỹ — Nguyễn Văn G', amount: 500000, date: '25/02/2026' },
        { id: 2, type: 'income', desc: 'Đóng góp quỹ — Nguyễn Thị H', amount: 300000, date: '20/02/2026' },
        { id: 3, type: 'expense', desc: 'Chi phí tổ chức giỗ Cụ A', amount: 2000000, date: '15/02/2026' },
        { id: 4, type: 'income', desc: 'Quỹ tu bổ lăng mộ — Chi 1', amount: 1500000, date: '10/02/2026' },
        { id: 5, type: 'expense', desc: 'Mua lễ vật giỗ Ông B', amount: 800000, date: '05/02/2026' },
        { id: 6, type: 'income', desc: 'Đóng góp thường niên — Chi 2', amount: 2000000, date: '01/02/2026' },
    ];

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = totalIncome - totalExpense;

    const filtered = view === 'all' ? transactions : transactions.filter(t => t.type === view);

    const formatCurrency = (n) => n.toLocaleString('vi-VN') + 'đ';

    return (
        <div className="fund-page animate-slide-up">
            {/* Summary Cards */}
            <div className="fund-summary">
                <div className="fund-card balance">
                    <div className="fund-card-label">Tồn Quỹ</div>
                    <div className="fund-card-value">{formatCurrency(balance)}</div>
                </div>
                <div className="fund-card income">
                    <div className="fund-card-label">Tổng Thu</div>
                    <div className="fund-card-value">{formatCurrency(totalIncome)}</div>
                </div>
                <div className="fund-card expense">
                    <div className="fund-card-label">Tổng Chi</div>
                    <div className="fund-card-value">{formatCurrency(totalExpense)}</div>
                </div>
            </div>

            <div className="fund-toolbar">
                <SegmentedControl
                    segments={[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'income', label: 'Thu' },
                        { value: 'expense', label: 'Chi' },
                    ]}
                    activeSegment={view}
                    onSegmentChange={setView}
                />
                <Button size="sm">+ Ghi nhận</Button>
            </div>

            <SectionHeader>Lịch sử giao dịch</SectionHeader>
            <Card>
                {filtered.map(tx => (
                    <ListRow
                        key={tx.id}
                        icon={tx.type === 'income' ? '↓' : '↑'}
                        iconColor={tx.type === 'income' ? 'var(--color-green)' : 'var(--color-red)'}
                        title={tx.desc}
                        subtitle={tx.date}
                        trailing={
                            <span className={`tx-amount ${tx.type}`}>
                                {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                            </span>
                        }
                    />
                ))}
            </Card>
        </div>
    );
}
