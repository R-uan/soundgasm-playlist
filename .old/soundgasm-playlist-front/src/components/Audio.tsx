import IAudio from "../scripts/IAudio"
import { Trash, Play_24, MoveUp, MoveDown } from "../assets/Media/MediaHelper";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { useEffect, useState } from "react";

export default function Audio({ data, index } : { data: IAudio, index: number }) {
    const isCurrentStyle = "flex items-center w-[685px] h-fit bg-[#343541] rounded-lg relative p-2 pl-4";
    const isNotCurrentStyle = "flex items-center w-[685px] h-fit bg-[#0f1114] rounded-lg relative p-2 pl-4"

    const { currIndex, setCurrIndex } = useCurrentAudioContext();
    const { audioList, setAudioList } = useAudioListContext();
    const [ isCurrent, setIsCurrent ] = useState(false);
    
    let { title, performer, originalUrl } = data
    title.length > 50 ? title = title.slice(0, 51) + "..." : null

    function handleClick() { setCurrIndex(index) }
    function handleDeletion() { setAudioList(audioList.filter((_, i) => i != index)); }

    useEffect(() => { 
        if(currIndex == index) setIsCurrent(true);
        else setIsCurrent(false);
    }, [currIndex])

    function handleMoveUp() {
        if(index == 0) return; 
        let audioListClone = audioList.slice();
        const temp = audioListClone[index - 1];
        audioListClone[index - 1] = audioListClone[index];
        audioListClone[index] = temp;
        if(isCurrent) setCurrIndex(index - 1);
        setAudioList(audioListClone);
    }

    function handleMoveDown() { 
        if(index == audioList.length - 1) return; 
        let audioListClone = audioList.slice();
        const temp = audioListClone[index + 1];
        audioListClone[index + 1] = audioListClone[index];
        audioListClone[index] = temp;
        if(isCurrent) setCurrIndex(index + 1);
        setAudioList(audioListClone);
    }

    return (
        <div className={isCurrent ? isCurrentStyle : isNotCurrentStyle}>
            <div className="flex flex-col">
                <span className="text-lg">
                    <a href={originalUrl} target="_blank">
                        {title}
                    </a>
                </span>
                <span className="text-sm">{performer}</span>
            </div>
            <div className="absolute right-3 flex gap-6 items-center h-full">
                <button onClick={handleClick}>
                    <img src={Play_24} alt="play now" />
                </button>
                <button onClick={handleDeletion}>
                    <img src={Trash} alt="remove audio" />
                </button>
                <div className="flex flex-col gap-3">
                    <button onClick={handleMoveUp}>
                        <img src={MoveUp} alt="move up" />
                    </button>
                    <button onClick={handleMoveDown}>
                        <img src={MoveDown} alt="move down" />
                    </button>
                </div>
            </div>
        </div>
    )
}