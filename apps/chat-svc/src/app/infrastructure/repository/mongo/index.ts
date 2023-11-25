import mongoose from 'mongoose';

const DatabaseName = process.env.NX_MONGO_INITDB_DATABASE || 'vouch-db';

const initialize = async () => {
  const DatabaseURL = process.env.NX_MONGO_URL || `mongodb://localhost:27017`;

  console.log('Initialize Database: ', DatabaseName, DatabaseURL)

  try {
    await mongoose.connect(
      DatabaseURL,
      { dbName: DatabaseName }
    )
  } catch (err) {
    if (err) {
      console.log('Connection Failed to ', DatabaseURL, err)

      return;
    }

    console.log('Success connect to ', DatabaseURL)
  }
}

export default {
  initialize
}
