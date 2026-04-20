#!/bin/bash
echo "========================================"
echo "  RunaShimi - Iniciando servicios"
echo "========================================"
echo ""
echo "[1/3] Iniciando IA Service (Puerto 5001)..."
cd ia-service && python main.py &
sleep 3

echo "[2/3] Iniciando Backend (Puerto 4000)..."
cd ../backend && node src/app.js &
sleep 3

echo "[3/3] Iniciando Frontend (Puerto 3000)..."
cd ../FrontEnd-Translator-main && npm start &

echo ""
echo "========================================"
echo "  Servicios iniciados!"
echo "========================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:4000"
echo ""
echo "Credenciales:"
echo "  Admin:   admin@runashimi.com / admin123"
echo "  Cliente: user@runashimi.com / 1234"