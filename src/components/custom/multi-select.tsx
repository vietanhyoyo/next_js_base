"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export type SelectItem = {
  value: string | number;
  label: string;
};

interface FancyMultiSelectProps {
  placeholder?: string;
  selectItems: SelectItem[];
  initItems?: SelectItem[];
  onChange?: (selectedItems: SelectItem[]) => void; // Add onChange prop
}

const FancyMultiSelect = React.memo(
  ({
    selectItems,
    placeholder,
    onChange, // Destructure onChange prop
    initItems,
  }: FancyMultiSelectProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<SelectItem[]>(
      initItems ?? []
    );
    const [selectables, setSelectables] = React.useState<SelectItem[]>([]);
    const [inputValue, setInputValue] = React.useState("");

    const handleUnselect = React.useCallback(
      (framework: SelectItem) => {
        setSelected((prev) => {
          const newSelected = prev.filter((s) => s.value !== framework.value);
          if (onChange) onChange(newSelected); // Trigger onChange when an item is unselected
          return newSelected;
        });
      },
      [onChange]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
              setSelected((prev) => {
                const newSelected = [...prev];
                newSelected.pop();
                if (onChange) onChange(newSelected); // Trigger onChange when an item is removed using keyboard
                return newSelected;
              });
            }
          }
          // This is not a default behaviour of the <input /> field
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [onChange]
    );

    React.useEffect(() => {
      setSelectables(
        selectItems.filter(
          (framework) => !selected.some((item) => item.value === framework.value)
        )
      );
    }, [selectItems, selected, initItems]);

    const handleSelect = React.useCallback(
      (framework: SelectItem) => {
        setSelected((prev) => {
          const newSelected = [...prev, framework];
          if (onChange) onChange(newSelected);
          return newSelected;
        });
      },
      [onChange]
    );

    return (
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-primary/80 focus-within:ring-offset-1">
          <div className="flex flex-wrap gap-1">
            {selected.map((framework) => {
              return (
                <Badge key={framework.value} variant="secondary">
                  {framework.label}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(framework);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(framework)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          <CommandList>
            {open && selectables.length > 0 ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((framework) => {
                    return (
                      <CommandItem
                        key={framework.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          handleSelect(framework);
                        }}
                        className={"cursor-pointer"}
                      >
                        {framework.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            ) : null}
          </CommandList>
        </div>
      </Command>
    );
  }
);

FancyMultiSelect.displayName = "FancyMultiSelect";

export { FancyMultiSelect };
