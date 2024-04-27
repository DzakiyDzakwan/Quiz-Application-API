import db from "./config/connection.js";

import RoleSeeder from "./databases/seeders/RoleSeeder.js";
import RoomSeeder from "./databases/seeders/RoomSeeder.js";
import UserSeeder from "./databases/seeders/UserSeeder.js";
import Database from "./app/models/Database.js";

const seed = async () => {
  try {
    await Database.table("questions").truncate();
    await Database.table("quizzes").truncate();
    await Database.table("rooms").truncate();
    await Database.table("users").truncate();
    await Database.table("roles").truncate();
    await Database.table("permissions").truncate();

    await RoleSeeder.run();
    await UserSeeder.run();
    await RoomSeeder.run();
    console.log("Seeding complete. Exiting process...");
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1); // Exit with error code (optional)
  }
};

seed();
