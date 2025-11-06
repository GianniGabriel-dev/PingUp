import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import { analyzeSentiment, getSentimentLabel } from "../services/nlpService.js";
import { translatePostContent } from "../services/translationService.js";
import { createPost, getAllPosts } from "../queries/postQueries.js";
import { uploadToCloudinary } from "../config/cloudinaryAndMulter.js";
import { toggleLike } from "../services/likeAndFollowServices.js";

export const newPost = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const {content, parent_post_id}=req.body
    //parseo del parent_post_id, se pasa originalmente como un string en el formualario 
    const parent_id:number | null = Number(parent_post_id)

    console.log(`Content: ${content}, ID del post padre: ${parent_post_id}`)
    //media_url puede se string o null
    let media_url:string | null = null;

    //upload a cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "media");
      media_url = result.secure_url;
    }

    //analisis de sentimientos
    const sentimentScore= await analyzeSentiment(content)
    const sentimentLabel= getSentimentLabel(sentimentScore.score)
    
    //el user id es obtenido desde el post route gracias a la autenticacion de passport que devuelve el id del actual usuario
    const userId = (req.user as {id:number}).id
    const post =await  createPost( userId, content, sentimentLabel, sentimentScore.score, sentimentScore.language, parent_id, media_url)
    return res.status(200).json(post)

  } catch (error:any) {
    console.error(error.message)
    return res.status(500).json({ error: 'Error creating users' });
  }
};

export const getPosts= async(req:Request, res:Response)=>{
  try{
    const page = parseInt(typeof req.query.page === "string" ? req.query.page : "1");
    const limit = parseInt(typeof req.query.limit === "string" ? req.query.limit : "1");
    //paginación para los posts, se calcula la cantidad de posts que skipear (offset) antes de cargar los siguientes 
    const skip=(page-1)*limit
    const posts= await getAllPosts(limit, skip)
    return res.status(200).json(posts)
    

  }catch(error:any){
    console.error(error.message)
    return res.status(500).json({ error: 'Error getting posts' });
  }

}

export const like= async(req:Request, res:Response)=> {
  try{
    const userId = (req.user as {id:number}).id
    const post_id= Number(req.params.post_id)
    const result= await toggleLike(userId, post_id)
    return res.json(result)
  }catch(error:any){
    return res.status(500).json({ error: error.message });
  }
}

export const translatePost = async (req: Request, res: Response) => {
  try {
    const post_id = Number(req.params.post_id);
    //se obtiene el idioma del usuario a través del endpoint query
    const target = req.query.target as string;
    if (!target) return res.status(400).json({ error: "Idioma objetivo no especificado" });

    const translation = await translatePostContent(post_id, target);

    res.json({ translation }); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};