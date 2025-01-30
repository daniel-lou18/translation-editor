import { TableCell, TableRow } from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { File } from "lucide-react";
import { TableProject } from ".";

type ProjectRowProps = { project: TableProject };

const StatusBadge = ({ status }: { status: TableProject["status"] }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "on-hold":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default function ProjectRow({ project }: ProjectRowProps) {
  return (
    <TableRow key={project.id} className="group">
      <TableCell className="font-medium p-0">
        <Accordion type="single" collapsible>
          <AccordionItem value={project.id} className="border-0">
            <AccordionTrigger className="py-3 px-4 hover:no-underline">
              <span className="flex items-center gap-2">{project.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pb-3 px-4">
                {project.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{doc.wordCount} words</span>
                      <span>
                        {new Date(doc.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TableCell>
      <TableCell>
        <div className="w-[200px] space-y-1">
          <ProgressBar progress={project.progress} />
          <span className="text-xs text-muted-foreground">
            {project.progress}%
          </span>
        </div>
      </TableCell>
      <TableCell>
        <StatusBadge status={project.status} />
      </TableCell>
      <TableCell>{project.language}</TableCell>
    </TableRow>
  );
}
