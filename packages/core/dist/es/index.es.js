import { m as makeInstaller } from "./utils.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { a as SuAlert } from "./Alert.js";
import { a as SuButton, b as SuButtonGroup } from "./Button.js";
import { a as SuIcon } from "./Icon.js";
import { S as SuDragDrop } from "./Dragdrop.js";
import { S as SuSchedule } from "./Schedule.js";
import { S as SuDataform } from "./Dataform.js";
import { S as SuSelection } from "./Selection.js";
import { S as SuIcard } from "./ICard.js";
import { S as SuListform, a as SuList } from "./List.js";
const components = [
  SuButton,
  SuIcon,
  SuButtonGroup,
  SuAlert,
  SuDragDrop,
  SuSchedule,
  SuDataform,
  SuSelection,
  SuIcard,
  SuListform,
  SuList
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
  SuList,
  SuListform,
  SuSchedule,
  SuSelection,
  installer as default
};
