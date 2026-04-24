"use client"; // Needed for App Router in Next.js 13+
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useState, useRef, useEffect } from "react";

interface FAQElementProps {
  question: string;
  answer: string;
}

const FAQElement = ({ question, answer }: FAQElementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="border-b-2 px-2 mt-2" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div onClick={() => setIsOpen(!isOpen)} className="flex">
        <p className="w-80 font-semibold text-lg">{question}</p>
        <ChevronDownIcon className="w-6 h-6" />
      </div>

      {/* Dropdown show hide item */}
      {isOpen && (
        <div className="text-lg text-justify">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;{answer}
        </div>
      )}
    </div>
  );
};

export default FAQElement;
