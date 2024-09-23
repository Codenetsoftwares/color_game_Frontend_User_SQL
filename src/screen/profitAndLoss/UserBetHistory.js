import React from 'react'

const UserBetHistory = ({ data, SetComponent }) => {
    return (
        <div className="card w-100 rounded">
            <div
                className="card-heade text-white p-1 d-flex justify-content-between"
                style={{ backgroundColor: "#2CB3D1" }}
            >
                <b>&nbsp;&nbsp;Bet History</b>
                <span
                    style={{ cursor: "pointer" }}
                    title="Back"
                    onClick={() => {
                        SetComponent("ProfitAndLossRunner");
                    }}
                >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                </span>
            </div>
            <div className="m-1 d-flex justify-content-end align-items-end">

                <input
                    type="search"
                    className="form-control w-auto"
                    placeholder="Search..."

                />
            </div>

            <ul className="list-group list-group-flush" style={{ overflowX: "auto" }}>
                <li className="list-group-item">
                    <div className="QA_section">
                        <div className="QA_table mb_30" style={{ overflowX: "auto" }}>
                            <table className="table lms_table_active3 table-bordered">
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: "#e6e9ed",
                                            color: "#5562a3",
                                        }}
                                        align="center"
                                    >
                                        <th scope="col">
                                            <b>Sport Name</b>
                                        </th>
                                        <th scope="col">
                                            <b>Event Name</b>
                                        </th>
                                        <th scope="col">
                                            <b>Market Name</b>
                                        </th>
                                        <th scope="col">
                                            <b>Selection Name</b>
                                        </th>
                                        <th scope="col">
                                            <b>Bet Type</b>
                                        </th>
                                        <th scope="col">
                                            <b>User Price</b>
                                        </th>
                                        <th scope="col">
                                            <b>Amount</b>
                                        </th>
                                        <th scope="col">
                                            <b>Profit/Loss</b>
                                        </th>
                                        <th scope="col">
                                            <b>Place Date</b>
                                        </th>
                                        <th scope="col">
                                            <b>Match Date</b>
                                        </th>
                                    </tr>
                                    {data?.data?.length > 0 ? (
                                        data?.data?.map((data, index) => (
                                            <tr key={index} align="center">
                                                <td>{data?.gameName}</td>
                                                <td
                                                    className="text-primary fw-bold"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        handelGotoRunnerWiseProfitLoss(
                                                            data.marketId,
                                                            "ProfitAndLossRunner"
                                                        );
                                                    }}
                                                >
                                                    {data?.marketName}
                                                </td>
                                                <td>{data?.commission || 0}</td>
                                                <td
                                                    className={`fw-bold ${data?.totalProfitLoss > 0
                                                        ? "text-success"
                                                        : "text-danger"
                                                        }`}
                                                >
                                                    {data?.totalProfitLoss}
                                                </td>
                                                <td
                                                    className={`fw-bold ${data?.totalProfitLoss > 0
                                                        ? "text-success"
                                                        : "text-danger"
                                                        }`}
                                                >
                                                    {data?.totalProfitLoss}
                                                </td>
                                                <td>{data?.gameName}</td>
                                                <td>{data?.gameName}</td>
                                                <td>{data?.gameName}</td>
                                                <td>{data?.gameName}</td>
                                                <td>{data?.gameName}</td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr align="center">
                                            <td colspan="10">
                                                <div
                                                    class="alert alert-info fw-bold"
                                                    role="alert"
                                                >
                                                    No Data Found !!
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </thead>
                            </table>
                        </div>
                    </div>
                </li>

            </ul>
        </div>
    )
}

export default UserBetHistory