import { ColNewsList } from "@/components/custom/news/col-news-list";
import { ColVisualList } from "@/components/custom/idols/col-visual-list";
import {
  VisualCardProps,
  VisualCard,
} from "@/components/custom/idols/visual-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationWrapper from "@/components/custom/pagination-wrapper";
import { PageBody } from "@/components/custom/page-body";
import { VisualCarouse } from "@/components/custom/idols/visual-carousel";
import CustomBreadcrumb from "@/components/custom/custom-breadcrumb";
import { GetAllIdolRes } from "@/services/types/response/idol-res";
import { fetchAllIdol } from "@/services/modules/idol.service";
import Home from "./home/[page_number]/page";

export default async function MainPage() {

  return <Home params={{ page_number: "1" }} />;
}
