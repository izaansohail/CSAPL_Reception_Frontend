import React from 'react'
import { useHistory } from 'react-router-dom';

const Navbar = () => {

    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Reception</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/entry">Entry</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/exit">Exit</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/search">Search</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/regulars">Regulars</a>
                </li>
                {/* <li class="nav-item">
                <a class="nav-link" href="/services">
                    Report Generation
                </a>
                </li> */}
                </ul>
                <a classname="logout-btn" style={{backgroundColor:"#212529",color:"rgba(255,255,255,.55)",paddingRight:"30px"}} href="/" onClick={()=>sessionStorage.clear()}>Logout</a>
            </div>
        </div>
        </nav>

            </>
    )
}

export default Navbar