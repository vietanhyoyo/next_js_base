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
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { PhotoList } from "@/components/custom/idols/photo-list";
import { FancyMultiSelect } from "@/components/custom/multi-select";
import { GetAllTagRes, TagRes } from "@/services/types/response/tag-res";
import { fetchAllTag } from "@/services/modules/tag.service";
import { isValidUrl, removeColorAttribute } from "@/lib/utils";
import { fetchCreateIdol } from "@/services/modules/idol.service";
import { toast } from "@/components/ui/use-toast";
import QuillEditor from "@/components/custom/quill-editor";

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

interface IdolDialogProp {
  onRefetch: () => void;
}

export default function IdolDialog({ onRefetch }: IdolDialogProp) {
  const [open, setOpen] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState("");
  const [bioLinks, setBioLinks] = React.useState([""]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [photos, setPhotos] = React.useState([""]);
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

  const addBioLink = () => {
    setBioLinks([...bioLinks, ""]);
  };

  const handleBioLinkChange = (index: number, value: string) => {
    const newBioLinks = [...bioLinks];
    newBioLinks[index] = value;
    setBioLinks(newBioLinks);
  };

  const removeBioLink = (index: number) => {
    const newBioLinks = bioLinks.filter((_, i) => i !== index);
    setBioLinks(newBioLinks);
  };

  const addPhoto = () => {
    setPhotos([...photos, ""]);
  };

  const handlePhotoChange = (index: number, value: string) => {
    const newPhoto = [...photos];
    newPhoto[index] = value;
    setPhotos(newPhoto);
  };

  const removePhoto = (index: number) => {
    const newPhoto = photos.filter((_, i) => i !== index);
    setPhotos(newPhoto);
  };

  const handleSubmit = async (e: any) => {
    const reqBody = {
      idol_name: name,
      thumbnail,
      description: removeColorAttribute(description),
      detail: removeColorAttribute(detail),
      images: photos,
      bio_link: bioLinks,
      tags,
    };

    e.preventDefault();
    await fetchCreateIdol({ ...reqBody })
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
    setBioLinks([""]);
    setName("");
    setDescription("");
    setDetail("");
    setPhotos([""]);
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
        <Button onClick={() => setOpen(true)}>Add Idol</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[1140px] bg-card max-h-[770px] overflow-scroll"
      >
        <DialogHeader>
          <DialogTitle>Create Idol</DialogTitle>
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
                  width={700}
                  height={900}
                  className="h-[400px] w-[300px] rounded-md object-cover"
                />
              ) : (
                <div className="border-2 rounded-md border-dashed h-[400px] w-[300px] border-slate-300"></div>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <Label htmlFor="description">Description</Label>
                <QuillEditor onChange={(text) => setDescription(text)} />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="detail">Detail</Label>
            <QuillEditor onChange={(text) => setDetail(text)} />
          </div>
          <div className="grid gap-2">
            <Label>Bio Links</Label>
            <div className="grid gap-2 grid-cols-3 ">
              {bioLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={link}
                    onChange={(e) => handleBioLinkChange(index, e.target.value)}
                    placeholder="Enter bio link"
                  />
                  {bioLinks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBioLink(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={addBioLink} className="w-fit">
                + Add more
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Photos</Label>
            <div className="grid gap-2 grid-cols-3 ">
              {photos.length === 0 ? (
                <div></div>
              ) : (
                photos.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={link}
                      onChange={(e) => handlePhotoChange(index, e.target.value)}
                      placeholder="Enter image link"
                    />
                    {photos.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePhoto(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))
              )}
              <Button type="button" onClick={addPhoto} className="w-fit">
                + Add more
              </Button>
            </div>
            <PhotoList
              photoList={photos.map((item) => ({ src: item }))}
              disable
            />
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
