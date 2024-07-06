const { MongoClient } = require("mongodb");
const { users, products, reviews } = require("../src/app/lib/dbdata.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("users");

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return collection.insertOne(user);
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("products");

    const insertedProducts = await collection.insertMany(products);

    console.log(`Seeded ${insertedProducts.insertedCount} products`);
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function seedReviews(client) {
  try {
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("reviews");

    const insertedReviews = await collection.insertMany(reviews);

    console.log(`Seeded ${insertedReviews.insertedCount} reviews`);
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  }
}

async function createProductRatingTrigger(client) {
  const db = client.db(process.env.MONGODB_DB);

  const changeStream = db.collection("reviews").watch();

  changeStream.on("change", async (change) => {
    if (change.operationType === "insert") {
      const newReview = change.fullDocument;
      const productId = newReview.product_id;

      const avgRating = await db
        .collection("reviews")
        .aggregate([
          { $match: { product_id: productId } },
          { $group: { _id: "$product_id", avgRating: { $avg: "$rating" } } },
        ])
        .toArray();

      if (avgRating.length > 0) {
        await db
          .collection("products")
          .updateOne(
            { product_id: productId },
            { $set: { rating: avgRating[0].avgRating } }
          );
      }
    }
  });
}

async function main() {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0`;
  //const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await seedUsers(client);
    await seedProducts(client);
    await seedReviews(client);
    await createProductRatingTrigger(client);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
