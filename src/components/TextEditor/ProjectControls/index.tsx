import TopbarContainer from "@/components/ui/Editor/TopbarContainer";
import ProjectControlsLeft from "./ProjectControlsLeft";
import ProjectControlsRight from "./ProjectControlsRight";

export default function ProjectControls() {
  return (
    <TopbarContainer>
      <ProjectControlsLeft />
      <ProjectControlsRight />
    </TopbarContainer>
  );
}
