import React from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { AnimatedCounter, ProgressRing, Sparkline, PulseDot } from '../components/Premium';
import './Dashboard.css';

export function Dashboard() {
    const stats = [
        { label: 'Tổng thành viên', value: 156, icon: '👥', gradient: 'gradient-blue', change: '+3 tháng này', sparkData: [120, 128, 135, 140, 145, 148, 152, 156] },
        { label: 'Số thế hệ', value: 7, icon: '🌳', gradient: 'gradient-green', change: 'Đời 1 → Đời 7', sparkData: [3, 4, 4, 5, 5, 6, 6, 7] },
        { label: 'Còn sống', value: 89, icon: '❤️', gradient: 'gradient-purple', change: '57%', sparkData: [70, 73, 76, 78, 80, 83, 86, 89] },
        { label: 'Đã mất', value: 67, icon: '🕯️', gradient: 'gradient-orange', change: '43%', sparkData: [50, 52, 55, 58, 60, 62, 64, 67] },
    ];

    const upcomingEvents = [
        { name: 'Giỗ Cụ Nguyễn Văn A', date: '15/08 Âm lịch', daysLeft: 12, icon: '🕯️' },
        { name: 'Sinh nhật Nguyễn Văn G', date: '28/09/2026', daysLeft: 18, icon: '🎂' },
        { name: 'Họp mặt đầu xuân', date: 'Mùng 4 Tết', daysLeft: 45, icon: '🤝' },
    ];

    const recentActions = [
        { user: 'Admin', action: 'Thêm thành viên Nguyễn Văn E', time: '2 giờ trước' },
        { user: 'Nguyễn Văn F', action: 'Cập nhật thông tin cá nhân', time: '5 giờ trước' },
        { user: 'Admin', action: 'Ghi nhận thu quỹ 500.000đ', time: 'Hôm qua' },
    ];

    const genderData = { male: 52, female: 48 };
    const ageGroups = [
        { label: 'Dưới 18', count: 12, pct: 8 },
        { label: '18–40', count: 35, pct: 22 },
        { label: '41–60', count: 42, pct: 27 },
        { label: 'Trên 60', count: 67, pct: 43 },
    ];

    return (
        <div className="dashboard-page page-transition-enter">
            {/* Premium Stat Cards */}
            <div className="stats-grid stagger-enter">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card-premium hover-glow">
                        <div className="stat-card-top">
                            <div className={`stat-icon-premium ${stat.gradient}`}>{stat.icon}</div>
                            <Sparkline data={stat.sparkData} width={80} height={28} color={i === 0 ? '#007AFF' : i === 1 ? '#34C759' : i === 2 ? '#AF52DE' : '#FF9500'} />
                        </div>
                        <div className="stat-value-premium tabular-nums">
                            <AnimatedCounter value={stat.value} />
                        </div>
                        <div className="stat-label-premium">{stat.label}</div>
                        <div className="stat-change-premium">{stat.change}</div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="charts-row stagger-enter">
                {/* Gender Distribution Ring */}
                <div className="chart-card hover-glow">
                    <h4 className="chart-title">Tỉ lệ giới tính</h4>
                    <div className="chart-ring-container">
                        <ProgressRing progress={genderData.male} size={100} strokeWidth={10} color="var(--color-accent)">
                            <div className="ring-center">
                                <span className="ring-value"><AnimatedCounter value={genderData.male} suffix="%" /></span>
                                <span className="ring-label">Nam</span>
                            </div>
                        </ProgressRing>
                        <div className="chart-legend">
                            <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-accent)' }} /> Nam — {genderData.male}%</div>
                            <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-pink)' }} /> Nữ — {genderData.female}%</div>
                        </div>
                    </div>
                </div>

                {/* Age Distribution */}
                <div className="chart-card hover-glow">
                    <h4 className="chart-title">Phân bố độ tuổi</h4>
                    <div className="age-bars">
                        {ageGroups.map((group, i) => (
                            <div key={i} className="age-bar-row">
                                <span className="age-label">{group.label}</span>
                                <div className="age-bar-track">
                                    <div className="age-bar-fill" style={{ width: `${group.pct}%`, animationDelay: `${i * 0.15}s` }} />
                                </div>
                                <span className="age-count tabular-nums">{group.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fund Summary Ring */}
                <div className="chart-card hover-glow">
                    <h4 className="chart-title">Tồn quỹ</h4>
                    <div className="chart-ring-container">
                        <ProgressRing progress={72} size={100} strokeWidth={10} color="var(--color-green)">
                            <div className="ring-center">
                                <span className="ring-value" style={{ fontSize: 'var(--font-size-subheadline)' }}>12.5tr</span>
                                <span className="ring-label">Tồn</span>
                            </div>
                        </ProgressRing>
                        <div className="chart-legend">
                            <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-green)' }} /> Thu: 17.3tr</div>
                            <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-red)' }} /> Chi: 4.8tr</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two column layout */}
            <div className="dashboard-grid">
                <div className="dashboard-col">
                    <SectionHeader>Sự kiện sắp tới</SectionHeader>
                    <Card>
                        <div className="stagger-enter">
                            {upcomingEvents.map((event, i) => (
                                <ListRow
                                    key={i}
                                    icon={event.icon}
                                    iconColor="var(--color-fill-tertiary)"
                                    title={event.name}
                                    subtitle={event.date}
                                    trailing={
                                        <div className="countdown-badge-premium">
                                            <strong><AnimatedCounter value={event.daysLeft} duration={800} /></strong>
                                            <span>ngày</span>
                                        </div>
                                    }
                                    chevron
                                />
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="dashboard-col">
                    <SectionHeader>Hoạt động gần đây</SectionHeader>
                    <Card>
                        <div className="stagger-enter">
                            {recentActions.map((action, i) => (
                                <ListRow
                                    key={i}
                                    icon={action.user.charAt(0)}
                                    iconColor="linear-gradient(135deg, var(--color-accent), var(--color-indigo))"
                                    title={action.action}
                                    subtitle={`${action.user} · ${action.time}`}
                                    trailing={<PulseDot color="var(--color-green)" size={6} />}
                                />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
