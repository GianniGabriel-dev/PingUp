import {
  DeleteIcon,
  WritePostIcon,
  ReportIcon,
  FollowIcon,
  MoreOptionsIcon,
} from "@/assets/icons/";
import { UserInfo } from "@/context/authContext.js";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.js";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/hooks/useModal.js";
import { useState } from "react";

export const MoreOptions = ({
  user,
  postId,
  idUserPost,
  usernameOfPost,
}: {
  user: UserInfo;
  postId: number;
  idUserPost: number;
  usernameOfPost: string;
}) => {
  const { openModal } = useModal();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleMoreOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal("deletePost", { postId });
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={handleMoreOptionsClick}
          className="hover:bg-blue-500/25 cursor-pointer hover:text-blue-500 transition-all rounded-full duration-300 w-7 h-7 flex items-center justify-center"
        >
          <MoreOptionsIcon size={20} />
        </button>
      </PopoverTrigger>
      <PopoverContent className=" bg-black w-50 relative ">
        <ul className="w-full flex z-90 flex-col rounded-full gap-2">
          {user.id === idUserPost ? (
            <>
              <li className="transition-all  duration-300 hover:bg-neutral-900  ">
                <button disabled className="w-full  flex gap-3 cursor-pointer p-2   items-center">
                  <WritePostIcon size={20} /> Edit
                </button>
              </li>
              <li className="transition-all  duration-300 hover:bg-neutral-900  ">
                <button
                  onClick={handleDeleteClick}
                  className="w-full flex gap-3 cursor-pointer p-2 items-center"
                >
                  <DeleteIcon size={20} />
                  Delete
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="transition-all  duration-300 hover:bg-neutral-900  ">
                <button disabled className="w-full flex gap-3 cursor-pointer p-2   items-center ">
                  <ReportIcon size={20} /> Reportar
                </button>
              </li>
              <li className="transition-all  duration-300 hover:bg-neutral-900 ">
                <button className="w-full flex gap-3  cursor-pointer p-2  items-center ">
                  <FollowIcon size={20} isfollowed={false} /> Seguir a{" "}
                  {usernameOfPost}
                </button>
              </li>
            </>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
