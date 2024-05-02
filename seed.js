import db from "./config/connection.js";

import PermissionSeeder from "./databases/seeders/PermissionSeeder.js";
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

    await PermissionSeeder.run();
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

const truncate = async () => {
  try {
    console.log("Truncating start");

    await Database.table("responses").truncate();
    await Database.table("attempts").truncate();
    await Database.table("answers").truncate();
    await Database.table("questions").truncate();
    await Database.table("quizzes").truncate();
    await Database.table("rooms").truncate();
    await Database.table("users").truncate();
    await Database.table("roles").truncate();
    await Database.table("permissions").truncate();

    console.log("Truncating complete");
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("Truncating failed:", error);
    process.exit(1); // Exit with error code (optional)
  }
};

const args = process.argv.slice(2)[0];

if (args) {
  switch (args) {
    case "run":
      seed();
      break;

    case "truncate":
      truncate();
      break;

    default:
      console.log(`There is no command called ${args}`);
      break;
  }
}
