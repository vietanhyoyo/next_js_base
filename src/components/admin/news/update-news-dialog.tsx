"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { FancyMultiSelect, SelectItem } from "@/components/custom/multi-select";
import { GetAllTagRes, TagRes } from "@/services/types/response/tag-res";
import { fetchAllTag } from "@/services/modules/tag.service";
import { isValidUrl, removeColorAttribute } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import QuillEditor from "@/components/custom/quill-editor";
import { NewsRes } from "@/services/types/response/news-res";
import {
  fetchDeleteNews,
  fetchUpdateNews,
} from "@/services/modules/news.service";

const getTags = async (): Promise<GetAllTagRes | null> => {
  try {
    const result = await fetchAllTag({ limit: 100, page: 1 });
    if (result.status == 200) {
      return result.data;
    } else return null;
  } catch (err) {
    return null;
  }
};

interface UpdateNewsDialogProps {
  open?: boolean | false;
  news?: NewsRes | null;
  onClose?: () => void;
  onRefetch: () => void;
}

export default function UpdateNewsDialog({
  open,
  news,
  onClose,
  onRefetch,
}: UpdateNewsDialogProps) {
  const [thumbnail, setThumbnail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState<TagRes[]>([]);
  const [initTagMultiSelect, setInitTagMultiSelect] = React.useState<
    SelectItem[]
  >([]);
  const [tagData, setTagData] = React.useState<GetAllTagRes | null>(null);

  const fetchTagData = async () => {
    const result = await getTags();
    setTagData(result);
  };

  React.useEffect(() => {
    fetchTagData();
  }, []);

  React.useEffect(() => {
    if (news && open) {
      setTitle(news!.title);
      setAuthor(news!.author);
      setDescription(news!.description);
      setContent(news!.content);
      setThumbnail(news!.thumbnail);
      setTags(news!.tags);
      setInitTagMultiSelect(
        news!.tags.map((item) => ({
          value: item.tag_id,
          label: item.tag_name,
        }))
      );
    }
  }, [news, open]);

  const tagMultiSelect = React.useMemo(() => {
    return tagData !== null
      ? tagData.tags.map((item) => ({
          value: item.tag_id,
          label: item.tag_name,
        }))
      : [];
  }, [tagData]);

  const handleSubmit = async (e: any) => {
    const reqBody = {
      news_id: news?.news_id ?? 0,
      title: title,
      author,
      thumbnail,
      description: removeColorAttribute(description),
      content: removeColorAttribute(content),
      tags,
    };

    e.preventDefault();
    await fetchUpdateNews({ ...reqBody })
      .then(({ data, msg, status }: any) => {
        if (status === 200) {
          toast({
            variant: "default",
            title: "Update success!!!",
          });
          if (onClose) onClose();
          onRefetch();
          resetFields();
        } else {
          toast({
            variant: "destructive",
            title: "Error!!!",
            description: "There was a problem with your request.",
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  const handleDeleteNews = async (e: any) => {
    e.preventDefault();
    if (!news && !news!.news_id) return;
    alert(news!.news_id);
    await fetchDeleteNews(news!.news_id)
      .then(({ data, msg, status }: any) => {
        if (status === 200) {
          toast({
            variant: "default",
            title: "Delete success!!!",
          });
          if (onClose) onClose();
          onRefetch();
          resetFields();
        } else {
          toast({
            variant: "destructive",
            title: "Error!!!",
            description: "There was a problem with your request.",
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  const resetFields = () => {
    if (open && onClose) {
      setThumbnail("");
      setTitle("");
      setAuthor("");
      setDescription("");
      setContent("");
      setTags([]);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && resetFields()}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[1140px] bg-card max-h-[770px] overflow-scroll"
      >
        <DialogHeader>
          <DialogTitle>Update News</DialogTitle>
          <DialogDescription>
            Update information for your data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-4">
            <div>
              {isValidUrl(thumbnail) ? (
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  width={800}
                  height={1000}
                  className="h-[300px] w-[400px] rounded-md object-cover"
                />
              ) : (
                <div className="border-2 rounded-md border-dashed h-[300px] w-[400px] border-slate-300"></div>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input
                  id="thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <QuillEditor
              initValue={news?.description}
              onChange={(text) => setDescription(text)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <QuillEditor
              initValue={news?.content}
              onChange={(text) => setContent(text)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Tags</Label>
            <FancyMultiSelect
              initItems={initTagMultiSelect}
              selectItems={tagMultiSelect}
              placeholder="Select tag..."
              onChange={(selectedItems) => {
                const newTags = selectedItems.map((item) => ({
                  tag_id: Number(item.value),
                  tag_name: item.label,
                }));
                setTags(newTags);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={handleDeleteNews}>
            <Trash className="mr-2" />
            Delete
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
