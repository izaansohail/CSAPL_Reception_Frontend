import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { SERVER_IP } from './constants'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import Popup from './utils/Popup';
import StringMask from 'string-mask'
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Search.css"


const useStyles = makeStyles({
    table: {
      minWidth: 300,
      
    },
    container:{
        maxWidth: 350,
        width: 350,
    },
    row: {
        // maxHeight: "12vh"
        padding: 0,
        height: "1rem"
    },
    rowHeading: {
        // maxHeight: "12vh"
        padding: 12
    },
    root: {
        width: '95%',
        marginLeft: "2.5%"
      },
      container1: {
        maxHeight: 440,
      },
  });


  const useStyles1 = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
  }));
  
  function createData(checkbox, key, value) {
    return { checkbox, key, value};
  }
  
  const rows = [
    createData('', "name","" ),
    createData('', "cnic",""),
    // createData('', "Person_Count",""),
    createData('', "organization_name",""),
    // createData('', "contact",""),
    createData('', "From",""),
    createData('', "To",""),
    // createData('', "Contact_Person",""),
    // createData('', "Visit_Purpose",""),
    createData('', "Non_Checked_Out","")
  ];

const Search = () => {

    const classes1 = useStyles1();

    const [dataState, setDataState] = useState({
        "name" : {"checked":false,"value":""},
        "cnic" : {"checked":false,"value":""},
        // "Person_Count" : {"checked":false,"value":""},
        "organization_name" : {"checked":false,"value":""},
        // "contact" : {"checked":false,"value":""},
        "From" : {"checked":false,"value":""},
        "To" : {"checked":false,"value":""},
        // "Contact_Person" : {"checked":false,"value":""},
        // "Visit_Purpose" : {"checked":false,"value":""},
        "Non_Checked_Out" : {"checked":false,"value":""}
    })

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows1, setRows1] = useState(null);
    const [isLoading, setisLoading] = useState(false)

    const messagesEndRef = useRef(null)

    

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

     



    const handleCheckBox = (checked,key) => {
        setDataState({
            ...dataState,
            [key] : {...dataState[key],"checked":checked}
        })

    }


    const handleTextField = (value,key) => {
        setDataState({
            ...dataState,
            [key] : {...dataState[key],"value":value}
        })
    }

    const submitFilter = () => {
        scrollToBottom()
        setisLoading(true)
        var formatter = new StringMask("00000-0000000-0");
        let data = {}
        for (const [key,value] of Object.entries(dataState)){
            if (value.checked === true)
            {
                if(key==="cnic")
                {
                    data = {
                        ...data,
                        [key]: formatter.apply(value.value)
                    }
                }
                else if(key === "Non_Checked_Out")
                {
                    data = {
                        ...data,
                        [key]: value.checked
                    }
                }
                else
                {
                    data = {
                        ...data,
                        [key]:value.value
                    }
                }
                
            }
        }
        console.log(data)
        axios.get("http://"+SERVER_IP+":5000/search_screen", {
            params: {
                ...data
            }
        }).then(res => {
            setRows1(res.data.result)
            // setResult(res.data.result)
        }).catch(err => {
            setisLoading(false)
            alert("Query failed! Please try again.");
        });
    }
    useEffect(() => {
        scrollToBottom()
        setisLoading(false)
      }, [rows1]);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'cnic', label: 'CNIC', minWidth: 100 },
        { id: 'Person_Count', label: 'Person\u00a0Count', minWidth: 100 },
        { id: 'organization_name', label: 'Organization\u00a0Name', minWidth: 100 },
        { id: 'contact', label: 'Contact', minWidth: 100 },
        { id: 'Check_In_Date', label: 'Check\u00a0In\u00a0Date\u00a0and\u00a0Time', minWidth: 100 },
        { id: 'Check_Out_Date', label: 'Check\u00a0Out\u00a0Date\u00a0and\u00a0Time', minWidth: 100 },
        { id: 'Contact_Person', label: 'Contact Person', minWidth: 100 },
        { id: 'Visit_Purpose', label: 'Visit Purpose', minWidth: 100 },
        { id: 'picture', label: 'Image', minWidth: 100 },
      ];


    const handleDownload = () => {
        // the user can cause more than one child window so I give storage a unique id.
        var parms = JSON.stringify(rows1);
        var storageId = "parms" + String(Date.now());
        sessionStorage.setItem(storageId, parms);
        window.open('/generatepdf' + "?sid=" + storageId);
        sessionStorage.removeItem(storageId)
    }

    return(
        // result?<ShowResult results={result} />:
        <>
        <div className="maincontainer2">
            <h1>Search</h1>

        <div className="contain">

            <div className="filter">
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} aria-label="caption table">
                <caption><button class="btnCap" onClick={submitFilter}>Submit</button></caption>
                    <TableHead>
                    <TableRow>
                        <TableCell className={classes.rowHeading}>&nbsp;</TableCell>
                        <TableCell className={classes.rowHeading} align="center"><h5>Keys</h5></TableCell>
                        {/* <TableCell className={classes.row} align="center">value</TableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => {
                        if(row.key === "cnic") {
                            return(
                            <TableRow key={row.name}>
                            <TableCell className={classes.row} align="right">
                                <Checkbox
                                defaultChecked= {false}
                                color="default"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                onChange={(e)=>{handleCheckBox(e.target.checked,row.key)}}
                            />
                            </TableCell>
                            <TableCell className={classes.row} align="center">
                                <TextField id="standard-basic" value={dataState.cnic.value} label={row.key + "(xxxxxxxxxxxxx)"} onChange={(e)=>{handleTextField(e.target.value,row.key)} }/>
                                {/* <InputMask mask="99999-9999999-9" className="standard-basic" id="cnic" maskChar={null}  onChange={(e)=>{handleTextField(e.target.value,row.key)}}  placeholder="cnic"/> */}
                            </TableCell>
                            </TableRow>
                            )
                        }
                        else if(row.key === "From" ) {
                            return(
                                <TableRow key={row.name}>
                                <TableCell className={classes.row} align="right">
                                    <Checkbox
                                    defaultChecked= {false}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    onChange={(e)=>{handleCheckBox(e.target.checked,row.key)}}
                                />
                                </TableCell>
                                <TableCell className={classes.row} align="center">
                                    {/* <TextField id="standard-basic" label={row.key} onChange={(e)=>{handleTextField(e.target.value,row.key)} }/> */}
                                    <div 
                                        style={{display:'flex',alignItems:'baseline',justifyContent:'space-evenly',marginLeft:'20px'}}
                                    >
                                        <p style={{margin:"0px"}}>
                                            From:
                                        </p>
                                        <input style={{marginRight:"11px"}} type="date"  class="standard-basic" id="Check-In" name="Check-In" onChange={(e)=>{handleTextField(e.target.value,row.key)} } placeholder="Enter Your Check-In Date Here" />
                                    </div>
                                </TableCell>
                                </TableRow>
                            )
                        }
                        else if( row.key === "To") {
                            return(
                                <TableRow key={row.name}>
                                <TableCell className={classes.row} align="right">
                                    <Checkbox
                                    defaultChecked= {false}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    onChange={(e)=>{handleCheckBox(e.target.checked,row.key)}}
                                />
                                </TableCell>
                                <TableCell className={classes.row} align="center">
                                    {/* <TextField id="standard-basic" label={row.key} onChange={(e)=>{handleTextField(e.target.value,row.key)} }/> */}
                                    <div 
                                        style={{display:'flex',alignItems:'baseline',justifyContent:'space-evenly',marginLeft:'10px'}}
                                    >
                                        <p style={{margin:"0px"}}>
                                            To:
                                        </p>
                                        <input type="date"  class="standard-basic" id="Check-In" name="Check-In" onChange={(e)=>{handleTextField(e.target.value,row.key)} } placeholder="Enter Your Check-In Date Here" />
                                    </div>
                                </TableCell>
                                </TableRow>
                            )
                        }
                        else if(row.key === "Non_Checked_Out") {
                            let name= "Non checked out"
                            return(
                                <TableRow key={row.name}>
                                <TableCell className={classes.row} align="right">
                                    <Checkbox
                                    defaultChecked= {false}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    onChange={(e)=>{handleCheckBox(e.target.checked,row.key)}}
                                />
                                </TableCell>
                                <TableCell className={classes.row} align="center">
                                    {/* <TextField id="standard-basic" label={row.key} /> */}
                                    <p style={{fontSize:"20px",paddingRight:"50px"}}>{name}</p>
                                </TableCell>
                                </TableRow>
                            )
                        }
                        else{
                            return(
                                <TableRow key={row.name}>
                                <TableCell className={classes.row} align="right">
                                    <Checkbox
                                    defaultChecked= {false}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    onChange={(e)=>{handleCheckBox(e.target.checked,row.key)}}
                                />
                                </TableCell>
                                <TableCell className={classes.row} align="center">
                                    <TextField id="standard-basic" label={row.key} onChange={(e)=>{handleTextField(e.target.value,row.key)} }/>
                                </TableCell>
                                </TableRow>
                            )
                        }
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
                </div>

        </div>









                    <br/><br/><br/>






                <div className="table">
                    {isLoading===false?rows1?<><Paper className={classes.root}>
                    <TableContainer className={classes.container1}>
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
                            {rows1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    if (column.id === "picture"){
                                        return(<TableCell key={column.id} align={column.align}>
                                            
                                            <Popup image={value}></Popup>
                                            {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                        </TableCell>)
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
                        count={rows1.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                
                <div>
                    <button onClick={()=>{handleDownload()}} class="generate">Generate Pdf</button>
                </div>
                </>
                :null:<div className={classes1.root}><CircularProgress color="secondary" style={{color:'white', width:"60px",height:"60px"}} /></div>}
                </div>


                
                <div ref={messagesEndRef} />

        </div>
        
        </>
    )
}

// ReactPDF.render(<DocDownload />, `./example.pdf`);

export default Search