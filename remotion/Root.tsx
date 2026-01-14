import { Composition } from "remotion";

import RemotionVideo from "./compositions/remotion-video";

const RemotionRoot = () => {
    return (
        <div>
            <Composition
                id="RemotionVideo"
                component={RemotionVideo}
                durationInFrames={1}
                fps={30}
                width={1080}
                height={1920}
                defaultProps={{
                    imageList: [],
                    audioFileUrl: "",
                    captions: [],
                }}
            />
        </div>
    );
};

export default RemotionRoot;
