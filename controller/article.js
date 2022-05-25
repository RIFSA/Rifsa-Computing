import Articles from "../models/article.js";

export const articlePost = async(req, res)=>{
    const {title, image, description}=req.body;

    const articlePost = new Articles({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description
    });
    
    try {
        const article = await articlePost.save();
        res.json(article);
    } catch (error) {
        res.json({message: error})
    };
};

export const findArticles = async(req, res)=>{
    try {
        const articles  = await Articles.findAll()
        res.json(articles)
    }catch(err){
        res.json({message: err})
    };
};

export const updateArticle = async(req, res)=>{
    try{
        const articleUpdate = await Articles.updateOne({id: req.params.id}, {
            title: req.body.title,
            image: req.body.image,
            description: req.body.description
        })
        res.json(articleUpdate)
    }catch(err){
        res.json({message: "rerr"})
    }
}

export const deleteArticle = async(req, res)=>{
    try{
        const deleteArticle = await Articles.deleteOne({id: req.params.id})
        res.json(deleteArticle)
    }catch(err){
        res.json({message: err})
    }
}