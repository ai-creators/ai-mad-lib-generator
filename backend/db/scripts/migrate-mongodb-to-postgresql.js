const fs = require('fs').promises;
const { Pool } = require('pg');

// PostgreSQL connection details
const pgConfig = {
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432,
};

const pgPool = new Pool(pgConfig);

const jsonFilePath = ''; // Path to your JSON file
const batchSize = 200; // Number of documents per batch

const migrateData = async () => {
  try {
    // Connect to PostgreSQL
    await pgPool.connect();
    console.log('Connected to PostgreSQL');

    // Read the JSON file
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const documents = JSON.parse(data);

    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      const values = batch.map((doc) => {
        let { _id, prompt, text, isHidden, isPG, createdAt, updatedAt } = doc;
        prompt = prompt.slice(0, 100); // Truncate to 200 characters
        const title = prompt; // Using truncated prompt
        return [
          title,
          prompt,
          text,
          isHidden,
          isPG,
          new Date(createdAt.$date),
          new Date(updatedAt.$date),
          _id.$oid,
        ];
      });

      const placeholders = values
        .map(
          (_, index) =>
            `($${index * 8 + 1}, $${index * 8 + 2}, $${index * 8 + 3}, $${index * 8 + 4}, $${index * 8 + 5}, $${index * 8 + 6}, $${index * 8 + 7}, $${index * 8 + 8})`,
        )
        .join(', ');
      const query = `
        INSERT INTO public.adlib (title, prompt, "text", "isHidden", "isPg", "createdAt", "updatedAt", "oldId")
        VALUES ${placeholders}
      `;

      // Flatten the values array for pg
      const flatValues = values.flat();

      await pgPool.query(query, flatValues);
    }

    console.log('Migration completed successfully');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    // End the PostgreSQL pool connection
    await pgPool.end();
  }
};

migrateData();
