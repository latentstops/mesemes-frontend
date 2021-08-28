import {useEffect, useState} from "react";
import {AppState, Clipboard} from "react-native";

export const useClipBoardText = () => {
    const [ clipBoardText, setClipboardText ] = useState('');
    useEffect(() => {
        Clipboard.getString().then(setClipboardText);
        const listener = nextAppState => {
            if ( nextAppState === "active" ){
                console.log({nextAppState});
                Clipboard.getString().then(setClipboardText);
            }
        };
        AppState.addEventListener("change", listener);

        return () => AppState.removeEventListener('change', listener);
    },[]);
    return clipBoardText;
};