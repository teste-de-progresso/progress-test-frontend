import React, { useState } from "react";
import { Dialog } from "@material-ui/core";

import { useUserContext } from "../../utils";
import { AvatarEditor, Navigator, Avatar } from "../../components";
import { useAuth } from "../../utils/contexts/Authentication";

export const UserProfile = () => {
  const auth = useAuth();

  const [avatarEditorExhibit, setAvatarEditorExhibition] = useState(false);
  const userContextData = useUserContext();
  const { userInfo } = userContextData;

  return (
    <>
      <Dialog open={avatarEditorExhibit} onClose={() => setAvatarEditorExhibition(false)}>
        <AvatarEditor setAvatarEditorExhibition={setAvatarEditorExhibition} />
      </Dialog>
      <Navigator home />
      <div className="bg-gray-100 w-full my-3">
        <main>
          <div className="flex items-center flex-col max-w-4xl m-auto">
            <div className="bg-white shadow border border-gray-100 flex flex-col items-center rounded p-4 w-full mt-12 mb-4 relative">
              <div
                className="w-20 absolute cursor-pointer"
                style={{ top: "-3.10rem" }}
                onClick={() => setAvatarEditorExhibition(!avatarEditorExhibit)}
              >
                <Avatar src={userInfo.avatarUrl} />
              </div>
              <div className="mt-8 text-center">
                <h2 className="font-bold">{auth.user.name || auth.user.email}</h2>
                <h2 className="py-4">TODO: Centro</h2>
                <h2 className="">TODO: Cargo</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};