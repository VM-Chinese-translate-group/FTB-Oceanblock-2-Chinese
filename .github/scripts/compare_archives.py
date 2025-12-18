#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import difflib
import hashlib
import os
import pathlib
import tarfile
import tempfile
import zipfile
import json
from collections import deque
from html import escape

CSS_STYLES = """
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
<style>
    :root {
        --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        --font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;

        --c-bg: #ffffff;
        --c-sidebar: #f8f9fa;
        --c-border: #e5e7eb;
        --c-text: #1f2937;
        --c-text-muted: #6b7280;

        /* Status Colors */
        /* Added: Green/Emerald */
        --c-add-bg: #ecfdf5; --c-add-border: #10b98180; --c-add-text: #047857;
        /* Modified: Amber/Orange */
        --c-mod-bg: #fffbeb; --c-mod-border: #f59e0b80; --c-mod-text: #b45309;
        /* Deleted: Rose/Red */
        --c-del-bg: #fff1f2; --c-del-border: #f43f5e80; --c-del-text: #be123c;

        --diff-add-bg: #ecfdf5;
        --diff-del-bg: #fff1f2;
        --diff-hunk-bg: #f9fafb;
        --diff-hunk-text: #6b7280;
    }

    * { box-sizing: border-box; }
    body { margin: 0; font-family: var(--font-sans); background: var(--c-bg); height: 100vh; display: flex; flex-direction: column; color: var(--c-text); overflow: hidden; }

    /* --- Header --- */
    header { height: 56px; background: #fff; border-bottom: 1px solid var(--c-border); display: flex; align-items: center; padding: 0 20px; flex-shrink: 0; justify-content: space-between; z-index: 10; }
    header h1 { font-size: 15px; font-weight: 600; color: var(--c-text); display: flex; gap: 8px; align-items: center; }
    .header-left { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .archive-meta { display: flex; gap: 8px; flex-wrap: wrap; }
    .archive-pill { padding: 4px 12px; border: 1px solid var(--c-border); border-radius: 6px; background: var(--c-sidebar); display: flex; flex-direction: column; min-width: 180px; }
    .archive-pill .pill-label { font-size: 11px; color: var(--c-text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
    .archive-pill .pill-value { font-size: 13px; font-weight: 600; color: var(--c-text); }

    .view-toggle { 
        display: flex; background: #f3f4f6; padding: 2px; border-radius: 6px; 
        position: relative; border: 1px solid #e5e7eb; height: 28px;
    }
    .toggle-btn { 
        border: none; background: transparent; padding: 0 12px; font-size: 12px; font-weight: 500; color: #6b7280; 
        cursor: pointer; z-index: 2; position: relative; transition: color 0.2s; line-height: 24px;
    }
    .toggle-btn.active { color: #1f2937; font-weight: 600; }
    .toggle-bg {
        position: absolute; top: 2px; left: 2px; bottom: 2px; width: 50%;
        background: #fff; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        transition: transform 0.2s cubic-bezier(0.2, 0.0, 0.2, 1); z-index: 1;
    }
    .view-toggle[data-active="split"] .toggle-bg { transform: translateX(100%); }

    /* --- Sidebar --- */
    .main-container { display: flex; flex: 1; overflow: hidden; }
    .sidebar { width: 340px; background: var(--c-sidebar); border-right: 1px solid var(--c-border); display: flex; flex-direction: column; flex-shrink: 0; }

    .sidebar-header { padding: 12px; border-bottom: 1px solid var(--c-border); background: #fff; display: flex; flex-direction: column; gap: 10px; }

    /* Filter Bar - Legend Style */
    .filter-bar { display: flex; gap: 8px; }
    .filter-btn { 
        flex: 1; font-size: 11px; padding: 4px 0; border-radius: 4px; cursor: pointer; 
        text-align: center; font-weight: 600; border: 1px solid;
        transition: all 0.15s;
        display: flex; align-items: center; justify-content: center; gap: 4px;
    }

    /* Default "Glowing" State (Legend) */
    .filter-btn[data-type="all"] { 
        background: #fff; border-color: #e5e7eb; color: #374151; 
    }
    .filter-btn[data-type="added"] { 
        background: var(--c-add-bg); border-color: var(--c-add-border); color: var(--c-add-text); 
    }
    .filter-btn[data-type="modified"] { 
        background: var(--c-mod-bg); border-color: var(--c-mod-border); color: var(--c-mod-text); 
    }
    .filter-btn[data-type="removed"] { 
        background: var(--c-del-bg); border-color: var(--c-del-border); color: var(--c-del-text); 
    }

    /* Active State (Filled/Pressed) */
    .filter-btn.active { transform: translateY(1px); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); filter: brightness(0.95); }
    .filter-btn.active[data-type="all"] { background: #f3f4f6; }

    .search-box { 
        width: 100%; padding: 6px 10px; border: 1px solid var(--c-border); border-radius: 6px; 
        font-size: 13px; outline: none; transition: 0.2s; background: #f9fafb;
    }
    .search-box:focus { border-color: #d1d5db; background: #fff; }

    .sidebar-controls { display: flex; align-items: center; font-size: 12px; color: var(--c-text-muted); padding: 0 2px; }
    .chk-label { display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none; }
    .chk-label input { margin: 0; accent-color: #374151; }

    /* Tree List */
    .tree-container { flex: 1; overflow-y: auto; padding: 4px 0; }
    .tree-node { user-select: none; }

    .node-content { 
        display: flex; align-items: center; height: 28px; cursor: pointer; 
        font-size: 13px; padding-right: 0; position: relative; overflow: hidden;
    }
    .node-content:hover { background: #e5e7eb; }
    .node-content.active { background: #eef2ff; color: #4f46e5; }

    .node-indent { display: inline-block; height: 100%; flex-shrink: 0; }
    .node-icon { margin-right: 6px; opacity: 0.6; width: 16px; text-align: center; flex-shrink: 0; }
    .node-name { 
        flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
        min-width: 0; margin-right: 8px;
    }

    /* Stats Typography */
    .node-meta { display: flex; align-items: center; margin-left: auto; flex-shrink: 0; font-family: var(--font-mono); font-size: 10px; font-weight: 500; gap: 6px; margin-right: 4px;}
    .stat-plus { color: #10b981; }
    .stat-mod { color: #f59e0b; }
    .stat-minus { color: #ef4444; }
    .stat-bin { color: #9ca3af; }

    /* Right Color Bar */
    .status-bar { width: 4px; height: 50%; margin-left: 4px; flex-shrink: 0; opacity: 0.8; }
    .s-added .status-bar { background: var(--c-add-border); box-shadow: -4px 0 12px var(--c-add-border); }
    .s-added { background: linear-gradient(to left, rgba(16, 185, 129, 0.08) 0%, transparent 30%); }
    .s-mod .status-bar { background: var(--c-mod-border); box-shadow: -4px 0 12px var(--c-mod-border); }
    .s-mod { background: linear-gradient(to left, rgba(245, 158, 11, 0.08) 0%, transparent 30%); }
    .s-del .status-bar { background: var(--c-del-border); box-shadow: -4px 0 12px var(--c-del-border); }
    .s-del { background: linear-gradient(to left, rgba(244, 63, 94, 0.08) 0%, transparent 30%); }

    /* Content */
    .content-area { flex: 1; background: #fff; display: flex; flex-direction: column; overflow: hidden; position: relative; }
    .empty-state { position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); color: var(--c-text-muted); text-align: center; pointer-events: none; }

    .diff-container { display: none; flex-direction: column; height: 100%; }
    .diff-container.active { display: flex; }

    .file-header { padding: 10px 20px; border-bottom: 1px solid var(--border-color); background: #fcfcfc; display: flex; justify-content: space-between; align-items: center; }
    .diff-scroll-area { flex: 1; overflow: auto; background: #fff; }

    table.diff-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 12px; table-layout: fixed; }
    table.diff-table td { padding: 0 4px; vertical-align: top; line-height: 1.6; word-break: break-all; white-space: pre-wrap; }

    .line-num { text-align: right; padding-right: 12px !important; color: #d1d5db; user-select: none; background-color: #fff; border-right: 1px solid #f3f4f6; width: 48px; font-size: 11px; }
    .diff-add { background-color: var(--diff-add-bg); }
    .diff-del { background-color: var(--diff-del-bg); }
    .diff-hunk { background-color: var(--diff-hunk-bg); color: var(--diff-hunk-text); padding: 8px 12px !important; border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6; font-weight: 600; font-size: 11px; }
    .view-split .line-num { border-right: none; border-left: 1px solid #f3f4f6; text-align: center; padding: 0 !important; }
    .empty-cell { background: #fafafa; border: none; }
    .binary-msg { margin: 80px auto; text-align: center; padding: 30px; border: 1px dashed #e5e7eb; border-radius: 8px; background: #f9fafb; }

    .inline-add { background: rgba(16, 185, 129, 0.25); border-radius: 3px; }
    .inline-del { background: rgba(244, 63, 94, 0.25); border-radius: 3px; }

    .hljs { background: transparent; padding: 0; font-family: inherit; font-size: inherit; }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
"""

JS_SCRIPT = """
<script>
    const state = {
        files: [], tree: {}, currentFileId: null,
        filterType: 'all', showBinary: true, viewMode: 'inline', searchQuery: '',
        meta: { old_label: 'Archive 1', new_label: 'Archive 2' }
    };

    const LANG_MAP = { 'py': 'python', 'js': 'javascript', 'json': 'json', 'html': 'xml', 'css': 'css', 'java': 'java', 'c': 'c', 'cpp': 'cpp', 'h': 'c', 'rs': 'rust', 'go': 'go', 'ts': 'typescript', 'sh': 'bash', 'yaml': 'yaml', 'yml': 'yaml', 'md': 'markdown', 'xml': 'xml', 'sql': 'sql', 'toml': 'ini', 'ini': 'ini' };

    document.addEventListener('DOMContentLoaded', () => {
        const payload = document.getElementById('data-payload');
        if (payload) {
            const parsed = JSON.parse(payload.textContent);
            state.files = parsed.files;
            state.meta = parsed.meta || state.meta;
            updateArchiveLabels();
            buildTree();
            calculateFolderStats(state.tree); // Pre-calc recursion
            renderTree();
        }

        document.getElementById('searchInput').addEventListener('input', (e) => { state.searchQuery = e.target.value.toLowerCase(); renderTree(); });
        document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filterType = btn.dataset.type;
            renderTree();
        }));
        document.getElementById('binaryToggle').addEventListener('change', (e) => { state.showBinary = e.target.checked; renderTree(); });

        const toggleContainer = document.querySelector('.view-toggle');
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const mode = btn.dataset.mode;
                state.viewMode = mode;
                toggleContainer.dataset.active = mode;
                renderDiff();
            });
        });
    });

    function updateArchiveLabels() {
        const oldEl = document.getElementById('archiveOldLabel');
        const newEl = document.getElementById('archiveNewLabel');
        if (oldEl) oldEl.textContent = state.meta.old_label || '—';
        if (newEl) newEl.textContent = state.meta.new_label || '—';
    }

    function highlightLine(code, filename) {
        if (!code) return '';
        const ext = filename.includes('.') ? filename.split('.').pop().toLowerCase() : '';
        try { return (LANG_MAP[ext] && hljs.getLanguage(LANG_MAP[ext])) ? hljs.highlight(code, { language: LANG_MAP[ext] }).value : escape(code); } catch (e) { return escape(code); }
    }

    function getLineHtml(block, filename) {
        if (block.inline_html) {
            return block.inline_html;
        }
        return highlightLine(block.content, filename);
    }

    function buildTree() {
        state.tree = { name: "root", children: {}, isFolder: true, path: "", expanded: true, stats: {a:0, m:0, r:0} };
        state.files.forEach(f => {
            let current = state.tree;
            f.path.split('/').forEach((part, i, arr) => {
                const isFile = i === arr.length - 1;
                if (!current.children[part]) {
                    current.children[part] = { 
                        name: part, isFolder: !isFile, children: {}, expanded: false, fileData: isFile ? f : null, stats: {a:0, m:0, r:0}
                    };
                }
                current = current.children[part];
            });
        });
    }

    // Recursive Stats Calculation
    function calculateFolderStats(node) {
        if (!node.isFolder) {
            // Return 1 for the specific status
            return {
                a: node.fileData.status === 'added' ? 1 : 0,
                m: node.fileData.status === 'modified' ? 1 : 0,
                r: node.fileData.status === 'removed' ? 1 : 0
            };
        }

        let total = { a: 0, m: 0, r: 0 };
        Object.values(node.children).forEach(child => {
            const s = calculateFolderStats(child);
            total.a += s.a;
            total.m += s.m;
            total.r += s.r;
        });
        node.stats = total;
        return total;
    }

    function toggleNode(node) {
        if (state.searchQuery) return;
        const startState = !node.expanded;
        node.expanded = startState;

        if (startState) {
            let current = node;
            while (true) {
                const keys = Object.keys(current.children);
                if (keys.length === 1) {
                    const child = current.children[keys[0]];
                    if (child.isFolder) {
                        child.expanded = true;
                        current = child;
                        continue;
                    }
                }
                break; 
            }
        }
        renderTree();
    }

    function renderTree() {
        const container = document.getElementById('treeContainer');
        container.innerHTML = '';

        const traverse = (node, depth) => {
            if (!node.isFolder) {
                const f = node.fileData;
                if (state.filterType !== 'all' && f.status !== state.filterType) return null;
                if (!state.showBinary && f.is_binary) return null;
                if (state.searchQuery && !f.path.toLowerCase().includes(state.searchQuery)) return null;
                return buildFileEl(node, depth);
            }

            const childKeys = Object.keys(node.children);
            const folders = childKeys.filter(k => node.children[k].isFolder).sort();
            const files = childKeys.filter(k => !node.children[k].isFolder).sort();

            const childEls = [...folders, ...files].map(k => traverse(node.children[k], depth + 1)).filter(Boolean);
            if (childEls.length === 0) return null;

            const isExpanded = state.searchQuery ? true : node.expanded;
            return buildFolderEl(node, depth, childEls, isExpanded);
        };

        const rootKeys = Object.keys(state.tree.children);
        const rFolders = rootKeys.filter(k => state.tree.children[k].isFolder).sort();
        const rFiles = rootKeys.filter(k => !state.tree.children[k].isFolder).sort();

        [...rFolders, ...rFiles].forEach(k => {
            const el = traverse(state.tree.children[k], 0);
            if (el) container.appendChild(el);
        });
    }

    function buildFileEl(node, depth) {
        const f = node.fileData;
        const div = document.createElement('div');
        div.className = 'tree-node';

        let statusClass = '';
        if (f.status === 'added') statusClass = 's-added';
        else if (f.status === 'modified') statusClass = 's-mod';
        else if (f.status === 'removed') statusClass = 's-del';

        let statsHtml = '';
        if (!f.is_binary && (f.add_count > 0 || f.del_count > 0)) {
            if(f.add_count) statsHtml += `<span class="stat-plus">+${f.add_count}</span>`;
            if(f.del_count) statsHtml += `<span class="stat-minus">-${f.del_count}</span>`;
        } else if (f.is_binary && f.size_diff) {
            statsHtml = `<span class="stat-bin">${f.size_diff}</span>`;
        }

        div.innerHTML = `
            <div class="node-content ${statusClass} ${state.currentFileId === f.id ? 'active' : ''}" onclick="selectFile('${f.id}')">
                <span class="node-indent" style="width:${depth*16}px"></span>
                <span class="node-icon">${f.is_binary?'📦':'📄'}</span>
                <span class="node-name">${node.name}</span>
                <div class="node-meta">${statsHtml}</div>
                <div class="status-bar"></div>
            </div>`;
        return div;
    }

    function buildFolderEl(node, depth, children, expanded) {
        const div = document.createElement('div');
        div.className = 'tree-node';
        const content = document.createElement('div');
        content.className = 'node-content';
        content.onclick = () => toggleNode(node);

        // Folder Stats Logic: Only show if NOT expanded
        let statsHtml = '';
        if (!expanded && node.stats && (node.stats.a + node.stats.m + node.stats.r > 0)) {
            if(node.stats.a) statsHtml += `<span class="stat-plus">+${node.stats.a}</span>`;
            if(node.stats.m) statsHtml += `<span class="stat-mod">~${node.stats.m}</span>`;
            if(node.stats.r) statsHtml += `<span class="stat-minus">-${node.stats.r}</span>`;
        }

        content.innerHTML = `
            <span class="node-indent" style="width:${depth*16}px"></span>
            <span class="node-icon">${expanded?'📂':'📁'}</span> 
            <span class="node-name" style="font-weight:600">${node.name}</span>
            <div class="node-meta">${statsHtml}</div>
            <div class="status-bar" style="background:transparent"></div>`;

        div.appendChild(content);
        if(expanded) {
            const sub = document.createElement('div');
            children.forEach(c => sub.appendChild(c));
            div.appendChild(sub);
        }
        return div;
    }

    window.selectFile = (id) => { state.currentFileId = id; renderDiff(); };

    function renderDiff() {
        const file = state.files.find(f => f.id === state.currentFileId);
        if (!file) return;

        document.getElementById('emptyState').style.display = 'none';
        const container = document.getElementById('diffContainer');
        container.className = 'diff-container active';

        let html = `<div class="file-header">
            <h2>${file.name}</h2>
            <div class="file-path">${file.path}</div>
        </div><div class="diff-scroll-area">`;

        if (file.is_binary) {
            html += `<div class="binary-msg">
                <div style="font-size:32px; margin-bottom:16px">📊</div>
                <div style="font-weight:600; font-size:16px">二进制文件 (${file.status})</div>
                <br><div style="color:#57606a">${file.size_diff ? '大小变化: ' + file.size_diff : ''}</div>
            </div>`;
        } else if (!file.diff_blocks || file.diff_blocks.length === 0) {
            html += `<div class="binary-msg">文件内容一致</div>`;
        } else {
            html += state.viewMode === 'split' ? renderSplit(file) : renderInline(file);
        }
        container.innerHTML = html + '</div>';
    }

    function renderInline(file) {
        let html = `<table class="diff-table view-inline"><colgroup><col width="48"><col width="48"><col></colgroup><tbody>`;
        file.diff_blocks.forEach(b => {
            if (b.type === 'hunk') {
                html += `<tr><td class="diff-hunk" colspan="3">${escape(b.content)}</td></tr>`;
            } else {
                const cls = b.type === 'add' ? 'diff-add' : (b.type === 'del' ? 'diff-del' : '');
                const codeHtml = getLineHtml(b, file.name);
                html += `<tr class="${cls}">
                    <td class="line-num">${b.old_lineno || ''}</td>
                    <td class="line-num">${b.new_lineno || ''}</td>
                    <td>${codeHtml}</td>
                </tr>`;
            }
        });
        return html + '</tbody></table>';
    }

    function renderSplit(file) {
        let html = `<table class="diff-table view-split"><colgroup><col width="50%"><col width="48"><col width="48"><col width="50%"></colgroup><tbody>`;
        file.diff_blocks.forEach(b => {
            if (b.type === 'hunk') {
                html += `<tr><td class="diff-hunk" colspan="4" style="text-align:center">${escape(b.content)}</td></tr>`;
            } else {
                const code = getLineHtml(b, file.name);
                if (b.type === 'add') {
                    html += `<tr class="diff-add"><td class="empty-cell"></td><td class="line-num"></td><td class="line-num">${b.new_lineno}</td><td>${code}</td></tr>`;
                } else if (b.type === 'del') {
                    html += `<tr class="diff-del"><td>${code}</td><td class="line-num">${b.old_lineno}</td><td class="line-num"></td><td class="empty-cell"></td></tr>`;
                } else {
                    html += `<tr><td>${code}</td><td class="line-num">${b.old_lineno}</td><td class="line-num">${b.new_lineno}</td><td>${code}</td></tr>`;
                }
            }
        });
        return html + '</tbody></table>';
    }

    function escape(text) {
        return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
    }
</script>
"""

HTML_SHELL = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diff Report</title>
    {css}
</head>
<body>
    <header>
        <div class="header-left">
            <h1>📂 档案对比分析</h1>
            <div class="archive-meta">
                <div class="archive-pill">
                    <span class="pill-label">旧版本</span>
                    <span class="pill-value" id="archiveOldLabel">—</span>
                </div>
                <div class="archive-pill">
                    <span class="pill-label">新版本</span>
                    <span class="pill-value" id="archiveNewLabel">—</span>
                </div>
            </div>
        </div>
        <div class="header-controls">
             <div class="view-toggle" data-active="inline">
                <div class="toggle-bg"></div>
                <button class="toggle-btn active" data-mode="inline">Inline</button>
                <button class="toggle-btn" data-mode="split">Split</button>
             </div>
        </div>
    </header>
    <div class="main-container">
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="filter-bar">
                    <div class="filter-btn active" data-type="all">ALL</div>
                    <div class="filter-btn" data-type="added">NEW</div>
                    <div class="filter-btn" data-type="modified">MOD</div>
                    <div class="filter-btn" data-type="removed">DEL</div>
                </div>
                <input type="text" id="searchInput" class="search-box" placeholder="Search files...">
                <div class="sidebar-controls">
                     <label class="chk-label">
                        <input type="checkbox" id="binaryToggle" checked>
                        <span>显示二进制文件</span>
                     </label>
                </div>
            </div>
            <div id="treeContainer" class="tree-container"></div>
        </aside>
        <main class="content-area">
            <div id="emptyState" class="empty-state">
                <div style="font-size:48px;margin-bottom:16px;opacity:0.2">👈</div>
                <div>Select a file to view changes</div>
            </div>
            <div id="diffContainer" class="diff-container"></div>
        </main>
    </div>
    <script type="application/json" id="data-payload">{json_data}</script>
    {js}
</body>
</html>
"""


class ArchiveComparator:
    def __init__(self, archive1, archive2, output_path, old_label=None, new_label=None):
        self.archive1 = archive1
        self.archive2 = archive2
        self.output_path = output_path
        self.files_data = []
        self.old_label = old_label or pathlib.Path(archive1).name
        self.new_label = new_label or pathlib.Path(archive2).name

    def _try_convert_binary_to_text(self, file_path, original_ext):
        return None, False

    def _read_content(self, path):
        if not path or not path.exists(): return [], False
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return f.read().splitlines(), True
        except UnicodeDecodeError:
            pass
        except Exception:
            return None, False

        converted, success = self._try_convert_binary_to_text(path, path.suffix.lower())
        return (converted.splitlines(), True) if success else (None, False)

    def get_size_diff(self, p1, p2):
        s1 = p1.stat().st_size if p1 and p1.exists() else 0
        s2 = p2.stat().st_size if p2 and p2.exists() else 0
        diff = s2 - s1
        if diff == 0: return "0 B"
        abs_diff = abs(diff)
        unit = "B"
        for u in ["B", "KB", "MB"]:
            if abs_diff < 1024: break
            abs_diff /= 1024
            unit = u
        return f"{'+' if diff > 0 else ''}{abs_diff:.1f} {unit}"

    def build_inline_diff(self, old_text, new_text):
        matcher = difflib.SequenceMatcher(None, old_text, new_text)
        old_parts, new_parts = [], []
        for tag, i1, i2, j1, j2 in matcher.get_opcodes():
            old_seg = escape(old_text[i1:i2])
            new_seg = escape(new_text[j1:j2])
            if tag == 'equal':
                if old_seg: old_parts.append(old_seg)
                if new_seg: new_parts.append(new_seg)
            elif tag == 'delete':
                if old_seg: old_parts.append(f"<span class='inline-del'>{old_seg}</span>")
            elif tag == 'insert':
                if new_seg: new_parts.append(f"<span class='inline-add'>{new_seg}</span>")
            elif tag == 'replace':
                if old_seg: old_parts.append(f"<span class='inline-del'>{old_seg}</span>")
                if new_seg: new_parts.append(f"<span class='inline-add'>{new_seg}</span>")
        return ''.join(old_parts) or escape(old_text), ''.join(new_parts) or escape(new_text)

    def generate_diff_blocks(self, lines1, lines2):
        blocks = []
        add_count, del_count = 0, 0

        diff_gen = difflib.unified_diff(lines1, lines2, n=3, lineterm='')
        try:
            next(diff_gen);
            next(diff_gen)
        except StopIteration:
            pass

        old_line, new_line = 0, 0
        pending_deletions = deque()
        for line in diff_gen:
            if line.startswith('@@'):
                pending_deletions.clear()
                blocks.append({'type': 'hunk', 'content': line})
                try:
                    parts = line.split(' ')
                    old_line = int(parts[1].split(',')[0].replace('-', '')) - 1
                    new_line = int(parts[2].split(',')[0].replace('+', '')) - 1
                except:
                    pass
            elif line.startswith('+'):
                new_line += 1;
                add_count += 1
                entry = {'type': 'add', 'content': line[1:], 'new_lineno': new_line}
                if pending_deletions:
                    partner = pending_deletions.popleft()
                    old_html, new_html = self.build_inline_diff(partner['content'], entry['content'])
                    partner['inline_html'] = old_html
                    entry['inline_html'] = new_html
                blocks.append(entry)
            elif line.startswith('-'):
                old_line += 1;
                del_count += 1
                entry = {'type': 'del', 'content': line[1:], 'old_lineno': old_line}
                blocks.append(entry)
                pending_deletions.append(entry)
            else:
                pending_deletions.clear()
                old_line += 1;
                new_line += 1
                blocks.append({'type': 'eq', 'content': line[1:], 'old_lineno': old_line, 'new_lineno': new_line})
        return blocks, add_count, del_count

    def process(self):
        with tempfile.TemporaryDirectory() as td1, tempfile.TemporaryDirectory() as td2:
            print(f"Processing archives...")
            self._extract(self.archive1, td1)
            self._extract(self.archive2, td2)
            self._compare(td1, td2)
            self._write()

    def _extract(self, arc, dest):
        try:
            if arc.endswith(('.zip', '.jar')):
                with zipfile.ZipFile(arc, 'r') as z:
                    z.extractall(dest)
            elif arc.endswith(('.tar.gz', '.tar')):
                with tarfile.open(arc, 'r:*') as t:
                    t.extractall(dest)
            else:
                with zipfile.ZipFile(arc, 'r') as z:
                    z.extractall(dest)
        except Exception:
            pass

    def _compare(self, d1, d2):
        p1, p2 = pathlib.Path(d1), pathlib.Path(d2)
        files1 = {p.relative_to(p1) for p in p1.rglob('*') if p.is_file()}
        files2 = {p.relative_to(p2) for p in p2.rglob('*') if p.is_file()}

        count = 0
        for rel in sorted(list(files1 | files2)):
            f1, f2 = p1 / rel, p2 / rel
            item = {
                "id": f"f{count}", "path": rel.as_posix(), "name": rel.name,
                "diff_blocks": [], "add_count": 0, "del_count": 0, "size_diff": ""
            }
            count += 1

            lines1, is_text1 = self._read_content(f1) if rel in files1 else ([], True)
            lines2, is_text2 = self._read_content(f2) if rel in files2 else ([], True)

            if rel in files1 and rel not in files2:
                item['status'] = 'removed'
                is_text = is_text1
            elif rel not in files1 and rel in files2:
                item['status'] = 'added'
                is_text = is_text2
            else:
                item['status'] = 'modified'
                is_text = is_text1 and is_text2
                if hashlib.sha256(f1.read_bytes()).hexdigest() == hashlib.sha256(f2.read_bytes()).hexdigest():
                    continue

            item['is_binary'] = not is_text

            if is_text:
                blocks, adds, dels = self.generate_diff_blocks(lines1, lines2)
                item.update({'diff_blocks': blocks, 'add_count': adds, 'del_count': dels})
            else:
                item['size_diff'] = self.get_size_diff(f1, f2)

            self.files_data.append(item)

    def _write(self):
        payload = {
            "files": self.files_data,
            "meta": {
                "old_label": self.old_label,
                "new_label": self.new_label
            }
        }
        data = json.dumps(payload, ensure_ascii=False)
        html = HTML_SHELL.format(css=CSS_STYLES, js=JS_SCRIPT, json_data=data)
        with open(self.output_path, 'w', encoding='utf-8') as f: f.write(html)
        print(f"Report generated: {os.path.abspath(self.output_path)}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("old_file")
    parser.add_argument("new_file")
    parser.add_argument("-o", "--output", default="diff_report.html")
    parser.add_argument("--old-label", dest="old_label")
    parser.add_argument("--new-label", dest="new_label")
    args = parser.parse_args()

    if os.path.exists(args.old_file) and os.path.exists(args.new_file):
        ArchiveComparator(
            args.old_file,
            args.new_file,
            args.output,
            old_label=args.old_label,
            new_label=args.new_label
        ).process()
    else:
        print("Files not found.")
