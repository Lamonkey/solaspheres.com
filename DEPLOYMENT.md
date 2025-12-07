# Production Migration Guide

## Applying Database Migrations to Production

### Method 1: Direct Command (Recommended)

Run this command with your production database URL:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="postgresql://user:password@host:port/database"

# Apply migrations (only applies pending ones, safe for production)
npx prisma migrate deploy

# Or use the npm script
npm run migrate:deploy
```

**Important**: Replace the DATABASE_URL with your actual production database connection string.

### Method 2: Using Environment File

Create a `.env.production` file (DO NOT commit this):

```bash
DATABASE_URL="postgresql://user:password@host:port/database"
```

Then run:

```bash
# Prisma will automatically use .env.production if NODE_ENV=production
NODE_ENV=production npx prisma migrate deploy
```

### Method 3: Automatic via Deployment (Vercel/Railway/etc.)

If you're deploying to a platform like Vercel, Railway, or Render:

1. **Set Environment Variable**: Add `DATABASE_URL` in your platform's environment variables
2. **Deploy**: The build script already includes `prisma migrate deploy`, so migrations will run automatically during build

The build script in `package.json` is:
```json
"build": "prisma migrate deploy && prisma generate && next build"
```

### Method 4: Using Prisma Studio (Verification)

After applying migrations, verify the migration was successful:

```bash
# Connect to production (be very careful!)
DATABASE_URL="your-production-url" npx prisma studio
```

Then check that the `AssessmentReport` table exists.

## Safety Notes

- ✅ `prisma migrate deploy` is **safe** - it only applies pending migrations
- ✅ It's **idempotent** - safe to run multiple times
- ✅ It **won't reset** or delete existing data
- ⚠️ Always **backup your database** before running migrations in production
- ⚠️ Test migrations in a staging environment first if possible

## Migration Status Check

To check which migrations have been applied:

```bash
DATABASE_URL="your-production-url" npx prisma migrate status
```

This will show:
- Which migrations are applied
- Which migrations are pending
- Any drift between your schema and database

## Troubleshooting

If you encounter issues:

1. **Check connection**: Ensure DATABASE_URL is correct
2. **Check permissions**: Database user needs CREATE TABLE permissions
3. **Check migration history**: Run `prisma migrate status` to see what's pending
4. **Rollback**: If needed, you can manually rollback by dropping the table (be careful!)

## Expected Migration

The migration `20251207050043_add_assessment_report` will:
- Create the `AssessmentReport` table
- Add columns: id, type, title, participantName, inviter, summary, data (JSONB), createdAt


