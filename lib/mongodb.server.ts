// lib/mongodb.server.ts
export * from './mongodb';

// This file serves as a marker that these functions should only be imported in server components or API routes
// This helps prevent MongoDB client code from being bundled with client components