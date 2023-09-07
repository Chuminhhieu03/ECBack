class ImageController{
    delete(req,res){
        const {public_id} = req.params;
        cloudinary.uploader.destroy(public_id)
            .then(() => {
                res.status(200).send();
            })
            .catch(() => {
                res.status(400).send(e.message)
            })
    }
}

module.exports = new ImageController()
