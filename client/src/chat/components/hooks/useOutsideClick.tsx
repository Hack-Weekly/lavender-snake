import { useRef, useState, useEffect } from "react";

const useOutsideClick = (initialValue: boolean) => {
    const ref = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(initialValue);
    const handleClickOutside = (event: Event) => {
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

export default useOutsideClick;