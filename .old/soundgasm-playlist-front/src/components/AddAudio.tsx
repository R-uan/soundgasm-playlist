import Audio from "./Audio";
import { useRef } from "react";
import IAudio from "../scripts/IAudio";
import { GetAudioInfo } from "../scripts/GetAudioInfo";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";

export default function AddAudio() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { currIndex, setCurrIndex } = useCurrentAudioContext();
    const { audioList, setAudioList } = useAudioListContext();

    async function AddAudio() {
        const input = inputRef.current
        if(input) { 
            const inputValue = input.value;
            if(!inputValue) return;
            input.value = "";
            try {
                const newAudioData: IAudio = await GetAudioInfo(inputValue);
                if(newAudioData == null) return;
                setAudioList((old) => [...old, newAudioData])
            } catch (error) { 
                console.log(`Unexpected Error: ${error}`) 
            };

            if(currIndex == -1) setCurrIndex(0);
        }
    }

    return ( 
        <div className="gap-2 m-5 mt-0 w-[685px] h-[660px] overflow-auto">
            <div className="flex sticky top-0 z-50 h-8 bg-[#15181D]"> 
                <input ref={inputRef} type="text" name="audio_link" className="w-full rounded h-[24px] pl-1 bg-[#0f1114]" />
                <button onClick={AddAudio} className="bg-[#0f1114] h-[24px] w-[58px] ml-1 rounded">Add</button>
            </div>
            <div className="flex flex-col gap-2 mt-2 bottom-0">
            { audioList!.map((audio, index) => (<Audio key={index} index={index} data={audio} />)) }   
            </div> 
        </div>
        
    )
}