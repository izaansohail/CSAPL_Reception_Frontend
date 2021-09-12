import React, {  useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { SERVER_IP } from './constants'
import "./Entry.css"
import {  useHistory} from 'react-router-dom'
import CancelIcon from '@material-ui/icons/Cancel';
import WebcamCapture from './utils/webcamComp'
import InputMask from 'react-input-mask'
import ReplayIcon from '@material-ui/icons/Replay';

const Entry = (props) => {
  // const location = useLocation()
  const history = useHistory()
  const [PropName,setPropName] = useState(null)
  const [cnic,setCnic] = useState(null)
  const [perCount,setPerCount] = useState(null)
  const [NoOrg,setNoOrg] = useState(null)
  const [contactNo,setContactNo] = useState(null)
  // const [checkIn,setCheckIn] = useState(null)
  // const [checkOut,setCheckOut] = useState(null)
  const [contactPer,setcontactPer] = useState(null)
  const [purpose,setPurpose] = useState(null)
  const [picture,setPicture] = useState(null)
  const [isValid,setIsValid] = useState(null)
  const [cnicWrong,setCnicWrong] = useState(null)
  
  

  const clickHandler = () => {
    var valid = false
    if (cnic != null &&
        cnic.length === 15 &&
        PropName != null &&
        perCount != null &&
        NoOrg != null &&
        contactNo != null &&
        contactPer != null &&
        purpose != null &&
        picture != null ){
      setIsValid(true)
      valid = true
    }
    else{
      setIsValid(false)
      valid = false
      setCnicWrong("Incomplete CNIC")
    }
    if(valid === true){
      axios.post("http://"+SERVER_IP+":5000/data_handling", {
        "name":PropName,
        "cnic":cnic,
        "Person_Count":perCount,
        "organization_name":NoOrg,
        "contact" : contactNo,
        "Check_In_Date" : moment().format().slice(0,-6),
        "Check_Out_Date" : "",
        "Contact_Person" : contactPer,
        "Visit_Purpose" : purpose,
        "picture" : picture,
        
      }).then(res => {
        alert("Successfully inserted");
        history.push('/')
    }).catch(err => {
        alert("Data Insertion failed! Please try again.");
    })
      // let data = {
      //   "name":PropName,
      //   "cnic":cnic,
      //   "person_count":perCount,
      //   "name_of_organization":NoOrg,
      //   "contact_number" : contactNo,
      //   "check_in_datetime" : moment().format().slice(0,-6),
      //   "check_out_datetime" : "",
      //   "contact_person" : contactPer,
      //   "contact_purpose" : purpose,
      //   "picture" : picture,
      // }
    }
  }

 



    return(
        <div className="maincontainer3" >

<h1 class = "text-center" style={{color: "white", paddingTop: "30px"}}><b> Contact Form</b></h1>

<div style={{paddingLeft:"77%"}}><CancelIcon fontSize="large" onClick={()=>{history.push('/home')}} /></div>

<div class = "container" >
  <div class="mb-3" style={{ paddingTop: "20px"}}>
    <label for="Name" class="form-label"><b>Visitor Name</b></label>
    <input type="text" value={PropName} onChange={(e)=>setPropName(e.target.value)} class="form-control" id="Name" name="Name" aria-describedby="emailHelp" placeholder="Enter Your Name Here"/>
    <div id="emailHelp" class="form-text"></div>
  </div>
  <div class="mb-3" >
    <label for="cnic" class="form-label"><b>Cnic <span style={{color:"red", paddingLeft:"15px"}}>{cnicWrong}</span></b></label>
     <InputMask mask="99999-9999999-9" className="form-control" maskChar={null}  onChange={(e)=>{setCnic(e.target.value)}}  placeholder="Enter Your cnic Here"/>
  </div>
  <div class="mb-3" >
    <label for="Person_Count" class="form-label"><b>Person Count</b></label>
    <input type="number" onChange={e=>setPerCount(e.target.value)} class="form-control" id="Address" name="Address" placeholder="Enter Person Count Here"/>
  </div>
  <div class="mb-3" >
    <label for="Organization" class="form-label"><b>Name of Organization</b></label>
    <input type="text" onChange={e=>setNoOrg(e.target.value)} class="form-control" id="Organization" name="Organization" placeholder="Enter Name of Organization Here"/>
  </div>
  <div class="mb-3" >
    <label for="Contact_Number" class="form-label"><b>Contact Number</b></label>
    <input type="number" onChange={e=>setContactNo(e.target.value)} class="form-control" id="Contact_Number" name="Contact_Number" placeholder="Enter Your Contact Number Here"/>
  </div>
  <div class="mb-3" >
    <label for="Check-In" class="form-label"><b>Check-In Date</b></label>
    <input type="datetime-local" value={moment().format().slice(0,-6)} class="form-control" id="Check-In" name="Check-In" placeholder="Enter Your Check-In Date Here" readOnly/>
  </div>
  <div class="mb-3" >
    <label for="Check-Out" class="form-label"><b>Check-Out Date</b></label>
    <input type="datetime-local" class="form-control" id="Check-In" name="Check-In" placeholder="Enter Your Check-In Date Here" readOnly/>
  </div>
  <div class="mb-3" >
    <label for="Contact_Person" class="form-label"><b>Contact Person</b></label>
    <input type="text" class="form-control" onChange={e=>setcontactPer(e.target.value)} id="Contact_Person" name="Contact_Person" placeholder="Enter Your Contact Person Here"/>
  </div>
  <div class="mb-3" >
    <label for="Purpose" class="form-label"><b>Purpose of Visit</b></label>
    <input type="text" onChange={e=>setPurpose(e.target.value)} class="form-control" id="Purpose" name="Purpose" placeholder="Enter Your Purpose of Visit Here"/>
  </div>
  <div class="mb-3" >
    <label for="Picture" class="form-label"><b>Picture</b></label>
    <ReplayIcon style={{position:"absolute", marginLeft:"11rem",color:"white"}} onClick={()=>{setPicture(null)}} />
    {isValid === false?<p class="incomplete" >Incomplete data entered</p>:null}
    <div 
        class="form-image-last" 
    >
            {picture?<img 
                src={picture}
                alt="./bulgaria.png" />:
            <WebcamCapture picture={picture} setPicture={setPicture}/>}
            
    </div>
    
    
  </div>
  
  <button 
  style= {{
    flex: "content",
     marginLeft: "600px",
     position:"absolute",
     marginTop:"-70px", 
     width:"150px",
     height:"50px", 
     fontSize:"25px",
     borderRadius:"25px",
     backgroundColor: "darkblue",
     }} onClick={clickHandler} type="submit" class="btn btn-primary">Submit</button>
</div>
</div>
    )
}

export default Entry