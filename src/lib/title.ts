const RANDOM_TITLES: Array<string> = [
];

const TITLE = 'Adrian Donnelly';

const random_title = () => {
    return TITLE + ' ' + RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)];
};

export {
    random_title,
    TITLE,
    RANDOM_TITLES
};