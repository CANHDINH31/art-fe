import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      provider: string;
      id_token: string;
      access_token: string;
    };
  }
}
