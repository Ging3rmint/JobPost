import React from "react";

const Filter = (props) => {
    return(
        <div className={!props.visible? "not-visible filter-box": "filter-box"}>
            <ul className="filter-list">
                {props.terms && props.terms.map((term, i) => 
                    <div className="term-box" key={i}>
                        <li onClick={props.onClick} className="term" key={i}>{term}</li> 
                        <i onClick={props.onClick} className="fas fa-minus-square" ket={i}></i>
                    </div>
     
                )}
                
            </ul>
            <a href="!#" onClick={props.onClick} className="clear">Clear</a>
        </div>
    );
}

export default Filter;