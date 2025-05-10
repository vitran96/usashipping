module.exports = {
    apps: [
      {
        name: "evershopAzure",
        script: "npm",
        env: {
          NODE_ENV: "development",
        },
        args: "run start",
      },
    ],
  };