import React from 'react';
import { useEffect, useState } from "react";
const conf = {
    // _client_id: "cf25482b",
    _client_id: "59320324",
    _api_key: "188d6185dc588dc181d326af289fb4be",
    _secret: "6b8f1bb64f106a4f520b3bf98717e06e",
    _api_base: "https://api.jamendo.com/v3.0/"
}
function postJSON(url: string, args: any) {

    try {
        return fetch(conf._api_base + "/" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Basic " + btoa("customuser:custompassword")
            },
            body: JSON.stringify({ ...args }),
        }).then((response) => {
            if (response.status == 401) {
                return { result: false, message: "Вы не вошли в систему, пожалуйста, авторизуйтесь" }
            } else {
                return response.json();
            }
        })
            .then((data) => {
                return data;
            });
    } catch (err: any) {
        alert("Error11 " + err.toString());
        return null;
    }
}
async function getJSON(url: string) {
    return fetch(conf._api_base + "/" + url).then((data: any) => {
        try {
            console.log(data)
            const parsed = data.json();
            return parsed


        } catch (err: any) {
            alert("Error " + err.toString());
            return null;
        }
    });
}
function App() {
    useEffect(() => {
        console.log("test");
        // const url = `?method=artist.search&artist=cher&api_key=${conf._api_key}&format=json`
        //  /2.0/?method=album.gettags&artist=cher&album=believe&api_key=YOUR_API_KEY&format=json
        const url = `/artists/tracks/?client_id=${conf._client_id}&format=jsonpretty&order=track_name_desc&name=we+are+fm&album_datebetween=0000-00-00_2012-01-01`
        getJSON(url).then(data => { console.log("data==>> ", data) });
    }, [])
    const play: any = document?.getElementById('player');
    return (
        <div className="audio-player" >
            <a href={`https://api.jamendo.com/v3.0/oauth/authorize?client_id=${conf._client_id}&redirect_uri=localhost:3000`}>Регистрация</a>
            <audio id="player" controls={true}>
                <source src="https://prod-1.storage.jamendo.com/?trackid=887209&format=mp31&from=WmRCsYLJTbARcUi8F7JTdA%3D%3D%7CU1XroxuRKn%2FCUt0C1DDV4g%3D%3D" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            {/* <audio id="player" src="https://www.last.fm/music/The+Black+Seeds/_/Fire" controls={true}>

            </audio> */}

        </div >
    );
}

export default App;
