import fs from 'fs';
import path from 'path';

const envContent = `JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
MONGODB_URI=mongodb://localhost:27017/quanta
PORT=5000
`;

const envPath = path.join(process.cwd(), '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📝 Please update the JWT_SECRET with a secure random string');
  console.log('🌐 Update MONGODB_URI if you have a different MongoDB connection string');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('📝 Please manually create a .env file in the backend folder with:');
  console.log(envContent);
}
