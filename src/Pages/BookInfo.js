import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../api"; 
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Loading } from "../Components/Loading";

export function BookInfo() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  const navigate = useNavigate();

  const getBookInfo = () => {
    fetch(`${API}/books/${bookId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setBook(data));
  };

  useEffect(() => getBookInfo(), []);

  const ratingStyles ={
    color: book ? book.rating >= 4.5 ? 'green': 'red' : "",
    fontWeight: 'bold',
    marginTop: '1px',
    fontSize: '18px',
  }

  const nameStyles ={
    marginTop: '1px',
    fontSize: '23px',
    textAlign: 'center'
  }

  const frameStyles ={
    maxWidth: '90%',
    margin:"50px",
    marginLeft:'75px',
    border : '20px solid'
  }
  return book ? (
    <div>
    <div className="book-info">
      <div style={{ marginTop: "20px" }}>
        <Card sx={{ maxWidth: 400, minWidth:300 }}>
          <CardMedia
            sx={{ height: 500 }}
            image={book.image}
            title={book.name}
            className="pic"
          />
          <CardContent>
            <div className="name-rating">
            <Typography gutterBottom variant="h5" component="div" style={nameStyles}>
              {book.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" style={ratingStyles}>
              ⭐{book.rating}
            </Typography>
            </div>
            <Typography variant="body2" color="text.secondary">
              Author : {book.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published Year : {book.year}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="text" onClick={() => navigate("/books")}>
              Back
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
    <br/>
    <br/>
    <h1 style={{textAlign:'left'}}>Audio Book:</h1>
            
            <div>
            <iframe 
            style={frameStyles}
            width="100%" 
            height="538"
            // width="30%"
            // height= "400" 
            src= {book.videoSummary} 
            title= {book.videoSummary} 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
          </div>    
    </div>
  ) : (
    <Loading />
  );
}