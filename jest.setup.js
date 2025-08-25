global.fetch = require('node-fetch');

global.basePlants = [
    {
      "id": 1,
      "name": "Aloe",
      "image": "./images/aloe.jpg",
      "price": 15.99,
      "inStock": true
    },
    {
      "id": 2,
      "name": "ZZ Plant",
      "image": "./images/zz-plant.jpg",
      "price": 25.98,
      "inStock": true
    },
    {
      "id": 3,
      "name": "Pilea peperomioides",
      "image": "./images/pilea.jpg",
      "price": 5.99,
      "inStock": true
    },
    {
      "id": 4,
      "name": "Pothos",
      "image": "./images/pothos.jpg",
      "price": 12.11,
      "inStock": true
    },
    {
      "id": 5,
      "name": "Jade",
      "image": "./images/jade.jpg",
      "price": 10.37,
      "inStock": true
    },
    {
      "id": 6,
      "name": "Monstera Deliciosa",
      "image": "./images/monstera.jpg",
      "price": 25.99,
      "inStock": true
    },
    {
      "id": 7,
      "name": "Fiddle Leaf Fig",
      "image": "./images/fiddle-leaf-fig.jpg",
      "price": 55,
      "inStock": true
    }
]

global.alternatePlants = [
    {
      "id": 1,
      "name": "Another Aloe",
      "image": "./images/aloe.jpg",
      "price": 12.88,
      "inStock": true
    },
    {
      "id": 2,
      "name": "Another Jade",
      "image": "./images/jade.jpg",
      "price": 4.92,
      "inStock": true
    },
    {
      "id": 3,
      "name": "Another Fiddle Leaf Fig",
      "image": "./images/fiddle-leaf-fig.jpg",
      "price": 55,
      "inStock": true
    }
]
  
global.setFetchResponse = (val) => {
    global.fetch = jest.fn((url, options) => {
        if (options && options.method === 'PATCH') {
            const id = parseInt(url.split('/').pop());
            const body = JSON.parse(options.body);
            const plantToUpdate = Array.isArray(val) ? val.find(p => p.id === id) : null;
            const updatedPlant = { ...plantToUpdate, ...body };
            return Promise.resolve({
                json: () => Promise.resolve(updatedPlant)
            });
        }
        return Promise.resolve({
            json: () => Promise.resolve(val)
        });
    });
}
  