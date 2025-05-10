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
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { PhotoList } from "@/components/custom/idols/photo-list";
import { FancyMultiSelect } from "@/components/custom/multi-select";
import { GetAllTagRes, TagRes } from "@/services/types/response/tag-res";
import { fetchAllTag } from "@/services/modules/tag.service";
import { isValidUrl, removeColorAttribute } from "@/lib/utils";
import { fetchCreateIdol } from "@/services/modules/idol.service";
import { toast } from "@/components/ui/use-toast";
import QuillEditor from "@/components/custom/quill-editor";
import { fetchCreateNews } from "@/services/modules/news.service";

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

interface NewsDialogProp {
  onRefetch: () => void;
}

export default function CreateNewsDialog({ onRefetch }: NewsDialogProp) {
  const [open, setOpen] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState<TagRes[]>([]);
  const [tagData, setTagData] = React.useState<GetAllTagRes | null>(null);

  const fetchTagData = async () => {
    const result = await getTags();
    setTagData(result);
  };

  React.useEffect(() => {
    fetchTagData();
  }, []);

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
      title: title,
      thumbnail,
      author: author,
      description: removeColorAttribute(description),
      content: removeColorAttribute(content),
      tags,
    };

    e.preventDefault();
    await fetchCreateNews({ ...reqBody })
      .then(({ data, msg, status }: any) => {
        if (status === 201) {
          toast({
            variant: "default",
            title: "Add success!!!",
          });
          onRefetch();
          handleClose(false);
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
    setThumbnail("");
    setTitle("");
    setAuthor("");
    setDescription("");
    setContent("");
    setTags([]);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setOpen(false);
      resetFields();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add News</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[1140px] bg-card max-h-[770px] overflow-scroll"
      >
        <DialogHeader>
          <DialogTitle>Create News</DialogTitle>
          <DialogDescription>Add information for your data.</DialogDescription>
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
                <Label htmlFor="name">Title</Label>
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
            <QuillEditor onChange={(text) => setDescription(text)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <QuillEditor onChange={(text) => setContent(text)} />
          </div>
          <div className="grid gap-2">
            <Label>Tags</Label>
            <FancyMultiSelect
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
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
