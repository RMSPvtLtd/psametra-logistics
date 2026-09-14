interface TransitionSequence {
  reducedMotion: boolean;
  cover: () => Promise<void>;
  rotate: () => Promise<void>;
  commit: () => Promise<void>;
  reveal: () => Promise<void>;
}

/** Never reveals the destination until both the cover motion and route commit have completed. */
export async function runTransition(
  sequence: TransitionSequence,
): Promise<void> {
  await sequence.cover();
  // Route loading overlaps rotation, but neither may reveal unfinished content.
  await Promise.all([
    sequence.commit(),
    sequence.reducedMotion ? Promise.resolve() : sequence.rotate(),
  ]);
  await sequence.reveal();
}
