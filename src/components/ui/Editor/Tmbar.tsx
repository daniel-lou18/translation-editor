import Container from "../Container";
import SearchForm from "@/components/ui/SearchForm";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useResources } from "@/contexts/resourcesContext";
import { SquareM, BookOpenText } from "lucide-react";

export default function Tmbar() {
  const { currentView, changeView } = useResources();

  return (
    <Container className="sticky top-[49px] z-10 col-span-3 flex justify-between items-center px-4 py-1.5 border-b border-border bg-cat-memory">
      <SearchForm
        placeholder="Search glossary"
        className="h-9 border-border"
        value={""}
        onChange={() => {}}
      />
      <ToggleGroup type="single" value={currentView} onValueChange={changeView}>
        <ToggleGroupItem
          value="tm"
          className="min-w-8 h-8 w-8 data-[state=on]:bg-cat-accent/10"
        >
          <SquareM />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="glossary"
          className="min-w-8 h-8 w-8 data-[state=on]:bg-cat-accent/10"
        >
          <BookOpenText />
        </ToggleGroupItem>
      </ToggleGroup>
    </Container>
  );
}
