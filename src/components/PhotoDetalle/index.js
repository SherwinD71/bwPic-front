import "./style.css";
import { useState } from "react";
//import { useHistory } from "react-router";rrr
import Photo from "../Photo";
import usePhoto from "../../hooks/usePhoto";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from "../../hooks/useUserProfile";

//import { UserTokenContext } from "../../contexts/UserTokenContext";
//import { toast } from "react-toastify";

const PhotoDetalle=  (photoDet => {
  const [token] = useUserTokenContext();

 
  
  <div>{Photo}</div>
  console.log(photoDet)
    // const [comments, setComments]= useState("");
    // const history = useHistory();
    // //const [likes, setLikes]= useState(false);

    // const commentsPhoto = async () => {
    //     const res = await fetch(
    //         `${process.env.REACT_APP_BACKEND_URL}/photos?user=${id_photo}`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: UserTokenContext,
    //             },
    //         } 
        
    //     );
    //     if (res.ok) {
    //         setComments(!comments);
    //         toast.success("comments!");
    //       } else {
    //         const error = await res.json();
    //         toast.error(error.message);
    //         history.go(`/entry_photos_empty`);
    //       }
          
    //     };
    
    return (
      <section>   
      <div>photoDetalle</div>
     <usePhoto />
      </section>
    );
  
    });

  export default PhotoDetalle;
