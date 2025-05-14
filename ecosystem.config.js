const DB_SSL = process.env.AZURE_POSTGRESQL_SSL || "false";

module.exports = {
    apps: [
      {
        name: "evershopAzure",
        script: "npm",
        env: {
          NODE_ENV: "default",
          PORT: 3000,
        },
        args: "run start",
      },
    ],
  };