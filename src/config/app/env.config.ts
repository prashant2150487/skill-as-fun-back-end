import dotenv from "dotenv";
dotenv.config();
export const configEnv = {
  port: process.env.port,
  database: {
    url: process.env.MONGODB_URI as string,
  },
  //   jwt: {
  //     secret: process.env.JWT_SECRET,
  //     expireIn: "24h",
  //   },
};
