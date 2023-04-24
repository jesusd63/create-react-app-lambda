import React, {useState, useEffect} from 'react';
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";
import { AiFillHome, AiOutlineUser} from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import Modal from "../Components/Modal";
import {Link} from "react-router-dom";


const Home = () => {

    const [ModalIsOpen, setModalIsOpen] = useState(false);

    function deleteHandler(){
        if(ModalIsOpen){
            setModalIsOpen(false);
        }
        else{
            setModalIsOpen(true);
        }
    }

    const [data, setData] = useState ([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3001/menu");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{marginTop: "150px"}}>
            <div className='sidebar'>
				    <img className='logo' alt = "kueski logo" src = {require("../assets/desktop_logo.png")}/>
				<div className='user'>
                    <AiOutlineUser className='account1'/>
					<span className='Login'>Log in</span>
				</div>
				<div className='navlinks'>
					<div className='dashboard'>
                        < AiFillHome className='casa1'/>
						<span className='Dashboard'>Dashboard</span>
					</div>
					<div className='ajustes'>
                        <CiSettings className='settings1'/>
						<span className='Ajustes'>Ajustes</span>
					</div>
				</div>
			</div>
            <table className="styled-table"> 
                <thead> 
                    <tr>
                        <th style={{textAlign: "center"}}> User Id</th>
                        <th style={{textAlign: "center"}}> Email </th>
                        <th style={{textAlign: "center"}}> Nombre </th>
                        <th style={{textAlign: "center"}}> Primer Apellido </th>
                        <th style={{textAlign: "center"}}> Segundo Apellido </th>
                        <th style={{textAlign: "center"}}> CURP </th>
                        <th style={{textAlign: "center"}}> RFC </th>
                        <th style={{textAlign: "center"}}> Acciones </th>
                    </tr>   
                </thead>

                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.USER_ID}>
                                <th scope="row">{item.USER_ID}</th>
                                <td>{item.EMAIL}</td>
                                <td>{item.NAME}</td>
                                <td>{item.LAST_NAME}</td>
                                <td>{item.SECOND_LAST_NAME}</td>
                                <td>{item.CURP}</td>
                                <td>{item.RFC}</td>
                                <td>
                                    {//<button onClick={deleteHandler}  >...</button>
                                     //{ModalIsOpen ? <Modal user_id={item.USER_ID}/> : null}
                                    }
                                    <Link style={{textDecoration: 'none'}} to={`/action/acceso/${item.USER_ID}`}>
                                        <button className="btn"> Acceso </button>
                                    </Link>
                                    <Link style={{textDecoration: 'none'}} to={`/action/rect/${item.USER_ID}`}>
                                        <button className="btn">Rectificación</button>
                                    </Link>
                                        <button className="btn"> Cancelación </button>
                                        <button className="btn"> Oposición </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home;