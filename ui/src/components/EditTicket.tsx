import React, {useEffect, useState} from 'react'
import { IStatus, ITicket } from '../types';

export default function EditTicket() {

    const [loader, setLoader] = useState(true);
    const [statusList, setStatusList] = useState<IStatus[]>([]);
    const [status, setStatus] = useState<IStatus>({status:"",id:""} as IStatus);

    const [prevStatus, setPrevStatus] = useState<IStatus>({status:"",id:""} as IStatus);
    const [nextStatus, setNextStatus] = useState<IStatus>({status:"",id:""} as IStatus);

    const onSubmit = () => {
       fetch("/api/update-ticket", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: window?.location?.pathname?.split('/tickets/')[1], status: status.id})
      }).then(response => response.json())
        .then(data => {
            console.log('Data updated',data);
            window.location.reload();
        })
};

    const handleChange = (value:string) => {
        let currentStatus = statusList.find((e)=>Number(e.id) === Number(value))
        if(currentStatus){
            setStatus(currentStatus);
        }
    }
    

    useEffect(() => {
        //Get all status
        
        const p1 = new Promise((resolve, reject) => {
            fetch("/api/get-status")
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
        });

        //Get all tickets
        const p2 = new Promise((resolve, reject) => {
            fetch(`/api/get-ticket/${window?.location?.pathname?.split('/tickets/')[1]}`)
            .then(response => response.json())
            .then(data => {                
                resolve(data);
            })
        });
     
        Promise.all([p1, p2]).then(function(values:any) {
            if(values[0] !== null && values[1] !== null)
            {
                let statusList:IStatus[] = values[0];
                let status:ITicket = values[1];
                
                const STATUS = statusList.find((e)=>Number(e.id)===Number(status.status));
                if(STATUS){
                    const prevStatus = statusList.find((e)=>Number(e.id) === Number(STATUS.prev))
                    const nextStatus = statusList.find((e)=>Number(e.id) === Number(STATUS.next))
        
                    if(prevStatus) setPrevStatus(prevStatus);
                    if(nextStatus) setNextStatus(nextStatus);
        
                    setStatusList(statusList);
                    setStatus(STATUS);
                }
            }
            setLoader(false);
        });

        
    },[])

    return(
        <div className="container">
            <div className="header">
                <h1>
                Ticket {window?.location?.pathname?.split('/tickets/')[1]}
                </h1>
            </div>
            {loader && <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>}
            {status.id !== "" && <div className="row">
                <div className="col-md-12 mrgnbtm">
                    <div className="row mrgnbtm">
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1">Status:</label>
                            <select className="form-control" value={status.id} onChange={e => handleChange(e.target.value)}>
                                <option value={status.id}>{status.status}</option>
                                <option value={prevStatus.id}>{prevStatus.status}</option>
                                <option value={nextStatus.id}>{nextStatus.status}</option>
                            </select>
                        </div>
                    </div>
                    <input type="button" onClick={()=>onSubmit()} className="btn btn-danger mrgnbtm" value="Submit"/>
                </div>  
            </div>}
            {loader === false && status.id === "" && <div>Ticket not found.</div>}
        </div>
    )
}