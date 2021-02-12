import React from 'react'
import {useState, useEffect} from 'react'
import {Bar, Doughnut, Line} from "react-chartjs-2"
import axios from 'axios'

const Contents = () => {

    const [confirmedData, setConfirmedData] = useState({})
    const [quarantinedData, setQuarantinedData] = useState({})


    useEffect(()=>{
        const fetchEvents = async () => {
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
            // console.log(res)
            makeData(res.data)
        }
        const makeData = (items) =>{
            const arr = items.reduce((acc,cur)=>{
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();
                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recovered  = cur.Recovered;

                const findItem = acc.find(a=>a.year === year && a.month === month);
                if(!findItem){
                    acc.push({
                        year: year,
                        month: month,
                        date: date,
                        confirmed: confirmed,
                        active: active,
                        death: death,
                        recovered: recovered
                    })
                }
                if(findItem && findItem.date < date){
                    findItem.active = active;
                    findItem.death = death;
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    findItem.recovered = recovered;
                    findItem.confirmed = confirmed;
                }
                //console.log(cur,year,month,date)
                return acc;
            },[])
            console.log(arr)
            const labels = arr.map(a=>`${a.month+1}월`);
            setConfirmedData({
                labels,
                datasets: [
                    {
                        label: "국내 누적 확진자",
                        backgroundColor: "salmon",
                        fill: true,
                        data: arr.map(a => a.confirmed)
                    },
                ]
            })
            

        }

        fetchEvents()
    })

    return (
        <section>
            <h2>국내 코로나 현황</h2>
            <div className ="contents">
                <div>
                    <Bar data={ confirmedData } options={
                        { title:{display: true, text: "누적 확진자 추이",fontSize: 16}},
                        { legend: {display:true, position:"bottom"}} //Chart.js -> react chart js참조
                    } />
                </div>
            </div>
        </section>
    )
}

export default Contents
