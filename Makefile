include .env

dev:
	npm run dev

up:
	docker compose up -d --build

down:
	docker compose down

deploy:
	docker build -t app .
	docker login $(ACR_HOST) -u $(ACR_USER) -p $(ACR_PASSWORD)
	docker tag app $(ACR_HOST)/app:latest
	docker push $(ACR_HOST)/app:latest
