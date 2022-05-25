import db from "../config/database.js";

const Articles = db.define('articles',{
    title: {
        type: String,
        required: true  
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

export default Articles