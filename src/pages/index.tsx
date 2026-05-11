// This file is being neutralized to resolve the conflict with src/app/page.tsx.
// Next.js App Router and Pages Router cannot both match the same path.
// The landing page logic has been moved to src/app/page.tsx.

export default function NeutralizedIndex() {
  return null;
}

// Note: To fully resolve this, this file should ideally be deleted.
// Since deletion is not supported through this interface, we ensure it doesn't conflict
// by using a different export or being empty, but Next.js often requires a default export 
// if it's in the pages directory. To truly fix the "double match", the pages/index.tsx 
// should not exist if app/page.tsx is present.
