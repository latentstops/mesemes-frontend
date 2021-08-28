import {useEffect, useState} from "react";
import { Clipboard } from "react-native";

export const useClipBoardText = () => {
    const [ clipBoardText, setClipboardText ] = useState('test');
    useEffect(() => {
        Clipboard.getString().then(setClipboardText);
    },[setClipboardText]);
    return clipBoardText;
};