import mongoose from 'mongoose';
import User from './services/user-service/models/User.js';

mongoose.connect('mongodb://127.0.0.1:27017/pubg-esports').then(async () => {
  const user = await User.findOne({ email: 'admin@example.com' });
  if (user) {
    user.role = 'admin';
    await user.save();
    console.log('User updated successfully');
  } else {
    console.log('User not found');
  }
  mongoose.disconnect();
});
