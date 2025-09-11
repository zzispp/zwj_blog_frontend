"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// 使用动态导入完全避免 SSR 水合错误
const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="h-[400px] w-full rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }
);

const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);

import { useAuth } from "@/lib/auth-context";

import { TagTypeEnum } from "@/constants";
import { useSetState } from "ahooks";
import { isUndefined } from "es-toolkit";
import { RotateCw, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { BytemdViewer } from "@/components/bytemd";

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  PUBLISHED_ENUM,
  PUBLISHED_LABEL_MAP,
} from "@/constants";
import { type GetNotesDTO, type Note, useGetNotes } from "@/features/note";
import { useGetAllTags } from "@/features/tag";
import { isAdmin, toFromNow, toSlashDateString } from "@/lib/common";
import { cn } from "@/lib/utils";

import {
  CreateNoteButton,
  DeleteNoteButton,
  EditNoteButton,
  SearchByTags,
  ToggleNotePublishButton,
} from "../../components";

export const AdminNoteListPage = () => {
  const { user } = useAuth();
  const [params, updateParams] = useSetState<GetNotesDTO>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    order: "desc",
    orderBy: "createdAt",
  });

  const [inputParams, updateInputParams] = useSetState<
    Omit<GetNotesDTO, "pageIndex" | "pageSize">
  >({
    body: undefined,
    published: undefined,
    tags: undefined,
  });

  const getNotesQuery = useGetNotes(params);
  const data = React.useMemo(
    () => getNotesQuery.data?.notes ?? [],
    [getNotesQuery],
  );

  const getTagsQuery = useGetAllTags(TagTypeEnum.NOTE);
  const tags = React.useMemo(() => {
    return getTagsQuery.data?.tags ?? [];
  }, [getTagsQuery]);

  return (
    <div className="flex flex-col gap-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-end gap-4 px-1">
        <Input
          placeholder="请输入内容"
          value={inputParams.body}
          onChange={(v) => {
            updateInputParams({
              body: v.target.value,
            });
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {user && (
          <Select
            onValueChange={(v: PUBLISHED_ENUM) => {
              updateInputParams({
                published: v,
              });
            }}
            value={inputParams.published}
          >
            <SelectTrigger
              className={cn({
                "text-muted-foreground": isUndefined(inputParams.published),
              })}
            >
              <SelectValue placeholder="请选择发布状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PUBLISHED_ENUM.ALL}>
                {PUBLISHED_LABEL_MAP[PUBLISHED_ENUM.ALL]}
              </SelectItem>
              <SelectItem value={PUBLISHED_ENUM.PUBLISHED}>
                {PUBLISHED_LABEL_MAP[PUBLISHED_ENUM.PUBLISHED]}
              </SelectItem>
              <SelectItem value={PUBLISHED_ENUM.NO_PUBLISHED}>
                {PUBLISHED_LABEL_MAP[PUBLISHED_ENUM.NO_PUBLISHED]}
              </SelectItem>
            </SelectContent>
          </Select>
        )}

        <div className="flex items-center space-x-4">
          <Button onClick={handleSearch}>
            <Search className="mr-2 size-4" />
            搜索
          </Button>
          <Button onClick={handleReset}>
            <RotateCw className="mr-2 size-4" />
            重置
          </Button>
          <CreateNoteButton refreshAsync={getNotesQuery.refreshAsync} />
        </div>
      </div>

      <SearchByTags tags={tags} params={params} updateParams={updateParams} />

      <ResponsiveMasonry
        columnsCountBreakPoints={{
          // BreakPoints https://tailwindcss.com/docs/responsive-design
          350: 1,
          // lg
          1024: 2,
        }}
      >
        <Masonry gutter="1.5rem">
          {getNotesQuery.loading
            ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx}>
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
            ))
            : data.map((note: Note) => (
              <div key={note.id} className="w-full">
                <div className="relative w-full rounded-lg border px-6 pb-6">
                  <BytemdViewer body={note.body || ""} />
                  <div className="flex flex-wrap justify-end gap-2 py-4">
                    {note.tags.map((tag) => (
                      <Badge key={tag.id}>{tag.name}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-end text-sm text-muted-foreground">
                    <span
                      className={`
                          hidden
                          lg:inline-block
                        `}
                    >
                      {toSlashDateString(new Date(note.createdAt))}
                    </span>
                    <span
                      className={`
                          mx-2 hidden
                          lg:inline-block
                        `}
                    >
                      ·
                    </span>
                    <span>{toFromNow(new Date(note.createdAt))}</span>
                  </div>
                  <div className="absolute top-2 right-2 space-x-2">
                    <ToggleNotePublishButton
                      id={note.id}
                      published={note.published}
                      refreshAsync={getNotesQuery.refreshAsync}
                    />
                    <EditNoteButton
                      id={note.id}
                      refreshAsync={getNotesQuery.refreshAsync}
                    />
                    <DeleteNoteButton
                      id={note.id}
                      refreshAsync={getNotesQuery.refreshAsync}
                    />
                  </div>
                </div>
              </div>
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );

  function handleSearch() {
    updateParams({
      body: inputParams.body,
      tags: params.tags,
      published: inputParams.published,
    });
  }

  function handleReset() {
    updateInputParams({
      body: "",
      published: undefined,
      tags: undefined,
    });
    updateParams({
      body: "",
      published: undefined,
      tags: undefined,
      pageIndex: DEFAULT_PAGE_INDEX,
      order: "desc",
      orderBy: "createdAt",
    });
  }
};
