import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);

    const [cost, setCost] = useState(0);        // 사용자 입력 금액
    const [count, setCount] = useState(0);      // 구매할 코인 개수 

    const onChangeCost = (event) => {
        setCost(event.target.value);        
    }

    const onChangeCount = (event) => {
        setCount(event.target.value);        
    }

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setCoins(json);
            setLoading(false);
        });        
    }, []);
    
    useEffect(() => {
        console.log(cost);
    }, [cost]);

    useEffect(() => {
        console.log(count);
    }, [count]);


    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
            {loading ? <strong>Loading...</strong> 
            : (
            <div>
                <hr />
                <div>
                    <span>금액 </span>                    
                    <input 
                        value={cost}
                        type={"number"} 
                        placeholder="금액(원)"
                        onChange={onChangeCost}
                    />
                <div>
                    <span>개수 </span>                    
                    <input 
                        value={count}
                        type={"number"} 
                        placeholder="개수"
                        onChange={onChangeCount}
                    />                
                </div>                    
                </div>
                <hr />
                <span>총 ${cost*0.00080*count}</span>                
                <hr />
                <select>
                    {coins.map((item) => 
                    <option key={item.id}>
                        {item.name}({item.symbol}) : ${item.quotes.USD.price} USD
                    </option>)}
                </select>  
            </div>
            )}            
                        
        </div>
    );
}

export default App;