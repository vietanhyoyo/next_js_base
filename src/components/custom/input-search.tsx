"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputSearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={cn(
        "flex backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out hover:animate-shadow-pulse",
        "dark:border-2 dark:border-gray-700 rounded-sm hidden md:flex dark:hover:border-primary",
        "focus-within:shadow-xl focus-within:shadow-primary/20 dark:focus-within:border-primary"
      )}
    >
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        className="border-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        variant="link"
        size="icon"
        onClick={handleSearch}
        className="border-0 hover:!bg-opacity-100"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { InputSearch };
