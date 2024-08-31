// Connect to DB
const client = require('./dbConnect');

exports.addTourist= async(req,res)=>{
    console.log('inside the controller');
    const user_id = req.payload;
    console.log(user_id);
  
    const {
      site_id,
      place_name,
      location,
      type_of_Place,
      rating,
      open_hour,
      description,
    } = req.body;
  
    // Process uploaded files
    const place_images = req.files.map(file => file.filename);
  
    console.log(`${site_id},${place_name},${location},${type_of_Place},${rating},${open_hour},${description},${place_images}`);
  
    try {
      // Check if the hospital already exists
      const { rows } = await client.query('SELECT * FROM tourists WHERE place_name = $1 AND site_id = $2', [place_name,site_id]);
      if (rows.length > 0) {
        return res.status(406).json('Place already exists... Please upload a new place');
      }
  
      // Insert new hospital into the database
      const result = await client.query(
        `INSERT INTO tourists (site_id,place_name,location,type_of_Place,rating,open_hour,description,place_images) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [site_id,place_name,location,type_of_Place,rating,open_hour,description,place_images]
      );
  
      const newPlace = result.rows[0];
      res.status(200).json(newPlace);
    } catch (err) {
      console.error(err);
      res.status(500).json('An error occurred while adding the place');
    }
}