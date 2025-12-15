import { api } from "@/lib/axios.js";
import { useEffect, useState } from "react";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`post?limit=${limit}&cursor=""`);
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [page]);
   useEffect(()=>{
    console.log(posts)
   },[posts])
  return (
    <div>
        
    </div>
  )
};
