import { Sidebar } from "@/components/ui/sidebar";
import { ComponentProps } from "react";

export type SidebarProps = ComponentProps<typeof Sidebar>;

// Define item types that don't include JSX
export type SidebarItemConfig = {
  label: string;
  href: string;
  icon?: string; // Store icon name as string
};

// Define group types without JSX
export type SidebarGroupConfig = {
  label: string;
  items: SidebarItemConfig[];
};

// Dashboard sidebar configuration without JSX
export const dashboardSidebarConfig: SidebarGroupConfig[] = [
  {
    label: "Projects",
    items: [
      { label: "All projects", href: "/app/dashboard/projects" },
      { label: "New project", href: "/app/dashboard/projects/create" },
    ],
  },
  {
    label: "Translation resources",
    items: [
      { label: "All TMs", href: "/app/dashboard/tms" },
      { label: "Create TM", href: "/app/dashboard/tms/create" },
      { label: "All glossaries", href: "/app/dashboard/resources/glossary" },
      {
        label: "Create glossary",
        href: "/app/dashboard/resources/glossary/create",
      },
    ],
  },
  {
    label: "Quick start",
    items: [
      {
        label: "Translate document with AI",
        href: "/app/dashboard/documents/upload",
      },
      {
        label: "Upload document",
        href: "/app/dashboard/documents/upload",
      },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Preferences", href: "/app/dashboard/account/preferences" },
      {
        label: "Log out",
        href: "/app/dashboard/account/logout",
        icon: "logout",
      },
    ],
  },
];

// Function to create project sidebar config
export function createProjectSidebarConfig(
  projectId: string | number
): SidebarGroupConfig[] {
  return [
    {
      label: "Navigation",
      items: [
        {
          label: "Documents",
          href: `/app/projects/${String(projectId)}/documents`,
          icon: "fileText",
        },
        {
          label: "All translations",
          href: `/app/projects/${String(projectId)}/translations`,
          icon: "globe",
        },
      ],
    },
    {
      label: "Translation Resources",
      items: [
        {
          label: "Translation Memory",
          href: `/app/projects/${String(projectId)}/tms`,
          icon: "bookType",
        },
        {
          label: "Glossaries",
          href: `#`,
          icon: "bookOpenText",
        },
      ],
    },
    {
      label: "",
      items: [
        {
          label: "Statistics",
          href: `#`,
          icon: "chartBar",
        },
        {
          label: "Languages",
          href: `#`,
          icon: "languages",
        },
        {
          label: "Settings",
          href: `/app/projects/${String(projectId)}/settings`,
          icon: "settings",
        },
      ],
    },
  ];
}
