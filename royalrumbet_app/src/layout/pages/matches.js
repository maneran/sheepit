import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";

import TableGen from '../../components/table_gen'
import dummyData2 from '../../dummyData/dummy_matches'
import styles from './../../styles/tornament.module.css'

const cols = { teamA: 'Team A',
               teamB: 'Team B',
               dateStart: 'Start Fate',
               scoreTeanA: 'Team A Score',
               betTeanA: 'Bet A',
               scoreTeanB: 'Team B Score',
               betTeanB: 'Bet B',
               score: 'Score',
             }

const rows = dummyData2

class Matches extends Component {

    constructor(props) {
        super(props);
        this.state = { tornaId : this.props.location.state.id ? this.props.location.state.id : this.props.location.state.torNames,
                        activeMatch: null };
    }

    totalScore = () => {
        /*
            should be called form the total score per player table 
        */
       const item_values = rows.tordata[this.state.tornaId]
       let listhis = [];
       let $totalscore = 0;
       if (Array.isArray(item_values)) {
            listhis = item_values;
       }
       else {
            listhis = [item_values];
       }
       listhis.map((item,idx)=> {
            return $totalscore += Number(item.score)
        })
        return $totalscore
    }

    render() {

        const torNames = this.state.tornaId 
        console.log(this.props)
        return (
            <Fragment>
                <h2>
                    <Link to={{pathname: `players`, state: {torNames: torNames}}}>Players Rank</Link>
                    Matches Page
                    <Link to={{pathname: `match`, state: {torNames: torNames , activematch: null, 
                                                          matches: dummyData2.tordata[torNames]}}}>Match Page</Link>
                </h2>  
                <br/>
                <div className={styles.tornament_container}>
                    <h3>Total score: {this.totalScore()}</h3>
                    <TableGen data={{columns: cols ,
                                     rows: {[torNames]: rows.tordata[torNames]},
                                     linkto: 'match'}}/>
                </div> 
            </Fragment>
        )
    }
}

export default Matches


