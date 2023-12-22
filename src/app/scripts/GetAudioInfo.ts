import axios, { isAxiosError } from "axios";
const api = "https://lively-queijadas-2929ef.netlify.app/api";

export async function GetAudioInfo(url: string) {
    try {
        const request = await axios.post(api, {
            link: `${url}`,
        });
        const audioData = request.data;
        return audioData;
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status == 400) {
                return null;
            } else {
                throw error;
            }
        }
    }
}
