import React, { useState } from 'react'
import './Regulars.css'
import InputMask from 'react-input-mask'
import axios from 'axios'
import { SERVER_IP } from './constants'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const columns = [
    { id: 'profession', label: 'Profession', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'cnic', label: 'CNIC', minWidth: 100 },
    { id: 'timing', label: 'Date', minWidth: 100 },
    { id: 'additional_info', label: 'Additional Information', minWidth: 100 },
  ];


  const useStyles = makeStyles({
    root: {
      width: '95%',
      marginLeft: "2.5%"
    },
    container: {
      maxHeight: 440,
    },
  });

export default function Regulars() {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };


    const [profession,setProfession] = useState(null)
    const [name, setName] = useState(null)
    const [cnic,setCnic] = useState(null)
    const [addInfo,setAddInfo] = useState(null)

    const [dataState, setDataState] = useState({
        "profession" : {"checked":false,"value":""},
        "cnic" : {"checked":false,"value":""},
        "From" : {"checked":false,"value":""},
        "To" : {"checked":false,"value":""}
    })

    const handleTextField = (value,key) => {
        setDataState({
            ...dataState,
            [key] : {...dataState[key],"value":value}
        })
    }

    const handleCheckBox = (checked,key) => {
        setDataState({
            ...dataState,
            [key] : {...dataState[key],"checked":checked}
        })

    }

    const clickHandler = () => {
        axios.post("http://"+SERVER_IP+":5000/regular", {
            "profession":profession,
            "name":name,
            "cnic":cnic,
            "date":moment().format().slice(0,-6),
            "additional_info":addInfo
          }).then(res => {
            alert("Successfully inserted");
        }).catch(err => {
            alert("Data Insertion failed! Please try again.");
        })        
    }

    const filterHandler = () => {
        let data = {}
        for (const [key,value] of Object.entries(dataState)){
            if (value.checked === true)
            {
                data = {
                    ...data,
                    [key]:value.value
                }
            }
        }
        console.log(data)
        axios.get("http://"+SERVER_IP+":5000/regular", {
            params: {
                ...data
            }
        }).then(res => {
            console.log(res.data.result)
            setRows(res.data.result)
            // setResult(res.data.result)
        }).catch(err => {
            // setisLoading(false)
            alert("Query failed! Please try again.");
        });
    }

    const handleDownload = () => {
        // the user can cause more than one child window so I give storage a unique id.
        var parms = JSON.stringify(rows);
        var storageId = "parms" + String(Date.now());
        sessionStorage.setItem(storageId, parms);
        window.open('/generatepdf' + "?sid=" + storageId);
        sessionStorage.removeItem(storageId)
    }


    return(
        <>
        <div className="maincontainer4" >
            <h1>Enter Regular Visitors</h1>
            <div>
                <div class="form-cont">
                    <div class="fields">
                    <label for="profession" class="form-label"><b>Profession</b></label>
                    <input 
                        type="text" 
                        style = {{width:"16rem"}}
                        onChange={e=>setProfession(e.target.value)} 
                        class="form-control" 
                        placeholder="Enter Profession Here"/>
                    </div>
                    <div class="fields">
                    <label for="Name" class="form-label"><b>Name</b></label>
                    <input 
                        style = {{width:"16rem"}}
                        type="text" 
                        onChange={e=>setName(e.target.value)} 
                        class="form-control" 
                        placeholder="Enter Name Here"/>
                    </div>
                    <div class="fields">
                    <label for="cnic" class="form-label"><b>CNIC</b></label>
                    <InputMask 
                        mask="99999-9999999-9" 
                        className="form-control" 
                        maskChar={null}  
                        style = {{width:"16rem"}}
                        onChange={(e)=>{setCnic(e.target.value)}}  
                        placeholder="Enter CNIC Here"/>
                    </div>
                </div>
                <div class="text-area">
                    <label for="Additional_info" class="form-label"><b>Additional Information</b></label>
                    <textarea class="form-control" rows="3" onChange={(e)=>{setAddInfo(e.target.value)}}></textarea>
                </div>
            </div>
            <div >
                <button 
                style= {{
                    // flex: "content",
                    marginRight: "180px",
                    marginTop:"-60px", 
                    float: "right",
                    width:"150px",
                    height:"50px", 
                    fontSize:"25px",
                    borderRadius:"25px",
                    backgroundColor: "darkblue",
                    }} 
                    onClick={clickHandler} 
                    type="submit" 
                    class="btn btn-primary">
                    Submit
                </button>
            </div>

            <h1 style={{paddingTop:"90px"}}>Search Regular Visitors</h1>
            <div className="search-wrapper" >
                <div>
                    <div class="input-group mb-3" style={{width:"27rem"}}>
                    <div class="input-group-text" style={{borderRadius:"15px 0px 0px 15px"}}>
                        <input class="form-check-input mt-0" onChange={(e)=>{handleCheckBox(e.target.checked,"profession")}} type="checkbox" value="" aria-label="Checkbox for following text input" />
                    </div>
                        <input type="text" class="form-control" onChange={(e)=>{handleTextField(e.target.value,"profession")}} aria-label="Text input with checkbox" placeholder="Profession"/>
                    </div>
                </div>
                <div>
                    <div class="input-group mb-3" style={{width:"27rem"}}>
                    <div class="input-group-text" style={{borderRadius:"15px 0px 0px 15px"}}>
                        <input class="form-check-input mt-0" onChange={(e)=>{handleCheckBox(e.target.checked,"cnic")}} type="checkbox" value="" aria-label="Checkbox for following text input" />
                    </div>
                        <InputMask 
                        mask="99999-9999999-9" 
                        className="form-control" 
                        maskChar={null}  
                        onChange={(e)=>{handleTextField(e.target.value,"cnic")}}
                        placeholder="CNIC"/>
                    </div>
                </div>
                <div>
                    <div class="input-group mb-3" style={{width:"27rem"}}>
                        <p style={{color:"white", width:"45px",fontSize:"17px"}}>From:</p>
                    <div class="input-group-text" style={{borderRadius:"15px 0px 0px 15px"}}>
                        <input class="form-check-input mt-0" onChange={(e)=>{handleCheckBox(e.target.checked,"From")}} type="checkbox" value="" aria-label="Checkbox for following text input" />
                    </div>
                        <input type="date" class="form-control" onChange={(e)=>{handleTextField(e.target.value,"From")}} />
                    </div>
                </div>
                <div>
                    <div class="input-group mb-3" style={{width:"27rem"}}>
                        <p style={{color:"white", width:"45px", fontSize:"17px"}}>To:</p>
                    <div class="input-group-text" style={{borderRadius:"15px 0px 0px 15px"}}>
                        <input class="form-check-input mt-0" onChange={(e)=>{handleCheckBox(e.target.checked,"To")}} type="checkbox" value="" aria-label="Checkbox for following text input" />
                    </div>
                        <input type="date" class="form-control" onChange={(e)=>{handleTextField(e.target.value,"To")}}  />
                    </div>
                </div>
            </div>
            <div>
                <button 
                style= {{
                    // flex: "content",
                    marginRight: "180px",
                    marginTop:"-50px", 
                    float: "right",
                    width:"150px",
                    height:"50px", 
                    fontSize:"25px",
                    borderRadius:"25px",
                    backgroundColor: "darkblue",
                    }} 
                    onClick={filterHandler} 
                    type="submit" 
                    class="btn btn-primary">
                    Search
                </button>
            </div>
            
            <div class="table1" >
            {rows?<><Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                if (column.id === "timing") {
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            {value.map((date)=>{
                                                return(
                                                    <p>{date}</p>
                                                )
                                            })}
                                        </TableCell>
                                        );
                                }
                                else {
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                        );
                                }
                                
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div>
            <button onClick={()=>{handleDownload()}} class="generate">Generate Pdf</button>
        </div></>:null}
            
            </div>



        </div>
        </>
    )
}

