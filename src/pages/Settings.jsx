import React from 'react';
import { Card, SectionHeader, ListRow } from '../components/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/I18nContext';
import { useAuth } from '../contexts/AuthContext';
import './Settings.css';

export function Settings() {
    const { isDark, toggleTheme } = useTheme();
    const { lang, switchLang, t } = useI18n();
    const { user, logout } = useAuth();

    const handleExportPdf = () => {
        alert('Tính năng xuất PDF sẽ tải xuống file gia phả dạng PDF.\n(Cần tích hợp backend để hoàn thiện)');
    };

    return (
        <div className="settings-page animate-slide-up">
            <SectionHeader>{t('settings.appearance')}</SectionHeader>
            <Card>
                <ListRow
                    icon="🌙"
                    iconColor="var(--color-indigo)"
                    title={t('settings.darkMode')}
                    trailing={
                        <label className="toggle-switch">
                            <input type="checkbox" checked={isDark} onChange={toggleTheme} />
                            <span className="toggle-slider" />
                        </label>
                    }
                />
                <ListRow
                    icon="🌐"
                    iconColor="var(--color-accent)"
                    title={t('settings.language')}
                    trailing={
                        <select
                            className="settings-select"
                            value={lang}
                            onChange={e => switchLang(e.target.value)}
                        >
                            <option value="vi">Tiếng Việt</option>
                            <option value="en">English</option>
                        </select>
                    }
                />
            </Card>

            <SectionHeader>{t('settings.data')}</SectionHeader>
            <Card>
                <ListRow
                    icon="📄"
                    iconColor="var(--color-green)"
                    title={t('settings.exportMembers')}
                    trailing="PDF"
                    chevron
                    onClick={handleExportPdf}
                />
                <ListRow
                    icon="🌳"
                    iconColor="var(--color-orange)"
                    title={t('settings.exportTree')}
                    trailing="PDF"
                    chevron
                    onClick={handleExportPdf}
                />
            </Card>

            <SectionHeader>{t('settings.about')}</SectionHeader>
            <Card>
                <ListRow icon="📱" iconColor="var(--color-teal)" title={t('settings.version')} trailing="2.0.0" />
                <ListRow icon="👤" iconColor="var(--color-accent)" title="Tài khoản" trailing={user?.name || 'Guest'} />
                <ListRow icon="🔑" iconColor="var(--color-label-tertiary)" title="Vai trò" trailing={user?.role === 'admin' ? t('admin') : 'Thành viên'} />
            </Card>

            <div className="settings-logout">
                <button className="logout-btn" onClick={logout}>Đăng xuất</button>
            </div>
        </div>
    );
}
