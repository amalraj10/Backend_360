const messageModel = require('../Model/messageModel');



exports.addSites = async(req,res)=>{
    
    try {
        const {site_name,image,site_url} = req.body
        if(!site_name || !image ||!site_url){
        res.status(500).send({message:"fill properly"})
        }
        const data = await db.query(`INSERT INTO sites (site_name,image,site_url) VALUES (? , ? , ? ) `,[site_name,image,site_url])
        if(!data){
            res.status(404).send({message:"error whileinsertion"})
        }
        res.status(200).send(data)
        
    } catch (error) {
        res.status(500).send({error})
    }
}