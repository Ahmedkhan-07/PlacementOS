const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://khan:affanxyz@cluster0.ibvxw1k.mongodb.net/?appName=Cluster0';

async function main() {
  try {
    console.log('Connecting...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');
    
    const UserSchema = new mongoose.Schema({ isPremium: Boolean }, { collection: 'users' });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    
    const result = await User.updateMany({}, { $set: { isPremium: false } });
    console.log(`Updated ${result.modifiedCount} users to non-premium.`);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();
