import "./index.css"
import { dashboardDataTypes } from "./types";
import { dashboardData } from "./constants"

function DashboardComponent() {


    const mapDashboardData: JSX.Element[] = dashboardData.map((row) => {
        return <div className="dashboard-card-container">
            <p>{row.name}</p>
            <div style={{ display: "flex" }}>
                <p>{row.price}</p>
                {row.growth > 0 ? <p>{row.growth}</p> : <p>{row.fall}</p>}
            </div>
            <p>You made an extra {row.extra_amount} this year</p>
        </div>
    })


    return (
        <>
            <h5 className='dashboard-title'>Dashboard</h5>
            <div style={{ display: "flex", gap: "10px" }}>
                {mapDashboardData}
            </div>
        </>
    )
}

export default DashboardComponent