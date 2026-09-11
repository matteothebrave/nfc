import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";

export type LinkRecord = {
  id: string;
  slug: string;
  name: string;
  destinationUrl: string;
  active: boolean;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
};

const usePg = !!process.env.DATABASE_URL;

// ---------- Postgres backend (production / Vercel) ----------

let pgPoolPromise: Promise<import("pg").Pool> | null = null;

async function getPgPool() {
  if (!pgPoolPromise) {
    pgPoolPromise = (async () => {
      const { Pool } = await import("pg");
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL?.includes("localhost")
          ? undefined
          : { rejectUnauthorized: false },
      });
      await pool.query(`
        CREATE TABLE IF NOT EXISTS links (
          id TEXT PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          destination_url TEXT NOT NULL,
          active BOOLEAN NOT NULL DEFAULT true,
          click_count INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);
      return pool;
    })();
  }
  return pgPoolPromise;
}

function rowToRecordPg(row: Record<string, unknown>): LinkRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    destinationUrl: row.destination_url as string,
    active: row.active as boolean,
    clickCount: Number(row.click_count),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

// ---------- SQLite backend (local development) ----------

let sqliteDb: import("better-sqlite3").Database | null = null;

function getSqliteDb(): import("better-sqlite3").Database {
  if (!sqliteDb) {
    const dataDir = path.join(process.cwd(), ".data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const db: import("better-sqlite3").Database = new Database(
      path.join(dataDir, "app.db"),
    );
    sqliteDb = db;
    db.exec(`
      CREATE TABLE IF NOT EXISTS links (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        destination_url TEXT NOT NULL,
        active INTEGER NOT NULL DEFAULT 1,
        click_count INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
  }
  return sqliteDb;
}

function rowToRecordSqlite(row: Record<string, unknown>): LinkRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    destinationUrl: row.destination_url as string,
    active: Number(row.active) === 1,
    clickCount: Number(row.click_count),
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

// ---------- Public API ----------

export async function listLinks(): Promise<LinkRecord[]> {
  if (usePg) {
    const pool = await getPgPool();
    const { rows } = await pool.query(
      "SELECT * FROM links ORDER BY created_at DESC",
    );
    return rows.map(rowToRecordPg);
  }
  const db = getSqliteDb();
  const rows = db
    .prepare("SELECT * FROM links ORDER BY created_at DESC")
    .all() as Record<string, unknown>[];
  return rows.map(rowToRecordSqlite);
}

export async function getLinkBySlug(
  slug: string,
): Promise<LinkRecord | null> {
  if (usePg) {
    const pool = await getPgPool();
    const { rows } = await pool.query(
      "SELECT * FROM links WHERE slug = $1",
      [slug],
    );
    return rows[0] ? rowToRecordPg(rows[0]) : null;
  }
  const db = getSqliteDb();
  const row = db.prepare("SELECT * FROM links WHERE slug = ?").get(slug) as
    | Record<string, unknown>
    | undefined;
  return row ? rowToRecordSqlite(row) : null;
}

export async function createLink(input: {
  slug: string;
  name: string;
  destinationUrl: string;
}): Promise<LinkRecord> {
  const id = crypto.randomUUID();
  if (usePg) {
    const pool = await getPgPool();
    const { rows } = await pool.query(
      `INSERT INTO links (id, slug, name, destination_url) VALUES ($1, $2, $3, $4) RETURNING *`,
      [id, input.slug, input.name, input.destinationUrl],
    );
    return rowToRecordPg(rows[0]);
  }
  const db = getSqliteDb();
  db.prepare(
    `INSERT INTO links (id, slug, name, destination_url) VALUES (?, ?, ?, ?)`,
  ).run(id, input.slug, input.name, input.destinationUrl);
  return rowToRecordSqlite(
    db.prepare("SELECT * FROM links WHERE id = ?").get(id) as Record<
      string,
      unknown
    >,
  );
}

export async function updateLink(
  id: string,
  input: Partial<{ name: string; destinationUrl: string; active: boolean }>,
): Promise<LinkRecord | null> {
  if (usePg) {
    const pool = await getPgPool();
    const { rows } = await pool.query(
      `UPDATE links SET
         name = COALESCE($2, name),
         destination_url = COALESCE($3, destination_url),
         active = COALESCE($4, active),
         updated_at = now()
       WHERE id = $1 RETURNING *`,
      [id, input.name ?? null, input.destinationUrl ?? null, input.active ?? null],
    );
    return rows[0] ? rowToRecordPg(rows[0]) : null;
  }
  const db = getSqliteDb();
  const current = db.prepare("SELECT * FROM links WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  if (!current) return null;
  db.prepare(
    `UPDATE links SET name = ?, destination_url = ?, active = ?, updated_at = datetime('now') WHERE id = ?`,
  ).run(
    input.name ?? current.name,
    input.destinationUrl ?? current.destination_url,
    input.active === undefined ? current.active : input.active ? 1 : 0,
    id,
  );
  return rowToRecordSqlite(
    db.prepare("SELECT * FROM links WHERE id = ?").get(id) as Record<
      string,
      unknown
    >,
  );
}

export async function deleteLink(id: string): Promise<void> {
  if (usePg) {
    const pool = await getPgPool();
    await pool.query("DELETE FROM links WHERE id = $1", [id]);
    return;
  }
  const db = getSqliteDb();
  db.prepare("DELETE FROM links WHERE id = ?").run(id);
}

export async function incrementClicks(slug: string): Promise<void> {
  if (usePg) {
    const pool = await getPgPool();
    await pool.query(
      "UPDATE links SET click_count = click_count + 1 WHERE slug = $1",
      [slug],
    );
    return;
  }
  const db = getSqliteDb();
  db.prepare(
    "UPDATE links SET click_count = click_count + 1 WHERE slug = ?",
  ).run(slug);
}
