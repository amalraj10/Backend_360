
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