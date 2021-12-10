import React from 'react'
import Header from '../Header/Header'
import "./Stationaries.scss"
import SectionCard from '../UiKits/SectionCard'
import stationaries from '../Assets/stationaries.json'

const Stationaries = ({history}) => {
    let entries  = Object.entries(stationaries)
    return (
        <div>
            <Header />
            <div className="sectioncard">
        <div className="row">
            {
                    entries.map(e=>(
                    <SectionCard key={e[0]} history={history} name={e[0]} value={e[1]} />
                    ))

            }
               </div>
        </div>
        </div>
    );
}

export default Stationaries;