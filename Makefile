init:
	npm ci
	
install:
	npm install
	cd my-react-app && npm install

run:
	cd my-react-app && npm run dev