import { Earth } from "lucide-react";
import { Button } from "../button";
import Container from "../Container";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Button variant="ghost" className="h-9 gap-2 text-primary" asChild>
      <Link to="/app/projects">
        <Earth className="w-6 h-6" />
        <Container as="span" className="font-bold">
          SemCat
        </Container>
      </Link>
    </Button>
  );
}
