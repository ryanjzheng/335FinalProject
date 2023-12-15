const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const { city } = req.query; // Extract the 'city' query parameter from the request
  
    if (!city) {
      return res.status(400).json({ error: 'City parameter is missing.' });
    }
  
    try {
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query: `gyms in ${city}`,
          key: apiKey,
        },
      });
  
      if (response.data.status === 'OK' && response.data.results.length > 0) {
        // Extracting gym details from the API response
        const gyms = response.data.results.map((result) => {
          return {
            name: result.name,
            address: result.formatted_address,
            location: result.geometry.location,
          };
        });

        let table = "<table border = 1>"
        table += "<tr> <th>Name</th> <th>Address</th> </tr>"
    
    
        gyms.forEach(elem => {
            table += `<tr> <td>${elem.name}</td> <td>${elem.address}</td> </tr>`
        })
        table += "</table>"

        table = {table: table}

        res.render('listGyms', table); // Renders home.ejs

      } else {
        res.status(404).json({ error: 'No gyms found near the city.' });
      }
    } catch (error) {
      console.error('Error retrieving gyms:', error);
      res.status(500).json({ error: 'Failed to retrieve gyms.' });
    }
  });

module.exports = router;