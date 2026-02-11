# Specification

## Summary
**Goal:** Rebrand the UI from “Logic Looper” to “Adwait Loop”, including a new standalone “A” logo and matching wordmark, and update all visible branding references in the frontend.

**Planned changes:**
- Add new generated brand assets: an “A” logo mark and an “Adwait Loop” wordmark under `frontend/public/assets/generated`.
- Update `frontend/src/components/AppShell.tsx` header to use the new logo/wordmark assets and update the corresponding image alt text.
- Replace remaining user-facing branding strings from “Logic Looper” to “Adwait Loop” (at minimum: `frontend/index.html` tab title, Home page welcome header, and AppShell footer label).

**User-visible outcome:** The app displays “Adwait Loop” branding throughout the UI, including a new “A” logo in the header, an updated wordmark, and updated page/title/footer text.
