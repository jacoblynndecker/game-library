import { Gamepad2 } from "lucide-react";
import { platformIcons } from "../utils/PlatformIcons";

function PlatformIcon({ platform, darkMode, family }) {
    const Icon = platformIcons[family] ?? Gamepad2;

    return (
        <Icon
            size={28}
            className={darkMode ? "text-gray-200" : "text-gray-700"}
            title={platform.name}
            aria-label={platform.name}
        />
    );
}

export default PlatformIcon;