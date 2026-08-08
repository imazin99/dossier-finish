import { describe, it, expect, beforeEach } from "vitest";
import { syncPublishedCases, readCachedCasesOnly } from "./caseSync";
import { setCachedCases, getCachedCases, __clearAllForTests } from "./offlineCache";
import { makeTestCase } from "@/test/fixtures";

describe("syncPublishedCases", () => {
  beforeEach(async () => {
    await __clearAllForTests();
  });

  it("on successful fetch: returns the fresh data and writes it to the cache", async () => {
    const fresh = [makeTestCase({ id: "case-a" }), makeTestCase({ id: "case-b" })];
    const fetchFn = async () => fresh;

    const result = await syncPublishedCases(fetchFn);

    expect(result.source).toBe("network");
    expect(result.syncError).toBeNull();
    expect(result.cases.map((c) => c.id).sort()).toEqual(["case-a", "case-b"]);
    expect(result.lastSyncedAt).not.toBeNull();

    // And it's actually persisted, not just returned in-memory.
    const cached = await getCachedCases();
    expect(cached.map((c) => c.id).sort()).toEqual(["case-a", "case-b"]);
  });

  it("a successful sync replaces stale cached cases (updated case, and a removed one)", async () => {
    await setCachedCases([
      makeTestCase({ id: "case-a", number: "001" }),
      makeTestCase({ id: "case-old", number: "002" }), // will be "unpublished" server-side
    ]);

    const fresh = [
      makeTestCase({ id: "case-a", number: "999" }), // edited
      makeTestCase({ id: "case-new" }), // newly published
    ];
    const result = await syncPublishedCases(async () => fresh);

    const ids = result.cases.map((c) => c.id).sort();
    expect(ids).toEqual(["case-a", "case-new"]);
    expect(result.cases.find((c) => c.id === "case-a")?.number).toBe("999");
  });

  it("offline boot: with cached data and no network call made, readCachedCasesOnly returns it immediately", async () => {
    await setCachedCases([makeTestCase({ id: "case-a" })]);

    const cases = await readCachedCasesOnly();

    expect(cases.map((c) => c.id)).toEqual(["case-a"]);
  });

  it("failed sync: falls back to the existing cache and reports the error, without touching the cache", async () => {
    const originalCases = [makeTestCase({ id: "case-a" }), makeTestCase({ id: "case-b" })];
    await setCachedCases(originalCases);

    const fetchFn = async (): Promise<never> => {
      throw new Error("Couldn't reach the DOSSIER server. Check your connection and try again.");
    };
    const result = await syncPublishedCases(fetchFn);

    expect(result.source).toBe("cache");
    expect(result.syncError).toBe("Couldn't reach the DOSSIER server. Check your connection and try again.");
    expect(result.cases.map((c) => c.id).sort()).toEqual(["case-a", "case-b"]);

    // Confirm the cache itself is untouched, not just the returned value.
    const stillCached = await getCachedCases();
    expect(stillCached.map((c) => c.id).sort()).toEqual(["case-a", "case-b"]);
  });

  it("failed sync with NO prior cache: returns an empty list and a sync error, without throwing", async () => {
    const fetchFn = async (): Promise<never> => {
      throw new Error("Network unreachable.");
    };

    const result = await syncPublishedCases(fetchFn);

    expect(result.source).toBe("cache");
    expect(result.cases).toEqual([]);
    expect(result.syncError).toBe("Network unreachable.");
  });

  it("a later successful sync recovers cleanly after a previous failed one", async () => {
    await setCachedCases([makeTestCase({ id: "case-a" })]);

    const failed = await syncPublishedCases(async () => {
      throw new Error("offline");
    });
    expect(failed.source).toBe("cache");

    const recovered = await syncPublishedCases(async () => [makeTestCase({ id: "case-a" }), makeTestCase({ id: "case-b" })]);
    expect(recovered.source).toBe("network");
    expect(recovered.cases.map((c) => c.id).sort()).toEqual(["case-a", "case-b"]);
  });
});
