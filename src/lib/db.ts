import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache: MongooseCache = globalForMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalForMongoose.mongooseCache = cache;

export async function connectDb() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      dbName: "spardha",
      serverSelectionTimeoutMS: 8000,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}

export function describeAuthError(caught: unknown, fallback: string) {
  const message = caught instanceof Error ? caught.message : "";
  const clean = message
    .replace(/mongodb(?:\+srv)?:\/\/\S+/gi, "mongodb://redacted")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.includes("MONGO_URI is not set")) {
    return "MONGO_URI is not set on the server.";
  }
  if (clean.includes("JWT_SECRET is not set")) {
    return "JWT_SECRET is not set on the server.";
  }
  if (/whitelist|not allowed to access/i.test(clean)) {
    return "MongoDB refused this server. In Atlas Network Access, allow 0.0.0.0/0.";
  }
  if (/authentication failed|bad auth/i.test(clean)) {
    return "MongoDB rejected the username or password in MONGO_URI.";
  }
  if (/ENOTFOUND|querySrv|getaddrinfo/i.test(clean)) {
    return "The MongoDB host in MONGO_URI could not be found.";
  }
  if (/ECONNREFUSED|localhost|127\.0\.0\.1/i.test(clean)) {
    return "MONGO_URI points at a computer this server cannot reach. Use the cloud database address.";
  }
  if (/timed out|Server selection|ServerSelection/i.test(clean)) {
    return "The server could not reach MongoDB in time. In Atlas Network Access, allow 0.0.0.0/0.";
  }

  return clean ? `${fallback} ${clean.slice(0, 180)}` : fallback;
}
