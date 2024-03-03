# Running App:
Api docs: http://localhost:4000/docs

## Method 1:

Use docker to run the application

```bash
# Copy env file

#run docker
docker-compose up
```

## Method 2:
```javascript
# Copy env file

# Install package: 
yarn

# Run migration 
yarn migration:run

# Run application with dev mode
yarn start:dev
