import { CMD_ICON_PATHS } from '../data/commandItems';

function CmdIcon({ type }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: CMD_ICON_PATHS[type] || '' }} />
  );
}

export default function CommandPalette({ palette }) {
  const { isOpen, close, query, setQuery, groups, activeIdx, setActiveIdx, runItem, inputRef } = palette;
  let flatIndex = -1;

  return (
    <div id="cmd-overlay" className={isOpen ? 'open' : ''} role="dialog" aria-modal="true" aria-label="Command palette" onClick={(e) => { if (e.target.id === 'cmd-overlay') close(); }}>
      <div id="cmd-box">
        <div id="cmd-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            id="cmd-input"
            type="text"
            placeholder="Search — type a command or navigate..."
            autoComplete="off"
            spellCheck="false"
            aria-label="Command palette search"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span id="cmd-esc">ESC</span>
        </div>
        <div id="cmd-results" role="listbox" aria-label="Command results">
          {groups.map((group) => (
            <div key={group.group}>
              <div className="cmd-group-label">{group.group}</div>
              {group.items.map((item) => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <div
                    key={item.name}
                    className={`cmd-item${idx === activeIdx ? ' active' : ''}`}
                    role="option"
                    onClick={() => runItem(item)}
                    onMouseEnter={() => setActiveIdx(idx)}
                  >
                    <div className="cmd-item-icon"><CmdIcon type={item.icon} /></div>
                    <div className="cmd-item-text">
                      <span className="cmd-item-name">{item.name}</span>
                      <span className="cmd-item-sub">{item.sub}</span>
                    </div>
                    {item.badge && <span className="cmd-item-badge">{item.badge}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>ESC</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
