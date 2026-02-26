import React, { useState } from 'react';
import { Card, SectionHeader } from '../components/Card';
import { Button } from '../components/Button';
import './FamilyTree.css';

export function FamilyTree() {
    const [scale, setScale] = useState(1);

    const zoomIn = () => setScale(prev => Math.min(prev + 0.15, 2));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.15, 0.4));
    const resetZoom = () => setScale(1);

    return (
        <div className="tree-page">
            {/* Toolbar */}
            <div className="tree-toolbar">
                <div className="toolbar-left">
                    <h3>Cây Gia Phả — Dòng họ Nguyễn</h3>
                </div>
                <div className="toolbar-right">
                    <div className="zoom-controls">
                        <Button variant="secondary" size="sm" onClick={zoomOut}>−</Button>
                        <span className="zoom-value">{Math.round(scale * 100)}%</span>
                        <Button variant="secondary" size="sm" onClick={zoomIn}>+</Button>
                        <Button variant="ghost" size="sm" onClick={resetZoom}>Reset</Button>
                    </div>
                    <Button size="sm">+ Thêm</Button>
                </div>
            </div>

            {/* Tree Canvas */}
            <div className="tree-container">
                <div className="tree-canvas" style={{ transform: `scale(${scale})` }}>

                    {/* Root Node */}
                    <div className="tree-node root">
                        <div className="node-card root-card">
                            <div className="node-photo">👑</div>
                            <div className="node-name">Nguyễn Văn A</div>
                            <div className="node-meta">Thủy Tổ · Đời 1</div>
                            <div className="node-dates">1850 — 1920</div>
                        </div>

                        <div className="tree-branch">
                            {/* Gen 2 */}
                            <div className="tree-node">
                                <div className="node-card">
                                    <div className="node-photo">👨</div>
                                    <div className="node-name">Nguyễn Văn B</div>
                                    <div className="node-meta">Đời 2</div>
                                    <div className="node-dates">1880 — 1955</div>
                                </div>

                                <div className="tree-branch">
                                    <div className="tree-node">
                                        <div className="node-card leaf-card">
                                            <div className="node-photo">👨</div>
                                            <div className="node-name">Nguyễn Văn D</div>
                                            <div className="node-meta">Đời 3</div>
                                        </div>
                                    </div>
                                    <div className="tree-node">
                                        <div className="node-card leaf-card">
                                            <div className="node-photo">👩</div>
                                            <div className="node-name">Nguyễn Thị E</div>
                                            <div className="node-meta">Đời 3</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tree-node">
                                <div className="node-card">
                                    <div className="node-photo">👨</div>
                                    <div className="node-name">Nguyễn Văn C</div>
                                    <div className="node-meta">Đời 2</div>
                                    <div className="node-dates">1885 — 1960</div>
                                </div>

                                <div className="tree-branch">
                                    <div className="tree-node">
                                        <div className="node-card leaf-card">
                                            <div className="node-photo alive">👨</div>
                                            <div className="node-name">Nguyễn Văn F</div>
                                            <div className="node-meta">Đời 3 · Còn sống</div>
                                        </div>

                                        <div className="tree-branch">
                                            <div className="tree-node">
                                                <div className="node-card leaf-card">
                                                    <div className="node-photo alive">👦</div>
                                                    <div className="node-name">Nguyễn Văn G</div>
                                                    <div className="node-meta">Đời 4 · Còn sống</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tree-node">
                                        <div className="node-card leaf-card">
                                            <div className="node-photo alive">👩</div>
                                            <div className="node-name">Nguyễn Thị H</div>
                                            <div className="node-meta">Đời 3 · Còn sống</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tree-node">
                                <div className="node-card">
                                    <div className="node-photo">👩</div>
                                    <div className="node-name">Nguyễn Thị I</div>
                                    <div className="node-meta">Đời 2</div>
                                    <div className="node-dates">1888 — 1970</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
