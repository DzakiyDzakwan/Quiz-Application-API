import db from "./config/connection.js";

import RoleSeeder from "./databases/seeders/RoleSeeder.js";
import RoomSeeder from "./databases/seeders/RoomSeeder.js";
import UserSeeder from "./databases/seeders/UserSeeder.js";
import Database from "./app/models/Database.js";
import QuizSeeder from "./databases/seeders/QuizSeeder.js";

const seed = async () => {
  try {
    console.log("Seeding start");

    await Database.table("responses").truncate();
    await Database.table("attempts").truncate();
    await Database.table("answers").truncate();
    await Database.table("questions").truncate();
    await Database.table("quizzes").truncate();
    await Database.table("rooms").truncate();
    await Database.table("users").truncate();
    await Database.table("roles").truncate();
    await Database.table("permissions").truncate();

    await RoleSeeder.run();
    await UserSeeder.run();
    await RoomSeeder.run();
    await QuizSeeder.run();

    console.log("Seeding complete");
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1); // Exit with error code (optional)
  }
};

seed();
