import {React, useState, useEffect} from 'react'
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Divider, Tag } from 'antd';
import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})


const RightSide = styled.div`
position: absolute;
top: 0px;
bottom: 2rem;
right: 3vw;
display: flex;
flex-flow: column;
z-index: 10;
padding-top: 50px;
padding-left: 50px;
padding-right: 50px;
overflow: auto;


.resBlock {
    margin: 1em;
    padding: 1em;
    display: block;
    width: 270px;
    height: 200px;
    background-color:rgb(0,0,0, .3)
}

.resBlock:hover {
    cursor: pointer;
}

.resImgContainer {
    display: flex;
    width: 270px;
    height: 100px;
    overflow: hidden;
    justify-content: center;
}

.resImg {
    width:auto;
    height: auto;
}

.resInfo {
    padding: 0.5em;
    text-align: left;
    width: 270px;
}

.resInfo .title {
    display: flex;
    justify-content: center;
    height: 6%;
    max-height: 25px;
}

.resInfo .title .name {
    justify-content: center;
    width: 55%;
    height: 6%;
    font-size: 14px;
}

.resInfo .title .price {
    text-align: right;
    padding-right: 1em;
    width: 10%;
    height: 6%;
    font-size: 14px;
}

.resInfo .title .distance {
    text-align: right;
    width: 35%;
    height: 6%;
    font-size: 14px;
}

.description {
    font-size: 12px;
}
`

const color = ['geekblue', 'purple', 'green', 'volcano', 'gold']

const SearchPage = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const [restaurants, setRestaurant] = useState([])

    const getRestaurant = async () => {
        const restaurants = await instance.get('/getSearch', {params:state})
        setRestaurant(restaurants.data);
    }
    console.log(restaurants)
    console.log(state?.metroFilter)

    useEffect(() => {
        getRestaurant()
    }, [state?.metroFilter])

    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        navigate("/restaurant/" + id)
    }

    return(
        <RightSide>
        {  
                restaurants?.contents?.map(({id, img, name, distance, tag}) => (
                    <>
                        <div className='resBlock' id={id} key={id} onClick = {(e)=>{ToRestaurant(e.currentTarget.id)}}>
                            <div className='resImgContainer'><img className='resImg' src={img}></img></div>
                            <div className='resInfo'>
                                <div className='title'>
                                    <p className='name'>{name}</p>
                                    <p className='distance'>{distance}</p>
                                </div>
                                <p className='description'><Tag  color={color[1]}>{tag.join(", ")}</Tag></p>
                                
                            </div>
                        </div>
                    </>
                ))
        }
        </RightSide>
    )
}

export default SearchPage