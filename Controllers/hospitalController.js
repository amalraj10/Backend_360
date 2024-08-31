// Connect to DB
const client = require('./dbConnect');


//add hospital
exports.addHospital = async (req, res) => {
  console.log('inside the controller');
  const user_id = req.payload;
  console.log(user_id);

  const {
    site_id,
    hosp_name,
    hosp_address,
    hosp_phnumber,
    hosp_email,
    hosp_website,
    hosp_Gmap,
    hosp_description,
  } = req.body;

  // Process uploaded files
  const hosp_images = req.files.map(file => file.filename);

  console.log(`${site_id},${hosp_name},${hosp_address},${hosp_phnumber},${hosp_email},${hosp_website},${hosp_Gmap},${hosp_description},${hosp_images}`);

  try {
    // Check if the hospital already exists
    const { rows } = await client.query('SELECT * FROM hospitals WHERE hosp_email = $1 AND site_id = $2', [hosp_email,site_id]);
    if (rows.length > 0) {
      return res.status(406).json('Hospital already exists... Please upload a new hospital');
    }

    // Insert new hospital into the database
    const result = await client.query(
      `INSERT INTO hospitals (site_id, hosp_name, hosp_address, hosp_phnumber, hosp_email, hosp_website, hosp_Gmap, hosp_description, hosp_images) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [site_id, hosp_name, hosp_address, hosp_phnumber, hosp_email, hosp_website, hosp_Gmap, hosp_description, hosp_images]
    );

    const newHospital = result.rows[0];
    res.status(200).json(newHospital);
  } catch (err) {
    console.error(err);
    res.status(500).json('An error occurred while adding the hospital');
  }
};


//get users Hospital
exports.getUserHospital = async (req, res) => {
  const site_id = req.query.site_id; // Extract site_id from query parameters
  console.log(`Site ID: ${site_id}`);

  if (!site_id) {
    return res.status(400).json({ message: 'Site ID is missing from the request' });
  }

  try {
    if(site_id==3){
      const userHospitals = await client.query('SELECT * FROM hospitals');
    if (userHospitals.rows.length === 0) {
      return res.status(404).json({ message: 'No hospitals found for the given site ID' });
    } else {
      return res.status(200).json(userHospitals.rows);
    }
    }
    const userHospitals = await client.query('SELECT * FROM hospitals WHERE site_id = $1', [site_id]);
    if (userHospitals.rows.length === 0) {
      return res.status(404).json({ message: 'No hospitals found for the given site ID' });
    } else {
      return res.status(200).json(userHospitals.rows);
    }
  } catch (err) {
    console.error(`Error fetching hospitals: ${err.message}`);
    return res.status(500).json({ message: `Request failed due to ${err.message}` });
  }
}


exports.editHospital = async (req, res) => {
  const { hosp_id } = req.params;
  const user_id = req.payload;

  try {
    // Fetch existing hospital details
    const existingHospitalQuery = `
      SELECT *
      FROM hospitals
      WHERE hosp_id = $1
    `;
    const existingHospitalResult = await client.query(existingHospitalQuery, [hosp_id]);
    const existingHospital = existingHospitalResult.rows[0];

    // Prepare updated fields
    const updatedFields = {
      hosp_name: req.body.hosp_name,
      hosp_address: req.body.hosp_address,
      hosp_phnumber: req.body.hosp_phnumber,
      hosp_email: req.body.hosp_email,
      hosp_website: req.body.hosp_website,
      hosp_gmap: req.body.hosp_gmap,
      hosp_description: req.body.hosp_description,
    };

    // Handle image updates
    let updatedImages = [];
    
    // Add existing images that weren't deleted
    if (req.body.existing_images) {
      const existingImages = Array.isArray(req.body.existing_images) 
        ? req.body.existing_images 
        : [req.body.existing_images];
      updatedImages = existingImages.map(img => img.split('/').pop());
    }

    // Add new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      updatedImages = [...updatedImages, ...newImages];
    }

    updatedFields.hosp_images = updatedImages;

    // Update hospital record
    const updateHospitalQuery = `
      UPDATE hospitals
      SET hosp_name = $1,
          hosp_address = $2,
          hosp_phnumber = $3,
          hosp_email = $4,
          hosp_website = $5,
          hosp_gmap = $6,
          hosp_description = $7,
          hosp_images = $8,
          updated_by = $9
      WHERE hosp_id = $10
      RETURNING *
    `;

    const values = [
      updatedFields.hosp_name,
      updatedFields.hosp_address,
      updatedFields.hosp_phnumber,
      updatedFields.hosp_email,
      updatedFields.hosp_website,
      updatedFields.hosp_gmap,
      updatedFields.hosp_description,
      updatedFields.hosp_images,
      user_id,
      hosp_id,
    ];

    const result = await client.query(updateHospitalQuery, values);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating hospital:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






//delete hospital


exports.deleteHospital = async (req, res) => {
  const { hosp_id } = req.params;

  try {
    const deleteHospitalQuery = `
      DELETE FROM hospitals
      WHERE hosp_id = $1
      RETURNING *
    `;
    const values = [hosp_id];

    const result = await client.query(deleteHospitalQuery, values);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Hospital deleted successfully', deletedHospital: result.rows[0] });
    } else {
      res.status(404).json({ error: 'Hospital not found' });
    }
  } catch (error) {
    console.error('Error deleting hospital:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
