# Flexio Admin Engine

Internal admin portal for Flexio — login-gated dashboard for the founder/CEO + dev cofounder.

## Stack
React + Vite, Tailwind CSS v4, Framer Motion, React Router, Lucide icons — same stack as the Flexio storefront.

## Run it
```bash
npm install
npm run dev
```
Open the printed localhost URL. You'll land on `/login`.

**Demo login:** username `admin`, password `flexio2026`
(set in `src/admin/AdminAuthContext.jsx` — see the note below before this goes anywhere real)

## Folder structure
```
src/
  admin/            auth gate — context, route guard, credential check
    AdminAuthContext.jsx
    ProtectedRoute.jsx
  pages/            full routed pages
    LoginPage.jsx
    DashboardPage.jsx
  components/       reusable dashboard widgets
    Sidebar.jsx
    Topbar.jsx
    StatCard.jsx
    RecentOrdersTable.jsx
    LowStockAlerts.jsx
    AdminFooter.jsx
    mockData.js     placeholder data — swap for real API calls
```

## Before this is reachable outside your laptop
Login currently checks the username/password in the browser against a hardcoded
value in AdminAuthContext.jsx. That's fine while it's just you two running it
locally, but it is not secure for a deployed app — anyone can read the
password straight out of the JS bundle in devtools.

Next real step: build a /auth/login endpoint on your FastAPI backend that
checks credentials server-side and returns a JWT, then swap the login()
function in AdminAuthContext.jsx to call that instead of verifyCredentials().

## What's still mock data
src/components/mockData.js holds the stats, recent orders, and low-stock
list shown on the dashboard. Replace those with real fetches from your
backend once the Orders/Products APIs exist — every component already expects
the same shape, so swapping the data source shouldn't need component changes.
