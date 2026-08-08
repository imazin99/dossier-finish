import { describe, it, expect, beforeEach } from "vitest";
import {
  getCachedCases,
  setCachedCases,
  getLastSyncedAt,
  setLastSyncedAt,
  __clearAllForTests,
} from "./offlineCache";
import { makeTestCase } from "@/test/fixtures";

describe("offlineCache", () => {
  beforeEach(async () => {
    await __clearAllForTests();
  });

  it("returns an empty array when nothing has been cached yet", async () => {
    expect(await getCachedCases()).toEqual([]);
  });

  it("writes and reads back cases", async () => {
    const caseA = makeTestCase({ id: "case-a" });
    const caseB = makeTestCase({ id: "case-b" });

    await setCachedCases([caseA, caseB]);
    const cached = await getCachedCases();

    expect(cached.map((c) => c.id).sort()).toEqual(["case-a", "case-b"]);
  });

  it("setCachedCases fully replaces the previous set (removes cases no longer present)", async () => {
    await setCachedCases([makeTestCase({ id: "case-a" }), makeTestCase({ id: "case-b" })]);
    // Simulates case-b being unpublished/deleted server-side, and a new
    // case-c being published, in the same sync.
    await setCachedCases([makeTestCase({ id: "case-a" }), makeTestCase({ id: "case-c" })]);

    const cached = await getCachedCases();
    expect(cached.map((c) => c.id).sort()).toEqual(["case-a", "case-c"]);
  });

  it("setCachedCases overwrites a case's content when its id already exists", async () => {
    const original = makeTestCase({ id: "case-a", number: "001" });
    await setCachedCases([original]);

    const edited = makeTestCase({ id: "case-a", number: "999" });
    await setCachedCases([edited]);

    const [cached] = await getCachedCases();
    expect(cached.number).toBe("999");
  });

  it("has no last-synced timestamp until one is set", async () => {
    expect(await getLastSyncedAt()).toBeNull();
  });

  it("stores and retrieves the last-synced timestamp", async () => {
    const now = Date.now();
    await setLastSyncedAt(now);
    expect(await getLastSyncedAt()).toBe(now);
  });
});
