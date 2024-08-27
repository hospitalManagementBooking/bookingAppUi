import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {



    const [userData,setUserData]=useState([]);

    useEffect(()=>{
    axios.get(`http://localhost:3000/base/getAll`)
    .then((res)=>{

      
        const fullData=res.data;
        setUserData(fullData);

    })

    },[])



console.log(userData);



  return (
  
  <>

<div>Home</div>


{

userData.map((data)=>
  



  
    <img src={data.image} height={100} width={100} key={data.id} />

    
    
   
)

}






  </>
   
  )
}

export default Home