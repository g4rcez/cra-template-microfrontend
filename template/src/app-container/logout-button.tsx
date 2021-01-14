import { FC } from "react";
import { Button } from "@arcanishq/styleguide";
import { Endpoints } from "../lib/http-client";

type LogoutButtonProps = {
  linkClassName: string;
};

export const LogoutButton: FC<LogoutButtonProps> = ({ linkClassName }) => (
  <form className="w-auto" method="post" action={Endpoints.logout}>
    <Button
      small
      className={`${linkClassName} text-right justify-end border-l-2 border-5 border-success-light pl-4 text-sm`}
    >
      Logout
    </Button>
  </form>
);
