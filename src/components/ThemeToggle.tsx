"use client"
// import { useState, useEffect } from "react";
// import { Moon, Sun, Laptop } from "lucide-react";
// import { useTheme } from "./ThemeProvider";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export default function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Ensure component is mounted to avoid hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="focus-visible:ring-0">
//           {theme === "light" && <Sun className="h-5 w-5" />}
//           {theme === "dark" && <Moon className="h-5 w-5" />}
//           {theme === "system" && <Laptop className="h-5 w-5" />}
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           <Sun className="mr-2 h-4 w-4" />
//           <span>Light</span>
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           <Moon className="mr-2 h-4 w-4" />
//           <span>Dark</span>
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           <Laptop className="mr-2 h-4 w-4" />
//           <span>System</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
