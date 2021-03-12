import sprite from '../assets/icons/symbol-defs.svg';

export const useIcons = ({ className, icon }) => (
    <svg className={className}>
        <use xlinkHref={`${sprite}#${icon}`}></use>
    </svg>
);