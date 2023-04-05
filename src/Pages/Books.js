import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { API } from "../api.js";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { Loading } from "../Components/Loading.js";



// const books =[
//     {
//         id:"1",
//         name:"The Secret",
//         author:"Rhonda Byrne",
//         year : 2006,
//         rating: 4.5,
//         image: "https://i.pinimg.com/236x/03/86/0c/03860c8e0b1ff5cb62e06e600d033a26.jpg",
//         summary : "The Secret is a 2006 self-help book by Rhonda Byrne, based on the earlier film of the same name. It is based on the belief of the pseudoscientific law of attraction, which claims that thoughts can change a person's life directly. The book alleges energy as assurance of its effectiveness.",
//         videoSummary: "https://www.youtube.com/embed/YC-xG_I4hzY"
//     },
//     {
//         id:"2",
//         name:"How to win friends and influence people",
//         author:"Dale Carnegie",
//         year : 1936,
//         rating: 4.5,
//         image: "https://i.pinimg.com/236x/b2/9d/c6/b29dc6d45e4033fd3fa7f33767d60a08.jpg",
//         summary : "How to Win Friends and Influence People is a 1936 self-help book written by Dale Carnegie. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. Carnegie had been conducting business education courses in New York since 1912. ",
//         videoSummary: "https://www.youtube.com/embed/YKAfKprBXQc"
//     },
//     {
//         id:"3",
//         name:"Rich Dad Poor Dad",
//         author:"Robert Kiyosaki, Sharon Lechter",
//         year : 1997,
//         rating: 4.6,
//         image: "https://i.pinimg.com/236x/42/43/6e/42436ec8e0e77d16711d89c62a67dbbe.jpg",
//         summary : "Rich Dad Poor Dad is a 1997 book written by Robert T. Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence.",
//         videoSummary: "https://www.youtube.com/embed/49q-COjB6wg"import { API } from './../api';

//     },
//     {
//         id:"4",
//         name:"The Power of your subconscious mind",
//         author:"Joseph Murphy",
//         year : 1963,
//         rating: 4.5,
//         image: "https://i.pinimg.com/236x/9c/02/f4/9c02f46a04e281e5cb376fd569d0a953.jpg",
//         summary : "Here is the complete, original text of the millions-selling self- help guide that reveals your invisible power to attain any goal-paired with a compelling bonus work, How to Attract Money.",
//         videoSummary: "https://www.youtube.com/embed/Solb9uA-tgQ"
//     },
//     {
//         id:"5",
//         name:"The Alchemist",
//         author:"Paulo Coelho",
//         year : 1988,
//         rating: 4.6,
//         image: "https://i.pinimg.com/236x/ff/a3/11/ffa3116e2a9efb75aedb28f76b830405.jpg",
//         summary : "The Alchemist is a novel by Brazilian author Paulo Coelho which was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.",
//         videoSummary: "https://www.youtube.com/embed/7BTLS-PRSxQ"
//     },
//     {
//         id:"6",
//         name:"The Quick and Easy Way to Effective Speaking",
//         author:"Dale Carnegie",
//         year : 1962,
//         rating: 4.2,
//         image: "https://i.pinimg.com/236x/36/e2/63/36e263d7d22d35e26c702f2d58bbec32.jpg",
//         summary : "Good public speakers are made, not born. This work takes you step by step through: acquiring basic skills; developing confidence; speaking effectively the quick and easy way; earning the right to talk; vitalising your talk; and sharing the talk with the audience.",
//         videoSummary: "https://www.youtube.com/embed/Xb99LOR08X8"
//     }
// ]

export function Books() {
    const[books,setBooks] = useState(null);
    
    // const navigate = useNavigate();

    const getBooks = ()=>{
        fetch(`${API}/books`,{method:'GET'})
        .then((res)=> res.json())
        .then((data)=> setBooks(data))
    }

    useEffect(()=> getBooks(),[])
  return (
    books?
    <div>
    <div className='book-card'>
      {books.map((book)=> <Book key={book.id} book={book} refresh={getBooks}/>)}
    </div>
    </div>
    : <Loading/>
  )
}


function Book({book,refresh}){
    const navigate = useNavigate();
  
  
    const deleteBook = ()=>{
      fetch(`${API}/books/${book.id}`,{method:"DELETE"})
       .then(()=> refresh())
    }
  
  
      return(
          <div style={{'marginTop':'20px'}}>
               <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 500 }}
          image={book.image}
          title={book.name}
          className='pic'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.summary}
          </Typography>
        </CardContent>
        <CardActions className='btn'>
  
        <IconButton  color="primary" onClick={()=> navigate(`/book/${book.id}`)}>
        <InfoIcon></InfoIcon>
        </IconButton>
  
        <IconButton  color="secondary" onClick={()=> navigate(`/book/edit/${book.id}`)}>
        <EditIcon ></EditIcon>
        </IconButton>
  
        <IconButton  color="error" onClick={deleteBook}>
        <DeleteIcon></DeleteIcon>
        </IconButton>
          
          
        </CardActions>
      </Card>
          </div>
      )
  }
