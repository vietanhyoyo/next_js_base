import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Start from "@/components/start";

type Props = {
  params: { locale: string };
};

export default function Portfolio({ params: { locale } }: Props) {
  return (
    <main>
      <Start />
      <Skills />
      <Experience />
      <Projects />
    </main>
  );
}
