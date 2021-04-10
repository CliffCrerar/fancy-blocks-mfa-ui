
/* -----------FOR DEBUG--------------- */

const debugLog = true;

/* -----------FOR DEBUG--------------- */

/* ---------DECLARE VARIABLES--------- */

const
    $ = document,
    create = (el) => $.createElement(el);

/* ---------DECLARE VARIABLES--------- */

/* DEBUG LOGGING: ALTER CLOBAL CONSOLE */
console.debug = function () {
    if (!console.debugging) return;
    console.log.apply(this, arguments);
};
console.debugging = debugLog;
function debug(...param) { debugLog && console.debug('FB DEBUG:', ...param) }
/* DEBUG LOGGING: ALTER CLOBAL CONSOLE */


/**
 * @description Fancy bloks builder object constructor
 * @param {*} config optional configuration
 * @returns a the builder context for method chaining
 */

function FancyBloks(config = null) {

    // preserve context;
    const self = this;

    // configuration initialization

    self.heading = null;
    self.bloks = []
    self.buttonCaption = null
    self.parent = null;
    self.howManyToDisplay = 6;
    self.customCssClasses = []; // future state
    self.container = document.createElement('div');

    // configuration methods for method chaining configuration when config input on new not provided

    self.setCustomCssClasses = function () {
        // future state
    }

    // set the label displayed above the bloks
    self.setLabel = function (label) {
        self.label = label;
        debug('setLabel:', label)
        return self;
    }

    // set the button caption to custom text
    self.setButtonCaption = function (buttonCaption) {
        self.buttonCaption = buttonCaption;
        debug('setButtonCaption:', buttonCaption)
        return self;
    }

    // set the id of the parent tag that fancy bloks will be appended to
    self.setParent = function (parent) {
        self.parent = parent;
        debug('set parent:', parent)
        return self;
    }

    // configures the number of fb to be displayed
    self.numberViewInputs = function (no) {
        self.howManyToDisplay = no;
        debug('numberViewInputs:', no)
        return self;
    }

    // fancy blok element creation scripts

    // create fb heading or label
    self.createHeading = function () {
        const heading = document.createElement('div');
        heading.innerText = self.heading
        return heading;
    }
    // create the fb button
    self.createButton = function () {
        const button = document.createElement('button');
        return button;
    }
    // create a single instance of a fb
    self.createOneFancyBlok = function (fancyIndex) {
        let newInputBox = create('input');
        newInputBox = Object.assign(newInputBox, {
            ['data-set-digit']: fancyIndex,
            id: `digit-${fancyIndex}`,
            classList: ['fancy-digit'],
            type: "text",
            maxLength: 1,
        })
        return newInputBox;
    }
    // creates the number of fancy bloks per the input parameter as an integer
    self.createFancyBloks = function (noOfBoxes) {
        return [...Array(noOfBoxes).keys()]
            .map((_, i) => self.createOneFancyBlok(i))
    }

    // configuration validation

    self.confFbErr = () => {
        const
            errBox = create('div'),
            labelBox = Object.assign({}, errBox),
            smallButton = create('button');
        errBox.style = {
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 0,
        }
    }

    self.validateConfiguration = () => {

    }

    // when the builder is configured via config objects or method chaining call build to build an instance
    self.build = function () {
        self.validateConfiguration();
        if (self.parent !== null) {
            self.heading !== null && self.parent.appendChild(this.createHeading());
            self.parent.appendChild(this.container);
            self.buttonCaption !== null && self.parent.appendChild(this.createButton());
        }
        self.bloks = self.createFancyBloks(this.howManyToDisplay).map(mapEventListeners).map(appendDom);
        return self.bloks;
    }

    function mapEventListeners(blok) {
        debug('map event listeners: ', blok);
        blok.addEventListener('focus', self.eventListeners.onEnterInput)
        blok.addEventListener('keydown', self.eventListeners.onKeyDownHandleEvent)
        return blok;
    }

    function appendDom(blok) {
        debug('map append child', blok)
        self.container.appendChild(blok);
        return blok;
    }

    self.onOnInputSubmit = function(success, fail){
        // todo
    }

    // the event listeners required by fancy blocks
    self.eventListeners = {

        // for when a fancy blok is focussed
        onEnterInput: (ev) => {
            debug('Focus Event', ev)
            self.bloks.findIndex((el, idx) => {
                if (el.id === ev.target.id) {
                    return idx;
                }
            })
        },

        // for handling a key press
        onKeyDownHandleEvent: (ev) => {
            ev.preventDefault();
            const
                len = self.bloks.length,
                i = Number(ev.target['data-set-digit']),
                focusBlok = () => {
                    debug('Do focus blok')
                    if (i === 0) { return; }
                    self.bloks[i].value = '';
                    self.bloks[i - 1].value = '';
                    self.bloks[i - 1].focus();
                    return;
                },
                blurBlok = () => {
                    debug('Do blur blok')
                    ev.target.value = ev.key;
                    if (i === len - 1) { return self.bloks[i].blur(); }
                    self.bloks[i + 1].focus();
                    return;
                }

            if (ev.key == "Backspace") { return focusBlok(); }
            else if (Number(ev.key) || ev.key === "0") { return blurBlok(); }
        }
    }
    return self;
}


export default FancyBloks;