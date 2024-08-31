// Connect to DB
const client = require('./dbConnect');



//add Category
exports.addCategory = async (req, res) => {
    console.log('inside the category controller');
    const user_id = req.payload;
    console.log(user_id);
  
    const {
 
      category_name,
    } = req.body;
  
    // Process uploaded files
    const category_images = req.files.map(file => file.filename);
  
    console.log(`${category_name},${category_images}`);
  
    try {
      // Check if the Category already exists
      const { rows } = await client.query('SELECT * FROM categories WHERE category_name = $1', [category_name]);
      if (rows.length > 0) {
        return res.status(406).json('Category already exists... Please upload a new Category');
      }
  
      // Insert new Category into the database
      const result = await client.query(
        `INSERT INTO categories ( category_name, category_images) 
         VALUES ($1, $2) RETURNING *`,
        [ category_name, category_images]
      );
  
      const newCategory = result.rows[0];
      res.status(200).json(newCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json('An error occurred while adding the Category');
    }
  };
  


  // Get Category API
  exports.getAllCategory = async (req, res) => {
    try {
      const data = await client.query('SELECT * FROM categories');
      if (data.rows.length === 0) {
        return res.status(404).json({ message: 'No categories found.' });
      }
      res.status(200).json(data.rows);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'An error occurred while fetching categories.' });
    }
  };



  //editcategoryAPI
  exports.editCategory = async (req, res) => {
    const { category_id } = req.params;
    const user_id = req.payload; // Assuming you have a way to get the user ID
  
    try {
      // Fetch existing category details
      const existingCategoryQuery = `
        SELECT *
        FROM categories
        WHERE category_id = $1
      `;
      const existingCategoryResult = await client.query(existingCategoryQuery, [category_id]);
      const existingCategory = existingCategoryResult.rows[0];
  
      // Prepare updated fields
      const updatedFields = {
        category_name: req.body.category_name,
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
  
      updatedFields.category_images = updatedImages;
  
      // Update category record
      const updateCategoryQuery = `
        UPDATE categories
        SET category_name = $1,
            category_images = $2,
            updated_by = $3
        WHERE category_id = $4
        RETURNING *
      `;
  
      const values = [
        updatedFields.category_name,
        updatedFields.category_images,
        user_id,
        category_id,
      ];
  
      const result = await client.query(updateCategoryQuery, values);
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


  exports.deleteCategory = async (req, res) => {
    const { category_id } = req.params;
  
    try {
      const deleteCategoryQuery = `
        DELETE FROM categories
        WHERE category_id = $1
        RETURNING *
      `;
      const values = [category_id];
  
      const result = await client.query(deleteCategoryQuery, values);
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Category deleted successfully', deletedCategory: result.rows[0] });
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  