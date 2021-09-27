import {useEffect, useState} from "react";
import {Clipboard} from "react-native";

export const useClipBoardText = () => {
    const [ clipBoardText, setClipboardText ] = useState('');
    useEffect(() => { Clipboard.getString().then(setClipboardText); },[]);
    return clipBoardText;
};
