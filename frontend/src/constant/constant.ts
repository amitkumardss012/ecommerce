import { config } from "dotenv"

config({ path: "./.env" })

export const PG = process.env.PG