import axios from "axios";

export async function GetAudioInfo(url: string) {
    const dete = (await axios.post("http://localhost:8080/", { link: `${url}` })).data;
    return dete;
}