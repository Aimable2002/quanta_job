@echo off
echo Creating .env file for backend...

(
echo JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
echo MONGODB_URI=mongodb://localhost:27017/quanta
echo PORT=5000
) > .env

echo .env file created successfully!
echo.
echo Please update the JWT_SECRET with a secure random string
echo Update MONGODB_URI if you have a different MongoDB connection string
echo.
pause
