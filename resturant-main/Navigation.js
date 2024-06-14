import React from 'react'
import {Navbar,NavbarBrand} from 'reactstrap'

const Navigation =()=> {
    return(
        <div>
            <Navbar dark color="warning">
            <div className="container">
                <NavbarBrand href='/'>TopChef</NavbarBrand>
            </div>
            </Navbar>
            
        </div>

    )
}

export default Navigation;