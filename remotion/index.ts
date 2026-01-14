import { registerRoot, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";
import RemotionRoot from "./Root";

loadFont({
    family: "Geist",
    url: staticFile("fonts/Geist-Regular.ttf"),
    weight: "400",
});

loadFont({
    family: "Geist",
    url: staticFile("fonts/Geist-SemiBold.ttf"),
    weight: "600",
});

registerRoot(RemotionRoot);
