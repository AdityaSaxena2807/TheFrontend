import { useState, useRef, useEffect } from "react";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Button from "../common/Button.jsx";

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
      <Button
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Comment options"
        variant="icon"
        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary"
      >
        <MoreOutlined className="text-lg" />
      </Button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-surface-elevated border border-border rounded-md shadow-md overflow-hidden z-50">
          <Button
            onClick={() => {
              setMenuOpen(false);
              onEdit();
            }}
            variant="ghost"
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-text-primary hover:bg-surface transition-colors duration-hover"
          >
            <EditOutlined className="text-base text-text-secondary" />
            <span>Edit</span>
          </Button>

          <Button
            onClick={() => {
              setMenuOpen(false);
              onDelete();
            }}
            variant="danger"
            className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-surface transition-colors duration-hover"
          >
            <DeleteOutlined className="text-base" />
            <span>Delete</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default CommentOptions;
