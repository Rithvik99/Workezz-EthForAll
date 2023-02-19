import React, { Component } from 'react'
import './categoryButtons.css'
import 'bootstrap/dist/css/bootstrap.min.css';


class CategoryButtons extends Component {
constructor(props) {
super(props);
this.state = {
categories: ["Graphics & design", "Digital Marketing", "Music & audio", "Video & animations", "Programming and tech", 
            "Business", "Writing and translation", "Lifestyle"],
selectedCategories: []
}
}

handleClick = (e) => {
    const { selectedCategories } = this.state;

    if (selectedCategories.indexOf(e.target.value) === -1) {
        selectedCategories.push(e.target.value);
    } else {
        let index = selectedCategories.indexOf(e.target.value);
        selectedCategories.splice(index, 1);
    }

    this.setState({ selectedCategories });
    this.props.update(selectedCategories);
    // console.log(selectedCategories);
}

render() {
    const { categories, selectedCategories } = this.state;

    return (
        <div>
        <div>
            <label>Interests</label>
            </div>
        <div className='row'>
            
            <div className='row d-flex align-items-center justify-content-center'>
            {categories.map((category, index) => {
                return (
                    <div className="col-4 my-1">
                    
                        <div key={index} style = {{fontSize:"60%"}} >
                            <button 
                                style={{width: '115%',
                                    margin: '4%',borderWidth:'0.1px',background:'none'}}
                                className={selectedCategories.indexOf(category) !== -1 ? "selected" : ""}
                                value={category} 
                                onClick={this.handleClick}>
                                {category}
                            </button>
                        </div>
                    </div>
                    
                )
            })}
            </div>
        </div>
        </div>
    )
}

}

export default CategoryButtons
