import React,{useEffect,useState} from 'react';
import {API_URL,API_KEY,IMAGE_BASE_URL} from '../../Config'
import { useParams } from 'react-router-dom';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from "../commons/GridCards"
import {Row} from "antd";
import Favorite from './Sections/Favorite';

function MovieDetail() {
    //let movieId = props.match.params.MovieDetail   <== react-router-dom v5
    const { movieId } = useParams();   //  <== react-router-dom v6
    console.log(movieId)

    const [Movie,setMovie] = useState([]);
    const [Casts,setCasts] = useState([]);
    const [ActorToggle,setActorToggle] = useState(false);


    useEffect(() =>{
        
        let endpointCrew =`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endPointInfo =`${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endPointInfo)
        .then(response => response.json())
        .then(response=>{
            console.log(response)
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response=>{
            console.log(response)
            console.log(response.cast)
            setCasts(response.cast)
        })
    },[])

    const tootleActorView = ()=>{
        setActorToggle(!ActorToggle)
    }

  return (
  <div>
      {/* header */}

      {Movie &&  
                    <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                            title ={Movie.original_title}
                            text ={Movie.overview} />
           
            }  

      {/* body */}
      <div style={{width: '85%', margin: '1rem auto'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Favorite movieInfo={Movie}
                          movieId={movieId}
                          userFrom={localStorage.getItem('userId')}
                 />
            </div>

            {/* Movie info */}
            

            {Movie &&  
                    <MovieInfo movie={Movie} />                            
            
            }                                   

            <br />
            {/* Actors Grid */}
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={tootleActorView}> Toggle Actor View</button>
            </div>

            {ActorToggle &&
                <Row gutter={[16,16]}>
                    {Casts && Casts.map((casts, index)=>(
                        <React.Fragment key={index}>
                                <GridCards 
                                    image={casts.profile_path ? `${IMAGE_BASE_URL}w500${casts.profile_path}` : null}
                                    characterName={casts.name}
                                />
                        </React.Fragment>

                    ))}            
                </Row>
            }
      </div>


  </div>
  );
}

export default MovieDetail;
