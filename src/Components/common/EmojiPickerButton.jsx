import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { SmileOutlined } from "@ant-design/icons";

function EmojiPickerButton({
  onEmojiClick,
  placement = "top-start",
  width = 320,
  height = 400,
}) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const placementClasses = {
    "top-start": "bottom-12 left-0",
    "top-end": "bottom-12 right-0",
    "bottom-start": "top-12 left-0",
    "bottom-end": "top-12 right-0",
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        aria-label="Open emoji picker"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors"
      >
        <SmileOutlined className="text-lg text-gray-300 hover:text-white transition-colors" />
      </button>

      {open && (
        <div
          className={`absolute ${
            placementClasses[placement] || placementClasses["top-start"]
          } z-50`}
        >
          <EmojiPicker
            theme="dark"
            width={width}
            height={height}
            lazyLoadEmojis
            previewConfig={{
              showPreview: false,
            }}
            skinTonesDisabled
            searchDisabled={false}
            onEmojiClick={(emojiData) => {
              onEmojiClick?.(emojiData.emoji);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPickerButton;
