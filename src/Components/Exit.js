import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from './constants'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './Exit.css'
import Popup from './utils/Popup';


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'cnic', label: 'CNIC', minWidth: 100 },
    { id: 'Check_In_Date', label: 'Check\u00a0In\u00a0Date\u00a0and\u00a0Time', minWidth: 100 },
    { id: 'picture', label: 'Image', minWidth: 100 },
    { id: 'checkout', label: 'Checkout', minWidth: 100 },
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

const Exit = () => {
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


      const handleCheckout = (row) => {
        axios.post("http://"+SERVER_IP+":5000/checkout_screen", {
            body: {
                Check_In_Date: row.Check_In_Date,
                Check_Out_Date: moment().format().slice(0,-6),
                cnic: row.cnic,
            }
        }).then(res => {
            alert("Successfully Checked Out")
            window.location.reload(false)
            
        }).catch(err => {
            alert("Failed to checkout! Please try again.");
        });
      }

    useEffect(()=>{
        axios.get("http://"+SERVER_IP+":5000/checkout_screen", {
            params: {
                date: moment().format().slice(0,-15),
            }
        }).then(res => {
            setRows(res.data.result);
            
        }).catch(err => {
            alert("Data fetch Failed! ");
        });
    },[])

    return(
        <div class="maincontainer1">
            <h1>List of Remaining Visitors</h1>
            <div class="table" >
            {rows?<Paper className={classes.root}>
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
                                if (column.id === "picture"){
                                    return(<TableCell key={column.id} align={column.align}>
                                        
                                        <Popup image={value}></Popup>
                                    </TableCell>)
                                }
                                else if (column.id === "checkout"){
                                    return(<TableCell key={column.id} align={column.align}>
                                        <a class="checkout" onClick={()=>handleCheckout(row)} > Checkout</a>
                                       
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
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>:null}
            
            </div>
            
            
        </div>
    )
}

export default Exit