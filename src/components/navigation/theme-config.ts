export const themeStorageKey = "psametra-theme";

/** Runs before paint; storage denial deliberately falls back to system mode for this visit. */
export const themeBootstrap = `(function(){var t='system';try{t=localStorage.getItem('${themeStorageKey}')||'system'}catch(e){/* System mode remains available without storage. */}document.documentElement.dataset.preference=t;document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'})()`;
