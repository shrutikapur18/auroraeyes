import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface ReadingTableProps {
  children: ReactNode;
  className?: string;
}

const ReadingTable = ({ children, className = "" }: ReadingTableProps) => {
  return (
    <motion.div
      className={`relative table-light ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Table surface glow */}
      <div className="absolute inset-0 -inset-x-8 -inset-y-4 reading-table pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 py-8">
        {children}
      </div>
    </motion.div>
  );
};

export default ReadingTable;
