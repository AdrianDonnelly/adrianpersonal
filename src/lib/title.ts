const RANDOM_TITLES: Array<string> = [
    '- Software Engineer',
    '- Building things',
];

const TITLE = 'Grzegorz Maniak';

const random_title = () => {
    return TITLE + ' ' + RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)];
};

export {
    random_title,
    TITLE,
    RANDOM_TITLES
};