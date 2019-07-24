echo "[run] building frontend"
docker-compose run --rm frontend npm run --prefix ./frontend build
echo "[run] adding assets to git repo"
git add -f frontend/build/*
echo "[run] commit to repo"
git commit -m "build front"