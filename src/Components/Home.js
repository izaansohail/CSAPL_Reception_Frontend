import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from './constants'
import './Home.css'


const Home = () => {

    const [seconds, setSeconds] = useState(5);
    const [checkout, setCheckout] = useState(0);
    const [remaining, setRemainig] = useState(0);
    const [defaulters,setDefaulters] = useState(0);
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        axios.get("http://"+SERVER_IP+":5000/home_screen_renderer",{
                params: {
                    date: moment().format().slice(0,-15),
                }
            }).then(res => {
                setTotal(res.data.total)
                setRemainig(res.data.remaining)
                setCheckout(res.data.checkout)
                setDefaulters(res.data.defaulter)
                // setResult(res.data.result)
            }).catch(err => {
                alert("Failed: " + err+ "\nPlease refresh your screen");
            });
    },[])

    useEffect(() => {
        if (seconds > 0) {
          setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            axios.get("http://"+SERVER_IP+":5000/home_screen_renderer",{
                params: {
                    date: moment().format().slice(0,-15),
                }
            }).then(res => {
                setTotal(res.data.total)
                setRemainig(res.data.remaining)
                setCheckout(res.data.checkout)
                setDefaulters(res.data.defaulter)
                // setResult(res.data.result)
            }).catch(err => {
                alert("Failed: " + err+ "\n please Refresh your screen");
            });
          setSeconds(30)
        }
      });

    return(<>
        <div class="container-bg"  > 
        <img id = "image" class="image" alt="bg-crescent" src="/logo.png"/>
        
        <div class="show-data-container">
            <div class="show-data-wrapper">
                <div class="billie">
                    <p>Total Visitors Today:&nbsp;</p>
                    <p></p>
                    <p>Checked out: &nbsp;</p>
                    <p></p>
                    <p style={{paddingRight:"40px"}}>Remaining:</p>
                    <p></p>
                    <p style={{paddingRight:"40px"}}>Defaulters:</p>
                </div>
                <div class="jean">
                    <p>{total}</p>
                    <p></p>
                    <p>{checkout}</p>
                    <p></p>
                    <p>{remaining}</p>
                    <p></p>
                    <p>{defaulters}</p>
                </div>
            </div>
        </div>
        
        
        </div>  

        </>
    )
}

export default Home