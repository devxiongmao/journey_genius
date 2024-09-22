import { useState } from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
    const [prompt, setPrompt] = useState('');
    const [data, setData] = useState('');
    const [isPending, setIsPending ] = useState(false);
    const [receivedResponse, setReceivedResponse ] = useState(false);

    const history = useHistory();

    const handlePromptSubmit = (e) => {
        e.preventDefault();

        const promptDict = {location: prompt};
        setIsPending(true);
        fetch("http://localhost:8000/query", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(promptDict)
        }).then(res => {
            if(!res.ok){
                throw Error("Could not fetch the data for that resouce!")
            }
            return res.json();
        }).then(data => {

            setIsPending(false);
            setReceivedResponse(true);
            setData(data.response[0].text);
            history.push("/")

        }).catch((err) => {
            console.log('Error: ', err)
        })
    }

    return (
        <div className="create-itenerary-page">
            <form onSubmit={handlePromptSubmit}>
                <h2>Where are you going?</h2>
                <br />
                <label>Destination</label>
                <input
                    type="text"
                    required
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}>    
                </input>
                <br />
                <br />

                { !isPending && <button>Lets go!</button>}
                { isPending && <button disabled>Processing...</button>}
            </form>
            { setReceivedResponse && <div className="response-page">{data}</div> }
        </div>
      );
}
 
export default HomePage;