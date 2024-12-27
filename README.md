# Job Listing

## Installation

1. **Clone the repository**:

   ```bash
   git clone git-url
   cd job-listing
   ```

2. **Install dependencies for both FE & BE**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory for both FE and BE and include the following:

## Environment Variables

```env BE
PORT=3000
NODE_ENV=development
DB_URL=mongodb_url
FRONTEND_URL=http://localhost:5173

JWT_SECRET=the-your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7
```

```env FE
FRONTEND_URL=http://localhost:5173
VITE_APP_BASE_URL="http://localhost:3000/api/v1"

```

4. **Run the backend**:

   ```bash
   npm run dev
   ```

5. **Run the frontend**:
   ```bash
   npm run dev
   ```
