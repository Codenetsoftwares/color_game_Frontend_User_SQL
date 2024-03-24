import { useEffect, useState } from "react"
import { user_getAllGamesWithMarketData_api, user_getGameWithMarketData_api } from "../../../utils/apiService";
import { getGameWithMarketDataInitialState } from "../../../utils/getInitiateState";
import { useLocation } from "react-router-dom";

function GameWithMarketList({ isSingleMarket }) {
    const [user_allGamesWithMarketData, setUser_allGamesWithMarketData] = useState([]);
    const [user_gameWithMarketData, setUser_gameWithMarketData] = useState(getGameWithMarketDataInitialState());

    const gameIdFromUrl = useLocation().pathname.split('/')[3]

    useEffect(() => {
        if (isSingleMarket) {
            user_getGameWithMarketData()
        } else {
            user_getAllGamesWithMarketData();
        }
    }, []);

    async function user_getAllGamesWithMarketData() {
        const response = await user_getAllGamesWithMarketData_api();
        if (response) {
            setUser_allGamesWithMarketData(response.data);
        }
    }

    async function user_getGameWithMarketData() {
        const response = await user_getGameWithMarketData_api({ gameId: gameIdFromUrl });
        if (response) {
            setUser_gameWithMarketData(response.data);
        }
    }

    function getSingleMarket() {
        return (
            <div className="row p-0 m-0">
                <div className="col-12 p-1 mt-2" style={{ backgroundColor: '#a1aed4' }}>{user_gameWithMarketData.gameName}</div>
                {user_gameWithMarketData &&
                    user_gameWithMarketData.markets.map((marketData) => {
                        return <div className="row py-1 px-0 m-0 border">
                            <div className="col-4">
                                <span>{marketData.timeSpan}</span> | <span> {marketData.marketName}</span>
                            </div>
                            <div className="col-8" style={{ backgroundColor: 'orange' }}>
                                col-8
                            </div>
                        </div>
                    })}
            </div>
        )
    }

    function getWholeMarket() {
        return (
            <div className="row p-0 m-0">
                {user_allGamesWithMarketData &&
                    user_allGamesWithMarketData.map((gameWithMarketData) => {
                        return <>
                            <div className="col-12 p-1 mt-2" style={{ backgroundColor: '#a1aed4' }}>{gameWithMarketData.gameName}</div>
                            {gameWithMarketData &&
                                gameWithMarketData.markets.map((marketData) => {
                                    return <div className="row py-1 px-0 m-0 border">
                                        <div className="col-4">
                                            <span>{marketData.timeSpan}</span> | <span> {marketData.marketName}</span>
                                        </div>
                                        <div className="col-8" style={{ backgroundColor: 'orange' }}>
                                            col-8
                                        </div>
                                    </div>
                                })}
                            <a
                                className={`col-12 text-dark text-decoration-none text-nowrap`}
                                href={`/gameView/${gameWithMarketData?.gameName?.replace(/\s/g, '')}/${gameWithMarketData?.gameId}`}
                                style={{ textAlign: 'right' }}
                            >
                                View more
                            </a>
                        </>
                    })
                }
            </div>
        )
    }

    function getBody() {
        return (
            isSingleMarket ? getSingleMarket() : getWholeMarket()
        )
    }

    return getBody()
}

export default GameWithMarketList