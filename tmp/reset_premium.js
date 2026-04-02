const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://khan:affanxyz@cluster0.ibvxw1k.mongodb.net/?appName=Cluster0';

async function resetPremium() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        // Define a minimal User model for the update
        const UserSchema = new mongoose.Schema({
            isPremium: { type: Boolean, default: false }
        });
        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        console.log('Resetting isPremium for all users...');
        const result = await User.updateMany({}, { $set: { isPremium: false } });
        
        console.log(`Success! Updated ${result.modifiedCount} users.`);
    } catch (err) {
        console.error('Error resetting premium:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

resetPremium();
