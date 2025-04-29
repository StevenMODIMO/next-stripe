"use client";
import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Header() {
  return (
    <nav className="flex justify-end items-center px-4 h-[10%] w-full">
      <div className="text-lg flex gap-3 items-center dark:text-white">
      <MdDarkMode />
      <MdLightMode />
      </div>
    </nav>
  );
}
