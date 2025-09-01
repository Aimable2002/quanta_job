Write-Host "Creating .env file for backend..." -ForegroundColor Green

$envContent = @"
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
MONGODB_URI=mongodb://localhost:27017/quanta
PORT=5000
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host ".env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Please update the JWT_SECRET with a secure random string" -ForegroundColor Yellow
Write-Host "Update MONGODB_URI if you have a different MongoDB connection string" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to continue"
