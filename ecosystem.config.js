module.exports = {
    apps: [
      {
        name: "evershopAzure",
        script: "npm",
        env: {
          NODE_ENV: process.env.NODE_ENV || "default",
          DB_HOST: process.env.AZURE_POSTGRES_HOST || "localhost",
          DB_NAME: process.env.AZURE_POSTGRES_DB || "evershop",
          DB_USER: process.env.AZURE_POSTGRES_USER || "evershop",
          DB_PASSWORD: process.env.AZURE_POSTGRES_PASSWORD || "evershop",
          DB_PORT: process.env.AZURE_POSTGRES_PORT || "5432",
          DB_SSL: process.env.DB_SSL || "require",
          URL: process.env.URL || "http://localhost:3000",
          PORT: process.env.PORT || 3000,
        },
        args: "run start",
      },
    ],
  };