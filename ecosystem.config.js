module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "start",
      cwd: "/path/to/your/nextjs/app",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
