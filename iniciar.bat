@echo off
echo ========================================
echo   RunaShimi - Iniciando servicios
echo ========================================
echo.
echo [1/3] Iniciando IA Service (Puerto 5001)...
start "IA Service" cmd /k "cd ia-service && python main.py"

timeout /t 3 /nobreak >nul

echo [2/3] Iniciando Backend (Puerto 4000)...
start "Backend" cmd /k "cd backend && node src/app.js"

timeout /t 3 /nobreak >nul

echo [3/3] Iniciando Frontend (Puerto 3000)...
start "Frontend" cmd /k "cd FrontEnd-Translator-main && npm start"

echo.
echo ========================================
echo   Servicios iniciados!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:4000
echo.
echo Credenciales:
echo   Admin:   admin@runashimi.com / admin123
echo   Cliente: user@runashimi.com / 1234
echo.
pause
