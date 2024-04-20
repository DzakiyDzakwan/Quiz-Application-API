import UserSeeder from "./databases/seeders/UserSeeder.js";
import RoleSeeder from "./databases/seeders/RoleSeeder.js";

const seed = async () => {
  try {
    await UserSeeder.run();
    await RoleSeeder.run();
    console.log("Seeding complete. Exiting process...");
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1); // Exit with error code (optional)
  }
};

seed();
