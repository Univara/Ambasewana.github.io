import React from 'react'
import {Card, CardImg , CardImgOverlay ,CardBody , CardTitle} from 'reactstrap'

const MenuItem = props => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardImg  
                    alt={props.dish.name}
                    src={props.dish.image}
                    width ="100%"
                    style={{opacity : "0.5"}}/>
                    {/* <CardImgOverlay>
                        {props.dish.name}
                    </CardImgOverlay> */}

                    <CardTitle Style = {{cursor : "pointer"}} 
                    onClick = {props.DishSelect}>
                        {props.dish.name}</CardTitle>

                   

                </CardBody>
            </Card>
           

        </div>
    );
}

export default MenuItem;