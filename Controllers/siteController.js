
// Connect to DB
const client = require('./dbConnect')


// Get sites API
exports.getSites = async(req,res)=>{
    try {
        const data = await client.query('SELECT * FROM sites')
        console.log(data['rows']);
        if(!data){
            return res.status(404).send({message:'not found'})
           
        }
        res.status(200).send
        (
            data['rows']
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
    }

}


exports.getUserSite = async (req, res) => {
    const site_id = req.query.site_id; // Extract site_id from query parameters
    console.log(`Site ID: ${site_id}`);

    if (!site_id) {
      return res.status(400).json({ message: 'Site ID is missing from the request' });
    }

    // Check if the site_id is not null and is a valid integer
    if (isNaN(parseInt(site_id))) {
      return res.status(400).json({ message: 'Invalid site ID format' });
    }

    try {
      const userSites = await client.query('SELECT * FROM sites WHERE site_id = $1', [site_id]);
      console.log(`Query result: ${JSON.stringify(userSites.rows)}`);
      if (userSites.rows.length === 0) {
        return res.status(404).json({ message: 'No sites found for the given site ID' });
      } else {
        return res.status(200).json(userSites.rows);
      }
    } catch (err) {
      console.error(`Error fetching sites: ${err.message}`);
      return res.status(500).json({ message: `Request failed due to ${err.message}` });
    }
};


exports.addSites = async (req, res) => {
  console.log('inside the controller');
  const user_id = req.payload;
  console.log(user_id);

  const {

    site_name,
    state,
    district,
    pincode,
    url,
  description,
  

  } = req.body;

  // Process uploaded files
  const site_image = req.files.map(file => file.filename);

  console.log(`${site_name},${state},${district},${pincode},${url},${description}${site_image}`);

  try {
    // Check if the hospital already exists
    const { rows } = await client.query('SELECT * FROM sites WHERE  site_name = $1', [site_name]);
    if (rows.length > 0) {
      return res.status(406).json('site already exists... Please upload a new site');
    }

    // Insert new hospital into the database
    const result = await client.query(
      `INSERT INTO sites ( site_name, state, district, pincode, url, description, site_image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [ site_name, state, district, pincode, url, description, site_image]
    );

    const newSites = result.rows[0];
    res.status(200).json(newSites);
  } catch (err) {
    console.error(err);
    res.status(500).json('An error occurred while adding the hospital');
  }
};