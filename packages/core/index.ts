import { makeInstaller } from "@sukin/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas} from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import '@sukin/theme/index.css'
const installer = makeInstaller(components);
library.add(fas);
export * from "@sukin/components"
export default installer;