import "fake-indexeddb/auto";

// fake-indexeddb/auto installs `indexedDB` (and `IDBKeyRange`, etc.) as
// globals, exactly like a real browser would provide them — this is what
// lets src/data/offlineCache.ts run unmodified under Vitest's Node
// environment, with no test-only branches in application code.
