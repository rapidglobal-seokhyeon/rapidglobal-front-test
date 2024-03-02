import { PopUpBody } from "./Body";
import { PopUpButtonGroup } from "./ButtonGroup";
import { PopUpHeader } from "./Header";
import { PopUpLayout } from "./Layout";

export const PopUp = Object.assign(PopUpLayout, {
  Header: PopUpHeader,
  Body: PopUpBody,
  ButtonGroup: PopUpButtonGroup,
});
