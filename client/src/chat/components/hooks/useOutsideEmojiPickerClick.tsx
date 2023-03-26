import { useRef, useState, useEffect } from "react";

const useOutsideEmojiPickerClick = (initialValue: boolean) => {
    const ref = useRef<HTMLDivElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(initialValue);
    const handleClickOutside = (event: any) => {
        if(ref.current && !ref.current.contains(event.target)) setShowEmojiPicker(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [ref])

    return {showEmojiPicker, setShowEmojiPicker, ref};
}

export default useOutsideEmojiPickerClick;