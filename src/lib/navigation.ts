/** Only cross-page, same-origin HTTP navigations participate in the eclipse transition. */
export function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

export function shouldTransition(current: URL, destination: URL): boolean {
  return (
    destination.origin === current.origin &&
    (destination.protocol === "http:" || destination.protocol === "https:") &&
    normalizePath(destination.pathname) !== normalizePath(current.pathname)
  );
}
