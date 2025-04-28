const DB_SSL = process.env.AZURE_POSTGRESQL_SSL || "false";

module.exports = {
    apps: [
      {
        name: "evershopAzure",
        script: "npm",
        env: {
          NODE_ENV: process.env.NODE_ENV || "default",
          DB_HOST: process.env.AZURE_POSTGRESQL_HOST || "localhost",
          DB_NAME: process.env.AZURE_POSTGRESQL_DATABASE || "evershop",
          DB_USER: process.env.AZURE_POSTGRESQL_USER || "evershop",
          DB_PASSWORD: process.env.AZURE_POSTGRESQL_PASSWORD || "evershop",
          DB_PORT: process.env.AZURE_POSTGRESQL_PORT || "5432",
          DB_SSLMODE: DB_SSL === "true" ? "require" : "disable",
          URL: process.env.URL || "http://localhost:3000",
          PORT: process.env.PORT || 3000,
        },
        args: "run start",
      },
    ],
  };