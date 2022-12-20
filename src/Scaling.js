export default class Scaling {

    //Base values
    static GAME_BASE_WIDTH = 375;
    static GAME_BASE_HEIGHT = 667;
    static GAME_BASE_DIFF_HEIGHT = 1;

    //Calculated sizes/ratios
    static GAME_WIDTH = Scaling.GAME_BASE_WIDTH;
    static GAME_HEIGHT = Scaling.GAME_BASE_HEIGHT;
    static GAME_DIFF_RATIO = 1;

    //DPR
    static DPR = Scaling.getDevicePixelRatio();
    static getPixelbyDPR(px) {
        return px * Scaling.DPR;
    }

    //Helpers
    static updateResolutionRatio(parentWidth, parentHeight) {
        const diff = Math.abs((parentWidth / parentHeight) - (Scaling.GAME_BASE_WIDTH / Scaling.GAME_BASE_HEIGHT));

        //Update width/height if ratio offset too large
        if (diff > 0.001) {
            Scaling.GAME_WIDTH = parentWidth;
            Scaling.GAME_HEIGHT = parentHeight;
        }

        //Update diff ratio
        const diffRatio = parentHeight / Scaling.GAME_BASE_HEIGHT;
        if(diffRatio > 1){
            Scaling.GAME_BASE_DIFF_HEIGHT = diffRatio;
            Scaling.GAME_DIFF_RATIO = diffRatio;
        }
    }

    static getDevicePixelRatio(){
        const params = new URLSearchParams(window.location.search);
        const forceDpr = params.get("dpr");
        if (forceDpr) {
            return Math.floor(parseInt(forceDpr))
        }
        return Math.floor(Math.min(window.devicePixelRatio, 3));
    }

    static imagePath(filename, extension, size = 0) {
        if (!size) {
            size = Scaling.DPR;
        }
        const filePath = `${filename}@${size}x.${extension}`;
        const file = `src/assets/${filePath}`;
        
        return file;
    }
}