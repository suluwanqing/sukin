import { m as makeInstaller } from "./utils.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { a as SuAlert } from "./Alert.js";
import { S as SuButton, a as SuButtonGroup } from "./Button.js";
import { a as SuIcon } from "./Icon.js";
import { S as SuDragDrop } from "./Dragdrop.js";
import { S as SuSchedule } from "./Schedule.js";
import { S as SuDataform } from "./Dataform.js";
import { S as SuSelection } from "./Selection.js";
import { S as SuIcard } from "./ICard.js";
const components = [
  SuButton,
  SuIcon,
  SuButtonGroup,
  SuAlert,
  SuDragDrop,
  SuSchedule,
  SuDataform,
  SuSelection,
  SuIcard
];
const installer = makeInstaller(components);
library.add(fas);
export {
  SuAlert,
  SuButton,
  SuButtonGroup,
  SuDataform,
  SuDragDrop,
  SuIcard,
  SuIcon,
  SuSchedule,
  SuSelection,
  installer as default
};
