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
import { Delete, DeleteIcon, Trash, X } from "lucide-react";
import { PhotoList } from "@/components/custom/idols/photo-list";
import { FancyMultiSelect, SelectItem } from "@/components/custom/multi-select";
import { GetAllTagRes, TagRes } from "@/services/types/response/tag-res";
import { IdolRes } from "@/services/types/response/idol-res";
import { fetchAllTag } from "@/services/modules/tag.service";
import { isValidUrl, removeColorAttribute } from "@/lib/utils";
import {
  fetchCreateIdol,
  fetchDeleteIdol,
  fetchUpdateIdol,
} from "@/services/modules/idol.service";
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

interface UpdateIdolDialogProps {
  open?: boolean | false;
  idol?: IdolRes | null;
  onClose?: () => void;
  onRefetch: () => void;
}

export default function UpdateIdolDialog({
  open,
  idol,
  onClose,
  onRefetch,
}: UpdateIdolDialogProps) {
  const [thumbnail, setThumbnail] = React.useState("");
  const [bioLinks, setBioLinks] = React.useState([""]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [photos, setPhotos] = React.useState([""]);
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
    if (idol && open) {
      setName(idol!.idol_name);
      setDescription(idol!.description);
      setDetail(idol!.detail);
      setBioLinks(idol!.bio_link);
      setThumbnail(idol!.thumbnail);
      setPhotos(idol!.images);
      setTags(idol!.tags);
      setInitTagMultiSelect(
        idol!.tags.map((item) => ({
          value: item.tag_id,
          label: item.tag_name,
        }))
      );
    }
  }, [idol, open]);

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
      idol_id: idol?.idol_id ?? 0,
      idol_name: name,
      thumbnail,
      description: removeColorAttribute(description),
      detail: removeColorAttribute(detail),
      images: photos,
      bio_link: bioLinks,
      tags,
    };

    e.preventDefault();
    await fetchUpdateIdol({ ...reqBody })
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

  const handleDeleteIdol = async (e: any) => {
    e.preventDefault();
    if (!idol && !idol!.idol_id) return;
    alert(idol!.idol_id)
    await fetchDeleteIdol(idol!.idol_id)
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
      setBioLinks([""]);
      setName("");
      setDescription("");
      setDetail("");
      setPhotos([""]);
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
          <DialogTitle>Update Idol</DialogTitle>
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
                <QuillEditor
                  initValue={idol?.description}
                  onChange={(text) => setDescription(text)}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="detail">Detail</Label>
            <QuillEditor
              initValue={idol?.detail}
              onChange={(text) => setDetail(text)}
            />
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
                      <X className="h-4 w-4" />
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
                        <X className="h-4 w-4" />
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
          <Button variant={"outline"} onClick={handleDeleteIdol}>
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
