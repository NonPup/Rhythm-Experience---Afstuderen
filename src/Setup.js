/**
 * Setup class
 * This handles loading and usage of elements in the flow
 */
export default class Setup {
    static data = {};
    static market = '';
    static language = 'EN';
    static gameId = 0;
    static gameType = '';
    static colors={};
    static customCSS= {};

    /**
     * Get data from api
     * This loads data from cape and uses it in the platform
     */
    static async getDataFromApi() {
        const parsed = queryString.parse(location.search);

        // Get country and language
        let market = parsed.market;
        let language = parsed.language;
        let gameId = parsed.gameId;

        Setup.market = market ? market : process.env.VUE_APP_GAME_DEFAULT_COUNTRY;
        Setup.language = language ? language : process.env.VUE_APP_GAME_DEFAULT_LANGUAGE;
        Setup.gameId = gameId ? gameId : process.env.VUE_APP_GAME_DEFAULT_ID;

        // Handle a preview link
        if (parsed.preview) {
            let result = await axios.post(process.env.VUE_APP_PREVIEW_API + "previews/getCampaign", {
                'campaignId': parsed.campaignId,
                'token': parsed.token,
                'market': parsed.market
            });
            Setup.data = result.data.data.data;
        }
        // Handle regular link
        else {
            // Request JSON data
            let requestUrl = process.env.VUE_APP_GAME_BASEURL + "/" + Setup.gameId + "_" + Setup.market + ".json";
            
            // On localhost, add non caching parameter to make sure we don't get an old version
            if (window.location.hostname == 'localhost') {
                requestUrl = requestUrl + '?t=' + Date.now();
            }
            let result = await axios.get(requestUrl);
            Setup.data = result.data;
        }

        Setup.gameType =  Setup.getValue("settings.gameType");
        Setup.setupPage();
    }

    /**
     * Add tagmanager to the page
     * This loads dynamically if set in the settings of the game. 
     */
    static setupPage() {
        // Set header title
        let headerTitle = Setup.getCopy("meta.title");
        document.title = headerTitle;

        // Load tagmanager
        let tagmanager = Setup.getValue("settings.tagmanager");
        if (tagmanager) {
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', tagmanager);
        }

        // Colors
        let colors = Setup.getValue("assets.colors");
        let r = document.querySelector(':root');

        r.style.setProperty('--primary-color', colors.primary);
        r.style.setProperty('--text-color', colors.text);
        r.style.setProperty('--headline-color', colors.headline);
        r.style.setProperty('--button-color', colors.button);
        r.style.setProperty('--button-text-color', colors.buttonText);
        r.style.setProperty('--light-background-color', colors.lightBackground);
        this.colors=colors;

        // Load fonts
        let fontsToLoad=['heading','body','gameBold','gameRegular'];
        fontsToLoad.forEach((fontTitle)=>{
            let font_url=Setup.getValue("assets.fonts."+fontTitle+"[0].url");
            if (!font_url) {
                font_url=Setup.getValue("assets.fonts.heading[0].url");
            }

                let font=new FontFace('font_'+fontTitle, 'url('+font_url+')');
                font.load().then(function(loaded_face) {
                    (document).fonts.add(font);
                }).catch(function(error) {
                    console.log("Error loading font",error);
                });
        });

        // Set custom CSS
        let customCSS=Setup.getValue("design.customCSS.value");
        if (customCSS) {
            try {
                this.customCSS=JSON.parse(customCSS);
            } catch (e) {
                console.error("Error parsing JSON",e);
            }
        }
    }

    /**
     * Get translation from path
     * This fetches the data from the setup. 
     * @param path The path in the original setup data
     * @returns The translation string
     */
    static getCopy(path){
        let field = get(Setup.data, "copy." + path + "." + Setup.language + ".value");
        if (!field) {
            field = get(Setup.data, "copy." + path + ".EN.value");
        }
        return field;
    }

    /**
     * Get value from setup
     * @param path The path in the original setup data
     * @returns The output
     */
    static getValue(path){
        let field = get(Setup.data, path);
        return field;
    }

    /**
     * Get file from a list of files by language
     * @param path The path in the original JSON data
     * @returns The file url
     */
    static getFileByLanguage(path){
        let field = get(Setup.data, path + "." + Setup.language + "[0].url");
        return field;
    }

    /**
     * Get current language
     * @returns Language that is set
     */
    static getLanguage(){
        return Setup.language;
    }

    /**
     * Get current gameId
     * @returns game id
     */
    static getGameId(){
        return Setup.gameId;
    }

    /**
     * Get current game type
     * @returns game type
     */
    static getGameType(){
        return Setup.gameType;
    }

    /**
     * Set language
     * @param language The language code
     */
    static setLanguage(language) {
        Setup.language=language;
    }

    /**
     * Get color
     * @param type The type
     */
    static getColor(type){
        return Setup.colors[type];
    }

    /**
     * Get value from setup
     * @param path The path in the original setup data
     * @returns The output
     */
    static getCustomCSS(type){
        if (Setup.customCSS && Setup.customCSS[type]) {
            return Setup.customCSS[type];
        }
        return {};
    }

    /**
     * 
    /**
     * Get image from local storage or remote url
     * @param filename The filename of the url
     * @param type The type of the item (flow or game)
     * @returns The file url
     */
    static getImage(filename, type = 'flow'){
        let assets = get(Setup.data, "assets.files");
        let filenameTitle = filename.substring(0, filename.lastIndexOf("."));;

        if (assets && assets[type]) {

            // Loop through objects and items
            let assetObject = assets[type];
            if (Array.isArray(assetObject)) {
                for (let asset of assetObject) {
                    if (asset.title == filenameTitle) {
                        return asset.url;
                    }
                }
            }
        }

        if (type == 'game') {
            return '/images/games/' + Setup.getGameType() + '/' + filename;
        }

        return '/images/' + filename;
    }

}