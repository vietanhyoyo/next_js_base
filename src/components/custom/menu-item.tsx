import * as React from "react";

interface MenuItemProps {
  children: React.ReactNode;
  isSelected?: boolean;
}

export function MenuItem(props: MenuItemProps) {
  let className = "hover:text-primary";
  if(props.isSelected) {
    className = className + " text-primary"
  }

  return <span className={className}>{props.children}</span>;
}
