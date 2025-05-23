# 🏗️ Multi-Tenant Authentication System with MongoDB and JWT

This project is a dynamic and secure multi-tenant authentication system that uses:

- ✅ Separate MongoDB databases per tenant
- ✅ JWT-based stateless authentication
- ✅ Subdomain-based tenant resolution
- ✅ Token revocation to protect against compromised sessions
- ✅ A basic HTML frontend for login and data fetch

---

## 📁 Folder Structure

```
├── middleware/
│   ├── authMiddleware.js        // Verifies JWT and enforces tenant security
│   └── tenantResolver.js        // Extracts subdomain from host header
├── services/
│   └── tokenBlacklist.js        // In-memory token revocation system
├── public/
│   └── index.html               // Frontend login & data fetch interface
```

---

## 🌐 Routes Overview

### 🔐 Authentication

- `POST /auth/register`
  - Registers a new user for a specific tenant (uses tenantId in body)
- `POST /auth/login`
  - Authenticates and returns a JWT token
  - Requires tenantId in body

Example Request Body:
```json
{
  "tenantId": "tenant1",
  "email": "user@example.com",
  "password": "123456"
}
```

---

### 🚫 Token Revocation

- `POST /token/revoke`
  - Revokes the token used in the Authorization header
  - Token is added to blacklist (Set)

---

### 📦 Protected Data

- `GET /multie`
  - Returns tenant-specific data from the `multie` collection
  - Requires valid JWT in `Authorization` header
  - Automatically blocked and revoked if tenantId in token mismatches subdomain

---

## 🌍 Subdomain Support

- The app detects tenant from subdomain:
  - `tenant1.localhost` → tenantId = "tenant1"
- This is used to route the request to the correct MongoDB database

---

## 🧪 Frontend (HTML UI)

Found in `public/index.html`

Features:
- Plain login form
- Stores JWT token on successful login
- Shows a button to fetch data using stored token
- Displays /multie response data from the correct tenant DB

---

## 🛡️ Security Highlights

- JWT token is required for all protected routes
- Token is invalidated if used from wrong subdomain (cross-tenant access)
- Revoked tokens are stored in an in-memory blacklist
- Requests with revoked tokens are denied automatically

---

## 🚀 Run Instructions

1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Open browser at: `http://tenant1.localhost:3000`
4. Use the HTML form to register/login and fetch data

