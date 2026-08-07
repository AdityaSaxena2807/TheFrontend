import React, { useState, useRef, useEffect } from "react";
import {
  DownOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import Button from "./Button.jsx";

function SortDropdown({ sortField, sortType, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeOption = options.find((opt) => opt.field === sortField);
  const activeLabel = activeOption?.label || "Sort by";

  const handleSelect = (field) => {
    if (field === sortField) {
      // same field clicked again → flip direction
      onChange(field, sortType === "asc" ? "desc" : "asc");
    } else {
      // new field → default to desc
      onChange(field, "desc");
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        variant="ghost"
        className="flex items-center gap-2 text-sm text-gray-300 border border-[#303030] rounded-full px-3 py-1.5 hover:bg-[#272727] transition"
      >
        Sort by: <span className="text-white">{activeLabel}</span>
        <DownOutlined className="text-[10px]" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[#212121] border border-[#303030] rounded-lg shadow-xl z-30 overflow-hidden">
          {options.map((opt) => {
            const isActive = opt.field === sortField;
            return (
              <Button
                key={opt.field}
                type="button"
                onClick={() => handleSelect(opt.field)}
                variant="ghost"
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-[#333] transition ${
                  isActive ? "text-white bg-[#2a2a2a]" : "text-gray-300"
                }`}
              >
                <span>{opt.label}</span>
                {isActive &&
                  opt.field !== "relevance" &&
                  (sortType === "asc" ? (
                    <CaretUpOutlined className="text-[10px]" />
                  ) : (
                    <CaretDownOutlined className="text-[10px]" />
                  ))}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
