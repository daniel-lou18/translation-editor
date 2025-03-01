import UploadArea from "@/components/Upload/UploadArea";
import Overlay from "../ui/Overlay";
import {
  allowedDocumentTypes,
  allowedMemoryTypes,
  languageToCodeMap as languages,
} from "@/utils/constants";
import { Lang } from "@/types";
import MemoryFileItem from "./MemoryFileItem";
import { ArrowRight } from "lucide-react";
import UploadButton from "./UploadButton";
import Container from "../ui/Container";
import { PropsWithChildren } from "react";

type UploadTmFormProps = PropsWithChildren<{
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}>;

function UploadTmForm({
  children,
  handleSubmit,
  isLoading,
}: UploadTmFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Container className="my-8 rounded-lg border border-gray-200 bg-card overflow-hidden">
        {children}
      </Container>
      <UploadButton isProcessing={isLoading} />
      {isLoading && <Overlay />}
    </form>
  );
}

type HeaderProps = PropsWithChildren<{
  title: string;
}>;

function Header({ children, title }: HeaderProps) {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
      <h3 className="text-sm font-medium">{title}</h3>
      <Container className="flex items-center gap-6">{children}</Container>
    </div>
  );
}

type UploadAreaContainerProps = {
  sourceFile: File | null;
  targetFile: File | null;
  setSourceFile: (file: File) => void;
  setTargetFile: (file: File) => void;
  removeSourceFile: () => void;
  removeTargetFile: () => void;
  sourceLang: Lang;
  targetLang: Lang;
  onSourceLangChange: (lang: Lang) => void;
  onTargetLangChange: (lang: Lang) => void;
};

function Upload({
  sourceFile,
  targetFile,
  setSourceFile,
  setTargetFile,
  removeSourceFile,
  removeTargetFile,
  sourceLang,
  targetLang,
  onSourceLangChange,
  onTargetLangChange,
}: UploadAreaContainerProps) {
  return (
    <div className="relative p-4 grid grid-cols-2 gap-4">
      {sourceFile ? (
        <MemoryFileItem
          file={sourceFile}
          languages={Object.keys(languages) as Lang[]}
          currentLang={sourceLang}
          onRemoveFile={removeSourceFile}
          onLangChange={onSourceLangChange}
        />
      ) : (
        <UploadArea
          type="memory"
          accept={allowedDocumentTypes.join(",")}
          title="Source Document"
          description={`Allowed file types: ${allowedDocumentTypes
            .map((type) => type.slice(1).toUpperCase())
            .join(", ")}`}
          onFilesSelect={(files) => setSourceFile(files[0])}
          className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
        />
      )}

      {targetFile ? (
        <MemoryFileItem
          file={targetFile}
          languages={Object.keys(languages) as Lang[]}
          currentLang={targetLang}
          onRemoveFile={removeTargetFile}
          onLangChange={onTargetLangChange}
        />
      ) : (
        <UploadArea
          type="memory"
          accept={allowedMemoryTypes.join(",")}
          title="Target Document"
          description={`Allowed file types: ${allowedMemoryTypes
            .map((type) => type.slice(1).toUpperCase())
            .join(", ")}`}
          onFilesSelect={(files) => setTargetFile(files[0])}
          className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
        />
      )}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
        <ArrowRight size={28} className="text-gray-500" />
      </div>
    </div>
  );
}

UploadTmForm.Header = Header;
UploadTmForm.Upload = Upload;

export default UploadTmForm;

// export default function UploadTmForm({ newTm = true }: UploadTmFormProps) {
//   const {
//     sourceFile,
//     targetFile,
//     setSourceFile,
//     setTargetFile,
//     removeSourceFile,
//     removeTargetFile,
//     isLoading,
//     sourceLang,
//     targetLang,
//     domain,
//     handleSubmit,
//     onSourceLangChange,
//     onTargetLangChange,
//     onDomainChange,
//   } = useTmUpload();
//   const { tmItems, tmId, onTmChange } = useSelectTm();

//   const domainItems = domains.map((domain) => ({
//     value: domain,
//     label: domain,
//   }));

//   return (
//     <form onSubmit={handleSubmit}>
//       <Container className="my-8 rounded-lg border border-gray-200 bg-card overflow-hidden">
//         <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
//           <h3 className="text-sm font-medium">Translation Memory Pair</h3>
//           <Container className="flex items-center gap-6">
//             {!newTm && (
//               <div className="flex items-center gap-2">
//                 <BookType className="w-4 h-4 text-muted-foreground" />
//                 <span className="text-sm text-muted-foreground">TM:</span>
//                 <Combobox
//                   name="tm"
//                   items={tmItems}
//                   value={tmId}
//                   onChange={onTmChange}
//                   className="w-80 h-8"
//                 />
//               </div>
//             )}
//             <div className="flex items-center gap-2">
//               <Earth className="w-4 h-4 text-muted-foreground" />
//               <span className="text-sm text-muted-foreground">Domain:</span>
//               <Combobox
//                 name="domain"
//                 items={domainItems}
//                 value={domain}
//                 onChange={onDomainChange}
//                 className="w-48 h-8"
//               />
//             </div>
//           </Container>
//         </div>

//         <div className="relative p-4 grid grid-cols-2 gap-4">
//           {sourceFile ? (
//             <MemoryFileItem
//               file={sourceFile}
//               languages={Object.keys(languages) as Lang[]}
//               currentLang={sourceLang}
//               onRemoveFile={removeSourceFile}
//               onLangChange={onSourceLangChange}
//             />
//           ) : (
//             <UploadArea
//               type="memory"
//               accept={allowedDocumentTypes.join(",")}
//               title="Source Document"
//               description={`Allowed file types: ${allowedDocumentTypes
//                 .map((type) => type.slice(1).toUpperCase())
//                 .join(", ")}`}
//               onFilesSelect={(files) => setSourceFile(files[0])}
//               className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
//             />
//           )}

//           {targetFile ? (
//             <MemoryFileItem
//               file={targetFile}
//               languages={Object.keys(languages) as Lang[]}
//               currentLang={targetLang}
//               onRemoveFile={removeTargetFile}
//               onLangChange={onTargetLangChange}
//             />
//           ) : (
//             <UploadArea
//               type="memory"
//               accept={allowedMemoryTypes.join(",")}
//               title="Target Document"
//               description={`Allowed file types: ${allowedMemoryTypes
//                 .map((type) => type.slice(1).toUpperCase())
//                 .join(", ")}`}
//               onFilesSelect={(files) => setTargetFile(files[0])}
//               className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
//             />
//           )}

//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
//             <ArrowRight size={28} className="text-gray-500" />
//           </div>
//         </div>
//       </Container>
//       <UploadButton isProcessing={isLoading} />
//       {isLoading && <Overlay />}
//     </form>
//   );
// }
