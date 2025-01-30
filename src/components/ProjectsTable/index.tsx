import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FileText,
  Globe,
} from "lucide-react";
import Container from "../ui/Container";

const TreeTable = () => {
  // Sample nested data structure
  const data = [
    {
      id: "p1",
      type: "project",
      name: "Marketing Website",
      children: [
        {
          id: "d1",
          type: "document",
          name: "Homepage Content",
          children: [
            {
              id: "t1",
              type: "translation",
              name: "French",
              status: "Completed",
            },
            {
              id: "t2",
              type: "translation",
              name: "German",
              status: "In Progress",
            },
          ],
        },
        {
          id: "d2",
          type: "document",
          name: "About Page",
          children: [
            {
              id: "t3",
              type: "translation",
              name: "Spanish",
              status: "Pending",
            },
          ],
        },
      ],
    },
    {
      id: "p2",
      type: "project",
      name: "Mobile App",
      children: [
        {
          id: "d3",
          type: "document",
          name: "UI Strings",
          children: [
            {
              id: "t4",
              type: "translation",
              name: "Japanese",
              status: "Completed",
            },
          ],
        },
      ],
    },
  ];

  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderIcon = (type) => {
    switch (type) {
      case "project":
        return <Folder className="h-4 w-4 text-blue-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-gray-500" />;
      case "translation":
        return <Globe className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderTreeItems = (items, level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.has(item.id);

      return (
        <React.Fragment key={item.id}>
          <TableRow className="animate-in fade-in slide-in-from-top-1 duration-200 ease-out">
            <TableCell>
              <div
                className="flex items-center cursor-pointer"
                style={{ paddingLeft: `${level * 24}px` }}
                onClick={() => hasChildren && toggleItem(item.id)}
              >
                {hasChildren && (
                  <span className="mr-1">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                )}
                {!hasChildren && <span className="w-5" />}
                <span className="mr-2">{renderIcon(item.type)}</span>
                <span>{item.name}</span>
              </div>
            </TableCell>
            <TableCell>
              {item.type === "translation" && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              )}
            </TableCell>
            <TableCell>{item.type}</TableCell>
          </TableRow>
          {hasChildren &&
            isExpanded &&
            renderTreeItems(item.children, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <Container className="py-4 px-6">
      <h1 className="font-bold text-xl mb-4">Projects</h1>
      <Container className="border border-border rounded-md">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderTreeItems(data)}</TableBody>
        </Table>
      </Container>
    </Container>
  );
};

export default TreeTable;
