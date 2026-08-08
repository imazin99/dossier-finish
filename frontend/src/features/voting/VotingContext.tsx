import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface VotingContextValue {
  playerNames: string[];
  currentIndex: number;
  currentPlayerName: string;
  isLastPlayer: boolean;
  /** votes[voterIndex] = index of the accused player, or -1 if not yet cast. */
  votes: number[];
  /** Records the current player's vote for the given accused player index. */
  castVote: (accusedIndex: number) => void;
  /** Move to the next voter. Only meaningful when !isLastPlayer. */
  advance: () => void;
}

const VotingContext = createContext<VotingContextValue | undefined>(undefined);

/**
 * Wraps the handoff → cast-vote cycle for one round of voting, exactly
 * mirroring RoleDistributionContext's turn-taking pattern. Holds the
 * votes cast so far; does not compute or reveal any result itself — that
 * happens in the Results screen once every player has voted.
 */
export function VotingProvider({ playerNames, children }: { playerNames: string[]; children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState<number[]>(() => playerNames.map(() => -1));

  const value = useMemo<VotingContextValue>(() => {
    const isLastPlayer = currentIndex === playerNames.length - 1;
    return {
      playerNames,
      currentIndex,
      currentPlayerName: playerNames[currentIndex] ?? "",
      isLastPlayer,
      votes,
      castVote: (accusedIndex: number) =>
        setVotes((prev) => prev.map((v, i) => (i === currentIndex ? accusedIndex : v))),
      advance: () => setCurrentIndex((i) => Math.min(i + 1, playerNames.length - 1)),
    };
  }, [playerNames, currentIndex, votes]);

  return <VotingContext.Provider value={value}>{children}</VotingContext.Provider>;
}

export function useVoting(): VotingContextValue {
  const ctx = useContext(VotingContext);
  if (!ctx) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return ctx;
}
