import { useState, useRef, useEffect } from "react";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function CommentOptions({ onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Three Dot Button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#3f3f3f] hover:text-white transition-all duration-150"
      >
        <MoreOutlined className="text-lg" />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-[#282828] border border-[#3f3f3f] rounded-xl shadow-2xl overflow-hidden z-50">
          <button
            onClick={() => {
              setMenuOpen(false);
              onEdit();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f3f] transition-colors"
          >
            <EditOutlined className="text-base text-gray-300" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              onDelete();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-[#3f3f3f] transition-colors"
          >
            <DeleteOutlined className="text-base" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentOptions;
