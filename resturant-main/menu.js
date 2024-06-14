import React, { Component } from 'react'
import DISHES from '../../Data/dishes'
import MenuItem from './menuitem'
import DishDetail from './dishdetail'

class Menu extends Component {

    state = {
        dishes: DISHES,
        selectedDish: null
    }

    OnDishSelect = dish => {
        this.setState({ selectedDish: dish });
        //console.log('colicl')
    }



    render() {
        const menu = this.state.dishes.map(item => {
            return (
                <MenuItem dish={item}
                    key={item.id}
                    DishSelect={()=> {
                        return this.OnDishSelect(item)
                    }} />
            );
        }
        )
            ;

        let dishDetail = null;
        if (this.state.selectedDish != null) {
            dishDetail = <DishDetail dish ={this.state.selectedDish} />
            //console.log(dishDetail)
        }


        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        {menu}
                    </div>
                    <div className='col-6'>
                    {dishDetail}
                    </div>

                </div>

            </div>
        )
    }
}

export default Menu;