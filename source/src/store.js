/* ============================================================
   STORE: IndexedDB primary storage, localStorage mirror,
   automatic daily snapshots, save-error reporting
   ============================================================ */
(function () {
const DB_NAME = "are-academy", DB_VER = 1;
let dbp = null;
function open() {
  if (dbp) return dbp;
  dbp = new Promise((res) => {
    try {
      if (!window.indexedDB) return res(null);
      const rq = indexedDB.open(DB_NAME, DB_VER);
      rq.onupgradeneeded = () => {
        const db = rq.result;
        if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
        if (!db.objectStoreNames.contains("snaps")) db.createObjectStore("snaps", { keyPath: "t" });
      };
      rq.onsuccess = () => res(rq.result);
      rq.onerror = () => res(null);
      rq.onblocked = () => res(null);
    } catch (e) { res(null); }
  });
  return dbp;
}
function tx(store, mode, fn) {
  return open().then(db => new Promise((res, rej) => {
    if (!db) return rej(new Error("IndexedDB unavailable"));
    let out;
    try {
      const t = db.transaction(store, mode);
      const s = t.objectStore(store);
      out = fn(s);
      t.oncomplete = () => res(out && "result" in out ? out.result : out);
      t.onerror = () => rej(t.error || new Error("IndexedDB error"));
      t.onabort = () => rej(t.error || new Error("IndexedDB aborted"));
    } catch (e) { rej(e); }
  }));
}
const S = ARE.Store = {
  status: { idb: null, lastSave: 0, error: null, persisted: null },
  available: () => open().then(db => !!db),
  get: (k) => tx("kv", "readonly", s => s.get(k)),
  put: (k, v) => tx("kv", "readwrite", s => s.put(v, k)),
  del: (k) => tx("kv", "readwrite", s => s.delete(k)),
  snapshots: () => tx("snaps", "readonly", s => s.getAll()).then(a => (a || []).sort((x, y) => y.t - x.t)),
  addSnapshot: (json, label) => tx("snaps", "readwrite", s => s.put({ t: Date.now(), label: label || "Automatic daily backup", size: json.length, json })).then(() => S.prune()),
  getSnapshot: (t) => tx("snaps", "readonly", s => s.get(t)),
  prune: async (keep = 10) => {
    const all = await S.snapshots();
    const auto = all.filter(x => /Automatic/.test(x.label));
    const drop = auto.slice(keep);
    if (drop.length) await tx("snaps", "readwrite", s => { drop.forEach(d => s.delete(d.t)); });
  },
  requestPersist: async () => {
    try {
      if (navigator.storage && navigator.storage.persist) {
        const already = await navigator.storage.persisted();
        S.status.persisted = already || await navigator.storage.persist();
      }
    } catch (e) { S.status.persisted = null; }
    return S.status.persisted;
  },
  estimate: async () => { try { return navigator.storage && navigator.storage.estimate ? await navigator.storage.estimate() : null; } catch (e) { return null; } }
};
})();
