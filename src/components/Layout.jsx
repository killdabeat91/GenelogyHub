import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { useAuth } from '../contexts/AuthContext';
import { NotificationCenter } from './NotificationCenter';
import './Layout.css';

const NAV_ITEMS = [
    { key: 'dashboard', icon: '📊', labelKey: 'nav.overview' },
    { key: 'tree', icon: '🌳', labelKey: 'nav.tree' },
    { key: 'members', icon: '👥', labelKey: 'nav.members' },
    { key: 'events', icon: '🗓️', labelKey: 'nav.events', badge: 2 },
    { key: 'fund', icon: '💰', labelKey: 'nav.fund' },
    { key: 'library', icon: '📚', labelKey: 'nav.library' },
    { key: 'map', icon: '🗺️', labelKey: 'nav.map' },
    { key: 'search', icon: '🔍', labelKey: 'search.advanced' },
];

const NAV_SYSTEM = [
    { key: 'audit', icon: '🕓', labelKey: 'nav.audit' },
    { key: 'settings', icon: '⚙️', labelKey: 'nav.settings' },
];

export function Layout({ children, activeTab, onTabChange }) {
    const { t } = useI18n();
    const { user } = useAuth();
    const [showNotif, setShowNotif] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const PAGE_TITLES = {
        dashboard: t('nav.overview'),
        tree: t('nav.tree'),
        members: t('nav.members'),
        events: t('nav.events'),
        fund: t('nav.fund'),
        library: t('nav.library'),
        map: t('nav.map'),
        audit: t('nav.audit'),
        settings: t('nav.settings'),
        search: t('search.advanced'),
        profile: 'Tiểu sử thành viên',
    };

    return (
        <div className="layout-container">
            <aside className={`layout-sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
                <div className="sidebar-brand">
                    <span className="brand-icon">🌳</span>
                    {!collapsed && <h2>{t('brand')}</h2>}
                    <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Mở rộng' : 'Thu gọn'}>
                        {collapsed ? '»' : '«'}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {!collapsed && <div className="nav-section-title">{t('nav.management')}</div>}
                    {NAV_ITEMS.map(item => (
                        <a
                            key={item.key}
                            href="#"
                            className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); onTabChange(item.key); }}
                            title={collapsed ? t(item.labelKey) : undefined}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {!collapsed && <span className="nav-label">{t(item.labelKey)}</span>}
                            {!collapsed && item.badge && <span className="nav-badge">{item.badge}</span>}
                        </a>
                    ))}

                    {!collapsed && <div className="nav-section-title">{t('nav.system')}</div>}
                    {NAV_SYSTEM.map(item => (
                        <a
                            key={item.key}
                            href="#"
                            className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); onTabChange(item.key); }}
                            title={collapsed ? t(item.labelKey) : undefined}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {!collapsed && <span className="nav-label">{t(item.labelKey)}</span>}
                        </a>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="avatar">{user?.name?.charAt(0) || 'A'}</div>
                        {!collapsed && (
                            <div className="user-info">
                                <div className="user-name">{user?.name || 'Admin'}</div>
                                <div className="user-role">{user?.role === 'admin' ? t('admin') : 'Thành viên'}</div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            <div className="layout-content">
                <header className="layout-header">
                    <h1 className="header-title">{PAGE_TITLES[activeTab] || t('brand')}</h1>
                    <div className="header-search">
                        <input type="text" placeholder={t('header.search')} />
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn notif-trigger" onClick={() => setShowNotif(!showNotif)}>
                            🔔
                            <span className="notif-badge-dot" />
                        </button>
                    </div>
                </header>

                <main className="layout-main" key={activeTab}>
                    {children}
                </main>
            </div>

            <NotificationCenter isOpen={showNotif} onClose={() => setShowNotif(false)} />
        </div>
    );
}
