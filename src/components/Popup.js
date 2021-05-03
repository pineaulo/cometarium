//import React, { useState, useEffect } from "react";
import './Popup.css'

const header = ['Date', 'Distance']

function Popup(props) {
    const title = (!props.data[props.selected])?'Chargement...':`Passages de ${props.data[props.selected].name}`;
    const tbody = ( props.selected && props.data[props.selected] ) ? props.data[props.selected].close_approach_data.map(d=>
        <tr key={d.epoch_date_close_approach}>
            <td>{new Date(d.epoch_date_close_approach).toLocaleString()}</td>
            <td>{d.miss_distance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} LD</td>
        </tr>
    ) : <tr/>;
    
    const thead = header.map((h, i) => 
        <th key={i}>{h}</th>
    )

    return (
        <>{props.selected && 
            <div className="popup-container">
                <div className='cross' onClick={props.close}>Fermer</div>
                <div className="tableWrap">
                    <table>
                        <caption>{title}</caption>
                        <thead>
                            <tr>{thead}</tr>
                        </thead>
                        <tbody>
                            {tbody}
                        </tbody>
                    </table>
                </div>
            </div>
        }</>
    );
}
    
    export default Popup;
    