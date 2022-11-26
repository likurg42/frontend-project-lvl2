install: install-deps
	npx simple-git-hooks

run:
	gendiff

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .
